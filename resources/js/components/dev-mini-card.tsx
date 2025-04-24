import Onboarding from '@/components/onboarding';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { User } from '@/types';
import AvatarGenenerator, { genConfig } from 'react-nice-avatar';

export function DevMiniCard({ user }: { user: User }) {
    const config = genConfig({ sex: 'man', hairStyle: 'thick' });
    return (
        <Card className="relative w-full">
            <Onboarding className="scroll absolute top-2 right-0" user={user} />
            <CardContent className="flex w-full flex-1 items-start justify-center gap-4">
                <Avatar className="h-20 w-auto">
                    {user.avatar_url ? (
                        <AvatarImage src={user.avatar_url} alt={user.name} className="h-20 w-20" />
                    ) : (
                        <AvatarGenenerator className="h-20 w-20" {...config} />
                    )}
                </Avatar>
                <div className="w-full">
                    <CardTitle className="mb-2 cursor-pointer text-xl">{user.name}</CardTitle>
                    <CardDescription className="mb-4 text-sm">{user.bio ?? <span className="text-muted">Bio indisponivel...</span>}</CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}
