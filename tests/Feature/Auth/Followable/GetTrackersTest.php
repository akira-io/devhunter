<?php

declare(strict_types=1);

beforeEach(function () {
    $this->user = actingAsAuthUser();
    $this->hunter = App\Models\User::factory()->create();
});

it('should get all trackers', function () {

    $this->user->follow($this->hunter);

    $response = $this->get(route('followable.followings'));

    $trackers = $response->getOriginalContent()->getData()['page']['props']['followings'];

    expect($response->status())
        ->toBe(200)
        ->and($trackers)
        ->toHaveCount(1);

});
