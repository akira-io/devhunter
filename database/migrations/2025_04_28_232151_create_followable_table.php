<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(config('followable.followables_table', 'followables'), function (Blueprint $table): void {
            $table->id();
            $table->unsignedBigInteger(config('followable.user_foreign_key', 'user_id'))
                ->index()
                ->comment('user_id');

            if (config('followable.uuids')) {
                $table->uuidMorphs('followable');
            } else {
                $table->morphs('followable');
            }

            $table->timestamp('accepted_at')->nullable();
            $table->timestamps();

            $table->index(['followable_type', 'accepted_at']);
        });
    }
};
