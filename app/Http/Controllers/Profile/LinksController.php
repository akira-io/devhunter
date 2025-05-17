<?php

declare(strict_types=1);

namespace App\Http\Controllers\Profile;

use App\Http\Requests\Profile\ProfileLinkRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Patch;

#[Middleware(['auth', 'verified'])]
final readonly class LinksController
{
    /**
     * Display the user's profile links.
     */
    #[Patch('/profile/links', name: 'profile.links')]
    public function __invoke(ProfileLinkRequest $request): RedirectResponse
    {
        type($request->user())->as(User::class)
            ->update((array) $request->validated());

        return to_route('profile.edit');
    }
}
