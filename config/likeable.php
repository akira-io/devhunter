<?php

declare(strict_types=1);

use Akira\Likeable\Likeable;

return [

    /*
    |--------------------------------------------------------------------------
    | UUIDs Primary Key
    |--------------------------------------------------------------------------
    |
    | If set to true, UUIDs will be used as the primary key for your models.
    | By default, it is set to false, meaning auto-incrementing integers are used.
    |
    */
    'uuids' => false,

    /*
    |--------------------------------------------------------------------------
    | User Foreign Key
    |--------------------------------------------------------------------------
    |
    | This is the name of the foreign key column in the likeable table that
    | will reference the user model. By default, it is set to 'user_id'.
    |
    */
    'user_foreign_key' => 'user_id',

    /*
    |--------------------------------------------------------------------------
    | Likeable Table Name
    |--------------------------------------------------------------------------
    |
    | This is the name of the table that will store the follower relationships.
    | The default value is 'likeable', but you can change it to any name you prefer.
    |
    */
    'table' => 'likeables',

    /*
    |--------------------------------------------------------------------------
    | Likeable Model Class
    |--------------------------------------------------------------------------
    |
    | This is the fully qualified class name for the likeable model. By default,
    | it points to the Akira\Likeable\Likeable model, but you can
    | change it to a custom model if needed.
    |
    */
    'model' => Likeable::class,

];
