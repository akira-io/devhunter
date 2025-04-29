<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {

        Schema::table('users', function (Blueprint $table): void {
            $table->string('github_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('bluesky_url')->nullable();
            $table->string('website_url')->nullable();
            $table->string('youtube_url')->nullable();
        });
    }
};
