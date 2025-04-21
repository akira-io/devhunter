<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\ValueObjects\GithubUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

final class GithubAuthController
{
    /**
     * Redirect the user to the GitHub authentication page.
     */
    public function redirect(): RedirectResponse|\Symfony\Component\HttpFoundation\RedirectResponse
    {

        return Socialite::driver('github')
            ->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     */
    public function callback(): RedirectResponse
    {
        /** @var \Laravel\Socialite\Two\User $githubUser */
        $githubUser = Socialite::driver('github')
            ->user();

        $user = User::query()
            ->updateOrCreate(
                ['github_id' => $githubUser->getId()],
                GithubUser::from(user: $githubUser)->toArray(),
            );

        Auth::login($user, true);

        return to_route('feed');
    }
}
