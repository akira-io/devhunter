<?php

declare(strict_types=1);

namespace App\Http\Controllers\Likeable;

use App\Models\Hunt;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Post;

#[Middleware(['auth', 'verified'])]
final readonly class ToggleHuntLikeController
{
    /**
     * Store a new like for the hunt.
     */
    #[Post('/likeable/{hunt}', name: 'hunts.toggle-like')]
    public function store(Request $request, Hunt $hunt): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $user->toggleLike($hunt);

        return to_route('hunts.index');

    }
}
