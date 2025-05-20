<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    config(['services.github.client_id' => 'fake']);
    config(['services.github.client_secret' => 'fake']);
    config(['services.github.redirect' => 'http://localhost/github/callback']);
});

test('redirect to github', function () {
    $response = $this->get('/auth/github');

    $response->assertRedirect();
    $this->assertStringContainsString('github.com/login/oauth', $response->getTargetUrl());
});
