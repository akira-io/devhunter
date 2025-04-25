<?php

declare(strict_types=1);

use App\Http\Controllers\Profile\AboutController;
use App\Http\Controllers\Profile\HighlightSkillController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('profile')
        ->group(function () {

            Route::post('highlight-skills', HighlightSkillController::class)
                ->name('profile.highlight-skills');

            Route::patch('/about', AboutController::class)
                ->name('profile.about');
        });
});
