import { LikeButton } from '@/components/likeable/LikeButton';
import { OnboardingAvatar } from '@/components/Onboarding';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Hunt } from '@/types';
import { useForm } from '@inertiajs/react';
import { SendHorizonal } from 'lucide-react';
import { FormEvent } from 'react';

interface TweetCommentsProps {
    isOpen: boolean;
    hunt: Hunt;
}

export function HuntComments({ isOpen, hunt }: TweetCommentsProps) {
    const { toast } = useToast();
    const { data, post, setData } = useForm({
        content: '',
    });

    const handleAddComment = (e: FormEvent) => {
        e.preventDefault();
        post(route('hunts.comment', hunt.id), {
            onSuccess: () => {
                setData('content', '');
                toast({
                    description: 'Comentário adicionado com sucesso.',
                });
            },
        });
    };

    const handleLike = (commentId: number) => {
        post(route('comments.toggle-like', commentId), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="mx-auto w-full max-w-xl space-y-2 px-6">
            {isOpen && (
                <>
                    <form className="relative flex gap-2" onSubmit={handleAddComment}>
                        <Textarea
                            name="comment"
                            placeholder="Deixe o seu comentário aqui..."
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="focus:ring-primary focus:border-primary transition-all duration-300 focus:ring-2"
                        />
                        <Button variant="ghost" size="sm" type="submit" className="absolute right-0 bottom-0 flex items-center gap-1">
                            <SendHorizonal />
                        </Button>
                    </form>
                    <div className="space-y-2.5">
                        {hunt.comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="bg-muted animate-[fadeIn_0.5s_forwards] rounded-lg p-0 opacity-0 shadow-md transition-all duration-500 ease-out"
                                style={{
                                    animationName: 'fadeIn',
                                    animationDuration: '0.5s',
                                    animationTimingFunction: 'ease-out',
                                    animationFillMode: 'forwards',
                                }}
                            >
                                <div className="flex flex-col items-start justify-start gap-2 p-2">
                                    <div className="flex w-full items-start justify-between gap-1">
                                        <div className="flex w-full flex-1 flex-grow items-start gap-1">
                                            <OnboardingAvatar avatarUrl={comment.commenter.avatar_url} size={4} />
                                            <small className="fleex text-xs">{comment.commenter.name}</small>
                                        </div>
                                        <small className="text-xs text-gray-400">{comment.created_at}</small>
                                    </div>
                                    <p className="text-sm leading-relaxed">{comment.content}</p>
                                </div>
                                <div className="text-muted-foreground mb-4 flex p-2 text-sm">
                                    <LikeButton
                                        count={comment.likes_count}
                                        hasLiked={comment.has_liked}
                                        onLike={() => handleLike(comment.id)}
                                        iconSize={16}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <style>{`
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
                </>
            )}
        </div>
    );
}
