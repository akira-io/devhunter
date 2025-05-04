<?php

declare(strict_types=1);

namespace App\Http\Requests\Commentable;

use Illuminate\Foundation\Http\FormRequest;

final class StoreCommentRequest extends FormRequest
{
    public function rules(): array
    {

        return [
            'content' => ['required', 'string', 'max:200'],
        ];
    }

    public function authorize(): bool
    {

        return true;
    }
}
