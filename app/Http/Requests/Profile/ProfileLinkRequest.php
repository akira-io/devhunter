<?php

declare(strict_types=1);

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

final class ProfileLinkRequest extends FormRequest
{
    /**
     * The attributes that are mass assignable.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {

        return [
            'github_url' => ['nullable', 'url'],
            'twitter_url' => ['nullable', 'url'],
            'linkedin_url' => ['nullable', 'url'],
            'bluesky_url' => ['nullable', 'url'],
            'website_url' => ['nullable', 'url'],
            'youtube_url' => ['nullable', 'url'],
        ];
    }

    /**
     * Set the authorization for the request.
     */
    public function authorize(): bool
    {

        return true;
    }
}
