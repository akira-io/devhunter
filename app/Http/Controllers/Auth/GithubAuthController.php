<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\ValueObjects\GithubUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Spatie\RouteAttributes\Attributes\Get;

final class GithubAuthController
{
    // Route::get('/auth/github', 'redirect')->name('github.login');
    // Route::get('/auth/github/callback', 'callback')->name('github.callback');
    /**
     * Redirect the user to the GitHub authentication page.
     */
    #[Get('/auth/github', name: 'github.login')]
    public function redirect(): RedirectResponse|\Symfony\Component\HttpFoundation\RedirectResponse
    {

        return Socialite::driver('github')
            ->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     */
    #[Get('/auth/github/callback', name: 'github.callback')]
    public function callback(): RedirectResponse
    {
        /** @var \Laravel\Socialite\Two\User $githubUser */
        $githubUser = Socialite::driver('github')
            ->user();

        $user = User::query()
            ->firstOrCreate(
                ['github_id' => $githubUser->getId()],
                GithubUser::from(user: $githubUser)->toArray(),
            );

        Auth::login($user, true);

        return to_route('feed');
    }
}
