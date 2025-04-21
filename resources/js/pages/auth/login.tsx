import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, LogInIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { RiGithubFill } from '@remixicon/react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [loadingGithub, setLoadingGithub] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGithubLogin = () => {
        setLoadingGithub(true);
        window.location.assign(route('github.login'));
    };

    return (
        <AuthLayout title="Login" description="Iniciar sessão na sua conta">
            <Head title="Login" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Esqueci-me da password
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Lembrar-me</Label>
                    </div>
                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LogInIcon />}
                        Iniciar sessão
                    </Button>
                    <Button variant="outline" type="button" className="w-full" onClick={handleGithubLogin} tabIndex={6} disabled={loadingGithub}>
                        {loadingGithub ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                            <RiGithubFill className="me-1 text-[#333333] dark:text-white/60" size={16} aria-hidden="true" />
                        )}
                        Login com GitHub
                    </Button>
                </div>
                <div className="text-muted-foreground text-center text-sm">
                    Você não tem uma conta?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Criar conta
                    </TextLink>
                </div>
            </form>
            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
