import { SectionHeader } from '@/components/feed/SectionHeader';
import Onboarding from '@/components/Onboarding';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/app-layout';
import { type BreadcrumbItem, User } from '@/types';
import { Head } from '@inertiajs/react';
import { ListFilterPlusIcon } from 'lucide-react';

interface FollowingsProps {
    followings: [{ followable: User }];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Trackers',
        href: '/followable/follower',
    },
];
export default function Trackers({ followings }: FollowingsProps) {
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="Seguindo" />
            <div className="mb-4 flex items-start justify-between px-5">
                <SectionHeader title="Trackers" description="São hunters que admiras, que te inspiram e te fazem querer evoluir." />
                <Button className="text-muted-forground flex h-8 w-8 cursor-pointer border-none shadow-none" variant="secondary">
                    <ListFilterPlusIcon />
                </Button>
            </div>
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 justify-center gap-4 p-5 transition-all duration-1 sm:grid-cols-2 md:px-10 xl:grid-cols-3">
                {followings.map((following) => (
                    <Onboarding user={following.followable} key={following.followable.email} hasFollowed />
                ))}
            </div>
        </Layout>
    );
}
