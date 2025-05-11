<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class GetHuntersAction
{
    /**
     * Handle the action of getting hunters.
     *
     * @return array{mixed,LengthAwarePaginator<int, string>}
     */
    public function handle(Request $request, int $perPage = 15, ?User $user = null): array
    {
        /** @var User|null $user */
        $user = $user ?: $request->user() ?: null;

        $query = $request->string('q')->value();

        $usersQuery = filled($query)
            ? User::search($query)
            : User::query()->inRandomOrder();

        /**
         * @var LengthAwarePaginator<int, string> $paginator
         */
        $paginator = $usersQuery->paginate($perPage)->withQueryString();

        $paginator->getCollection()->load('academicBackgrounds'); // @phpstan-ignore-line

        $hunters = $user
            ? $user->attachFollowStatus($paginator->getCollection())
            : $paginator->getCollection();

        return [$hunters, $paginator];
    }
}
