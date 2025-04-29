import Layout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';

interface FollowersProps {
    followers: User[];
}

export default function followers({ followers }: FollowersProps) {
    return (
        <Layout>
            <Head title="Seguidores" />
            <h1>Seguidores</h1>
            <span className="text-white"> {JSON.stringify(followers)}</span>
        </Layout>
    );
}
