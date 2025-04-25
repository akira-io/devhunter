<?php

declare(strict_types=1);

use App\ValueObjects\GithubUser;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Two\User;

it('has from and toArray methods', function () {
    expect(method_exists(GithubUser::class, 'from'))->toBeTrue()
        ->and(method_exists(GithubUser::class, 'toArray'))->toBeTrue();
});

it('can be instantiated using from()', function () {
    $user = new User();
    $githubUser = GithubUser::from($user);

    expect($githubUser)->toBeInstanceOf(GithubUser::class);
});

it('returns correct structure from toArray', function () {
    Hash::shouldReceive('make')->andReturn('mocked_hashed_password');

    $raw = [
        'notification_email' => 'github@example.com',
        'login' => 'githubuser',
        'token' => 'token123',
        'refresh_token' => 'refresh123',
        'location' => 'Earth',
        'bio' => 'Just a dev',
        'name' => 'githubuser',
    ];

    $user = (new User())->setRaw($raw);

    $user->map([
        'id' => 123,
        'nickname' => 'gitnick',
        'name' => null,
        'email' => null,
        'avatar' => 'https://avatars.githubusercontent.com/u/123?v=4',
    ]);

    $githubUser = GithubUser::from($user);

    $array = $githubUser->toArray();

    expect($array)->toMatchArray([
        'name' => 'gitnick',
        'email' => 'github@example.com',
        'github_user_name' => 'githubuser',
        'avatar_url' => 'https://avatars.githubusercontent.com/u/123?v=4',
        'github_id' => 123,
        'github_token' => 'token123',
        'github_refresh_token' => 'refresh123',
        'email_verified_at' => now()->toDateTimeString(),
        'location' => 'Earth',
        'bio' => 'Just a dev',
        'password' => 'mocked_hashed_password',
    ]);
});

it(/**
 * @throws ReflectionException
 */ /**
 * @throws ReflectionException
 */ 'generates a unique fake email with correct format', function () {

    $socialiteUserMock = Mockery::mock(User::class);

    $githubUser = new GithubUser($socialiteUserMock);

    $reflection = new ReflectionClass($githubUser);
    $method = $reflection->getMethod('generateFakeEmail');

    $email1 = $method->invoke($githubUser);
    $email2 = $method->invoke($githubUser);

    expect($email1)->toBeString()
        ->and($email1)->toStartWith('private')
        ->and($email1)->toEndWith('@devhunter.cv')
        ->and($email1)->not->toBe($email2); // Verifica unicidade
});
