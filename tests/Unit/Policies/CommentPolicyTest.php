<?php

declare(strict_types=1);

use App\Models\Hunt;
use App\Models\User;
use App\Policies\CommentPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('viewAny method returns true', function () {
    // Arrange
    $policy = new CommentPolicy();
    $user = User::factory()->create();

    // Act & Assert
    expect($policy->viewAny())->toBeTrue();
});

test(/**
 * @throws Exception
 */ 'view method returns true', function () {
    // Arrange
    $policy = new CommentPolicy();
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create(['owner_id' => $user->id]);
    $comment = $user->comment($hunt, 'Test comment');

    // Act & Assert
    expect($policy->view())->toBeTrue();
});

test('update method returns true when user is the comment owner', function () {
    // Arrange
    $policy = new CommentPolicy();
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create(['owner_id' => $user->id]);

    $comment = $user->comment($hunt, 'Test comment');

    // Act & Assert
    expect($policy->update($user, $comment))->toBeTrue();
});

test('update method returns false when user is not the comment owner', function () {
    // Arrange
    $policy = new CommentPolicy();
    $owner = User::factory()->create();
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create(['owner_id' => $owner->id]);
    $comment = $owner->comment($hunt, 'Test comment');

    // Act & Assert
    expect($policy->update($user, $comment))->toBeFalse();
});

test('delete method returns true when user is the comment owner', function () {
    // Arrange
    $policy = new CommentPolicy();
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create(['owner_id' => $user->id]);
    $comment = $user->comment($hunt, 'Test comment');

    // Act & Assert
    expect($policy->delete($user, $comment))->toBeTrue();
});

test('delete method returns false when user is not the comment owner', function () {
    // Arrange
    $policy = new CommentPolicy();
    $owner = User::factory()->create();
    $user = User::factory()->create();
    $hunt = Hunt::factory()->create(['owner_id' => $owner->id]);
    $comment = $owner->comment($hunt, 'Test comment');

    // Act & Assert
    expect($policy->delete($user, $comment))->toBeFalse();
});
