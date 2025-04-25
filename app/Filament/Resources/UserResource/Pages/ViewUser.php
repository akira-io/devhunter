<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource\Actions\Pages\UserEditHeaderAction;
use App\Filament\Resources\UserResource\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

final class ViewUser extends ViewRecord
{
    protected static string $resource = UserResource::class;

    /**
     * Get the header actions for the page.
     */
    protected function getHeaderActions(): array
    {
        return [
            UserEditHeaderAction::make(),
        ];
    }
}
