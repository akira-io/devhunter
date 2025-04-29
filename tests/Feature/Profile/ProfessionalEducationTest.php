<?php

declare(strict_types=1);

use App\Models\ProfessionalEducation;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\from;

beforeEach(function () {
    $this->user = (App\Models\User::factory()->create());
    actingAs($this->user);
});

it('should create professional education', function () {

    $response = from(route('profile.edit'))
        ->post(route('profile.education'), [
            'institution' => 'University of Example',
            'degree' => 'Bachelor of Science',
            'field_of_study' => 'Computer Science',
            'start_date' => '2020-01-01',
            'end_date' => '2024-01-01',
        ]);

    $response->assertRedirect(route('profile.edit'));

    expect($this->user->professionalEducations->first())
        ->toBeInstanceOf(ProfessionalEducation::class)
        ->and($this->user->professionalEducations->first()->count())
        ->toBe(1);

});

it('should delete professional education', function () {

    $this->professionalEducation = ProfessionalEducation::factory()->create([
        'user_id' => $this->user->id,
    ]);

    $response = from(route('profile.edit'))
        ->delete(route('profile.education.delete', [
            'professionalEducation' => $this->professionalEducation,
        ]));

    $response->assertRedirect(route('profile.edit'));

    expect($this->user->professionalEducations->count())
        ->toBe(0);

});
