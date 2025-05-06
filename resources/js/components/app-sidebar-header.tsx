import { Breadcrumbs } from '@/components/breadcrumbs';
import SearchHunt from '@/components/feed/SearchHunt';
import { NavUser } from '@/components/nav-user';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="bg-card border-sidebar-border/50 fixed z-50 flex h-16 w-full shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full items-center justify-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="flex-1" />
                <div className="flex-1" />
                <div className="fixed right-0 flex items-center justify-center">
                    <SearchHunt />
                    <NavUser className="p-1" />
                </div>
            </div>
        </header>
    );
}
