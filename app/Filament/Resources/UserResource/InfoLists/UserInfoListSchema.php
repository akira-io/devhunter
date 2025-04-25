<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\InfoLists;

use Akira\FilamentToolKit\InfoList\Entries\CreatedAtTextEntry;
use Akira\FilamentToolKit\InfoList\Entries\EmailTextEntry;
use Akira\FilamentToolKit\InfoList\Entries\EmailVerifiedAtTextEntry;
use Akira\FilamentToolKit\InfoList\Entries\IdTextEntry;
use Akira\FilamentToolKit\InfoList\Entries\NameTextEntry;
use Akira\FilamentToolKit\InfoList\Entries\UpdatedAtTextEntry;
use Filament\Infolists\Components\Section;

final class UserInfoListSchema
{
    /**
     * Get the infolist schema definition.
     */
    public static function make(): array
    {
        return [
            self::getInformationSection(),
            self::getTimeStampsSection(),
        ];
    }

    /**
     * Get the information section schema definition.
     */
    private static function getTimeStampsSectionSchema(): array
    {
        return [
            CreatedAtTextEntry::make(),
            UpdatedAtTextEntry::make(),
        ];
    }

    /**
     * Get the information section schema definition.
     */
    private static function getInformationSection(): Section
    {
        return Section::make()
           // ->description(__(' User Information'))
            ->schema(self::getInformationSectionSchema())
            ->columnSpan(3)
            ->columns(3);
    }

    /**
     * Get the information section schema definition.
     */
    private static function getTimeStampsSection(): Section
    {
        return Section::make()
           // ->description(__('Timestamps'))
            ->schema(self::getTimeStampsSectionSchema())
            ->columns(1)
            ->columnSpan(1);
    }

    /**
     * Get the information section schema definition.
     */
    private static function getInformationSectionSchema(): array
    {
        return [
            IdTextEntry::make(),
            NameTextEntry::make(),
            EmailTextEntry::make(),
            EmailVerifiedAtTextEntry::make(),
        ];
    }
}
