<?php

declare(strict_types=1);

namespace Tests\Fixtures;

use Laravel\Socialite\Contracts\Factory as SocialiteFactory;
use Laravel\Socialite\Contracts\Provider;
use Laravel\Socialite\Two\User as SocialiteUser;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;

final class TestSocialiteFactory implements SocialiteFactory
{
    private $user;

    private $redirectUrl;

    public function __construct(?SocialiteUser $user = null, ?string $redirectUrl = null)
    {
        $this->user = $user;
        $this->redirectUrl = $redirectUrl ?? 'https://accounts.google.com/o/oauth2/auth';
    }

    public function driver($driver = null)
    {
        return new class($this->user, $this->redirectUrl) implements Provider
        {
            private $user;

            private $redirectUrl;

            public function __construct(?SocialiteUser $user, string $redirectUrl)
            {
                $this->user = $user;
                $this->redirectUrl = $redirectUrl;
            }

            public function redirect()
            {
                return new SymfonyRedirectResponse($this->redirectUrl);
            }

            public function user()
            {
                return $this->user;
            }

            // Implement other required methods with empty implementations
            public function with(array $parameters)
            {
                return $this;
            }

            public function scopes(array $scopes)
            {
                return $this;
            }

            public function setScopes(array $scopes)
            {
                return $this;
            }

            public function scope(array $scopes)
            {
                return $this;
            }

            public function fields(array $fields)
            {
                return $this;
            }

            public function stateless()
            {
                return $this;
            }
        };
    }
}
