import { TerminalIcon } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <TerminalIcon className="size-4 text-white dark:text-black" />
            </div>
            <div className="ml-1 flex-1 text-left text-sm md:grid">
                <span className="mb-0.5 truncate leading-none font-semibold dark:text-white">Hunter</span>
            </div>
        </>
    );
}
