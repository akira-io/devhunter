<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Pan\PanConfiguration;

final class PanServiceProvider extends ServiceProvider
{
    /**
     * Register the application's Pan configuration.
     */
    public function register(): void
    {
        PanConfiguration::allowedAnalytics([
            'onbording-profile',
        ]);

        PanConfiguration::unlimitedAnalytics();
    }
}
