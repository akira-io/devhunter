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
            $table->string('github_user_name')->nullable();
            $table->string('avatar_url')->nullable();
            $table->string('location')->nullable();
            $table->text('bio')->nullable();
            $table->string('github_id')->nullable();
            $table->string('github_token')->nullable();
            $table->string('github_refresh_token')->nullable();

        });
    }
};
