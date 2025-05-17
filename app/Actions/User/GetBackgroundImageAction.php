<?php

declare(strict_types=1);

namespace App\Actions\User;

use App\Models\User;

final readonly class GetBackgroundImageAction
{
    /**
     * Get the avatar URL for the user.
     */
    public function handle(User $user): string
    {
        return $user->getMedia('profile_background')->last()?->getUrl() ?? 'https://images.unsplash.com/photo-1746768934151-8c5cb84bcf11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D';

    }
}
