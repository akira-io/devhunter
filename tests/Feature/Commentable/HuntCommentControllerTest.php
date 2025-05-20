<?php

declare(strict_types=1);

use App\Models\Comment;
use App\Models\Hunt;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->hunt = Hunt::factory()->create();
});

it('can store a comment on a hunt', function () {
    $user = actingAsAuthUser();

    $response = $this
        ->from(route('hunts.index'))
        ->post(route('hunts.comment', $this->hunt), [
            'content' => 'This is a test comment',
        ]);

    $response->assertRedirect(route('hunts.index'));

    $comment = Comment::query()->latest('id')->first();

    expect($comment)
        ->not->toBeNull()
        ->and($comment->content)
        ->toBe('This is a test comment')
        ->and($comment->commentable_id)
        ->toBe($this->hunt->id)
        ->and($comment->commentable_type)
        ->toBe(Hunt::class)
        ->and($comment->commenter_id)
        ->toBe($user->id);
});

it('requires authentication to store a comment', function () {
    $response = $this
        ->from(route('hunts.index'))
        ->post(route('hunts.comment', $this->hunt), [
            'content' => 'This is a test comment',
        ]);

    $response->assertRedirect(route('login'));

    expect(Comment::query()->count())->toBe(0);
});

it('validates the content field', function () {
    actingAsAuthUser();

    // Test missing content
    $response = $this
        ->from(route('hunts.index'))
        ->post(route('hunts.comment', $this->hunt), []);

    $response->assertSessionHasErrors('content');
    expect(Comment::query()->count())->toBe(0);

    // Test content too long
    $response = $this
        ->from(route('hunts.index'))
        ->post(route('hunts.comment', $this->hunt), [
            'content' => str_repeat('a', 201), // 201 characters, max is 200
        ]);

    $response->assertSessionHasErrors('content');
    expect(Comment::query()->count())->toBe(0);
});

it('handles non-existent hunt', function () {
    actingAsAuthUser();

    $response = $this
        ->from(route('hunts.index'))
        ->post(route('hunts.comment', 999), [
            'content' => 'This is a test comment',
        ]);

    $response->assertStatus(404);
    expect(Comment::query()->count())->toBe(0);
});
