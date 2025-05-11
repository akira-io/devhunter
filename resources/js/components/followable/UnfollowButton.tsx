import { Button } from '@/components/ui/button';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { CheckCircle, UserMinus2Icon } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface UnfollowButtonProps extends HTMLAttributes<HTMLButtonElement> {
    user: User;
}

export default function UnfollowButton({ user, className }: UnfollowButtonProps) {
    const { toast } = useToast();
    const { post, processing } = useForm();

    function unFollow() {
        post(route('followable.unfollow', { user_id: user.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    description: `Você deixou de seguir  ${user.name}`,
                });
                closeModal();
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    description: `Erro ao seguir ${user.name}`,
                });
            },
        });
    }

    function closeModal() {
        // Close the modal
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className={cn(className)}>
                    <UserMinus2Icon /> Deixar de Seguir
                </Button>
            </DialogTrigger>
            <DialogContent className="p-6">
                <DialogTitle>Deixar de Seguir ?</DialogTitle>
                <DialogDescription className="pt-4">
                    Você tem certeza que deseja deixar de seguir <b>{user.name}</b> ? <br />
                    <span className="text-muted-foreground text-sm">Você pode voltar a segui-lo a qualquer momento.</span>
                </DialogDescription>
                <DialogFooter className="pt-4">
                    <DialogClose asChild>
                        <Button variant="secondary">
                            <AiOutlineClose />
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" disabled={processing} onClick={unFollow}>
                        <CheckCircle /> Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
