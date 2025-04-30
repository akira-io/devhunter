import { Input } from '@/components/ui/input';
import { Loader, SearchIcon } from 'lucide-react';
import React from 'react';

export function SearchTweet() {
    const [searchLoading, setSearchLoading] = React.useState(false);

    function search(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchLoading(true);
        console.log('searching...', e);
        if (e.target.value.length > 0) {
            setTimeout(() => {
                setSearchLoading(false);
            }, 1000);
        }
    }

    return (
        <div className="relative mr-2 mb-1">
            <Input
                type="text"
                placeholder="procurar..."
                className="placeholder:text-foreground-muted w-40 ps-9 pe-9 md:w-60 lg:w-80"
                onChange={(e) => {
                    search(e);
                }}
            />
            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                {!searchLoading ? <SearchIcon size={16} /> : <Loader className="animate-spin" size={16} />}
            </div>
        </div>
    );
}
