<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Spatie\RouteAttributes\Attributes\Get;

final class GoogleAuthController
{
    /**
     * Redirect the user to the GitHub authentication page.
     */
    #[Get('/auth/google', name: 'google.login')]
    public function redirect(): RedirectResponse|\Symfony\Component\HttpFoundation\RedirectResponse
    {

        return Socialite::driver('google')
            ->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     */
    #[Get('/auth/google/callback', name: 'google.callback')]
    public function callback(): RedirectResponse
    {
        /** @var \Laravel\Socialite\Two\User $googleUser */
        $googleUser = Socialite::driver('google')->user();

        $user = User::firstOrCreate(
            [
                'email' => $googleUser->getEmail(),
            ],
            [
                'name' => $googleUser->getName(),
                'avatar_url' => $googleUser->getAvatar(),
                'password' => bcrypt(str()->random(16)),
                'email_verified_at' => now(),
            ]
        );

        Auth::login($user, remember: true);

        return to_route('hunts.index');
    }
}
