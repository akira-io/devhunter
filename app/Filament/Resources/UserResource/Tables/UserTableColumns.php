<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\Tables;

use Akira\FilamentToolKit\Table\Columns\Text\CreatedAtTextColumn;
use Akira\FilamentToolKit\Table\Columns\Text\EmailTextColumn;
use Akira\FilamentToolKit\Table\Columns\Text\EmailVerifiedAtTextColumn;
use Akira\FilamentToolKit\Table\Columns\Text\IdTextColumn;
use Akira\FilamentToolKit\Table\Columns\Text\NameTextColumn;
use Akira\FilamentToolKit\Table\Columns\Text\RememberTokenTextColumn;
use Akira\FilamentToolKit\Table\Columns\Text\UpdatedAtTextColumn;

final class UserTableColumns
{
    /**
     * Get the table columns schema definition.
     */
    public static function make(): array
    {
        return [
            IdTextColumn::make(),
            NameTextColumn::make(),
            EmailTextColumn::make(),
            EmailVerifiedAtTextColumn::make(),
            RememberTokenTextColumn::make(),
            CreatedAtTextColumn::make(),
            UpdatedAtTextColumn::make(),
        ];
    }
}
