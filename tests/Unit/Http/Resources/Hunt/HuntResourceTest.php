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
    $hunt->has_liked = true;

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
    $hunt->has_liked = true;

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
