import Onboarding from '@/components/Onboarding';
import Layout from '@/layouts/app-layout';
import { type BreadcrumbItem, User } from '@/types';
import { Head } from '@inertiajs/react';

interface FollowingsProps {
    followings: [{ followable: User }];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Seguidores',
        href: '/followable/follower',
    },
];
export default function followings({ followings }: FollowingsProps) {
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="Seguidores" />
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 justify-center gap-4 p-5 transition-all duration-1 sm:grid-cols-2 md:px-10 xl:grid-cols-3">
                {followings.map((following) => (
                    <Onboarding user={following.followable} key={following.followable.email} hasFollowed />
                ))}
            </div>
        </Layout>
    );
}
