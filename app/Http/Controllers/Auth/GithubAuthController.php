<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\ValueObjects\GithubUser;
use Auth;
use Laravel\Socialite\Facades\Socialite;

final class GithubAuthController extends Controller
{
    public function redirect()
    {

        return Socialite::driver('github')
            ->scopes(['read:user', 'public_repo'])
            ->redirect();
    }

    public function callback()
    {
        $githubUser = Socialite::driver('github')
            ->user();

        $user = User::updateOrCreate(
            ['github_id' => $githubUser->getId()],
            (new GithubUser($githubUser))->toArray(),
        );

        Auth::login($user, true);

        return to_route('feed');
    }
}
