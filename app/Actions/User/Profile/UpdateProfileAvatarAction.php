<?php

declare(strict_types=1);

namespace App\Actions\User\Profile;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

final readonly class UpdateProfileAvatarAction
{
    /**
     * Update the user's profile images.
     *
     * @throws FileIsTooBig
     * @throws FileDoesNotExist
     */
    public function handle(User $user, UploadedFile $avatarUrl): void
    {

        $user->clearMediaCollection('profile_avatar');

        $user->addMedia($avatarUrl)
            ->toMediaCollection('profile_avatar');

    }
}
