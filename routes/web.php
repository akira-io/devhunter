<?php

declare(strict_types=1);

use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('feed', function () {
        return Inertia::render('feed');
    })->name('feed');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/github.php';
require __DIR__.'/profile.php';
