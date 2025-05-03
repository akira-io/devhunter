<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

final readonly class EmailVerificationNotificationController
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = type($request->user())->as(User::class);
        if ($user->hasVerifiedEmail()) {
            return redirect()->intended(route('hunts.index', absolute: false));
        }

        $user->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    }
}
