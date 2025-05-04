<?php

declare(strict_types=1);

namespace App\Http\Controllers\Commentable;

use Akira\Commentable\Exceptions\DeleteCommentNotAllowedException;
use App\Http\Requests\Commentable\DeleteCommentRequest;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Delete;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Prefix;

#[Middleware(['auth', 'verified'])]
#[Prefix('commentable/comments')]
final class DestroyCommentController
{
    /**
     * Store a new comment for the hunt.
     *
     * @throws DeleteCommentNotAllowedException
     */
    #[Delete('{comment}', name: 'comments.destroy')]
    public function destroy(DeleteCommentRequest $request, Comment $comment): RedirectResponse
    {

        /** @var User $user */
        $user = $request->user();

        $user->deleteComment($comment);

        return to_route('hunts.index');
    }
}
