<?php

declare(strict_types=1);

use App\Http\Requests\Profile\ProfileLinkRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;

uses(RefreshDatabase::class);

test('validation passes with valid URLs', function () {
    // Arrange
    $request = new ProfileLinkRequest();
    $validator = Validator::make(
        [
            'github_url' => 'https://github.com/username',
            'twitter_url' => 'https://twitter.com/username',
            'linkedin_url' => 'https://linkedin.com/in/username',
            'bluesky_url' => 'https://bsky.app/profile/username',
            'website_url' => 'https://example.com',
            'youtube_url' => 'https://youtube.com/c/username',
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeTrue();
});

test('validation passes with null URLs', function () {
    // Arrange
    $request = new ProfileLinkRequest();
    $validator = Validator::make(
        [
            'github_url' => null,
            'twitter_url' => null,
            'linkedin_url' => null,
            'bluesky_url' => null,
            'website_url' => null,
            'youtube_url' => null,
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeTrue();
});

test('validation fails with invalid github_url', function () {
    // Arrange
    $request = new ProfileLinkRequest();
    $validator = Validator::make(
        [
            'github_url' => 'not-a-url',
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('github_url'))->toBeTrue();
});

test('validation fails with invalid twitter_url', function () {
    // Arrange
    $request = new ProfileLinkRequest();
    $validator = Validator::make(
        [
            'twitter_url' => 'not-a-url',
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('twitter_url'))->toBeTrue();
});

test('validation fails with invalid linkedin_url', function () {
    // Arrange
    $request = new ProfileLinkRequest();
    $validator = Validator::make(
        [
            'linkedin_url' => 'not-a-url',
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('linkedin_url'))->toBeTrue();
});

test('validation fails with invalid bluesky_url', function () {
    // Arrange
    $request = new ProfileLinkRequest();
    $validator = Validator::make(
        [
            'bluesky_url' => 'not-a-url',
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('bluesky_url'))->toBeTrue();
});

test('validation fails with invalid website_url', function () {
    // Arrange
    $request = new ProfileLinkRequest();
    $validator = Validator::make(
        [
            'website_url' => 'not-a-url',
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('website_url'))->toBeTrue();
});

test('validation fails with invalid youtube_url', function () {
    // Arrange
    $request = new ProfileLinkRequest();
    $validator = Validator::make(
        [
            'youtube_url' => 'not-a-url',
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('youtube_url'))->toBeTrue();
});

test('authorize method returns true', function () {
    // Arrange
    $request = new ProfileLinkRequest();

    // Act & Assert
    expect($request->authorize())->toBeTrue();
});
