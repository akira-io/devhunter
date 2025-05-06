<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {

        Schema::create('hunts', function (Blueprint $table): void {
            $table->uuid('id');
            $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
            $table->text('content');
            $table->boolean('is_reported')->default(false);
            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_ignored')->default(false);
            $table->timestamps();

        });
    }

    public function down(): void
    {

        Schema::dropIfExists('hunts');
    }
};
