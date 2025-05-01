<?php

declare(strict_types=1);

use App\Http\Controllers\Welcome\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('hunt-line', function () {
        return Inertia::render('hunt-line');
    })->name('hunt-line');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
