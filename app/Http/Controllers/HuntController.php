<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Hunt\CreateHuntRequest;
use Inertia\Inertia;
use Spatie\RouteAttributes\Attributes\Get;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Post;

#[Middleware(['auth', 'verified'])]
final class HuntController
{
    /**
     * Display the hunt line.
     */
    #[Get(uri: '/hunt-line', name: 'hunts.index')]
    public function index()
    {

        return Inertia::render('hunt-line');
    }

    /**
     * Store a new hunt.
     */
    #[Post(uri: '/hunt-line', name: 'hunts.store')]
    public function store(CreateHuntRequest $request)
    {
        $request->store();

        return to_route('hunts.index');
    }
}
