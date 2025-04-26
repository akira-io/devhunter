<?php

declare(strict_types=1);

namespace App\Http\Controllers\Welcome;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Storage;
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

        dd(Storage::get('LensHood.pdf'));
        $query = $request->string('q');

        $users = $query->isNotEmpty()
            ? User::search($query->value())->paginate(20)->withQueryString()
            : User::query()->inRandomOrder()->paginate(20)->withQueryString();

        return Inertia::render('welcome', [
            'users' => $users,
        ]);
    }
}
