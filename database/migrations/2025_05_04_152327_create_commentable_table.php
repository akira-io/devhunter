<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(config('commentable.comment_table', 'comments'), function (Blueprint $table): void {
            $table->id();

            $table->nullableMorphs('commentable');
            $table->nullableMorphs('commenter');
            $table->unsignedBigInteger('reply_id')->nullable()->index();
            $table->longText('content');
            $table->boolean('approved')->default(false)->index();
            $table->foreign('reply_id')->references('id')->on(config('commentable.comment_table', 'comments'))->cascadeOnDelete();

            $table->timestamps();
        });

        Schema::create(config('commentable.reaction_table', 'reactions'), function (Blueprint $table): void {
            $table->id();
            $table->morphs('owner');
            $table->foreignId('comment_id')->constrained(config('commentable.comment_table', 'comments'))->cascadeOnDelete();
            $table->string('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(config('commentable.tables.reactions', 'reactions'));
        Schema::dropIfExists(config('commentable.tables.comments', 'comments'));
    }
};
