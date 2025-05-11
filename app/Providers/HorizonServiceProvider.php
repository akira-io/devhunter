<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Laravel\Horizon\Horizon;
use Laravel\Horizon\HorizonApplicationServiceProvider;

final class HorizonServiceProvider extends HorizonApplicationServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        parent::boot();
        $this->gate();
        // Horizon::routeSmsNotificationsTo('15556667777');
        Horizon::routeMailNotificationsTo('kidiatoliny@akira-io.com');
        // Horizon::routeSlackNotificationsTo('slack-webhook-url', '#channel');
    }

    /**
     * Register the Horizon gate.
     *
     * This gate determines who can access Horizon in non-local environments.
     */
    protected function gate(): void
    {
        Gate::define('viewHorizon', fn (User $user): bool => in_array($user->email, [
            'kidiatoliny@akira-io.com',
            'kidiatoliny@gmail.com',
        ]));
    }
}
