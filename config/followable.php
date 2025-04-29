<?php

declare(strict_types=1);

use Akira\Followable\Followable;

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
    | This is the name of the foreign key column in the followables table that
    | will reference the user model. By default, it is set to 'user_id'.
    |
    */
    'user_foreign_key' => 'user_id',

    /*
    |--------------------------------------------------------------------------
    | Followables Table Name
    |--------------------------------------------------------------------------
    |
    | This is the name of the table that will store the follower relationships.
    | The default value is 'followables', but you can change it to any name you prefer.
    |
    */
    'followables_table' => 'followables',

    /*
    |--------------------------------------------------------------------------
    | Followables Model Class
    |--------------------------------------------------------------------------
    |
    | This is the fully qualified class name for the followables model. By default,
    | it points to the \Overtrue\LaravelFollow\Followable model, but you can
    | change it to a custom model if needed.
    |
    */
    'followables_model' => Followable::class,
];
