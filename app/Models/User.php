<?php

declare(strict_types=1);

namespace App\Models;

use Akira\Followable\Concerns\Followable;
use Akira\Followable\Concerns\Follower;
use Carbon\CarbonImmutable;
use Database\Factories\UserFactory;
use Exception;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Scout\Searchable;

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
 * @property-read  HasMany<ProfessionalEducation,$this> $professionalEducations
 * @property-read  MorphMany<User, $this> $followers
 * @property-read  MorphMany<User, $this> $followings
 */
final class User extends Authenticatable implements FilamentUser, MustVerifyEmail
{
    use Followable;
    use Follower;

    /** @use HasFactory<UserFactory> */
    use HasFactory;

    use Notifiable;
    use Searchable;

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
        'github_url',
        'twitter_url',
        'linkedin_url',
        'bluesky_url',
        'website_url',
        'youtube_url',
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
        return Str::contains($this->email, ['@akira-io.com', 'kidiatoliny']);
    }

    /**
     * The attributes that should be searchable.
     *
     * @return array<string, list<mixed>|string>
     */
    public function toSearchableArray(): array
    {
        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'location' => $this->location,
            'github_user_name' => $this->github_user_name,
            'skills' => $this->skills,
        ];
    }

    /**
     * Professional education relationship
     *
     * @return HasMany<ProfessionalEducation, $this>
     */
    public function professionalEducations(): HasMany
    {

        return $this->hasMany(ProfessionalEducation::class, 'user_id');
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
