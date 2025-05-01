import { HuntComments } from '@/components/feed/HuntComments';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BarChart, Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { useState } from 'react';

interface TweetCardProps {
    avatarUrl?: string;
    name: string;
    userName: string;
    time: string;
    content: string;
    imageUrl?: string;
    comments: number;
    retweets: number;
    likes: number;
    views: number;
}

export function HuntCardConnector() {
    return (
        <>
            <div className="effect absolute -top-10 left-5 z-[-1] flex h-10 w-1 items-center justify-center rounded-full bg-white text-xs dark:bg-zinc-900" />
            <div className="effect bg-card absolute -top-10 right-5 flex h-10 w-1 items-center justify-center rounded-full text-xs dark:bg-zinc-900" />
        </>
    );
}

export function HuntCard({ avatarUrl, name, userName, time, content, imageUrl, comments, retweets, likes, views }: TweetCardProps) {
    const [isOpenComments, setOpenComments] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    // /const [likes, setLikes] = useState(0);
    const handleLike = () => {
        // setLikes((prev) => prev + 1);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300); // animação dura 300ms
    };
    return (
        <>
            <Card className="relative mx-auto w-full max-w-xl">
                <CardHeader className="flex flex-row items-start gap-4">
                    <Avatar>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <CardTitle className="text-base font-semibold">{name}</CardTitle>
                        <div className="text-muted-foreground text-sm">
                            @{userName} · {time}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>{content}</p>
                    {imageUrl && <img src={imageUrl} alt="Tweet image" className="max-h-30 w-full rounded-md object-cover" />}
                </CardContent>
                <CardFooter className="text-muted-foreground flex justify-between text-sm">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => setOpenComments((prev) => !prev)}>
                        <MessageCircle size={16} /> {comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Repeat2 size={16} /> {retweets}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center gap-1">
                        <Heart size={16} className={cn('transition-transform duration-300', { 'text-primary scale-150': isAnimating })} />
                        {likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <BarChart size={16} /> {views}
                    </Button>
                </CardFooter>
                {isOpenComments && (
                    <div className="mt-0">
                        <HuntComments isOpen={isOpenComments} />
                    </div>
                )}
                <HuntCardConnector />
            </Card>
        </>
    );
}
