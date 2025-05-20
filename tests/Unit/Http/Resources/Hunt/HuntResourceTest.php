<?php

declare(strict_types=1);

use App\Http\Resources\Hunt\HuntResource;
use App\Models\Hunt;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

uses(RefreshDatabase::class);

test('hunt resource has expected structure', function () {
    // Arrange
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create([
        'owner_id' => $user->id,
        'content' => 'Test hunt content',
    ]);

    // Add a property that would normally be added by the controller
    $hunt->setAttribute('has_liked', true);

    // Create a resource
    $resource = new HuntResource($hunt);

    // Create a request
    $request = new Request();

    // Act
    $array = $resource->toArray($request);

    // Assert
    expect($array)->toBeArray()
        ->toHaveKey('id')
        ->toHaveKey('content')
        ->toHaveKey('owner')
        ->toHaveKey('comments');
});

test('hunt resource includes has_liked property', function () {
    // Arrange
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create([
        'owner_id' => $user->id,
    ]);

    // Add the has_liked property
    $hunt->setAttribute('has_liked', true);

    // Create a resource
    $resource = new HuntResource($hunt);

    // Create a request
    $request = new Request();

    // Act
    $array = $resource->toArray($request);

    // Assert
    expect($array)->toHaveKey('has_liked')
        ->and($array['has_liked'])->toBeTrue();
});

test('commentsWithHasLiked sets has_liked property correctly', function () {
    // Arrange
    $user = actingAsAuthUser();
    $hunt = Hunt::factory()->create(['owner_id' => $user->id]);

    // Create comments on the hunt
    $comment1 = $user->comment($hunt, 'Test comment 1');
    $comment2 = $user->comment($hunt, 'Test comment 2');

    $comment = $user->comments;

    // Like one of the comments
    $user->like($comment[0]);

    // Create a resource
    $resource = new HuntResource($hunt);

    // Create a request with the user
    $request = Request::create('/test');
    $request->setUserResolver(fn () => $user);
    app()->instance('request', $request);

    // Act
    $comments = $resource->commentsWithHasLiked();

    // Assert
    expect($comments)->toHaveCount(2);

    // Find the comments in the collection
    $resultComment1 = $comments->first(fn ($c) => $c->id === $comment1->id);
    $resultComment2 = $comments->first(fn ($c) => $c->id === $comment2->id);

    // Check that has_liked is set correctly
    expect($resultComment1->has_liked)->toBeTrue()
        ->and($resultComment2->has_liked)->toBeFalse();
});
