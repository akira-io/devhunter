<?php

declare(strict_types=1);

use App\Models\Hunt;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->otherUser = User::factory()->create();

    // Create some hunts for the other user
    $this->hunts = Hunt::factory()->count(3)->create([
        'owner_id' => $this->otherUser->id,
    ]);

    // Make the user follow the other user
    $this->user->follow($this->otherUser);
});

it('displays a user public profile with hunts, hunters and huntings', function () {
    // Act as the authenticated user
    $response = $this->actingAs($this->user)
        ->get(route('public.profile.show', $this->otherUser));

    $response->assertStatus(200);
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('public-profile')
        ->has('user')
        ->has('hunts.data', 3)
        ->has('hunters')
        ->has('huntings')
    );
});

it('requires authentication to view public profile', function () {
    $response = $this->get(route('public.profile.show', $this->otherUser));

    $response->assertRedirect(route('login'));
});

it('returns 404 for non-existent user', function () {
    $response = $this->actingAs($this->user)
        ->get(route('public.profile.show', 999));

    $response->assertStatus(404);
});
