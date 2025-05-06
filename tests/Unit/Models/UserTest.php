<?php

declare(strict_types=1);

use App\Models\AcademicBackground;
use App\Models\Hunt;
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

it('should has many academic backgrounds', function () {
    $user = User::factory()->create();
    $user->academicBackgrounds()->createMany(
        AcademicBackground::factory()->count(3)->make()->toArray()
    );

    expect($user->academicBackgrounds)
        ->each
        ->toBeInstanceOf(AcademicBackground::class)
        ->and($user->academicBackgrounds)
        ->toHaveCount(3);
});

it('should has many hunts', function () {
    $user = User::factory()->create();

    $user->hunts()->createMany(
        Hunt::factory()->count(3)->make()->toArray()
    );

    expect($user->hunts)
        ->each
        ->toBeInstanceOf(Hunt::class)
        ->and($user->hunts)
        ->toHaveCount(3);
});
