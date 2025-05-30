<?php

declare(strict_types=1);

namespace App\Rules\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

final readonly class WithoutBlankCharactersRule implements ValidationRule
{
    /**
     * Determine if the validation rule passes.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {

        $value = type($value)->asString();

        if (preg_match('/\p{Cf}/u', $value)) {
            $fail('The :attribute field cannot contain blank characters.');
        }
    }
}
