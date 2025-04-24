import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ProfileCard {
    title: string;
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
    onClick?: () => void;
}

export function ProfileCard({ title, className, icon, onClick, children }: ProfileCard) {
    return (
        <Card className={cn('mt-4 w-full p-4', className)}>
            <CardDescription className="flex items-center justify-between text-sm">
                {title}
                <Button variant="ghost" onClick={onClick}>
                    {icon}
                </Button>
            </CardDescription>
            <CardContent className="flex flex-col items-center space-y-6 px-1 text-center text-gray-500">{children}</CardContent>
        </Card>
    );
}
