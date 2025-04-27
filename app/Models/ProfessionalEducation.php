<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class ProfessionalEducation extends Model
{
    use HasFactory;

    protected $fillable
        = [
            'user_id',
            'degree',
            'field_of_study',
            'start_date',
            'end_date',
            'institution',

        ];

    /**
     * Return the user that owns the professional education.
     */
    public function user(): BelongsTo
    {

        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {

        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
