<?php

declare(strict_types=1);

use App\Models\User;

test('to array', function () {
    $user = User::factory()->create()->refresh();

    expect(array_keys($user->toArray()))
        ->toBe([
            'id',
            'name',
            'email',
            'email_verified_at',
            'created_at',
            'updated_at',
            'github_user_name',
            'avatar_url',
            'location',
            'bio',
            'github_id',
            'github_token',
            'github_refresh_token',
            'skills',
            'github_url',
            'twitter_url',
            'linkedin_url',
            'bluesky_url',
            'website_url',
            'youtube_url',
        ]);
});

it('should access the admin panel', function ($email) {

    $user = User::factory()
        ->withEmail($email)
        ->create();
    expect($user->canAccessPanel(filament()->getPanel('admin')))
        ->toBeTrue();
})->with([
    'kidiatoliny@gmail.com',
    'kid@akira-io.com',
]);

it('should dennie access to the admin panel', function ($email) {

    $user = User::factory()
        ->withEmail($email)
        ->create();
    expect($user->canAccessPanel(filament()->getPanel('admin')))
        ->not->toBeTrue();
})->with([
    'user@gmail.com',
    'user2@akiraa-io.com',
]);
