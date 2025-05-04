<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Hunt\CreateHuntRequest;
use App\Http\Requests\Hunt\DeleteHuntRequest;
use App\Http\Resources\Hunt\HuntResource;
use App\Models\Hunt;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Delete;
use Spatie\RouteAttributes\Attributes\Get;
use Spatie\RouteAttributes\Attributes\Middleware;
use Spatie\RouteAttributes\Attributes\Post;
use Spatie\RouteAttributes\Attributes\Prefix;

#[Middleware(['auth', 'verified'])]

#[Prefix('hunts')]
final readonly class HuntController
{
    /**
     * Display the hunt line.
     */
    #[Get(uri: '/', name: 'hunts.index')]
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $hunts = Hunt::query()
            ->latest()
            ->paginate();

        return Inertia::render('hunts/hunts', [
            'hunts' => HuntResource::collection($user->attachLikeStatus($hunts)),
        ]);
    }

    /**
     * Store a new hunt.
     */
    #[Post(uri: '/', name: 'hunts.store')]
    public function store(CreateHuntRequest $request): RedirectResponse
    {
        $request->store();

        return to_route('hunts.index');
    }

    /**
     * Delete a hunt.
     */
    #[Delete(uri: '/{hunt}', name: 'hunts.destroy')]
    public function destroy(DeleteHuntRequest $request, Hunt $hunt): RedirectResponse
    {
        $request->destroy($hunt);

        return to_route('hunts.index');
    }
}
