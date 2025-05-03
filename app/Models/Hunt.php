<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\HuntFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Hunt extends Model
{
    /** @use HasFactory<HuntFactory> */
    use HasFactory;

    use HasUuids;

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
     * @return BelongsTo<User, Hunt>
     */
    public function owner(): BelongsTo
    {

        return $this->belongsTo(User::class, 'owner_id');
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
        ];
    }
}
