import AppLogo from '@/components/app-logo';
import DevCount from '@/components/dev-count';
import Onboarding from '@/components/Onboarding';
import { ScrollDown } from '@/components/scroll-down';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { type SharedData, User } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { RiDiscordFill, RiGithubFill } from '@remixicon/react';
import { Loader, LogInIcon, SearchIcon, UserPlus } from 'lucide-react';
import React, { useRef, useState } from 'react';

export interface WelcomeProps {
    users: User[];
    paginator: {
        data: User[];
        total: 0;
    };
}

export default function Welcome({ users, paginator }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;

    const [isSearchLoading, setIsSearchLoading] = useState(false);

    const initialUsersRef = useRef<User[]>(users);
    const initialTotalRef = useRef(paginator.total);

    const _users = initialUsersRef.current;
    const _total = initialTotalRef.current;

    function search(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setIsSearchLoading(true);
        router.get(
            route('home'),
            { q: e.target.value },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onFinish: () => {
                    setIsSearchLoading(false);
                },
            },
        );
    }

    const filteredUsers = users.length > 0 ? users.filter((user) => user.id !== auth.user.id) : paginator.data;

    return (
        <>
            <Head title="Dev Hunter">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="bg-background flex min-h-screen flex-col items-center justify-start bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8 dark:bg-[#0a0a0a]">
                <header className="bg-card fixed top-0 z-50 w-full bg-[#FDFDFC]/90 p-4 text-sm backdrop-blur md:px-40 dark:bg-[#0a0a0a]/90">
                    <nav className="flex items-center justify-end gap-4">
                        <AppLogo />
                        <div className="flex-1" />
                        {auth.user ? (
                            <Link
                                href={route('feed')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Hunt Line
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="flex items-center justify-center gap-2 rounded-sm border px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] md:border-transparent dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    <LogInIcon size={16} />
                                    Iniciar sessão
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="hidden items-center justify-center gap-2 rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] md:flex dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    <UserPlus size={16} />
                                    Criar conta
                                </Link>
                            </>
                        )}
                        <div className="flex items-center gap-2">
                            <a
                                className="cursor-pointer dark:text-white"
                                href="https://github.com/akira-io/devhunter"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <RiGithubFill />
                            </a>
                            <a
                                className="cursor-pointer dark:text-white"
                                href="https://discord.gg/ghPqZg3RcZ"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <RiDiscordFill />
                            </a>
                        </div>
                    </nav>
                </header>
                <div className="mb-50 flex w-full flex-col items-center justify-start opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className="mt-20 flex w-full flex-col items-center justify-center space-x-2 p-4 md:max-w-4xl lg:max-w-6xl">
                        <h1 className="text-4xl font-bold dark:text-white">Dev Hunter 🇨🇻</h1>
                        <p className="mb-10 max-w-2xl text-center text-lg font-normal text-[#1b1b18] dark:text-[#EDEDEC]">
                            O ponto de partida para inovação, colaboração e tecnologia em Cabo Verde. Um ecossistema digital onde projetos ganham vida
                            e talento local encontra visibilidade global.
                        </p>
                        <DevCount users={_users} total={_total} />
                    </div>
                    <div className="my-10 w-full max-w-xl dark:text-white">
                        <form className="relative mb-10 md:mb-20">
                            <Input
                                id="search"
                                className="peer dark:placeholder:text-muted dark:border-foreground h-12 border border-black ps-9 pe-9 placeholder:text-gray-500 dark:border-[#3E3E3A] dark:bg-[#0a0a0a]"
                                placeholder="procurar  desenvolvedores por nome, email, skills, etc.."
                                type="text"
                                name="query"
                                onChange={(e) => search(e)}
                            />
                            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                {!isSearchLoading ? <SearchIcon size={16} /> : <Loader className="animate-spin" size={16} />}
                            </div>
                        </form>
                    </div>
                    <div className="grid w-full max-w-7xl grid-cols-1 justify-center gap-4 transition-all duration-1 sm:grid-cols-2 md:px-10 xl:grid-cols-3">
                        {filteredUsers.map((user) => (
                            <Onboarding user={user} key={user.email} />
                        ))}
                    </div>
                    <ScrollDown className="bg-foreground fixed bottom-0 h-8 w-8 rounded-md text-white dark:text-zinc-900" />
                </div>
            </div>
            <Toaster />
        </>
    );
}
