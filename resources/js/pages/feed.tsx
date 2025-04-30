import { CreateTweet } from '@/components/feed/CreateTweet';
import { FloatingCreatePost } from '@/components/feed/FloatingCreatePost';
import { TweetCard } from '@/components/feed/TweetCard';
import AppLayout from '@/layouts/app-layout';
import { useTweetStore } from '@/stores/tweet';
import { type BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Feed',
        href: '/feed',
    },
];

export default function Feed() {
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
    ];

    const { isFloatCreateTweetOpen } = useTweetStore();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feed" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {!isFloatCreateTweetOpen && <CreateTweet />}
                {tweets.map((tweet) => (
                    <TweetCard
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
            <FloatingCreatePost />
        </AppLayout>
    );
}
