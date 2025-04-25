<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\Tables;

use Filament\Tables\Table;

final class UserTable
{
    /**
     * Get the table schema definition.
     */
    public static function make(Table $table): Table
    {
        return $table
            ->columns(UserTableColumns::make())
            ->filters(UserTableFilters::make())
            ->actions(UserTableActions::make())
            ->bulkActions(UserTableBulkActions::make());
    }
}
