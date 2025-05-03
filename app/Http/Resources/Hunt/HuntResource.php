<?php

declare(strict_types=1);

namespace App\Http\Resources\Hunt;

use App\Models\Hunt;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'comments' => [],
            'likes' => 0,
            'views' => 0,
            'shares' => 0,
        ];
    }
}
