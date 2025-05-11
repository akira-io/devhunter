import { HuntCard } from '@/components/feed/HuntCard';
import { FollowButton } from '@/components/followable/FollowButton';
import UnfollowButton from '@/components/followable/UnfollowButton';
import Onboarding, { OnboardingAvatar } from '@/components/Onboarding';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { Hunt, User } from '@/types';
import { Head } from '@inertiajs/react';
import { EyeIcon, Globe, MonitorUpIcon, NetworkIcon, UserIcon } from 'lucide-react';

interface PublicProfileProps {
    user: User;
    hunters: User[];
    huntings: User[];
    hunts: {
        data: Hunt[];
    };
}

function ProfileBg() {
    return (
        <div className="h-20 md:h-40">
            <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden rounded-2xl">
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                    <img
                        className="size-full object-cover"
                        src="https://images.unsplash.com/photo-1746768934151-8c5cb84bcf11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Default profile background"
                    />
                </div>
            </div>
        </div>
    );
}

function Avatar({ user, huntingsCount, huntersCount, huntsCount }: { user: User; huntingsCount: number; huntersCount: number; huntsCount: number }) {
    const isMobile = useIsMobile();
    return (
        <div className="flex items-start justify-start">
            <div className="-mt-10 px-2 md:px-6">
                <div className="border-background bg-muted relative flex size-20 overflow-hidden rounded-full border-4 shadow-xs shadow-black/10 md:size-32">
                    <OnboardingAvatar avatarUrl={user.avatar_url} size={isMobile ? 20 : 32} />
                </div>
            </div>
            <div className="grid grid-cols-1 items-start justify-start gap-4 pt-2 md:grid-cols-2 md:pt-4">
                <div className="grid grid-cols-1">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-start">
                        <h1 className="flex items-center gap-2 text-xl font-bold">{user.name}</h1>
                    </div>
                    <div className="space-x-2 text-xs">
                        <span className="text-muted-foreground">@{user.github_user_name}</span>
                        <span className="text-muted-foreground">{user.location}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">{user.email}</span>
                </div>
                <div className="flex w-full flex-col items-end justify-end gap-2">
                    <div className="flex items-center justify-start gap-2">
                        <span className="text-muted-foreground text-sm">
                            <b>{huntersCount}</b> hunters
                        </span>
                        <span className="text-muted-foreground text-sm">
                            <b>{huntingsCount}</b> huntings
                        </span>
                        <span className="text-muted-foreground text-sm">
                            <b>{huntsCount}</b> hunts
                        </span>
                    </div>
                    <div className="flex w-full items-end justify-end gap-2">
                        {!user.has_followed && <FollowButton user={user} className="w-full" />}
                        {user.has_followed && <UnfollowButton user={user} className="w-full" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MobileTabList() {
    return (
        <TabsList className="relative z-50 mx-auto flex w-full md:hidden">
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>
                            <TabsTrigger value="tab-1" className="py-1.5">
                                <MonitorUpIcon size={16} aria-hidden="true" />
                            </TabsTrigger>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Hunts</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>
                            <TabsTrigger value="tab-2" className="py-1">
                                <EyeIcon size={16} aria-hidden="true" />
                            </TabsTrigger>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Hunters</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>
                            <TabsTrigger value="tab-3" className="py-1">
                                <NetworkIcon size={16} aria-hidden="true" />
                            </TabsTrigger>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Huntings</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>
                            <TabsTrigger value="tab-4" className="py-1">
                                <Globe size={16} aria-hidden="true" />
                            </TabsTrigger>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Links</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>
                            <TabsTrigger value="tab-5" className="py-1">
                                <UserIcon size={16} aria-hidden="true" />
                            </TabsTrigger>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Sobre</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </TabsList>
    );
}

function Hunters({ hunters }: { hunters: User[] }) {
    return (
        <>
            <NoData count={hunters.length} />
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {hunters.map((hunter) => (
                    <Onboarding user={hunter} key={hunter.id} />
                ))}
            </div>
        </>
    );
}

function DesktopTabList() {
    return (
        <TabsList className="relative z-50 m-3 mx-auto hidden w-full md:flex">
            <TabsTrigger value="tab-1">
                <MonitorUpIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Hunts
            </TabsTrigger>
            <TabsTrigger value="tab-2" className="group">
                <EyeIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Hunters
            </TabsTrigger>
            <TabsTrigger value="tab-3" className="group">
                <NetworkIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Huntings
            </TabsTrigger>
            <TabsTrigger value="tab-4" className="group">
                <Globe className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Links
            </TabsTrigger>
            <TabsTrigger value="tab-5" className="group">
                <UserIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Sobre
            </TabsTrigger>
        </TabsList>
    );
}

function NoData(props: { count: number }) {
    return <>{props.count === 0 && <p className="text-muted text-center">Sem dados a apresentar</p>}</>;
}

export default function PublicProfile({ user, hunts, hunters, huntings }: PublicProfileProps) {
    return (
        <AppLayout>
            <Head title={`Perfil: ${user.name}`} />
            <div className="flex w-full flex-col items-center justify-start px-2 opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                <Card className="w-full max-w-2xl items-center overflow-y-auto">
                    <CardDescription className="w-full px-4">
                        <ProfileBg />
                        <Avatar user={user} huntersCount={hunters.length} huntingsCount={huntings.length} huntsCount={hunts.data.length} />
                    </CardDescription>
                </Card>
                <div className="sticky top-10 mt-4 w-full max-w-2xl items-center px-4">
                    <CardContent className="w-full items-center justify-start px-2">
                        <Tabs defaultValue="tab-1">
                            <ScrollArea>
                                <MobileTabList />
                                <DesktopTabList />
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                            <TabsContent value="tab-1">
                                <NoData count={hunts.data.length} />
                                {hunts.data.map((hunt) => (
                                    <HuntCard key={hunt.id} hunt={hunt} />
                                ))}
                            </TabsContent>
                            <TabsContent value="tab-2">
                                <Hunters hunters={hunters} />
                            </TabsContent>
                            <TabsContent value="tab-3" className="">
                                <Hunters hunters={huntings} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </div>
            </div>
        </AppLayout>
    );
}
