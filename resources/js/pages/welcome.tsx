import AppLogo from '@/components/app-logo';
import DevCount from '@/components/dev-count';
import Onboarding from '@/components/Onboarding';
import { ScrollDown } from '@/components/scroll-down';
import { Input } from '@/components/ui/input';
import { type SharedData, User } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Loader, LogInIcon, SearchIcon, UserPlus } from 'lucide-react';
import React, { FormEvent, useState } from 'react';

export interface DataProps {
    total: number;
    data: User[];
}

export default function Welcome({ users }: { users: DataProps }) {
    const { auth } = usePage<SharedData>().props;

    const [isSearchLoading, setIsSearchLoading] = useState(false);

    const { data, setData } = useForm({
        query: '',
    });

    function search(e: FormEvent) {
        e.preventDefault();
        setIsSearchLoading(true);
        router.get(
            route('home'),
            { q: data.query },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ['users'],
                onFinish: () => {
                    setIsSearchLoading(false);
                },
            },
        );
    }

    function getOnChange() {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setData({ query: value });

            if (value.trim() === '') {
                setIsSearchLoading(true);
                router.get(
                    route('home'),
                    { q: data.query },
                    {
                        preserveScroll: true,
                        preserveState: true,
                        replace: true,
                        only: ['users'],
                        onFinish: () => setIsSearchLoading(false),
                    },
                );
            }
        };
    }

    return (
        <>
            <Head title="Dev Hunter">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-start bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8 dark:bg-[#0a0a0a]">
                <header className="fixed top-0 z-50 w-full bg-[#FDFDFC]/90 p-4 text-sm backdrop-blur md:px-40 dark:bg-[#0a0a0a]/90">
                    <nav className="flex items-center justify-end gap-4">
                        <AppLogo />
                        <div className="flex-1" />
                        {auth.user ? (
                            <Link
                                href={route('feed')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Feed
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
                    </nav>
                </header>
                <div className="mb-50 flex w-full flex-col items-center justify-start opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className="mt-20 flex w-full flex-col items-center justify-center gap-2 md:max-w-4xl lg:max-w-6xl">
                        <h1 className="text-4xl font-bold dark:text-white">Dev Hunter 🇨🇻</h1>
                        <p className="mb-10 max-w-2xl text-center text-lg font-normal text-[#1b1b18] dark:text-[#EDEDEC]">
                            O ponto de partida para inovação, colaboração e tecnologia em Cabo Verde. Um ecossistema digital onde projetos ganham vida
                            e talento local encontra visibilidade global.
                        </p>
                        <DevCount users={users} />
                    </div>
                    <div className="my-10 w-full max-w-xl dark:text-white">
                        <form className="relative mb-10 md:mb-20" onSubmit={search}>
                            <Input
                                id="search"
                                className="peer placeholder:text-foreground-muted h-12 border ps-9 pe-9"
                                placeholder="(nome, email ou skills) e pressione ENTER"
                                type="search"
                                name="query"
                                onChange={getOnChange()}
                            />
                            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                {!isSearchLoading ? <SearchIcon size={16} /> : <Loader className="animate-spin" size={16} />}
                            </div>
                        </form>
                    </div>
                    {!isSearchLoading && (
                        <div className="grid w-full max-w-7xl grid-cols-1 justify-center gap-4 transition-all duration-1 md:grid-cols-2 md:px-10 xl:grid-cols-3">
                            {users.data.map((user) => (
                                <Onboarding user={user} key={user.email} />
                            ))}
                        </div>
                    )}
                    <ScrollDown className="bg-foreground fixed bottom-0 h-8 w-8 rounded-md text-white dark:text-zinc-900" />
                </div>
            </div>
        </>
    );
}
