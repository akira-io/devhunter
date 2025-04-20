<?php

declare(strict_types=1);

namespace App\ValueObjects;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Str;
use Laravel\Socialite\Contracts\User;

final class GithubUser implements Arrayable
{
    public function __construct(public User $user) {}

    public function toArray(): array
    {
        return [
            'name' => $this->user->getName() ?? $this->user->getNickname(),
            'email' => $this->user->getEmail() ?? $this->user->user['notification_email'],
            'github_user_name' => $this->user->user['login'] ?? null,
            'avatar_url' => $this->user->getAvatar(),
            'github_id' => $this->user->getId(),
            'github_token' => $this->user->token,
            'github_refresh_token' => $this->user->refreshToken,
            'email_verified_at' => now(),
            'location' => $this->user->user['location'] ?? null,
            'bio' => $this->user->user['bio'] ?? null,
            'password' => bcrypt(Str::random(32)),
        ];
    }
}
