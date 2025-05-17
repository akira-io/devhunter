<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\SkillsEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
final class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    private static ?string $password = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => self::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'user_name' => fake()->userName(),
            'github_id' => fake()->unique()->numberBetween(1, 1000000),
            'github_token' => fake()->uuid(),
            'github_refresh_token' => fake()->uuid(),
            'location' => fake()->city(),
            'bio' => fake()->sentence(),
            'skills' => fake()->randomElements(SkillsEnum::get(), 10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes): array => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Get the model's email address
     */
    public function withEmail(string $email): static
    {
        return $this->state(fn (): array => [
            'email' => $email,
        ]);
    }
}
