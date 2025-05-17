<?php

declare(strict_types=1);

namespace App\ValueObjects;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Two\User;

// use Laravel\Socialite\Contracts\User as SocialiteUser;

final readonly class GithubUser
{
    /**
     * The GithubUser value object.
     */
    public function __construct(public User $user) {}

    /**
     * Create a new instance of the GithubUser value object.
     */
    public static function from(User $user): self
    {
        return resolve(self::class, [
            'user' => $user,
        ]);
    }

    /**
     * Convert the GithubUser value object to an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $raw = $this->user->getRaw();

        return [
            'name' => $this->user->getName() ?? $this->user->getNickname(),
            'email' => $this->user->getEmail() ?? ($raw['notification_email'] ?? $this->generateFakeEmail()),
            'user_name' => $raw['login'] ?? null,
            'avatar_url' => $this->user->getAvatar(),
            'github_id' => $this->user->getId(),
            'github_token' => $this->user->token,
            'github_refresh_token' => $this->user->refreshToken,
            'email_verified_at' => now(),
            'location' => $raw['location'] ?? null,
            'bio' => $raw['bio'] ?? null,
            'password' => Hash::make(Str::random(32)),
            'github_url' => $raw['html_url'] ?? null,
        ];
    }

    /**
     * Generate a fake unique email.
     */
    private function generateFakeEmail(): string
    {

        return 'private'.Str::random(32).time().'@'.'devhunter.cv';

    }
}
