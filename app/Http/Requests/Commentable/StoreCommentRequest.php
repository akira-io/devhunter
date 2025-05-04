<?php

declare(strict_types=1);

namespace App\Http\Requests\Commentable;

use Illuminate\Foundation\Http\FormRequest;

final class StoreCommentRequest extends FormRequest
{
    /**
     * The rules that apply to the request.
     *
     * @return array<string, string>
     */
    public function rules(): array
    {

        return [
            'content' => ['required', 'string', 'max:200'],
        ];
    }

    /**
     * Handle the authorization logic.
     */
    public function authorize(): bool
    {

        return true;
    }
}
