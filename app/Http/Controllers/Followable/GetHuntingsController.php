<?php

declare(strict_types=1);

namespace App\Http\Controllers\Followable;

use Akira\Followable\Exceptions\FollowableTraitNotFoundException;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;
use Spatie\RouteAttributes\Attributes\Get;
use Spatie\RouteAttributes\Attributes\Middleware;

#[Middleware(['auth', 'verified'])]
final readonly class GetHuntingsController
{
    /**
     * Display the followings of the authenticated user.
     *
     * @throws FollowableTraitNotFoundException
     */
    #[Get('followable/followings', name: 'followable.followings')]
    public function __invoke(Request $request): Response|ResponseFactory
    {
        /*** @var User $user */
        $user = type($request->user())->as(User::class);
        $followings = $user->followings()->with(['followable'])->paginate(20);

        return inertia('followable/huntings', [
            'followings' => $user->attachFollowStatus($followings),
        ]);
    }
}
