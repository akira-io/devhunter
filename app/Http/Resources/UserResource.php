<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin User */
final class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'password' => $this->password,
            'remember_token' => $this->remember_token,
            'created_at' => $this->created_at->format('d-m-Y'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'location' => $this->location,
            'bio' => $this->bio,
            'github_id' => $this->github_id,
            'github_token' => $this->github_token,
            'github_refresh_token' => $this->github_refresh_token,
            'avatar_url' => $this->avatar_url,
        ];
    }
}
