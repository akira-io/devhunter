<?php

declare(strict_types=1);

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

final class AboutRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {

        return [
            'bio' => ['nullable', 'string', 'max:200'],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        return true;
    }
}
