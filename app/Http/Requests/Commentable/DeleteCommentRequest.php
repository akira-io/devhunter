<?php

declare(strict_types=1);

namespace App\Http\Requests\Commentable;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

final class DeleteCommentRequest extends FormRequest
{
    /**
     * Rules for the request.
     *
     * @return array<string, array<string>>
     */
    public function rules(): array
    {

        return [
            //
        ];
    }

    /**
     * Authorize the request.
     */
    public function authorize(): bool
    {

        $user = type($this->user())->as(User::class);

        return (bool) $user->can('delete', $this->route('comment'));
    }

    /**
     * Delete the comment.
     */
    public function destroy(Comment $comment): ?bool
    {
        return $comment->delete();
    }
}
