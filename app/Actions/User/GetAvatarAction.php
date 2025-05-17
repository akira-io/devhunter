<?php

declare(strict_types=1);

namespace App\Actions\User;

use App\Models\User;

final readonly class GetAvatarAction
{
    /**
     * Get the avatar URL for the user.
     */
    public function handle(User $user): ?string
    {
        return $user->getMedia('profile_avatar')->last()?->getUrl() ?? $user->avatar_url;

    }
}
