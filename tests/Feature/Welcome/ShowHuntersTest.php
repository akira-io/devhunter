<?php

declare(strict_types=1);

use App\Models\User;
use Inertia\Testing\AssertableInertia;
use PHPUnit\Framework\Assert;

use function Pest\Laravel\get;

beforeEach(fn () => User::factory()->count(25)->create());

it('should renders welcome page with users paginated by 15', function () {

    $response = get(route('home'));

    $response
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('welcome')
            ->has('paginator', fn (AssertableInertia $paginator) => $paginator
                ->where('per_page', 15)
                ->where('total', 25)
                ->has('data', 15)
                ->etc()
            )

        );

    /** @var Inertia\Response $inertiaResponse */
    $inertiaResponse = $response->getOriginalContent();

    $props = $inertiaResponse->getData()['page']['props'];

    $paginator = $props['paginator'];

    Assert::assertSame(25, $paginator['total']);
    Assert::assertSame(15, $paginator['per_page']);

    Assert::assertCount(15, $paginator['data']);

    $returnedIds = collect($paginator['data'])->pluck('id')->all();

    Assert::assertEmpty(
        array_diff($returnedIds, User::pluck('id')->all()),
        'Há IDs inválidos no paginator'
    );

    $first15Factory = User::pluck('id')->take(15)->all();
    $diffAssoc = array_diff_assoc($first15Factory, $returnedIds);
    Assert::assertNotEmpty(
        $diffAssoc,
        'Pelo menos um usuário deveria estar em posição diferente'
    );
});
