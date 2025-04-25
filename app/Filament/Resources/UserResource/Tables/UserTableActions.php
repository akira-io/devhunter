<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\Tables;

use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\RestoreAction;
use Filament\Tables\Actions\ViewAction;

final class UserTableActions
{
    /**
     * Get the table actions schema definition.
     */
    public static function make(): array
    {
        return [
            ViewAction::make(),
            EditAction::make(),
            DeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
