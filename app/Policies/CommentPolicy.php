<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

final readonly class CommentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any comments.
     */
    public function viewAny(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the comment.
     */
    public function view(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update comments.
     */
    public function update(User $user, Comment $comment): bool
    {
        return $user->id === $comment->commenter->id;
    }

    /**
     * Determine whether the user can delete comments.
     */
    public function delete(User $user, Comment $comment): bool
    {
        return $user->id === $comment->commenter->id;
    }
}
