<?php

declare(strict_types=1);

namespace App\Http\Resources\Commentable;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class CommentResource extends JsonResource
{
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
