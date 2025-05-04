import { Button } from '@/components/ui/button';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Comment } from '@/types';
import { useForm } from '@inertiajs/react';
import { Ban, CheckCircle, Trash } from 'lucide-react';
import { AiOutlineClose } from 'react-icons/ai';

interface DeleteComentProps {
    comment: Comment;
}

export default function DeleteComment({ comment }: DeleteComentProps) {
    const { toast } = useToast();
    const { delete: destroy, processing } = useForm();

    function deleteHunt() {
        destroy(route('comments.destroy', { comment }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast({ description: 'Comentário  eliminada com sucesso.' });
            },
            onError: () => {
                toast({
                    title: 'Erro',
                    variant: 'destructive',
                    description: 'Erro ao eliminar comentário.',
                    icon: <Ban />,
                });
            },
        });
    }

    return (
        <Dialog>
            <DialogTrigger className={'flex items-center gap-2'}>
                <Trash size={16} className="opacity-60" aria-hidden="true" />
                Eliminar
            </DialogTrigger>
            <DialogContent className="p-6">
                <DialogTitle>Eliminar Hunt?</DialogTitle>
                <DialogDescription className="pt-4">
                    Tem certeza de que deseja eliminar esta comment? Esta ação não pode ser desfeita.
                </DialogDescription>
                <DialogFooter className="pt-4">
                    <DialogClose asChild>
                        <Button variant="secondary">
                            <AiOutlineClose />
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" disabled={processing} onClick={deleteHunt}>
                        <CheckCircle /> Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
