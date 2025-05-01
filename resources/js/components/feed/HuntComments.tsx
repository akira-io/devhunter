import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Heart, SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';

interface Comment {
    id: number;
    text: string;
}

interface TweetCommentsProps {
    isOpen: boolean;
}

export function HuntComments({ isOpen }: TweetCommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAddComment = () => {
        if (newComment.trim() === '') return;

        const newItem: Comment = {
            id: Date.now(),
            text: newComment,
        };

        setComments((prev) => [...prev, newItem]);
        setNewComment('');
    };

    return (
        <div className="mx-auto w-full max-w-xl space-y-2 px-6">
            {isOpen && (
                <>
                    <div className="relative flex gap-2">
                        <Textarea
                            placeholder="Deixe o seu comentário aqui..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="focus:ring-primary focus:border-primary transition-all duration-300 focus:ring-2"
                        />
                        <Button variant="ghost" size="sm" onClick={handleAddComment} className="absolute right-0 bottom-0 flex items-center gap-1">
                            <SendHorizonal />
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {comments.map((comment) => (
                            <Card
                                key={comment.id}
                                className="bg-muted animate-[fadeIn_0.5s_forwards] rounded-lg p-0 opacity-0 shadow-md transition-all duration-500 ease-out"
                                style={{
                                    animationName: 'fadeIn',
                                    animationDuration: '0.5s',
                                    animationTimingFunction: 'ease-out',
                                    animationFillMode: 'forwards',
                                }}
                            >
                                <div className="flex items-start justify-start gap-2 p-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src="https://i.pravatar.cc/300" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <p className="text-sm leading-relaxed">{comment.text}</p>
                                </div>
                                <CardFooter className="text-muted-foreground -mt-5 flex text-sm">
                                    <Button variant="ghost" size="sm" onClick={() => setIsAnimating(true)} className="flex items-center gap-1">
                                        <Heart
                                            size={16}
                                            className={cn('transition-transform duration-300', { 'text-primary scale-150': isAnimating })}
                                        />
                                        {12}
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setIsAnimating(true)} className="flex items-center gap-1">
                                        <AiOutlineComment
                                            size={16}
                                            className={cn('transition-transform duration-300', { 'text-primary scale-150': isAnimating })}
                                        />
                                        {12}
                                    </Button>
                                </CardFooter>
                            </Card>
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
