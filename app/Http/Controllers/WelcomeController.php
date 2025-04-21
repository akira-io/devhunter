<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

final readonly class WelcomeController
{
    /**
     * Display the welcome page.
     *
     * @throws Throwable
     */
    public function index(): Response
    {
        //        dd(User::query()->inRandomOrder()->paginate(20)->toResourceCollection());

        return Inertia::render('welcome', [
            'users' => User::query()->inRandomOrder()->paginate(20),
        ]);
    }
}
