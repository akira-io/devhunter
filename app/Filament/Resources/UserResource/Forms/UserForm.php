<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\Forms;

use Filament\Forms\Form;

final class UserForm
{
    /**
     * Make the form.
     */
    public static function make(Form $form): Form
    {
        return $form
            ->schema(UserFormSchema::make());
    }
}
