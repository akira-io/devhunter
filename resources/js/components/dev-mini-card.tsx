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
        <Card className="w-full">
            <CardContent className="flex w-full flex-1 items-start justify-center gap-4">
                <Avatar className="h-20 w-auto">
                    {image ? <AvatarImage src={image} alt={title} className="h-20 w-20" /> : <AvatarGenenerator className="h-20 w-20" {...config} />}
                </Avatar>
                <div className="w-full">
                    <CardTitle className="mb-2 cursor-pointer text-xl">{title}</CardTitle>
                    <CardDescription className="mb-4 text-sm">
                        {description ?? <span className="text-muted">Bio indisponivel...</span>}
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}
