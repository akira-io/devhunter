import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import GenAvatar, { genConfig } from 'react-nice-avatar';

function shuffleArray<T>(array: T[]): T[] {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
}

export default function DevCount({ users, total }: { users: User[]; total: number }) {
    const shuffledUsers = shuffleArray<User>(users);
    return (
        <div className="bg-muted mt-2 flex items-center rounded-full">
            <div className="flex -space-x-4">
                {shuffledUsers.slice(0, 10).map((user) =>
                    user.avatar_url ? (
                        <Avatar className="h-auto w-10" key={user.email}>
                            <AvatarImage src={user.avatar_url} alt={user.name} key={user.email} />
                        </Avatar>
                    ) : (
                        <GenAvatar className="h-10 w-10" {...genConfig({ sex: 'man' })} key={user.email} />
                    ),
                )}
            </div>
            {total > 10 && (
                <Button
                    variant="outline"
                    className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full border-none bg-transparent px-2 text-xs shadow-none hover:bg-transparent"
                >
                    +{total - 10} devs
                </Button>
            )}
        </div>
    );
}
