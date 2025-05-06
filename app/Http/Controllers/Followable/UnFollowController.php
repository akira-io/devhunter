<?php

declare(strict_types=1);

namespace App\Http\Controllers\Followable;

use Akira\Followable\Exceptions\FollowableTraitNotFoundException;
use App\Http\Requests\Feed\FollowRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Post;

#[Middleware(['auth', 'verified'])]
final readonly class UnFollowController
{
    /**
     * Unfollow a user.
     *
     * @throws FollowableTraitNotFoundException
     */
    #[Post('followable/unfollow', name: 'followable.unfollow')]
    public function __invoke(FollowRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        /** @var User $userToUnFollow */
        $userToUnFollow = User::query()->find($request->validated('user_id'));

        $user->unfollow($userToUnFollow);

        return back();

    }
}
