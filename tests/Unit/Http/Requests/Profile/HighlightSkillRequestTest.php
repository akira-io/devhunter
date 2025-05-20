<?php

declare(strict_types=1);

use App\Enums\SkillsEnum;
use App\Http\Requests\Profile\HighlightSkillRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;

uses(RefreshDatabase::class);

test('validation passes with valid skills array', function () {
    // Arrange
    $request = new HighlightSkillRequest();
    $validator = Validator::make(
        [
            'skills' => ['array'],
            'skill' => [SkillsEnum::PHP->value, SkillsEnum::JavaScript->value],
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeTrue();
});

test('validation passes with null skills', function () {
    // Arrange
    $request = new HighlightSkillRequest();
    $validator = Validator::make(
        [
            'skills' => null,
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeTrue();
});

test('validation fails when skills is not an array', function () {
    // Arrange
    $request = new HighlightSkillRequest();
    $validator = Validator::make(
        [
            'skills' => 'not an array',
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('skills'))->toBeTrue();
});

test('validation fails when skill item is not in SkillsEnum', function () {
    // Arrange
    $request = new HighlightSkillRequest();
    $validator = Validator::make(
        [
            'skills' => ['array'],
            'skill' => ['invalid_skill'],
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('skill.*'))->toBeTrue();
});

test('validation fails when skill items are not distinct', function () {
    // Arrange
    $request = new HighlightSkillRequest();
    $validator = Validator::make(
        [
            'skills' => ['array'],
            'skill' => [SkillsEnum::PHP->value, SkillsEnum::PHP->value],
        ],
        $request->rules()
    );

    // Act & Assert
    expect($validator->passes())->toBeFalse()
        ->and($validator->errors()->has('skill.*'))->toBeTrue();
});

test('authorize method returns true', function () {
    // Arrange
    $request = new HighlightSkillRequest();

    // Act & Assert
    expect($request->authorize())->toBeTrue();
});
