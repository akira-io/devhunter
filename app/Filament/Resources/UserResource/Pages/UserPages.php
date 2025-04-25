<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\Pages;

final class UserPages
{
    /**
     * Get the page schema definition.
     */
    public static function make(): array
    {
        return [
            'index' => ListUsers::route('/'),
            'create' => CreateUser::route('/create'),
            'view' => ViewUser::route('/{record}'),
            'edit' => EditUser::route('/{record}/edit'),

        ];
    }
}
