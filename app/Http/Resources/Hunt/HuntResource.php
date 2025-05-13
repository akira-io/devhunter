<?php

declare(strict_types=1);

namespace App\Http\Resources\Hunt;

use App\Http\Resources\Commentable\CommentResource;
use App\Models\Comment;
use App\Models\Hunt;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;

/** @mixin Hunt */
final class HuntResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $request->user();

        return [
            'id' => $this->id,
            'content' => $this->content,
            'is_reported' => $this->is_reported,
            'is_pinned' => $this->is_pinned,
            'is_ignored' => $this->is_ignored,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            'owner' => $this->owner,
            'image_url' => null,
            'comments' => CommentResource::collection($this->commentsWithHasLiked()),
            'likes_count' => $this->likesCount(),
            'views' => 0,
            'shares' => 0,
            'has_liked' => $this->has_liked,
        ];

    }

    /**
     * Get the comments with the has_liked status.
     */
    public function commentsWithHasLiked(): Collection
    {
        /** @var User $user */
        $user = request()->user();

        return collect($this->comments)->map(function (Comment $comment) use ($user): Comment {
            $comment->has_liked = $comment->likes->contains('user_id', $user->id);

            return $comment;
        })->sortByDesc('created_at');
    }
}
