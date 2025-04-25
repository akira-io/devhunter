<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\InfoLists;

use Filament\Infolists\Infolist;

final class UserInfoList
{
    /**
     * Make the infolist.
     */
    public static function make(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema(UserInfoListSchema::make())
            ->columns(4);
    }
}
