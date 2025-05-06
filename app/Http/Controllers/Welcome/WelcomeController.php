<?php

declare(strict_types=1);

namespace App\Http\Controllers\Welcome;

use App\Actions\GetHuntersAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

final readonly class WelcomeController
{
    /**
     * Display  or search for users
     *
     * @throws Throwable
     */
    public function index(Request $request, GetHuntersAction $action): Response
    {
        [$user, $paginator] = $action->handle($request);

        return Inertia::render('welcome', [
            'users' => $user,
            'paginator' => $paginator,
        ]);
    }
}
