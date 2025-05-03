<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Hunt;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

final readonly class HuntPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any hunts.
     */
    public function viewAny(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the hunt.
     */
    public function view(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update hunts.
     */
    public function update(User $user, Hunt $hunt): bool
    {
        return $user->id === $hunt->owner_id;
    }

    /**
     * Determine whether the user can delete hunts.
     */
    public function delete(User $user, Hunt $hunt): bool
    {
        return $user->id === $hunt->owner_id;
    }
}
