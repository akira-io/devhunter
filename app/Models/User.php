<?php

declare(strict_types=1);

namespace App\Models;

use Akira\Commentable\Concerns\Commenter;
use Akira\Followable\Concerns\Followable;
use Akira\Followable\Concerns\Follower;
use Akira\LaravelAuthLogs\Concerns\AuthLogs;
use Akira\Likeable\Concerns\Liker;
use Carbon\CarbonImmutable;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property-read int $id
 * @property-read  string $name
 * @property-read  string $email
 * @property-read  string $password
 * @property-read  string $remember_token
 * @property string|null $avatar_url
 * @property-read  string $location
 * @property-read  string $bio
 * @property-read  string $github_id
 * @property-read  string $github_token
 * @property-read  string $github_refresh_token
 * @property-read  string $user_name
 * @property string|null $email_verified_at
 * @property-read  CarbonImmutable $created_at
 * @property-read  CarbonImmutable $updated_at
 * @property-read  list<mixed> $skills
 * @property-read  HasMany<AcademicBackground,$this> $academicBackgrounds
 * @property-read  MorphMany<User, $this> $followers
 * @property-read  MorphMany<User, $this> $followings
 * @property-read  string|null $github_url
 * @property-read  string|null $twitter_url
 * @property-read  string|null $linkedin_url
 * @property-read  string|null $bluesky_url
 * @property-read  string|null $website_url
 * @property-read  string|null $youtube_url
 */
final class User extends Authenticatable implements HasMedia, MustVerifyEmail
{
    use AuthLogs;
    use Commenter;
    use Followable;
    use Follower;

    /** @use HasFactory<UserFactory> */
    use HasFactory;

    use InteractsWithMedia;
    use Liker;
    use Notifiable;
    use Searchable;

    /**
     * @var mixed|string
     */
    public mixed $background_image_url;

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
        'user_name',
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
            'user_name' => $this->user_name,
            'skills' => $this->skills,
        ];
    }

    /**
     * Professional education relationship
     *
     * @return HasMany<AcademicBackground, $this>
     */
    public function academicBackgrounds(): HasMany
    {

        return $this->hasMany(AcademicBackground::class, 'user_id');
    }

    /**
     * The user's hunts
     *
     * @return HasMany<Hunt, $this>
     */
    public function hunts(): HasMany
    {

        return $this->hasMany(Hunt::class, 'owner_id');
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
