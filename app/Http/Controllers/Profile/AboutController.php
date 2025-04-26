<?php

declare(strict_types=1);

namespace App\Http\Controllers\Profile;

use App\Http\Requests\Profile\AboutRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Patch;

#[Middleware(['auth'])]
final readonly class AboutController
{
    /**
     * Update the user's bio.
     */
    #[Patch('profile/about', name: 'profile.about')]
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
