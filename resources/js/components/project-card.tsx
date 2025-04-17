import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PartyPopperIcon } from 'lucide-react';
import { useState } from 'react';
import { useReward } from 'react-rewards';

type ProjectCardProps = {
    title: string;
    description: string;
    tags: string[];
    count: number;
    image: string;
};

export function ProjectCard({ title, description, tags, count, image }: ProjectCardProps) {
    const rewardId = 'rewardId' + title.toString();
    const [incrementCount, setIncrementCount] = useState(count);

    const { reward, isAnimating } = useReward(rewardId, 'confetti', {
        lifetime: 2000,
    });

    function handleIncrementCount() {
        setIncrementCount((prev) => prev + 1);
        reward();
    }

    return (
        <Card>
            <CardHeader className={'flex flex-col items-center justify-center text-center lg:flex-row lg:justify-start lg:text-left'}>
                <img src={image} className="h-auto w-20 rounded-2xl" alt={image} />
                <CardContent className={'flex-1'}>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                    {tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[#1b1b18] dark:text-[#EDEDEC]">
                            {tag}
                        </Badge>
                    ))}
                </CardContent>
                <Button onClick={handleIncrementCount} className={'cursor-pointer'}>
                    {incrementCount} <PartyPopperIcon />
                    <span id={rewardId} className={`absolute ${isAnimating ? 'animate' : ''}`} />
                </Button>
            </CardHeader>
        </Card>
    );
}
