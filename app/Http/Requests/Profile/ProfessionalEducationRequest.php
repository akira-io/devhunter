<?php

declare(strict_types=1);

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

final class ProfessionalEducationRequest extends FormRequest
{
    /**
     * Validation rules for the request.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {

        return [
            'institution' => ['required', 'string', 'max:255'],
            'degree' => ['required', 'string', 'max:255'],
            'field_of_study' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date'],
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
     * Custom messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {

        return [
            'institution.required' => " O campo 'Instituição' é obrigatório.",
            'degree.required' => " O campo 'Grau Académicao' é obrigatório.",
            'field_of_study.required' => " O campo 'Área de Estudo' é obrigatório.",
            'start_date.required' => " O campo 'Data de Início' é obrigatório.",
        ];
    }
}
