<?php

declare(strict_types=1);

namespace App\Http\Controllers\Profile;

use App\Http\Requests\Profile\HighlightSkillRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

final readonly class HighlightSkillController
{
    /**
     * Handle highlighting skills for the authenticated user.
     */
    public function __invoke(HighlightSkillRequest $request): RedirectResponse
    {

        type($request->user())->as(User::class)
            ->update(['skills' => $request->array('skills')]);

        return to_route('profile.edit');
    }
}
