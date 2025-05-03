<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class HuntRequest extends FormRequest
{
    public function rules(): array
    {

        return [
            'owner_id' => ['required', 'exists:users'],
            'content' => ['required'],
            'is_reported' => ['boolean'],
            'is_pinned' => ['boolean'],
            'is_ignored' => ['boolean'],
        ];
    }

    public function authorize(): bool
    {

        return true;
    }
}
