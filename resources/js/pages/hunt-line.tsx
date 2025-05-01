import { CreateHunt } from '@/components/feed/CreateHunt';
import { FloatingCreateHunt } from '@/components/feed/FloatingCreateHunt';
import { HuntCard } from '@/components/feed/HuntCard';
import AppLayout from '@/layouts/app-layout';
import { useTweetStore } from '@/stores/tweet';
import { type BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hunt Line',
        href: '/feed',
    },
];

export default function HuntLine() {
    const { auth } = usePage<SharedData>().props;
    const tweets = [
        {
            id: 1,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'John Doe',
                avatar_url: auth.user.avatar_url,
            },
            time: '2h ago',
            comments: 12,
            retweets: 5,
            likes: 20,
            views: 100,
            imageUrl:
                'https://images.unsplash.com/photo-1516820827855-3ea1bd6f79ea?q=80&w=1482&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 2,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'Jane Smith',
                avatar_url: auth.user.avatar_url,
            },
            time: '3h ago',
            comments: 8,
            retweets: 3,
            likes: 15,
            views: 80,
        },
        {
            id: 3,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'Jane Smith',
                avatar_url: auth.user.avatar_url,
            },
            time: '3h ago',
            comments: 8,
            retweets: 3,
            likes: 15,
            views: 80,
        },
        {
            id: 4,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'Jane Smith',
                avatar_url: auth.user.avatar_url,
            },
            time: '3h ago',
            comments: 8,
            retweets: 3,
            likes: 15,
            views: 80,
        },
        {
            id: 5,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'Jane Smith',
                avatar_url: auth.user.avatar_url,
            },
            time: '3h ago',
            comments: 8,
            retweets: 3,
            likes: 15,
            views: 80,
        },
        {
            id: 6,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'Jane Smith',
                avatar_url: auth.user.avatar_url,
            },
            time: '3h ago',
            comments: 8,
            retweets: 3,
            likes: 15,
            views: 80,
        },
        {
            id: 7,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'Jane Smith',
                avatar_url: auth.user.avatar_url,
            },
            time: '3h ago',
            comments: 8,
            retweets: 3,
            likes: 15,
            views: 80,
        },
        {
            id: 8,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'Jane Smith',
                avatar_url: auth.user.avatar_url,
            },
            time: '3h ago',
            comments: 8,
            retweets: 3,
            likes: 15,
            views: 80,
        },
        {
            id: 9,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'Jane Smith',
                avatar_url: auth.user.avatar_url,
            },
            time: '3h ago',
            comments: 8,
            retweets: 3,
            likes: 15,
            views: 80,
        },
        {
            id: 10,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'Jane Smith',
                avatar_url: auth.user.avatar_url,
            },
            time: '3h ago',
            comments: 8,
            retweets: 3,
            likes: 15,
            views: 80,
        },
        {
            id: 11,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: {
                name: 'Jane Smith',
                avatar_url: auth.user.avatar_url,
            },
            time: '3h ago',
            comments: 8,
            retweets: 3,
            likes: 15,
            views: 80,
        },
    ];

    const { isFloatCreateTweetOpen } = useTweetStore();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="HuntLine" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {!isFloatCreateTweetOpen && <CreateHunt />}
                {tweets.map((tweet) => (
                    <HuntCard
                        key={tweet.id}
                        avatarUrl={tweet.user.avatar_url}
                        name={tweet.user.name}
                        userName={auth.user.name}
                        time={tweet.time}
                        content={tweet.content}
                        imageUrl={tweet.imageUrl}
                        comments={tweet.comments}
                        retweets={tweet.retweets}
                        likes={tweet.likes}
                        views={tweet.views}
                    />
                ))}
            </div>
            <FloatingCreateHunt />
        </AppLayout>
    );
}
