<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\AcademicBackground;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

final class AcademicBackgroundFactory extends Factory
{
    protected $model = AcademicBackground::class;

    public function definition(): array
    {

        return [
            'institution' => $this->faker->word(),
            'degree' => $this->faker->word(),
            'field_of_study' => $this->faker->word(),
            'start_date' => Carbon::now()->subYears(2),
            'end_date' => Carbon::now(),
            'user_id' => User::factory(),
        ];
    }
}
