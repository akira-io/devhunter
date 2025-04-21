import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDownIcon } from 'lucide-react';
import * as React from 'react';

export function ScrollDown({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('flex -translate-x-1/2 transform animate-bounce flex-col items-center justify-center', className)} {...props}>
            <Button variant="ghost" className="flex items-center justify-center">
                <ArrowDownIcon size={24} />
            </Button>
        </div>
    );
}
