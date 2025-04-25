<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\CarbonImmutable;
use Database\Factories\UserFactory;
use Exception;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

/**
 * @property-read int $id
 * @property-read  string $name
 * @property-read  string $email
 * @property-read  string $password
 * @property-read  string $remember_token
 * @property-read  string $avatar_url
 * @property-read  string $location
 * @property-read  string $bio
 * @property-read  string $github_id
 * @property-read  string $github_token
 * @property-read  string $github_refresh_token
 * @property-read  string $github_user_name
 * @property string $email_verified_at
 * @property-read  CarbonImmutable $created_at
 * @property-read  CarbonImmutable $updated_at
 * @property-read  list<mixed> $skills
 */
final class User extends Authenticatable implements FilamentUser, MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'email_verified_at',
        'remember_token',
        'avatar_url',
        'location',
        'bio',
        'github_id',
        'github_token',
        'github_refresh_token',
        'github_user_name',
        'skills',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     *Validate if the user can access the panel
     *
     * @throws Exception
     */
    public function canAccessPanel(Panel $panel): bool
    {
        if ($panel->getId() === 'admin') {
            return Str::contains($this->email, ['@akira-io.com', 'kidiatoliny']);
        }

        return true;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'created_at' => 'datetime:d-m-Y',
            'skills' => 'array',
        ];
    }
}
