import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Shield, Folder, Settings, LayoutGrid } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import AppLogo from './app-logo';


// WE ARE WORKING ON THE SIDE BAR TO SHOW ONLY CONTENT THAT BELONGS TO A CERTAIN USER
export function AppSidebar() {
const { auth } = usePage().props;


const userRole = auth?.user?.role || 'user';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

//adding admin pages
const adminNavItems: NavItem[] = [
    {
        title: 'Manage Dashboard',
        href: '/admin/dashboard',
        icon: Shield,
    },
];

//adding superadmin pages
const superAdminNavItems: NavItem[] = [
    {
        title: 'System Controls',
        href: '/superadmin/system',
        icon: Shield,
    },
];

let roleBasedNavItems: NavItem[] = [...mainNavItems];
if (userRole === 'admin') {
    roleBasedNavItems = [...roleBasedNavItems, ...adminNavItems];
}

//has access to all admin and superadmin pages
if (userRole === 'superadmin') {
    roleBasedNavItems = [...roleBasedNavItems, ...adminNavItems, ...superAdminNavItems];
}

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={roleBasedNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
