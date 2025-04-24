<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Hash;

beforeEach(function () {
    Hash::shouldReceive('make')->andReturn('mocked-password');
    Hash::shouldReceive('isHashed')->andReturnTrue(); // <- important
    config(['services.github.client_id' => 'fake']);
    config(['services.github.client_secret' => 'fake']);
    config(['services.github.redirect' => 'http://localhost/github/callback']);
});

it('redirects to github', function () {
    $response = $this->get('/auth/github');

    $response->assertRedirectContains('github.com/login/oauth/authorize');
});
