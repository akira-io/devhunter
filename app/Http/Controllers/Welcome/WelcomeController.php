<?php

declare(strict_types=1);

namespace App\Http\Controllers\Welcome;

use App\Models\User;
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
    public function index(Request $request): Response
    {
        $query = $request->string('q');

        $usersQuery = $query->isNotEmpty()
            ? User::search($query->value())
            : User::query()->inRandomOrder();

        $users = $usersQuery->paginate(20)->withQueryString();

        // @phpstan-ignore-next-line
        $users->load(['professionalEducations']);

        return Inertia::render('welcome', [
            'users' => $users,
        ]);
    }
}
