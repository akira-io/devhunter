import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { ProfileCard } from '@/components/profile-card';
import { About } from '@/components/profile/About';
import { AcademicBackground } from '@/components/profile/AcademicBackground';
import { HighlightedProjects } from '@/components/profile/HighlightedProjects';
import { HighlightSkills } from '@/components/profile/HighlightSkills';
import { ProfileLinks } from '@/components/profile/Links';
import { ProfileCompletion } from '@/components/profile/ProfileCompletion';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Option } from '@/components/ui/multiselect';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type AcademicBackground as ProfessionalEducationType, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Award, PlusIcon } from 'lucide-react';
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
    highlightedSkills: Option[];
    academicBackgrounds: ProfessionalEducationType[];
    followers: number;
    followings: number;
}

export default function Profile({ mustVerifyEmail, status, skills, highlightedSkills, academicBackgrounds, followings, followers }: ProfileProps) {
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
            <div className="bg-background mx-auto flex max-w-6xl flex-col gap-4 text-gray-200 md:flex-row md:p-8">
                <aside className="bg-background flex w-full flex-shrink-0 flex-col items-center self-start p-6 md:sticky md:top-10 md:w-80">
                    <div className="mb-4 w-full md:hidden">
                        <ProfileCompletion academicBackgrounds={academicBackgrounds} skills={highlightedSkills} />
                    </div>
                    <Card className="gradient effect w-full items-center justify-center p-6 md:w-80">
                        <CardContent className="effect flex flex-col items-center text-center">
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
                        <div className="effect grid grid-cols-2 items-end justify-end gap-4">
                            <Link href={route('followable.followers')} className="flex gap-1 text-xs">
                                <b>{followers}</b> Hunters
                            </Link>
                            <Link href={route('followable.followings')} className="flex gap-1 text-xs">
                                <b>{followings}</b> Huntings
                            </Link>
                        </div>
                        <HighlightSkills skills={skills} authSkills={highlightedSkills} />
                        <p className="mt-0 border-t-1 py-2 text-xs text-gray-500">
                            Hunter desde de: <b>{auth.user.created_at}</b>
                        </p>
                    </Card>
                    <ProfileLinks user={auth.user} />
                </aside>
                <main className="flex-1 space-y-6 overflow-y-auto p-6">
                    <div className="hidden md:block">
                        <ProfileCompletion academicBackgrounds={academicBackgrounds} skills={highlightedSkills} />
                    </div>
                    <About />
                    <AcademicBackground academicBackgrounds={academicBackgrounds} />
                    <HighlightedProjects />
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
                                        Experiências Profissionais
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
                                    <div className="flex flex-col md:flex-row md:justify-end">
                                        <span className="text-muted-foreground text-md float-end flex-1">{data.bio.length} / 200</span>
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
                    <p className="text-muted-foreground text-md -mt-4">
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
                        <div className="text-md mt-2 font-medium text-green-600">
                            Um novo link de verificação foi enviado para o seu endereço de e-mail.
                        </div>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
