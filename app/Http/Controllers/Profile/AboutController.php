<?php

declare(strict_types=1);

namespace App\Http\Controllers\Profile;

use App\Http\Requests\Profile\AboutRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

final readonly class AboutController
{
    /**
     * Update the user's bio.
     */
    public function __invoke(AboutRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $user->update([
            'bio' => $request->input('bio'),
        ]);

        return to_route('profile.edit');
    }
}
