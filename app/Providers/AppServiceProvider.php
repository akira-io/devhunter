<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureCommands();
        $this->configureModels();
        $this->configureUrl();
        $this->configureDates();
        $this->configurePulse();

    }

    /**
     * Configure the Artisan commands provided by your application.
     */
    private function configureCommands(): void
    {

        DB::prohibitDestructiveCommands(
            app()->isProduction()
        );
    }

    /**
     * Configure the Eloquent models.
     */
    private function configureModels(): void
    {

        Model::shouldBeStrict();
        Model::automaticallyEagerLoadRelationships();
    }

    /**
     * Configure the URL generator.
     */
    private function configureUrl(): void
    {

        URL::forceScheme('https');
    }

    /**
     * Configure the application's dates.
     */
    private function configureDates(): void
    {

        Date::use(CarbonImmutable::class);
    }

    /**
     * Configure the application's pulse.
     */
    private function configurePulse(): void
    {
        Gate::define('viewPulse', fn (User $user) => Str::contains($user->email, ['@akira-io.com', 'kidiatoliny']));

    }
}
