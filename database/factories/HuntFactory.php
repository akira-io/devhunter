<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Hunt;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

final class HuntFactory extends Factory
{
    protected $model = Hunt::class;

    public function definition(): array
    {

        return [
            'content' => $this->faker->word(),
            'is_reported' => $this->faker->boolean(),
            'is_pinned' => $this->faker->boolean(),
            'is_ignored' => $this->faker->boolean(),
            'owner_id' => User::factory(),
        ];
    }
}
