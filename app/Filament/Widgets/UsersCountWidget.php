<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

final class UsersCountWidget extends BaseWidget
{
    /**
     *Get the stats for the widget.
     */
    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::query()->count())
                ->label('Total Users')
                ->icon('heroicon-o-users')
                ->color('primary'),
        ];
    }
}
