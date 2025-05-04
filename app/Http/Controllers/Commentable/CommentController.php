<?php

declare(strict_types=1);

namespace App\Http\Controllers\Commentable;

use App\Http\Requests\Commentable\StoreCommentRequest;
use App\Models\Hunt;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Post;
use Spatie\RouteAttributes\Attributes\Prefix;

#[Middleware(['auth', 'verified'])]
#[Prefix('commentable')]
final class CommentController
{
    /**
     * Store a new comment for the hunt.
     */
    #[Post('/hunts/{hunt}', name: 'hunts.comment')]
    public function store(StoreCommentRequest $request, Hunt $hunt): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $user->comment($hunt, $request->validated('content'));

        return to_route('hunts.index');
    }
}
