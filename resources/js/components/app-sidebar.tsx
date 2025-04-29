import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, MessageCircleMore } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Feed',
        href: '/feed',
        icon: LayoutGrid,
    },
    {
        title: 'Seguidores',
        href: '/feed',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Comunidade',
        href: 'https://discord.gg/ghPqZg3RcZ',
        icon: MessageCircleMore,
    },
    {
        title: 'Repositório',
        href: 'https://github.com/akira-io/devhunter',
        icon: Folder,
    },
    {
        title: 'Documentação',
        href: 'https://github.com/akira-io/devhunter/blob/main/README.md',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
            </SidebarFooter>
        </Sidebar>
    );
}
