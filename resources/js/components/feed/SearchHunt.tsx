import { ArrowUpRightIcon, CircleFadingPlusIcon, FileInputIcon, FolderPlusIcon, SearchIcon } from 'lucide-react';
import * as React from 'react';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';
import { Link } from '@inertiajs/react';

export default function SearchHunt() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <>
            <button
                className="border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 hidden w-fit rounded-md border px-2 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] md:inline-flex"
                onClick={() => setOpen(true)}
            >
                <span className="flex grow items-center">
                    <SearchIcon className="text-muted-foreground/80 -ms-1 me-3" size={16} aria-hidden="true" />
                    <span className="text-muted-foreground/70 -ms-2 me-10 hidden font-normal md:flex">Search</span>
                </span>
                <kbd className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    ⌘K
                </kbd>
            </button>
            <SearchIcon className="text-muted-foreground/80 md:hidden" size={24} aria-hidden="true" onClick={() => setOpen(true)} />
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Quick start">
                        <CommandItem>
                            <FolderPlusIcon size={16} className="opacity-60" aria-hidden="true" />
                            <span>Adicionar Story</span>
                            <CommandShortcut className="justify-center">⌘N</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <FileInputIcon size={16} className="opacity-60" aria-hidden="true" />
                            <span>Novo Post</span>
                            <CommandShortcut className="justify-center">⌘I</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <CircleFadingPlusIcon size={16} className="opacity-60" aria-hidden="true" />
                            <Link href={route('profile.edit')}>Perfil</Link>
                            <CommandShortcut className="justify-center">⌘B</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Navigation">
                        <CommandItem>
                            <ArrowUpRightIcon size={16} className="opacity-60" aria-hidden="true" />
                            <Link href={route('home')}>Pagina Inicial</Link>
                        </CommandItem>
                        <CommandItem>
                            <ArrowUpRightIcon size={16} className="opacity-60" aria-hidden="true" />
                            <Link href={route('hunts.index')}>Feed</Link>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
