<?php

declare(strict_types=1);

namespace App\Http\Requests\Feed;

use Illuminate\Foundation\Http\FormRequest;

final class FollowRequest extends FormRequest
{
    /**
     * The rules that apply to the request.
     *
     * @return array<string, array<string>>
     */
    public function rules(): array
    {

        return [
            'user_id' => ['required', 'integer', 'exists:users,id'],
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
