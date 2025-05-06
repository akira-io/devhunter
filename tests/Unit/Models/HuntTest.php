<?php

declare(strict_types=1);

use App\Models\Hunt;
use App\Models\User;

test('to array', function () {
    $hunt = Hunt::factory()->create()->refresh();

    expect(array_keys($hunt->toArray()))
        ->toBe([
            'id',
            'owner_id',
            'content',
            'is_reported',
            'is_pinned',
            'is_ignored',
            'created_at',
            'updated_at',
        ]);
});

it('should belongs to a user', function () {

    $hunt = Hunt::factory()->create();

    expect($hunt->owner)
        ->toBeInstanceOf(User::class);
});
