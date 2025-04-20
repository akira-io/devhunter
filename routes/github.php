<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\GithubAuthController;
use Illuminate\Support\Facades\Route;

Route::controller(GithubAuthController::class)->group(function () {
    Route::get('/auth/github', 'redirect')->name('github.login');
    Route::get('/auth/github/callback', 'callback')->name('github.callback');
});

//    Route::get('/auth/redirect', function () {
//        return Socialite::driver('github')->redirect();
//    })->name('github.login');
//
//    Route::get('/auth/callback', function () {
//        $user = Socialite::driver('github')->user();
//
//        dd($user);
//        // $user->token
//    });
