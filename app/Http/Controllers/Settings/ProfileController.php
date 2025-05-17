<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Enums\SkillsEnum;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

final readonly class ProfileController
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user = type($request->user())->as(User::class);

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'skills' => SkillsEnum::get(),
            'highlightedSkills' => $user->skills,
            'academicBackgrounds' => $user->academicBackgrounds,
            'followers' => $user->followers()->count(),
            'followings' => $user->followings()->count(),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        $user = type($request->user())->as(User::class);

        if ($request->hasFile('avatar_url')) {
            $user->clearMediaCollection('profile_avatar');
            $user->addMedia($request->validated('avatar_url'))
                ->toMediaCollection('profile_avatar');
        }

        if ($request->hasFile('background_image_url')) {
            $user->clearMediaCollection('profile_background');
            $user->addMedia($request->validated('background_image_url'))
                ->toMediaCollection('profile_background');
        }

        $user->fill($request->except('avatar_url', 'background_image_url'));

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return back();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = type($request->user())->as(User::class);

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
