<?php

declare(strict_types=1);

use App\Models\AcademicBackground;

test('to array', function () {
    $user = AcademicBackground::factory()->create()->refresh();

    expect(array_keys($user->toArray()))
        ->toBe([
            'id',
            'user_id',
            'institution',
            'degree',
            'field_of_study',
            'start_date',
            'end_date',
            'created_at',
            'updated_at',
        ]);
});

it('should belongs to user', function () {
    $professionalEducation = AcademicBackground::factory()->create();

    expect($professionalEducation->user)
        ->toBeInstanceOf(App\Models\User::class);

});
