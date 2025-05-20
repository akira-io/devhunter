<?php

declare(strict_types=1);

use App\Http\Requests\Commentable\StoreCommentRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;

uses(RefreshDatabase::class);

test('validation passes with valid data', function () {
    // Arrange
    $request = new StoreCommentRequest();
    $validator = Validator::make(
        ['content' => 'This is a valid comment'],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeTrue();
});

test('validation fails when content is missing', function () {
    // Arrange
    $request = new StoreCommentRequest();
    $validator = Validator::make(
        [],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('content'))->toBeTrue();
});

test('validation fails when content is not a string', function () {
    // Arrange
    $request = new StoreCommentRequest();
    $validator = Validator::make(
        ['content' => 123],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('content'))->toBeTrue();
});

test('validation fails when content exceeds maximum length', function () {
    // Arrange
    $request = new StoreCommentRequest();
    $validator = Validator::make(
        ['content' => str_repeat('a', 201)], // 201 characters, max is 200
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('content'))->toBeTrue();
});

test('authorize method returns true', function () {
    // Arrange
    $request = new StoreCommentRequest();

    // Act & Assert
    expect($request->authorize())->toBeTrue();
});
