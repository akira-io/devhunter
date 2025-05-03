<?php

declare(strict_types=1);

use App\Models\Hunt;

use function Pest\Laravel\from;

beforeEach(function () {
    $this->user = actingAsAuthUser();
    $this->hunt = $this->user->hunts()->create(Hunt::factory()->make()->toArray());
});

it('can delete a hunt', function () {

    $response = from(route('hunts.index'))
        ->delete(route('hunts.destroy', $this->hunt->id));

    $response->assertRedirect(route('hunts.index'));

    expect(Hunt::find($this->hunt->id))
        ->toBeNull()
        ->and($this->user->hunts)
        ->toHaveCount(0)
        ->and($response->status())
        ->toBe(Symfony\Component\HttpFoundation\Response::HTTP_FOUND);
});

it('can not delete a hunt that does not exist', function () {
    $response = from(route('hunts.index'))
        ->delete(route('hunts.destroy', 999));

    expect(Hunt::find(999))
        ->toBeNull()
        ->and($this->user->hunts)
        ->toHaveCount(1)
        ->and($response->status())
        ->toBe(Symfony\Component\HttpFoundation\Response::HTTP_NOT_FOUND);
});

it('can not delete a hunt that does not belong to the user', function () {
    $user2 = App\Models\User::factory()->create();

    $hunt2 = $user2->hunts()->create(Hunt::factory()->make()->toArray());

    $response = from(route('hunts.index'))
        ->delete(route('hunts.destroy', $hunt2));

    expect(Hunt::find($hunt2->id))
        ->toBeInstanceOf(Hunt::class)
        ->and($user2->hunts)
        ->toHaveCount(1)
        ->and($response->status())
        ->toBe(Symfony\Component\HttpFoundation\Response::HTTP_FORBIDDEN);
});
