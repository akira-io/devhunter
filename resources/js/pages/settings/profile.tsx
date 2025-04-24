import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { ProfileCard } from '@/components/profile-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { RiGithubFill } from '@remixicon/react';
import { Award, Code, EditIcon, GraduationCap, PlusIcon, Star, UserIcon } from 'lucide-react';
import { FormEventHandler, JSX, useState } from 'react';
import { FaCode, FaJava, FaJsSquare, FaPython } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { PiNotePencilBold } from 'react-icons/pi';
import { SiCplusplus, SiGo, SiRubyonrails, SiRust } from 'react-icons/si';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Definições de perfil',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    email: string;
    bio: string;
};

const devLanguages = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'Ruby', 'C++'];
const langIcons: Record<string, JSX.Element> = {
    JavaScript: <FaJsSquare className="text-yellow-500" />,
    Python: <FaPython className="text-blue-400" />,
    Go: <SiGo className="text-cyan-500" />,
    Rust: <SiRust className="text-orange-500" />,
    Java: <FaJava className="text-red-600" />,
    Ruby: <SiRubyonrails className="text-pink-500" />,
    'C++': <SiCplusplus className="text-indigo-500" />,
};

// function CustomCard({ title, className, icon, children }: CustomCardProps) {
//     return (
//         <Card className={cn('mt-4 w-full p-4', className)}>
//             <CardDescription className="flex items-center justify-between text-sm">
//                 {title}
//                 <Button variant="ghost">{icon}</Button>
//             </CardDescription>
//             <CardContent className="-mt-4 flex items-center justify-center gap-2 p-2">{children}</CardContent>
//         </Card>
//     );
// }

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const [openBioDialog, setOpenBioDialog] = useState(false);

    const { data, setData, patch, errors } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
        bio: auth.user.bio ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        setOpenBioDialog(false);

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Definições Perfil" />
            <div className="bg-background flex flex-col gap-4 text-gray-200 md:flex-row md:p-8">
                <aside className="bg-background flex w-full flex-shrink-0 flex-col items-center p-6 md:w-80">
                    {/* Avatar + Actions */}
                    <Card className="w-full items-center justify-center p-6 md:w-80">
                        <CardContent className="flex flex-col items-center text-center">
                            <img src={auth.user.avatar_url} alt="Avatar" className="mb-4 h-32 w-32 rounded-full object-cover" />
                            <h2 className="text-xl font-semibold">{auth.user.name}</h2>
                            <div className="space-y-2 text-center text-xs text-gray-400">
                                <p>{auth.user.email}</p>
                                <p>
                                    <span>Software Developer :</span> <b>Debtges</b>
                                </p>
                                <p className="flex items-center justify-center gap-1">
                                    <GoLocation /> {auth.user.location}
                                </p>
                            </div>
                        </CardContent>
                        <Button variant="default">
                            <Code />
                            Destacar tecnologias
                        </Button>
                        <div className="mt-2 flex flex-wrap items-center justify-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {devLanguages.map((lang, index) => (
                                <Badge key={index} variant="outline" className="items-center gap-1.5">
                                    {langIcons[lang] || <FaCode className="text-muted-foreground" />}
                                    {lang}
                                </Badge>
                            ))}
                        </div>
                        <p className="mt-0 border-t-1 py-2 text-xs text-gray-500">Embarcou na Dev Hunter em {auth.user.created_at}</p>
                    </Card>
                    <Card className="mt-4 w-full p-4 md:w-80">
                        <CardDescription className="flex items-center justify-between text-sm">
                            Links
                            <Button variant="ghost">
                                <PiNotePencilBold />
                            </Button>
                        </CardDescription>
                        <CardContent className="-mt-4 flex items-center justify-center gap-2 p-2">
                            <Badge className="h-10 w-10 p-0" variant="outline">
                                <RiGithubFill />
                            </Badge>
                            <Badge className="h-10 w-10 p-0" variant="outline">
                                <PlusIcon />
                            </Badge>
                            <Badge className="h-10 w-10 p-0" variant="outline">
                                <PlusIcon />
                            </Badge>
                            <Badge className="h-10 w-10 p-0" variant="outline">
                                <PlusIcon />
                            </Badge>
                            <Badge className="h-10 w-10 p-0" variant="outline">
                                <PlusIcon />
                            </Badge>{' '}
                            <Badge className="h-10 w-10 p-0" variant="outline">
                                <PlusIcon />
                            </Badge>
                        </CardContent>
                    </Card>
                </aside>
                {/* Main content */}
                <main className="flex-1 space-y-6 overflow-y-auto p-6">
                    {/* Complete your profile card */}
                    <section className="bg-background bg-background rounded-lg border p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Complete seu perfil</h3>
                                <p className="text-sm text-gray-400">Perfis completos atraem mais oportunidades!</p>
                            </div>
                            <span className="text-sm text-gray-400">25% completo</span>
                        </div>
                        <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-700">
                            <div className="h-full bg-green-500" style={{ width: '25%' }}></div>
                        </div>
                        {/* Checklist grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                'Informações básicas',
                                'Foto de perfil',
                                'Imagem de capa',
                                'Links',
                                'Sobre você',
                                'Destaques',
                                'Habilidades',
                                'Momento de carreira',
                            ].map((item, i) => {
                                const done = i % 3 === 1 || i % 4 === 3; // example marking some done
                                return (
                                    <label key={item} className="flex cursor-pointer items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={done}
                                            readOnly
                                            className="h-4 w-4 rounded border-gray-600 text-green-500 focus:ring-0"
                                        />
                                        <span className={`text-sm ${done ? 'text-gray-500 line-through' : ''}`}>{item}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </section>
                    {/* Sections: Sobre, Destaques */}
                    <section className="space-y-6">
                        <ProfileCard title="Apresentação" icon={auth?.user.bio ? <EditIcon /> : <PlusIcon />} onClick={() => setOpenBioDialog(true)}>
                            {!auth.user.bio && (
                                <>
                                    <UserIcon />
                                    <p className="max-w-100 text-center">
                                        Compartilhe um pouco sobre você e suas experiências. Isso ajudará os recrutadores a conhecerem melhor o seu
                                        perfil.
                                    </p>
                                </>
                            )}
                            <p className="block w-full break-all whitespace-normal">{auth.user.bio}</p>
                            <Dialog open={openBioDialog} onOpenChange={setOpenBioDialog}>
                                <DialogTrigger asChild>
                                    <Button variant="secondary">
                                        <UserIcon />
                                        {auth.user.bio ? 'Atualizar Apresentação' : 'Adicionar Apresentação'}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Apresentação</DialogTitle>
                                        <DialogDescription>
                                            Adicione uma breve descrição sobre você. Isso ajudará os recrutadores a conhecerem melhor o seu perfil.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Textarea id="bio" value={data.bio} onChange={(e) => setData('bio', e.target.value)} maxLength={200} />
                                    <InputError className="mt-2" message={errors.bio} />
                                    <div className="flex flex-col sm:flex-row sm:justify-end">
                                        <span className="text-muted-foreground float-end flex-1 text-sm">{data.bio.length} / 200</span>
                                        <Button onClick={submit}>Guardar</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </ProfileCard>
                        {/* Destaques */}
                        <ProfileCard title="Destaques" icon={<PlusIcon />}>
                            <Star />
                            <p className="mb-4 max-w-100 text-center">
                                Compartilhe o link dos seus melhores projetos para se destacar e conquistar oportunidades
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary">
                                        <Star />
                                        Adicionar Destaques
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Apresentação</DialogTitle>
                                        <DialogDescription>
                                            Adicione uma breve descrição sobre você. Isso ajudará os recrutadores a conhecerem melhor o seu perfil.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Textarea id="bio" value={data.bio} onChange={(e) => setData('bio', e.target.value)} maxLength={200} />
                                    <InputError className="mt-2" message={errors.bio} />
                                    <div className="flex flex-col sm:flex-row sm:justify-end">
                                        <span className="text-muted-foreground float-end flex-1 text-sm">{data.bio.length} / 200</span>
                                        <Button type="button" onClick={submit}>
                                            <DialogClose>Guardar</DialogClose>
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </ProfileCard>
                    </section>
                    <section className="space-y-6">
                        <ProfileCard title="Formação Académica" icon={<PlusIcon />}>
                            <GraduationCap />
                            <p className="mb-4 max-w-100 text-center">
                                Valorize seu currículo: destaque sua formação acadêmica e conquiste o reconhecimento que você merece!
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary">
                                        <GraduationCap />
                                        Adicionar Formação Académica
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Apresentação</DialogTitle>
                                        <DialogDescription>
                                            Adicione uma breve descrição sobre você. Isso ajudará os recrutadores a conhecerem melhor o seu perfil.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Textarea id="bio" value={data.bio} onChange={(e) => setData('bio', e.target.value)} maxLength={200} />
                                    <InputError className="mt-2" message={errors.bio} />
                                    <div className="flex flex-col sm:flex-row sm:justify-end">
                                        <span className="text-muted-foreground float-end flex-1 text-sm">{data.bio.length} / 200</span>
                                        <Button type="button" onClick={submit}>
                                            <DialogClose>Guardar</DialogClose>
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </ProfileCard>
                    </section>
                    <section className="space-y-6">
                        <ProfileCard title="Habilidades" icon={<PlusIcon />}>
                            <Award />
                            <p className="mb-4 max-w-100 text-center">
                                Potencialize sua trajetória: destaque suas principais habilidades e abra portas para novas oportunidades!
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary">
                                        <Award />
                                        Adicionar Habilidades
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Apresentação</DialogTitle>
                                        <DialogDescription>
                                            Adicione uma breve descrição sobre você. Isso ajudará os recrutadores a conhecerem melhor o seu perfil.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Textarea id="bio" value={data.bio} onChange={(e) => setData('bio', e.target.value)} maxLength={200} />
                                    <InputError className="mt-2" message={errors.bio} />
                                    <div className="flex flex-col sm:flex-row sm:justify-end">
                                        <span className="text-muted-foreground float-end flex-1 text-sm">{data.bio.length} / 200</span>
                                        <Button type="button" onClick={submit}>
                                            <DialogClose>Guardar</DialogClose>
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </ProfileCard>
                    </section>
                    <section className="space-y-6">
                        <ProfileCard title="Eliminar Conta">
                            <DeleteUser />
                        </ProfileCard>
                    </section>
                </main>
            </div>
            {mustVerifyEmail && auth.user.email_verified_at === null && (
                <div>
                    <p className="text-muted-foreground -mt-4 text-sm">
                        O seu endereço de e-mail não está verificado.
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                        >
                            Click aqui para reenviar o e-mail de verificação.
                        </Link>
                    </p>
                    {status === 'verification-link-sent' && (
                        <div className="mt-2 text-sm font-medium text-green-600">
                            Um novo link de verificação foi enviado para o seu endereço de e-mail.
                        </div>
                    )}
                </div>
            )}
            {/*        <div className="flex items-center gap-4">*/}
            {/*            <Button disabled={processing}>Save</Button>*/}
            {/*            <Transition*/}
            {/*                show={recentlySuccessful}*/}
            {/*                enter="transition ease-in-out"*/}
            {/*                enterFrom="opacity-0"*/}
            {/*                leave="transition ease-in-out"*/}
            {/*                leaveTo="opacity-0"*/}
            {/*            >*/}
            {/*                <p className="text-sm text-neutral-600"> Guardado</p>*/}
            {/*            </Transition>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </AppLayout>
    );
}
