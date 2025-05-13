import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { UserPlusIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface FollowButtonProps extends HTMLAttributes<HTMLButtonElement> {
    user: User;
}

export function FollowButton({ user, className }: FollowButtonProps) {
    const { post, processing } = useForm();
    const { toast } = useToast();

    function follow(user: User) {
        post(route('followable.follow', { user_id: user.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    description: `Você começou a seguir  ${user.name}`,
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    description: `Erro ao seguir ${user.name}`,
                });
            },
        });
    }

    return (
        <Button className={cn(className)} size="sm" variant="default" onClick={() => follow(user)} disabled={processing}>
            <UserPlusIcon />
            Seguir
        </Button>
    );
}
