<?php

declare(strict_types=1);

use App\Models\Hunt;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->hunt = Hunt::factory()->create(['owner_id' => $this->user->id]);
    $this->comment = $this->user->comment($this->hunt, 'Test comment');
});

it('toggles like on a comment and redirects to hunts index', function () {
    $user = actingAsAuthUser();

    $response = $this->post(route('comments.toggle-like', $this->comment));

    $response->assertRedirect(route('hunts.index'));
});

it('requires authentication to toggle like on a comment', function () {
    $response = $this->post(route('comments.toggle-like', $this->comment));

    $response->assertRedirect(route('login'));
});

it('returns 404 for non-existent comment', function () {
    actingAsAuthUser();

    $response = $this->post(route('comments.toggle-like', 999));

    $response->assertStatus(404);
});
