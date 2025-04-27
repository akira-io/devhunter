<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ProfessionalEducation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

final class ProfessionalEducationFactory extends Factory
{
    protected $model = ProfessionalEducation::class;

    public function definition(): array
    {

        return [
            'institution' => $this->faker->word(),
            'degree' => $this->faker->word(),
            'field_of_study' => $this->faker->word(),
            'start_date' => Carbon::now()->subYears(2),
            'end_date' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => User::factory(),
        ];
    }
}
