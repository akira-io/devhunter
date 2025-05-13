<?php

declare(strict_types=1);

namespace App\Models;

use Akira\Commentable\Models\Message;
use Akira\Likeable\Concerns\Likeable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;

/**
 * @property-read  User $commenter
 * @property-read  int $id
 * @property-read  string $content
 * @property-read  int $likes_count
 * @property bool $has_liked
 * @property-read  Carbon $created_at
 * @property-read  int $commenter_id
 * @property-read  MorphMany<Model,$this> $likes
 */
final class Comment extends Message
{
    use Likeable;
}
