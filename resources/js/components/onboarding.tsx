import { ScrollDown } from '@/components/scroll-down';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { RiBlueskyFill, RiDiscordFill, RiGithubFill, RiLinkedinBoxFill, RiTwitterXFill, RiYoutubeFill } from '@remixicon/react';
import { ArrowLeftIcon, ArrowRightIcon, EllipsisVerticalIcon } from 'lucide-react';
import * as React from 'react';
import { JSX, useEffect, useState } from 'react';
import { FaCode, FaJava, FaJsSquare, FaPython } from 'react-icons/fa';
import { SiCplusplus, SiGo, SiRubyonrails, SiRust } from 'react-icons/si';
import AvatarGenenerator, { genConfig } from 'react-nice-avatar';

interface OnboardingProps extends React.ComponentProps<'div'> {
    user: User;
}

const devLanguages = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'Ruby', 'C++'];
const langColors: Record<string, string> = {
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-500',
    Python: 'bg-blue-400',
    Go: 'bg-cyan-500',
    Rust: 'bg-orange-500',
    Java: 'bg-red-500',
    Ruby: 'bg-pink-500',
    'C++': 'bg-indigo-500',
};

const langIcons: Record<string, JSX.Element> = {
    JavaScript: <FaJsSquare className="text-yellow-500" />,
    Python: <FaPython className="text-blue-400" />,
    Go: <SiGo className="text-cyan-500" />,
    Rust: <SiRust className="text-orange-500" />,
    Java: <FaJava className="text-red-600" />,
    Ruby: <SiRubyonrails className="text-pink-500" />,
    'C++': <SiCplusplus className="text-indigo-500" />,
};

export default function Onboarding({ user, className, ...props }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const [isScrolled, setIsScrolled] = useState(false);
    const config = genConfig(user.name);

    const totalSteps = 4;

    const handleContinue = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={cn(className)} {...props}>
            <Dialog
                onOpenChange={(open) => {
                    if (open) setStep(1);
                }}
            >
                <DialogTrigger asChild>
                    <Button className="text-muted-forground flex cursor-pointer border-none shadow-none hover:bg-transparent" variant="ghost">
                        <EllipsisVerticalIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent className="h-100 gap-0 overflow-y-auto p-0 [&>button:last-child]:text-white">
                    <div className="space-y-6 overflow-y-auto px-6 pt-6 pb-6">
                        <DialogHeader>
                            {step === 1 && (
                                <div className="flex flex-col items-start gap-4">
                                    <div className="flex w-full items-center justify-between">
                                        <Avatar className="h-20 w-auto">
                                            {user.avatar_url ? (
                                                <AvatarImage src={user.avatar_url} alt={user.name} className="h-20 w-20" />
                                            ) : (
                                                <AvatarGenenerator className="h-20 w-20" {...config} />
                                            )}
                                        </Avatar>
                                        <div className="flex w-full items-center justify-between text-left">
                                            <div className="ml-2 flex flex-col">
                                                <DialogTitle className=""> {user.name}</DialogTitle>
                                                <small className="text-muted flex-1 text-xs">Desde: {user.created_at}</small>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <Link href={''}>
                                                    <RiGithubFill />
                                                </Link>
                                                <Link href={''}>
                                                    <RiLinkedinBoxFill size={24} />
                                                </Link>
                                                <Link href={''}>
                                                    <RiDiscordFill size={24} />
                                                </Link>
                                                <Link href={''}>
                                                    <RiTwitterXFill size={22} />
                                                </Link>
                                                <Link href={''}>
                                                    <RiBlueskyFill size={22} />
                                                </Link>
                                                <Link href={''}>
                                                    <RiYoutubeFill size={22} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                        {devLanguages.map((lang, index) => (
                                            <Badge key={index} variant="outline" className="items-center gap-1.5">
                                                {langIcons[lang] || <FaCode className="text-muted-foreground" />}
                                                {lang}
                                            </Badge>
                                        ))}
                                    </div>
                                    <DialogDescription className="pt-2">{user.bio}</DialogDescription>
                                    <ScrollDown className="self-center" />
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
                        </DialogHeader>
                        <DialogFooter className="bg-background fixed right-0 bottom-0 left-0 z-10 flex w-full items-center justify-between border-t p-3">
                            <div className="max:order-1 flex justify-center space-x-1.5">
                                <div className={cn('bg-primary size-1.5 rounded-full', step === 1 ? 'bg-primary' : 'opacity-20')} />
                                <div className={cn('bg-primary size-1.5 rounded-full', step === 2 ? 'bg-primary' : 'opacity-20')} />
                                <div className={cn('bg-primary size-1.5 rounded-full', step === 3 ? 'bg-primary' : 'opacity-20')} />
                                <div className={cn('bg-primary size-1.5 rounded-full', step === 4 ? 'bg-primary' : 'opacity-20')} />
                            </div>
                            <div className="flex flex-1 items-center gap-2" />
                            {step > 1 && (
                                <Button className="group" type="button" onClick={handleBack} variant="ghost">
                                    <ArrowLeftIcon
                                        className="opacity-60 transition-transform group-hover:-translate-x-0.5"
                                        size={16}
                                        aria-hidden="true"
                                    />
                                    Voltar
                                </Button>
                            )}
                            {step < totalSteps ? (
                                <Button className="group" type="button" onClick={handleContinue}>
                                    Próximo
                                    <ArrowRightIcon
                                        className="opacity-60 transition-transform group-hover:translate-x-0.5"
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Button>
                            ) : (
                                <DialogClose asChild>
                                    <Button type="button">Okay</Button>
                                </DialogClose>
                            )}
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
