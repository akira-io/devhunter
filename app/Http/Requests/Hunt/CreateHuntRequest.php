<?php

declare(strict_types=1);

namespace App\Http\Requests\Hunt;

use App\Models\Hunt;
use App\Rules\Rules\WithoutBlankCharactersRule;
use Illuminate\Foundation\Http\FormRequest;

final class CreateHuntRequest extends FormRequest
{
    /**
     * The validation rules that apply to the request.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {

        return [
            'content' => ['required', 'string', 'min:3', 'max:500', new WithoutBlankCharactersRule],
            'is_reported' => ['boolean'],
            'is_pinned' => ['boolean'],
            'is_ignored' => ['boolean'],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        return true;
    }

    /**
     * Create a Hunt
     */
    public function store(): Hunt
    {
        return $this->user()->hunts()->create($this->validated());
    }
}
