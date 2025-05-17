<?php

declare(strict_types=1);

use App\Models\Hunt;
use App\Models\User;
use App\Policies\HuntPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('viewAny method returns true', function () {
    // Arrange
    $policy = new HuntPolicy();
    $user = User::factory()->create();

    // Act & Assert
    expect($policy->viewAny())->toBeTrue();
});

test('view method returns true', function () {
    // Arrange
    $policy = new HuntPolicy();
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create(['owner_id' => $user->id]);

    // Act & Assert
    expect($policy->view())->toBeTrue();
});

test('update method returns true when user is the hunt owner', function () {
    // Arrange
    $policy = new HuntPolicy();
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create(['owner_id' => $user->id]);

    // Act & Assert
    expect($policy->update($user, $hunt))->toBeTrue();
});

test('update method returns false when user is not the hunt owner', function () {
    // Arrange
    $policy = new HuntPolicy();
    $owner = User::factory()->create();
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create(['owner_id' => $owner->id]);

    // Act & Assert
    expect($policy->update($user, $hunt))->toBeFalse();
});

test('delete method returns true when user is the hunt owner', function () {
    // Arrange
    $policy = new HuntPolicy();
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create(['owner_id' => $user->id]);

    // Act & Assert
    expect($policy->delete($user, $hunt))->toBeTrue();
});

test('delete method returns false when user is not the hunt owner', function () {
    // Arrange
    $policy = new HuntPolicy();
    $owner = User::factory()->create();
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create(['owner_id' => $owner->id]);

    // Act & Assert
    expect($policy->delete($user, $hunt))->toBeFalse();
});
