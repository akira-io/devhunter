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

it('should update user profile links', function () {
    $links = [
        'github_url' => 'https://github.com/example',
        'twitter_url' => 'https://twitter.com/example',
        'linkedin_url' => 'https://linkedin.com/in/example',
        'website_url' => 'https://example.com',
        'youtube_url' => 'https://youtube.com/example',
        'bluesky_url' => 'https://bsky.app/profile/example.bsky.social',
    ];

    $response = from(route('profile.edit'))
        ->patch(route('profile.links'), $links);

    $response->assertRedirect(route('profile.edit'));

    $this->user->refresh();

    foreach ($links as $key => $value) {
        expect($this->user->$key)->toBe($value);
    }
});

it('requires authentication to update profile links', function () {
    // Log out the user
    auth()->logout();

    $response = $this->patch(route('profile.links'), [
        'github_url' => 'https://github.com/example',
    ]);

    $response->assertRedirect(route('login'));
});

it('validates profile links input', function () {
    $response = from(route('profile.edit'))
        ->patch(route('profile.links'), [
            'github_url' => 'invalid-url',
        ]);

    $response->assertSessionHasErrors('github_url');
});
