import { Skills } from '@/components/profile/skills';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTruncate } from '@/hooks/use-truncate-text';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { RiBlueskyFill, RiDiscordFill, RiGithubFill, RiLinkedinBoxFill, RiTwitterXFill, RiYoutubeFill } from '@remixicon/react';
import { ArrowLeftIcon, ArrowRightIcon, EllipsisVerticalIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import AvatarGenerator, { genConfig } from 'react-nice-avatar';

interface OnboardingProps extends React.ComponentProps<'div'> {
    user: User;
}

export default function Onboarding({ user, ...props }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(false);

    const { truncate } = useTruncate();
    const config = genConfig({ sex: 'man', hairStyle: 'thick' });

    const totalSteps = 4;

    const handleContinue = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleCardClick = () => {
        setStep(1);
        setOpen(true);
    };

    return (
        <div {...props}>
            <Card className="relative h-40 w-full cursor-pointer overflow-hidden" onClick={handleCardClick}>
                <CardContent className="flex w-full flex-1 items-start justify-center gap-4">
                    <Avatar className="h-20 w-auto">
                        {user.avatar_url ? (
                            <AvatarImage src={user.avatar_url} alt={user.name} className="h-20 w-20" />
                        ) : (
                            <AvatarGenerator className="h-20 w-20" {...config} />
                        )}
                    </Avatar>
                    <div className="w-full">
                        <div className="mb-2 flex items-center justify-between">
                            <CardTitle className="text-xl">{user.name}</CardTitle>
                            <Button
                                className="text-muted-forground -mt-2 -mr-2 flex h-8 w-8 cursor-pointer border-none shadow-none"
                                variant="secondary"
                            >
                                <EllipsisVerticalIcon />
                            </Button>
                        </div>
                        <CardDescription className="mt-2 mb-4 text-sm">
                            {user.bio ? truncate(user.bio) : <span className="text-muted">Bio indisponível...</span>}
                        </CardDescription>
                    </div>
                </CardContent>
            </Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="overflow-x h-150 w-full gap-4 pt-4 [&>button:last-child]:text-white">
                    <div className="space-y-6 overflow-y-auto px-6 pt-6 pb-6">
                        <DialogHeader className="bg-background 0 sticky top-0 w-full shrink-0 items-center justify-between pb-10">
                            <div className="flex w-full items-center justify-start">
                                <Avatar className="h-20 w-auto">
                                    {user.avatar_url ? (
                                        <AvatarImage src={user.avatar_url} alt={user.name} className="h-20 w-20" />
                                    ) : (
                                        <AvatarGenerator className="h-20 w-20" {...config} />
                                    )}
                                </Avatar>
                                <div className="ml-2 flex flex-col gap-2 text-left">
                                    <DialogTitle className="text-2xl">{user.name}</DialogTitle>
                                    <div className="text-muted-foreground flex gap-1.5">
                                        <Link href={''}>
                                            <RiGithubFill size={20} />
                                        </Link>
                                        <Link href={''}>
                                            <RiLinkedinBoxFill size={20} />
                                        </Link>
                                        <Link href={''}>
                                            <RiDiscordFill size={20} />
                                        </Link>
                                        <Link href={''}>
                                            <RiTwitterXFill size={22} />
                                        </Link>
                                        <Link href={''}>
                                            <RiBlueskyFill size={20} />
                                        </Link>
                                        <Link href={''}>
                                            <RiYoutubeFill size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </DialogHeader>
                        {step === 1 && (
                            <div className="top-0 flex shrink-0 flex-col items-start gap-8">
                                <small className="text-muted-foreground">Skills</small>
                                <div className="-mt-4 flex flex-wrap items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                    {user.skills && <Skills techs={user.skills} />}
                                </div>
                                <small className="text-muted-foreground">Sobre</small>
                                <div className="-mt-4">{user.bio}</div>
                            </div>
                        )}
                        {step === 2 && (
                            <>
                                <DialogTitle>Customizable Components</DialogTitle>
                                <DialogDescription>
                                    Each component is fully customizable and built with modern web standards in mind.
                                </DialogDescription>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <DialogTitle>Ready to Start?</DialogTitle>
                                <DialogDescription>Begin building amazing interfaces with our comprehensive component library.</DialogDescription>
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <DialogTitle>Get Support</DialogTitle>
                                <DialogDescription>
                                    Access our extensive documentation and community resources to make the most of Origin UI.
                                </DialogDescription>
                            </>
                        )}
                        <DialogFooter className="bg-background fixed right-0 bottom-0 left-0 z-10 flex w-full items-center justify-between border-t p-3">
                            <div className="max:order-1 flex justify-center space-x-1.5">
                                {[1, 2, 3, 4].map((s) => (
                                    <div key={s} className={cn('bg-primary size-1.5 rounded-full', step === s ? 'bg-primary' : 'opacity-20')} />
                                ))}
                            </div>
                            <div className="inline-flex gap-2">
                                {step > 1 && (
                                    <Button className="group" type="button" onClick={handleBack} variant="ghost">
                                        <ArrowLeftIcon size={16} />
                                        Voltar
                                    </Button>
                                )}
                                {step < totalSteps ? (
                                    <Button className="group" type="button" onClick={handleContinue}>
                                        Próximo
                                        <ArrowRightIcon size={16} />
                                    </Button>
                                ) : (
                                    <DialogClose asChild>
                                        <Button type="button">Okay</Button>
                                    </DialogClose>
                                )}
                            </div>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
