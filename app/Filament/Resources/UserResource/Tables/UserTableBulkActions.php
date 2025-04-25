<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\Tables;

use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\RestoreBulkAction;

final class UserTableBulkActions
{
    /**
     * Get the table bulk actions schema definition.
     */
    public static function make(): array
    {
        return [
            BulkActionGroup::make([
                DeleteBulkAction::make(),
                RestoreBulkAction::make(),
            ]),
        ];
    }
}
