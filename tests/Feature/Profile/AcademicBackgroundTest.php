<?php

declare(strict_types=1);

use App\Models\AcademicBackground;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\from;

beforeEach(function () {
    $this->user = (App\Models\User::factory()->create());
    actingAs($this->user);
});

it('should create academic backgrounds', function () {

    $response = from(route('profile.edit'))
        ->post(route('profile.education'), [
            'institution' => 'University of Example',
            'degree' => 'Bachelor of Science',
            'field_of_study' => 'Computer Science',
            'start_date' => '2020-01-01',
            'end_date' => '2024-01-01',
        ]);

    $response->assertRedirect(route('profile.edit'));

    expect($this->user->academicBackgrounds()->first())
        ->toBeInstanceOf(AcademicBackground::class)
        ->and($this->user->academicBackgrounds()->first()->count())
        ->toBe(1);

});

it('should delete academic backgrounds', function () {

    $this->academicBackground = AcademicBackground::factory()->create([
        'user_id' => $this->user->id,
    ]);

    $response = from(route('profile.edit'))
        ->delete(route('profile.education.delete', [
            'academicBackground' => $this->academicBackground,
        ]));

    $response->assertRedirect(route('profile.edit'));

    expect($this->user->academicBackgrounds()->count())
        ->toBe(0);

});
