<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource;

use App\Filament\Resources\UserResource\Forms\UserForm;
use App\Filament\Resources\UserResource\InfoLists\UserInfoList;
use App\Filament\Resources\UserResource\Pages\UserPages;
use App\Filament\Resources\UserResource\RelationManagers\UserRelations;
use App\Filament\Resources\UserResource\Tables\UserTable;
use App\Models\User;
use Filament\Forms\Form;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables\Table;

final class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $activeNavigationIcon = 'heroicon-s-users';

    /**
     * Get the singular navigation label for the resource.
     */
    public static function getLabel(): string
    {
        return __('User');
    }

    /**
     * Get the plural navigation label for the resource.
     */
    public static function getPluralLabel(): string
    {
        return __('Users');
    }

    /**
     * Get the form for the resource.
     */
    public static function form(Form $form): Form
    {
        return UserForm::make($form);
    }

    /**
     * Get the table for the resource.
     */
    public static function table(Table $table): Table
    {
        return UserTable::make($table);
    }

    /**
     * Get the infolist for the resource.
     */
    public static function infolist(Infolist $infolist): Infolist
    {
        return UserInfoList::make($infolist);
    }

    /**
     * Get the pages for the resource.
     */
    public static function getPages(): array
    {
        return UserPages::make();
    }

    /**
     * Get the relations for the resource.
     */
    public static function getRelations(): array
    {
        return UserRelations::make();
    }
}
