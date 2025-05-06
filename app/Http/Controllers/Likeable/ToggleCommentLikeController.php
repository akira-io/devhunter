<?php

declare(strict_types=1);

namespace App\Http\Controllers\Likeable;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Spatie\RouteAttributes\Attributes\Post;

final readonly class ToggleCommentLikeController
{
    /**
     * Store a new like for the hunt.
     */
    #[Post('/likeable/comments/{comment}', name: 'comments.toggle-like')]
    public function store(Request $request, Comment $comment): RedirectResponse
    {

        /** @var User $user */
        $user = $request->user();

        $user->toggleLike($comment);

        return to_route('hunts.index');

    }
}
