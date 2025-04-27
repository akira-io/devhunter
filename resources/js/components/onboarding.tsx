import { HighlightedSkills } from '@/components/profile/HighlightedSkills';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTruncate } from '@/hooks/use-truncate-text';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { RiBlueskyFill, RiGithubFill, RiLinkedinBoxFill, RiTwitterXFill, RiYoutubeFill } from '@remixicon/react';
import { format } from 'date-fns';
import { ArrowLeftIcon, ArrowRightIcon, EllipsisVerticalIcon, Globe, GraduationCap } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import AvatarGenerator, { AvatarFullConfig, genConfig } from 'react-nice-avatar';

interface OnboardingProps extends React.ComponentProps<'div'> {
    user: User;
}

function OnboardingAvatar(props: { avatarUrl: string | undefined; alt: string; config: Required<AvatarFullConfig> }) {
    return (
        <Avatar className="h-20 w-auto">
            {props.avatarUrl ? (
                <AvatarImage src={props.avatarUrl} alt={props.alt} className="h-20 w-20" />
            ) : (
                <AvatarGenerator className="h-20 w-20" {...props.config} />
            )}
        </Avatar>
    );
}

function OnboardingLinks({ links }: { links: { name: string; url: string | undefined; icon: React.ReactNode }[] }) {
    return (
        <div className="flex gap-2">
            {links.map(
                (link) =>
                    link.url && (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                        >
                            {link.icon}
                        </a>
                    ),
            )}
        </div>
    );
}

function OnboardingSkills({ skills }: { skills: User['skills'] }) {
    return (
        <>
            <small>Skills</small>
            {skills?.length == 0 && <small className="dark:text-muted -mt-6 text-xs text-gray-300">nenhuma skill definida</small>}
            <div className="-mt-4 flex flex-wrap items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {skills && <HighlightedSkills techs={skills} />}
            </div>
        </>
    );
}

function OnboardingAbout({ about }: { about: string | undefined }) {
    return (
        <>
            <small>Sobre</small>
            {!about && <small className="dark:text-muted -mt-6 text-xs text-gray-300">nenhuma informação disponivel</small>}
            {about && <div className="-mt-4">{about}</div>}
        </>
    );
}

export default function Onboarding({ user, ...props }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(false);

    const links = [
        { name: 'GitHub', url: user.github_url, icon: <RiGithubFill /> },
        { name: 'Twitter', url: user.twitter_url, icon: <RiTwitterXFill /> },
        { name: 'YouTube', url: user.youtube_url, icon: <RiYoutubeFill /> },
        { name: 'LinkedIn', url: user.linkedin_url, icon: <RiLinkedinBoxFill /> },
        { name: 'Bluesky', url: user.bluesky_url, icon: <RiBlueskyFill /> },
        { name: 'Website', url: user.website_url, icon: <Globe /> },
    ];

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

    function nextStepLabel(step: number) {
        switch (step) {
            case 1:
                return 'Formação Acadêmica';
            case 2:
                return 'Exp.Profissional';
            case 3:
                return 'Projetos';
            default:
                return '';
        }
    }

    return (
        <div {...props}>
            <Card className="relative h-40 w-full cursor-pointer overflow-hidden" onClick={handleCardClick}>
                <CardContent className="flex w-full flex-1 items-start justify-center gap-4">
                    <OnboardingAvatar avatarUrl={user.avatar_url} alt={user.name} config={config} />
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
                    <div className="space-y-6 overflow-y-auto p-0 pt-0 pb-6 md:px-6">
                        <DialogHeader className="bg-background sticky -top-10 w-full shrink-0 items-center justify-between pt-4 pb-10">
                            <div className="flex w-full items-center justify-start pt-4">
                                <OnboardingAvatar avatarUrl={user.avatar_url} alt={user.name} config={config} />
                                <div className="ml-2 flex flex-col gap-2 text-left">
                                    <DialogTitle className="text-2xl">{user.name}</DialogTitle>
                                    <OnboardingLinks links={links} />
                                </div>
                            </div>
                        </DialogHeader>
                        {step === 1 && (
                            <div className="top-0 flex shrink-0 flex-col items-start gap-8">
                                <OnboardingSkills skills={user.skills} />
                                <OnboardingAbout about={user.bio} />
                            </div>
                        )}
                        {step === 2 && (
                            <>
                                <DialogTitle>Formação Academica</DialogTitle>
                                <DialogDescription className="space-y-2">
                                    {user.professional_educations?.map((education) => (
                                        <Card className="w-full items-start p-4" key={education.id}>
                                            <CardTitle className="flex w-full items-center gap-1 text-sm font-semibold">
                                                <GraduationCap /> {education.degree}
                                            </CardTitle>
                                            <CardContent className="-mt-2 grid w-full grid-cols-1 items-center gap-4 border-t-1 pt-4 md:grid-cols-2">
                                                <div className="flex flex-col items-start justify-start">
                                                    <small className="text-xs text-gray-500">Instituíção</small>
                                                    <span className="bold text-sm">{education.institution}</span>
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <small className="text-xs text-gray-500">Area de Estudo</small>
                                                    <span className="bold text-sm">{education.field_of_study}</span>
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <small className="text-xs text-gray-500">Inicio</small>
                                                    <span className="bold text-sm">{format(new Date(education.start_date), 'dd-MM-yyyy')}</span>
                                                </div>
                                                {education.end_date && (
                                                    <div className="flex flex-col items-start justify-start">
                                                        <small className="text-xs text-gray-500">Fim</small>
                                                        <span className="bold text-sm">{format(new Date(education.end_date), 'dd-MM-yyyy')}</span>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </DialogDescription>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <DialogTitle>Experiência Profissional</DialogTitle>
                                <DialogDescription>Begin building amazing interfaces with our comprehensive component library.</DialogDescription>
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <DialogTitle>Projetos</DialogTitle>
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
                                        {nextStepLabel(step)}
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
