import { ProjectCard } from '@/components/project-card';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const projects = [
    {
        title: 'Notifica',
        description: 'Conectamos empresas a clientes, tornando a comunicação direta mais eficiente em tempo real.',
        tags: ['Comunicação', 'SAAS', 'B2B'],
        count: 10,
        image: 'https://hubdigital.cv/assets/notifika-CREwZX7D.webp',
    },
    {
        title: 'NhaFarma',
        description: 'Encontre farmácias de serviço em Cabo Verde, com praticidade e eficiência.',
        tags: ['Informação', 'SAAS', 'B2C'],
        count: 4,
        image: 'https://hubdigital.cv/assets/nhafarmacia-DeJCAnty.webp',
    },
    {
        title: 'Calendário.cv',
        description: 'Tudo sobre Cabo Verde, eventos, datas importantes e muito mais.',
        tags: ['Informação', 'SAAS', 'B2C'],
        count: 2,
        image: 'https://hubdigital.cv/assets/calendarios-DiGAILHs.webp',
    },
    {
        title: 'Less',
        description: 'O Less automatiza a criação, o gerenciamento e a implantação de sua infraestrutura de nuvem',
        tags: ['Serviço', 'Cloud', 'B2B'],
        count: 1,
        image: 'data:image/webp;base64,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',
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
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full flex-col items-center justify-start opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className="my-20 flex w-full max-w-[335px] flex-col items-center justify-center gap-2 lg:max-w-4xl">
                        <h1 className={'text-4xl font-bold dark:text-white'}>HubDigital Cabo Verde</h1>
                        <p className={'max-w-[700px] text-center text-lg font-normal text-[#1b1b18] dark:text-[#EDEDEC]'}>
                            Um Hub digital de código aberto para impulsionar a inovação em Cabo Verde, meio para descrobir partilhar e apoiar projetos
                            e produtos criados por caboverdianos e para caboverdianos.
                        </p>
                    </div>
                    <main className="mt-10 grid max-w-fit grid-cols-1 gap-4">
                        {projects.map((project) => (
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                tags={project.tags}
                                key={project.title}
                                count={project.count}
                                image={project.image}
                            />
                        ))}
                    </main>
                </div>
                {/*<div className="flex h-14.5 flex-col items-center dark:text-gray-500">*/}
                {/*    <span className="text-xl">Servindo Cabo Verde ♥️</span>*/}
                {/*    <span>*/}
                {/*        Fundado por{' '}*/}
                {/*        <b>*/}
                {/*            <Link target="_blank" href="https://nunolima.cv/">*/}
                {/*                Nuno Lima*/}
                {/*            </Link>*/}
                {/*        </b>{' '}*/}
                {/*        em 11 Abril 2023*/}
                {/*    </span>*/}
                {/*    <span>*/}
                {/*        Powered by{' '}*/}
                {/*        <b>*/}
                {/*            <Link href="https://akira-io.com">Akira Corporation</Link>*/}
                {/*        </b>*/}
                {/*    </span>*/}
                {/*</div>*/}
            </div>
        </>
    );
}
