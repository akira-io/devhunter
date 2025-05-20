<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\from;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    actingAs($this->user);
});

it('should update user skills', function () {
    $skills = ['PHP', 'Laravel', 'JavaScript'];

    $response = from(route('profile.edit'))
        ->post(route('profile.highlight-skills'), [
            'skills' => $skills,
        ]);

    $response->assertRedirect(route('profile.edit'));

    $this->user->refresh();
    expect($this->user->skills)->toBe($skills);
});

it('requires authentication to update skills', function () {
    // Log out the user
    auth()->logout();

    $response = $this->post(route('profile.highlight-skills'), [
        'skills' => ['PHP', 'Laravel'],
    ]);

    $response->assertRedirect(route('login'));
});

it('validates skills input', function () {
    $response = from(route('profile.edit'))
        ->post(route('profile.highlight-skills'), [
            'skills' => 'not-an-array',
        ]);

    $response->assertSessionHasErrors('skills');
});
