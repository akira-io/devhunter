<?php

declare(strict_types=1);

beforeEach(function () {
    $this->user = actingAsAuthUser();
    $this->hunter = App\Models\User::factory()->create();
});

it('should follow a hunter', function () {
    $response = $this->post(route('followable.follow'), [
        'user_id' => $this->hunter->id,
    ]);
    expect($response->status())
        ->toBe(302)
        ->and($this->user->isFollowing($this->hunter))
        ->toBeTrue();
});

it('should not follow a hunter if already followed', function () {
    $this->user->follow($this->hunter);
    $response = $this->post(route('followable.follow'), [
        'user_id' => $this->hunter->id,
    ]);
    expect($response->status())
        ->toBe(302)
        ->and($this->user->isFollowing($this->hunter))
        ->toBeTrue();
});
