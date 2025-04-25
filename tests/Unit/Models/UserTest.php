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
        ]);
});
