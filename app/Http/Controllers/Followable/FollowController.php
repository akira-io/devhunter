<?php

declare(strict_types=1);

namespace App\Http\Controllers\Followable;

use Akira\Followable\Exceptions\CannotFollowYourSelfException;
use Akira\Followable\Exceptions\FollowableTraitNotFoundException;
use App\Http\Requests\Feed\FollowRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Post;

#[Middleware('auth')]
final readonly class FollowController
{
    /**
     * Follow a user.
     *
     * @throws CannotFollowYourSelfException|FollowableTraitNotFoundException
     */
    #[Post('followable/follow', name: 'followable.follow')]
    public function __invoke(FollowRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        /** @var User $userToFollow */
        $userToFollow = User::query()->find($request->validated('user_id'));

        $user->follow($userToFollow);

        return back();

    }
}
