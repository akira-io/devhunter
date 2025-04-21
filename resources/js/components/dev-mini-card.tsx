import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import AvatarGenenerator, { genConfig } from 'react-nice-avatar';

type DevCardMini = {
    title: string;
    description?: string;
    image?: string;
};

export function DevMiniCard({ title, description, image }: DevCardMini) {
    const config = genConfig({ hairStyle: 'thick' });
    return (
        <Card className="w-full overflow-hidden">
            <CardContent className="flex items-start justify-center gap-4">
                <Avatar className="h-20 w-auto">
                    {image ? <AvatarImage src={image} alt={title} /> : <AvatarGenenerator className="h-20 w-20" {...config} />}
                </Avatar>
                <div className="flex-1">
                    <CardTitle className="mb-2 cursor-pointer text-xl">{title}</CardTitle>
                    <CardDescription className="mb-4 text-sm">{description}</CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}
