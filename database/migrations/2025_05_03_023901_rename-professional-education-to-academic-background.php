<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {

        Schema::table('', function (Blueprint $table): void {
            Schema::rename('professional_education', 'academic_backgrounds');
        });
    }

    public function down(): void
    {
        Schema::table('', function (Blueprint $table): void {
            Schema::rename('academic_backgrounds', 'professional_education');
        });
    }
};
