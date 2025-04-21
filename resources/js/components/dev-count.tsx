import { Button } from '@/components/ui/button';
import Avatar, { genConfig } from 'react-nice-avatar';

export default function DevCount({ count = 0 }: { count: number }) {
    return (
        <div className="bg-muted mt-2 flex items-center rounded-full">
            <div className="flex -space-x-3">
                <Avatar className="h-10 w-10" {...genConfig()} />
                <Avatar className="h-10 w-10" {...genConfig()} />
                <Avatar className="h-10 w-10" {...genConfig()} />
                <Avatar className="h-10 w-10" {...genConfig()} />
                <Avatar className="h-10 w-10" {...genConfig()} />
                <Avatar className="h-10 w-10" {...genConfig()} />
                <Avatar className="h-10 w-10" {...genConfig()} />
            </div>
            <Button
                variant="secondary"
                className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent px-3 text-xs shadow-none hover:bg-transparent"
            >
                +{count} devs
            </Button>
        </div>
    );
}
