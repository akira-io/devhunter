<?php

declare(strict_types=1);

namespace App\Models;

use Akira\Commentable\Concerns\Commentable;
use Akira\Commentable\Models\Comment;
use Akira\Likeable\Concerns\Likeable;
use Database\Factories\HuntFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;

/**
 * The Hunt model.
 *
 * @property-read  string $id
 * @property-read  int $owner_id
 * @property-read  string $content
 * @property-read  bool $is_reported
 * @property-read  bool $is_pinned
 * @property-read  bool $is_ignored
 * @property-read  Carbon $created_at
 * @property-read  Carbon $updated_at
 * @property-read  bool $has_likes
 * @property-read  User $owner
 * @property MorphMany<Comment, $this> $comments
 * @property-read int $likes_count
 * @property-read bool $has_liked
 */
final class Hunt extends Model
{
    use Commentable;

    /** @use HasFactory<HuntFactory> */
    use HasFactory;

    use HasUuids;
    use Likeable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable
        = [
            'owner_id',
            'content',
            'is_reported',
            'is_pinned',
            'is_ignored',
        ];

    /**
     * The hunt's owner.
     *
     * @return BelongsTo<User, $this>
     */
    public function owner(): BelongsTo
    {

        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Format the created_at date to a human-readable format.
     */
    public function toHumanDate(): Attribute
    {
        return Attribute::make(
            get: fn (string $value): string => $this->created_at->diffForHumans(),
        );
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {

        return [
            'is_reported' => 'boolean',
            'is_pinned' => 'boolean',
            'is_ignored' => 'boolean',
            'created_at' => 'datetime',
        ];
    }
}
