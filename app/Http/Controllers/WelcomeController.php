<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

final class WelcomeController extends Controller
{
    public function index()
    {

        return Inertia::render('welcome', [
            'users' => User::get(),
        ]);
    }
}
