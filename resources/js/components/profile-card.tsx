import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
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
        <Card className={cn('mt-4 max-h-100 w-full overflow-y-auto', className)}>
            <CardTitle className="bg-background sticky -top-6 flex items-center justify-between p-1 px-6 text-sm">
                {title}
                <Button variant="ghost" onClick={onClick}>
                    {icon}
                </Button>
            </CardTitle>
            <CardContent className="flex flex-col items-center space-y-6 px-1 px-4 text-center text-gray-500">{children}</CardContent>
        </Card>
    );
}
