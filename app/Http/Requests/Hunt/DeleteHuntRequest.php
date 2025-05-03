<?php

declare(strict_types=1);

namespace App\Http\Requests\Hunt;

use App\Models\Hunt;
use Illuminate\Foundation\Http\FormRequest;

final class DeleteHuntRequest extends FormRequest
{
    /**
     * Rules for the request.
     *
     * @return array<string, array<string>>
     */
    public function rules(): array
    {

        return [
            //
        ];
    }

    /**
     * Authorize the request.
     */
    public function authorize(): bool
    {

        return $this->user()->can('delete', $this->route('hunt'));
    }

    /**
     * Delete the hunt.
     */
    public function destroy(Hunt $hunt): ?bool
    {
        return $hunt->delete();
    }
}
