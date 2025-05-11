<?php

declare(strict_types=1);

namespace App\Actions\Followable;

use Akira\Followable\Exceptions\FollowableTraitNotFoundException;
use App\Models\User;

final class GetHuntingsAction
{
    /**
     * Get the huntings of the authenticated user.
     *
     * @throws FollowableTraitNotFoundException
     */
    public function handle(User $user)
    {
        return $user->followings()
            ->with(['followable'])
            ->paginate()->map(function ($followable) {
                return $followable->followable;
            })
            ->filter()
            ->values();
    }
}
