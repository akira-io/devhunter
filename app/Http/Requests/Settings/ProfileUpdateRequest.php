<?php

declare(strict_types=1);

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $userId = type($this->user())->as(User::class)->id;

        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($userId),
            ],

            'bio' => ['nullable', 'string', 'max:200'],
            'location' => ['nullable', 'string', 'max:100'],

            'avatar_url' => $this->avatarRules(),
            'background_image_url' => $this->backgroundRules(),
        ];
    }

    /**
     * Get the avatar rules
     *
     * @return string[]
     */
    private function avatarRules(): array
    {
        if ($this->hasFile('avatar_url')) {
            return ['nullable', 'image', 'max:400', 'mimes:jpg,jpeg,png'];
        }

        if (is_string($this->input('avatar_url'))) {
            return ['nullable', 'url'];
        }

        return ['nullable'];
    }

    /**
     * Get background rules
     *
     * @return string[]
     */
    private function backgroundRules(): array
    {
        if ($this->hasFile('background_image_url')) {
            return ['nullable', 'image', 'max:400', 'mimes:jpg,jpeg,png'];
        }

        if (is_string($this->input('background_image_url'))) {
            return ['nullable', 'url'];
        }

        return ['nullable'];
    }
}
