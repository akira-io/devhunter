<?php

declare(strict_types=1);

use App\Actions\User\GetAvatarAction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

test('it returns the media url when user has profile avatar', function () {
    // Arrange
    Storage::fake('public');
    $user = User::factory()->create();

    // Upload an avatar to the user's media collection
    $file = UploadedFile::fake()->image('avatar.jpg');
    $user->addMedia($file)->toMediaCollection('profile_avatar');

    $action = new GetAvatarAction();

    // Act
    $result = $action->handle($user);

    // Assert
    expect($result)->toBe($user->getMedia('profile_avatar')->last()->getUrl());
});

test('it returns the avatar_url when user has no profile avatar media', function () {
    // Arrange
    $avatarUrl = 'https://example.com/avatar.jpg';
    $user = User::factory()->create([
        'avatar_url' => $avatarUrl,
    ]);

    $action = new GetAvatarAction();

    // Act
    $result = $action->handle($user);

    // Assert
    expect($result)->toBe($avatarUrl);
});

test('it returns null when user has no profile avatar media and no avatar_url', function () {
    // Arrange
    $user = User::factory()->create([
        'avatar_url' => null,
    ]);

    $action = new GetAvatarAction();

    // Act
    $result = $action->handle($user);

    // Assert
    expect($result)->toBeNull();
});
