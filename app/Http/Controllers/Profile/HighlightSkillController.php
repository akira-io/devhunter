<?php

declare(strict_types=1);

namespace App\Http\Controllers\Profile;

use App\Http\Requests\Profile\HighlightSkillRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Post;

#[Middleware(['auth', 'verified'])]
final readonly class HighlightSkillController
{
    /**
     * Handle highlighting skills for the authenticated user.
     */
    #[Post('profile/highlight-skills', name: 'profile.highlight-skills')]
    public function __invoke(HighlightSkillRequest $request): RedirectResponse
    {
        type($request->user())->as(User::class)
            ->update(['skills' => $request->array('skills')]);

        return to_route('profile.edit');
    }
}
