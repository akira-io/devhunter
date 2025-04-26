import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { ProfileCard } from '@/components/profile-card';
import { About } from '@/components/profile/about';
import { HighlightSkills } from '@/components/profile/highlight-skills';
import { Highlights } from '@/components/profile/highlights';
import { ProfileLinks } from '@/components/profile/links';
import { Skills } from '@/components/profile/skills';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Option } from '@/components/ui/multiselect';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Award, GraduationCap, PlusIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { GoLocation } from 'react-icons/go';
import AvatarGenerator, { genConfig } from 'react-nice-avatar';

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

interface ProfileProps {
    mustVerifyEmail: boolean;
    status?: string;
    skills: Option[];
    authSkills: Option[];
}

export default function Profile({ mustVerifyEmail, status, skills, authSkills }: ProfileProps) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
        bio: auth.user.bio ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };
    const config = genConfig({ sex: 'man', hairStyle: 'thick' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Definições Perfil" />
            <div className="bg-background flex flex-col gap-4 text-gray-200 md:flex-row md:p-8">
                <aside className="bg-background flex w-full flex-shrink-0 flex-col items-center p-6 md:w-80">
                    {/* Avatar + Actions */}
                    <Card className="w-full items-center justify-center p-6 md:w-80">
                        <CardContent className="flex flex-col items-center text-center">
                            {/*<img src={auth.user.avatar_url} alt="Avatar" />*/}
                            <Avatar className="h-32 w-auto">
                                {auth.user.avatar_url ? (
                                    <AvatarImage
                                        src={auth.user.avatar_url}
                                        alt={auth.user.name}
                                        className="mb-4 h-32 w-32 rounded-full object-cover"
                                    />
                                ) : (
                                    <AvatarGenerator className="mb-4 h-32 w-32 rounded-full object-cover" {...config} />
                                )}
                            </Avatar>
                            <h2 className="mt-4 text-xl font-semibold">{auth.user.name}</h2>
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
                        <HighlightSkills skills={skills} authSkills={authSkills} />
                        <div className="mt-2 flex flex-wrap items-center justify-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {authSkills && authSkills.length && <Skills techs={authSkills} />}
                        </div>
                        <p className="mt-0 border-t-1 py-2 text-xs text-gray-500">Embarcou na Dev Hunter em {auth.user.created_at}</p>
                    </Card>
                    <ProfileLinks user={auth.user} />
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
                    <About />
                    <Highlights />
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
