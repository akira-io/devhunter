<?php

declare(strict_types=1);

namespace App\Actions\User\Profile;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

final readonly class UpdateProfileBackgroundAction
{
    /**
     * Update the user's profile images.
     *
     * @throws FileIsTooBig
     * @throws FileDoesNotExist
     */
    public function handle(User $user, UploadedFile $backgroundUrl): void
    {
        $user->clearMediaCollection('profile_background');

        $user->addMedia($backgroundUrl)
            ->toMediaCollection('profile_background');

    }
}
