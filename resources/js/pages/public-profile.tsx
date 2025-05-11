import { HuntCard } from '@/components/feed/HuntCard';
import { FollowButton } from '@/components/followable/FollowButton';
import UnfollowButton from '@/components/followable/UnfollowButton';
import Onboarding, { OnboardingAvatar } from '@/components/Onboarding';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { Hunt, User } from '@/types';
import { Head } from '@inertiajs/react';
import { EyeIcon, GraduationCapIcon, LucideProps, MonitorUpIcon, NetworkIcon, UserIcon } from 'lucide-react';

type TabList = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
    title: string;
};

interface PublicProfileProps {
    user: User;
    hunters: User[];
    huntings: User[];
    hunts: {
        data: Hunt[];
    };
}

const tabLists: TabList[] = [
    { title: 'Hunts', icon: MonitorUpIcon },
    { title: 'Hunters', icon: EyeIcon },
    { title: 'Huntings', icon: NetworkIcon },
    { title: 'Sobre', icon: UserIcon },
];

function ProfileBg() {
    return (
        <div className="h-20 md:h-40">
            <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden rounded-2xl">
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                    <img
                        className="size-full object-cover brightness-40 grayscale"
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
            <div className="grid grid-cols-1 items-start justify-start gap-6 pt-2 sm:grid-cols-2 sm:gap-8 sm:pt-4">
                <div className="grid grid-cols-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-start">
                        <h1 className="flex items-center gap-2 text-xl font-bold">{user.name}</h1>
                    </div>
                    <div className="space-x-2 text-xs">
                        {user.github_user_name && <span className="text-muted-foreground">@{user.github_user_name}</span>}
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

function MobileTabList() {
    return (
        <TabsList className="gradient relative z-20 mx-auto flex w-full sm:hidden">
            {tabLists.map((tab, index) => (
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>
                                <TabsTrigger value={`tab-${index + 1}`} className="py-1.5">
                                    <Icon iconNode={tab.icon} aria-hidden="true" />
                                </TabsTrigger>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent className="px-2 py-1 text-xs">{tab.title}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </TabsList>
    );
}

function DesktopTabList() {
    return (
        <TabsList className="gradient relative z-20 m-3 mx-auto hidden w-full sm:flex">
            {tabLists.map((tab, index) => (
                <TabsTrigger value={`tab-${index + 1}`} className="cursor-pointer">
                    <Icon iconNode={tab.icon} aria-hidden="true" />
                    {tab.title}
                </TabsTrigger>
            ))}
        </TabsList>
    );
}

function NoData(props: { count: number }) {
    return <>{props.count === 0 && <p className="text-muted text-center">Sem dados a apresentar</p>}</>;
}

function About({ user }: { user: User }) {
    const tabLists: TabList[] = [
        { title: 'Bio', icon: UserIcon },
        {
            title: 'Formação',
            icon: GraduationCapIcon,
        },
    ];
    return (
        <Tabs defaultValue="tab-1" orientation="vertical" className="w-full md:mt-4 md:flex-row">
            <TabsList className="text-foreground mb-4 gap-1 rounded-none !bg-transparent md:flex-col dark:bg-none">
                {tabLists.map((tab, index) => (
                    <TabsTrigger
                        value={`tab-${index + 1}`}
                        className="hover:bg-accent hover:text-foreground data-[state=active]:hover:bg-accent data-[state=active]:bg-muted relative flex w-full items-center justify-center justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:shadow-none data-[state=active]:after:bg-transparent"
                    >
                        <Icon iconNode={tab.icon} aria-hidden="true" />
                        <span> {tab.title}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
            <div className="-mt-3 grow rounded-md border text-start">
                <TabsContent value="tab-1">
                    <p className="text-muted-foreground px-4 py-3 text-sm">{user.bio}</p>
                </TabsContent>
            </div>
        </Tabs>
    );
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
                <div className="mt-4 w-full max-w-2xl items-center px-2">
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
                                    <HuntCard key={hunt.id} hunt={hunt} ligatures={false} />
                                ))}
                            </TabsContent>
                            <TabsContent value="tab-2">
                                <Hunters hunters={hunters} />
                            </TabsContent>
                            <TabsContent value="tab-3" className="">
                                <Hunters hunters={huntings} />
                            </TabsContent>
                            <TabsContent value="tab-4" className="">
                                <Card className="px-4">
                                    <About user={user} />
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </div>
            </div>
        </AppLayout>
    );
}
