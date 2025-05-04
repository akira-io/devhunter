import { CreateHunt } from '@/components/feed/CreateHunt';
import { FloatingCreateHunt } from '@/components/feed/FloatingCreateHunt';
import { HuntCard } from '@/components/feed/HuntCard';
import AppLayout from '@/layouts/app-layout';
import { useHuntStore } from '@/stores/huntStore';
import { type BreadcrumbItem, Hunt } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hunt Line',
        href: '/feed',
    },
];

interface HuntLineProps {
    hunts: {
        data: Hunt[];
    };
}

export default function HuntLine({ hunts }: HuntLineProps) {
    const { isFloatCreateHuntOpen } = useHuntStore();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="HuntLine" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {!isFloatCreateHuntOpen && <CreateHunt />}
                {hunts.data.map((hunt) => (
                    <HuntCard key={hunt.id} hunt={hunt} />
                ))}
            </div>
            <FloatingCreateHunt />
        </AppLayout>
    );
}
