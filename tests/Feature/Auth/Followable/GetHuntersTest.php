<?php

declare(strict_types=1);

beforeEach(function () {
    $this->user = actingAsAuthUser();
    $this->hunter = App\Models\User::factory()->create();
});

it('should get all user hunters', function () {

    $this->hunter->follow($this->user);

    $response = $this->get(route('followable.followers'));

    $followers = $response->getOriginalContent()->getData()['page']['props']['followers'];

    expect($response->status())
        ->toBe(200)
        ->and($followers)
        ->toHaveCount(1);

});
