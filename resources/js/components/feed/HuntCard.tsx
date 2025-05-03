import DeleteHunt from '@/components/feed/DeleteHunt';
import { HuntComments } from '@/components/feed/HuntComments';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Hunt, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { BarChart, Edit, EllipsisVerticalIcon, Heart, MessageCircle, Repeat2, SaveIcon, Share2Icon, ShieldAlert, StopCircle } from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface HuntCardProps {
    hunt: Hunt;
}

export function HuntCardConnector() {
    return (
        <>
            <div className="effect absolute -top-10 left-5 z-[-1] flex h-10 w-1 items-center justify-center rounded-full bg-white text-xs dark:bg-zinc-900" />
            <div className="effect bg-card absolute -top-10 right-5 flex h-10 w-1 items-center justify-center rounded-full text-xs dark:bg-zinc-900" />
        </>
    );
}

export function HuntCard({ hunt }: HuntCardProps) {
    const { auth } = usePage<SharedData>().props;
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
                        <AvatarImage src={hunt.owner.avatar_url} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <CardTitle className="text-base font-semibold">{hunt.owner.name}</CardTitle>
                        <div className="text-muted-foreground text-sm">
                            @{hunt.owner.github_user_name || hunt.owner.name} · {hunt.created_at}
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="text-muted-forground absolute top-4 right-4 flex h-8 w-8 cursor-pointer border-none shadow-none"
                                variant="secondary"
                            >
                                <EllipsisVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="effect gradient">
                            <DropdownMenuItem>
                                <Share2Icon size={16} className="opacity-60" aria-hidden="true" />
                                Partilhar
                            </DropdownMenuItem>
                            {auth.user.id === hunt.owner.id ? (
                                <>
                                    <DropdownMenuItem>
                                        <Edit size={16} className="opacity-60" aria-hidden="true" />
                                        Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <DeleteHunt hunt={hunt} />
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuItem>
                                        <SaveIcon size={16} className="opacity-60" aria-hidden="true" />
                                        Guardar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <StopCircle size={16} className="opacity-60" aria-hidden="true" />
                                        Ignorar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ShieldAlert size={16} className="opacity-60" aria-hidden="true" />
                                        Reportar
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>{hunt.content}</p>
                    {hunt.image_url && <img src={hunt.image_url} alt="Tweet image" className="max-h-30 w-full rounded-md object-cover" />}
                </CardContent>
                <CardFooter className="text-muted-foreground flex justify-between text-sm">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => setOpenComments((prev) => !prev)}>
                        <MessageCircle size={16} /> {hunt.comments?.length || 0}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Repeat2 size={16} /> {hunt.shares}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center gap-1">
                        <Heart size={16} className={cn('transition-transform duration-300', { 'text-primary scale-150': isAnimating })} />
                        {hunt.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <BarChart size={16} /> {hunt.views}
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
