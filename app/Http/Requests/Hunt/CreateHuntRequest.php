<?php

declare(strict_types=1);

namespace App\Http\Requests\Hunt;

use App\Models\Hunt;
use App\Models\User;
use App\Rules\Rules\WithoutBlankCharactersRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

final class CreateHuntRequest extends FormRequest
{
    /**
     * The validation rules that apply to the request.
     *
     * @return array<string,list<WithoutBlankCharactersRule|string>>
     */
    public function rules(): array
    {

        return [
            'content' => ['required', 'string', 'min:3', 'max:500', new WithoutBlankCharactersRule],
            'is_reported' => ['boolean'],
            'is_pinned' => ['boolean'],
            'is_ignored' => ['boolean'],
            'image' => ['nullable', 'image', 'max:400', 'mimes:jpg,jpeg,png'],
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

        $user = type($this->user())->as(User::class);

        $hunt = $user->hunts()
            ->create($this->except('image'));

        if ($this->hasFile('image')) {
            $hunt->addMedia(type($this->file('image'))->as(UploadedFile::class))
                ->toMediaCollection('hunts');
        }

        return $hunt;
    }
}
