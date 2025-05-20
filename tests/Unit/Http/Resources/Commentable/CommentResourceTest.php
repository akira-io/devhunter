<?php

declare(strict_types=1);

use App\Http\Resources\Commentable\CommentResource;
use App\Models\Hunt;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('it correctly transforms a comment into an array', function () {
    // Arrange
    Carbon::setTestNow('2023-01-01 12:00:00');

    $user = User::factory()->create([
        'name' => 'John Doe',
        'avatar_url' => 'https://example.com/avatar.jpg',
    ]);

    $hunt = Hunt::factory()->create(['owner_id' => $user->id]);
    $comment = $user->comment($hunt, 'Test comment');

    // Set has_liked property
    $comment->has_liked = true;

    $resource = new CommentResource($comment);

    // Act
    $result = $resource->toArray(request());

    // Assert
    expect($result)
        ->toBeArray()
        ->toHaveKeys(['id', 'content', 'likes_count', 'has_liked', 'created_at', 'commenter'])
        ->and($result['content'])->toBe('Test comment')
        ->and($result['has_liked'])->toBeTrue()
        ->and($result['created_at'])->toBe('há 0 segundos')
        ->and($result['commenter'])->toBeArray()
        ->and($result['commenter'])->toHaveKeys(['id', 'name', 'avatar_url'])
        ->and($result['commenter']['id'])->toBe($user->id)
        ->and($result['commenter']['name'])->toBe('John Doe')
        ->and($result['commenter']['avatar_url'])->toBe('https://example.com/avatar.jpg');
});
