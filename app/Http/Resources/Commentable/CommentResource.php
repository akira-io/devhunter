<?php

declare(strict_types=1);

namespace App\Http\Resources\Commentable;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Comment */
final class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'content' => $this->content,
            'likes_count' => $this->likesCount(),
            'has_liked' => $this->has_liked,
            'created_at' => $this->created_at->diffForHumans(),
            'commenter' => [
                'id' => $this->commenter_id,
                'name' => $this->commenter->name,
                'avatar_url' => $this->commenter->avatar_url,
            ],
        ];
    }
}
