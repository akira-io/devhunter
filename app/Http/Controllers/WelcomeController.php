<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

final readonly class WelcomeController
{
    /**
     * Display the welcome page.
     */
    public function index(): Response
    {

        return Inertia::render('welcome', [
            'users' => User::query()->paginate(20),
        ]);
    }
}
