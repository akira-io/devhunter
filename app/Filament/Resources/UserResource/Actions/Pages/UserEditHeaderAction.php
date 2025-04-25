<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\Actions\Pages;

use App\Filament\Resources\UserResource\Forms\UserForm;
use Filament\Actions\EditAction;
use Filament\Forms\Form;

final class UserEditHeaderAction
{
    /**
     * Edit action for the User model.
     */
    public static function make(): EditAction
    {
        return EditAction::make()
            ->form(fn (Form $form): Form => UserForm::make($form)
                ->columns());
    }
}
