<?php

declare(strict_types=1);

use App\Models\Comment;

return [

    'comment_table' => 'comments',

    'reaction_table' => 'reactions',

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

    'models' => [
        'comment' => Comment::class,
        'reaction' => Akira\Commentable\Models\Reaction::class,
    ],

];
