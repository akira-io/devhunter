<?php

declare(strict_types=1);

namespace App\Http\Controllers\Followable;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;
use Spatie\RouteAttributes\Attributes\Get;
use Spatie\RouteAttributes\Attributes\Middleware;

#[Middleware('auth')]
final readonly class FollowerController
{
    /**
     * Display the followers of the authenticated user.
     */
    #[Get('followable/followers', name: 'followable.followers')]
    public function __invoke(Request $request): Response|ResponseFactory
    {

        /*** @var User $user */
        $user = $request->user();

        return inertia('followable/followers', [
            'followers' => type($user)->as(User::class)->followers()->with(['followables'])->get(),
        ]);
    }
}
