<?php

declare(strict_types=1);

namespace App\Http\Requests\Profile;

use App\Enums\SkillsEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

final class HighlightSkillRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {

        return [
            'skills' => ['array', 'nullable'],
            'skill.*' => [
                'required',
                'distinct',
                new Enum(SkillsEnum::class),
            ],
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function authorize(): bool
    {

        return true;
    }
}
