import { cn } from '@/lib/utils';
import { Hunt } from '@/types';
import { useForm } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface LikesProps {
    hunt: Hunt;
}

export function HuntLikes({ hunt }: LikesProps) {
    const { post } = useForm();
    const [isAnimating, setIsAnimating] = useState(false);

    function handleLike() {
        post(route('hunts.toggle-like', hunt.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 300);
            },
        });
    }

    return (
        <div className="flex items-center gap-2">
            <Heart
                onClick={handleLike}
                size={20}
                className={cn('cursor-pointer transition-transform duration-300', {
                    'text-primary scale-150': isAnimating,
                    'fill-primary': hunt.has_liked,
                })}
            />
            <span> {hunt.likes}</span>
        </div>
    );
}
