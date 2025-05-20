<?php

declare(strict_types=1);

use App\Models\Comment;
use App\Models\Hunt;
use App\Models\User;

use function Pest\Laravel\from;

beforeEach(function () {
    $this->user = actingAsAuthUser();
    $this->hunt = Hunt::factory()->create(['owner_id' => $this->user->id]);
    $this->comment = $this->user->comment($this->hunt, 'Test comment');
});

it('can delete a comment', function () {
    $response = from(route('hunts.index'))
        ->delete(route('comments.destroy', $this->comment));

    $response->assertRedirect();

    expect(Comment::find($this->comment->id))
        ->toBeNull()
        ->and($response->status())
        ->toBe(Symfony\Component\HttpFoundation\Response::HTTP_FOUND);
});

it('can not delete a comment that does not exist', function () {
    $response = from(route('hunts.index'))
        ->delete(route('comments.destroy', 999));

    expect(Comment::find(999))
        ->toBeNull()
        ->and($this->comment->fresh())
        ->not->toBeNull()
        ->and($response->status())
        ->toBe(Symfony\Component\HttpFoundation\Response::HTTP_NOT_FOUND);
});

it('can not delete a comment that does not belong to the user', function () {
    $user2 = User::factory()->create();
    $comment2 = $user2->comment($this->hunt, 'Another test comment');

    $response = from(route('hunts.index'))
        ->delete(route('comments.destroy', $comment2));

    expect(Comment::find($comment2->id))
        ->toBeInstanceOf(Comment::class)
        ->and($response->status())
        ->toBe(Symfony\Component\HttpFoundation\Response::HTTP_FORBIDDEN);
});
