import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type DevCardMini = {
    title: string;
    description: string;
    image: string;
};

export function DevMiniCard({ title, description, image }: DevCardMini) {
    return (
        <Card className="h-30 w-full overflow-hidden py-4 md:max-w-150">
            <CardHeader className={'flex flex-col items-start justify-center text-center lg:flex-row lg:justify-start lg:text-left'}>
                <img src={image} className="h-auto w-20 rounded-2xl" alt={image} />
                <CardContent className={'flex-1'}>
                    <CardTitle className="mb-2 cursor-pointer text-xl">{title}</CardTitle>
                    <CardDescription className="mb-4 text-sm">{description}</CardDescription>
                </CardContent>
            </CardHeader>
        </Card>
    );
}
