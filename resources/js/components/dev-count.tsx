import { Button } from '@/components/ui/button';
import { User } from '@/types';
import Avatar, { genConfig } from 'react-nice-avatar';

function shuffleArray<T>(array: T[]): T[] {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
}

export default function DevCount({ users }: { users: User[] }) {
    const shuffledUsers = shuffleArray(users);
    return (
        <div className="bg-muted mt-2 flex items-center rounded-full">
            <div className="flex -space-x-3">
                {shuffledUsers.map((user) => (
                    <Avatar key={user.email} className="border-muted bg-background h-10 w-10 border-2" {...genConfig(user.name || user.email)} />
                ))}
            </div>
            <Button
                variant="secondary"
                className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent px-3 text-xs shadow-none hover:bg-transparent"
            >
                +{users.length} devs
            </Button>
        </div>
    );
}
