import { DevMiniCard } from '@/components/dev-mini-card';
import { Input } from '@/components/ui/input';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';

const devs = [
    {
        title: 'Kidiatoliny Gonçalves',
        description: 'Fullstack developer com experiência em React, Laravel e React Native.',
        tags: [
            'React',
            'Laravel',
            'React Native',
            'Alpine',
            'React',
            'Laravel',
            'React Native',
            'Alpine',
            'React',
            'Laravel',
            'React Native',
            'Alpine',
            'React',
            'Laravel',
            'React Native',
            'Alpine',
        ],
        count: 10,
        image: 'https://github.com/kidiatoliny.png',
    },
    {
        title: 'Liedson de Correia',
        description: 'Fullstack developer com experiência em React, Laravel e React Native.',
        tags: ['React', 'Laravel', 'React Native', 'Alpine'],
        count: 4,
        image: 'https://github.com/liedsonc.png',
    },

    {
        title: 'Rubens Junior',
        description: 'Fullstack developer com experiência em React, Laravel e React Native.',
        tags: ['React', 'Laravel', 'React Native', 'Alpine'],
        count: 4,
        image: 'https://github.com/sivygomes.png',
    },
    {
        title: 'Josimar Bazilio',
        description: 'Fullstack developer com experiência em React, Laravel e React Native.',
        tags: ['React', 'Laravel', 'React Native', 'Alpine'],
        count: 4,
        image: 'https://github.com/josimar7.png',
    },
];

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
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
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Iniciar sessão
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Criar conta
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full flex-col items-center justify-start opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className="my-20 flex w-full max-w-[335px] flex-col items-center justify-center gap-2 lg:max-w-4xl">
                        <h1 className={'text-4xl font-bold dark:text-white'}>Dev Hunter 🇨🇻</h1>
                        <p className={'max-w-[700px] text-center text-lg font-normal text-[#1b1b18] dark:text-[#EDEDEC]'}>
                            O ponto de partida para inovação, colaboração e tecnologia em Cabo Verde. Um ecossistema digital onde projetos ganham vida
                            e talento local encontra visibilidade global.
                        </p>
                        <div className="my-10 w-full dark:text-white">
                            <div className="relative">
                                <Input id="search" className="peer h-12 border ps-9 pe-9" placeholder="procurar..." type="search" />
                                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                    <SearchIcon size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <main className="grid max-w-fit gap-4 md:grid-cols-2">
                        {devs.map((dev) => (
                            <DevMiniCard title={dev.title} description={dev.description} key={dev.title} image={dev.image} />
                        ))}
                    </main>
                </div>
            </div>
        </>
    );
}
