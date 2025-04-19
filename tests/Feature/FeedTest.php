<?php

declare(strict_types=1);

use App\Models\User;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get('/feed')->assertRedirect('/login');
});

test('authenticated users can visit the feed', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/feed')->assertOk();
});
