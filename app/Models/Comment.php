<?php

declare(strict_types=1);

namespace App\Models;

use Akira\Commentable\Models\Message;
use Akira\Likeable\Concerns\Likeable;

final class Comment extends Message
{
    use Likeable;
}
