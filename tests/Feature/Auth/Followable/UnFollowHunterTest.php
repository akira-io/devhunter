<?php

declare(strict_types=1);

beforeEach(function () {
    $this->user = actingAsAuthUser();
    $this->hunter = App\Models\User::factory()->create();
});

it('should unfollow a hunter', function () {
    $this->user->follow($this->hunter);

    $response = $this->post(route('followable.unfollow'), [
        'user_id' => $this->hunter->id,
    ]);
    expect($response->status())
        ->toBe(302)
        ->and($this->user->isFollowing($this->hunter))
        ->toBeFalse();
});
