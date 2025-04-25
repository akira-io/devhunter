<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\Forms;

use Akira\FilamentToolKit\Form\Inputs\EmailTextInput;
use Akira\FilamentToolKit\Form\Inputs\NameTextInput;
use Akira\FilamentToolKit\Form\Inputs\PasswordTextInput;
use Filament\Forms\Components\Section;

final class UserFormSchema
{
    /**
     * Get the form schema definition.
     */
    public static function make(): array
    {
        return [
            Section::make()
                ->schema(self::getFormSchema())
                ->columns(),
        ];
    }

    /**
     * Get the form schema definition.
     */
    private static function getFormSchema(): array
    {
        return [
            NameTextInput::make(),
            EmailTextInput::make(),
            PasswordTextInput::make(),
        ];
    }
}
