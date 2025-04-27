<?php

declare(strict_types=1);

namespace App\Http\Controllers\Profile;

use App\Http\Requests\Profile\ProfessionalEducationRequest;
use App\Models\ProfessionalEducation;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Spatie\RouteAttributes\Attributes\Delete;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Post;

#[Middleware('auth')]
final readonly class ProfessionalEducationController
{
    /**
     * Store the user's professional education.
     */
    #[Post('/profile/education', name: 'profile.education')]
    public function store(ProfessionalEducationRequest $request): RedirectResponse
    {

        $user = type($request->user())->as(User::class);

        $user->professionalEducations()->create((array) $request->validated());

        return to_route('profile.edit');
    }

    /**
     * Delete the user's professional education.
     */
    #[Delete('/profile/education/{professionalEducation}', name: 'profile.education.delete')]
    public function destroy(ProfessionalEducation $professionalEducation): RedirectResponse
    {
        $professionalEducation->delete();

        return to_route('profile.edit');
    }
}
