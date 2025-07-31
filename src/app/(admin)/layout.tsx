
'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Home, Users, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { readConfig } from "@/actions/aiActions";
import type { SiteConfig } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

function AdminSidebar() {
    const pathname = usePathname();
    const [config, setConfig] = useState<SiteConfig | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchConfig = async () => {
            const siteConfig = await readConfig();
            setConfig(siteConfig);
        };
        fetchConfig();
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    if (!config) {
        return null; // Or a loading skeleton
    }
    
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Logo config={config} />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin" isActive={pathname === '/admin'} tooltip="Dashboard">
                            <Home />
                            <span>Dashboard</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin/users" isActive={pathname.startsWith('/admin/users')} tooltip="Users">
                            <Users />
                            <span>Users</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin/settings" isActive={pathname.startsWith('/admin/settings')} tooltip="Settings">
                            <Settings />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
             <div className="p-4">
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </Sidebar>
    )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <div className="flex">
            <AdminSidebar />
            <SidebarInset>
                <header className="flex items-center justify-between p-4 border-b">
                    <SidebarTrigger />
                    <h1 className="text-xl font-semibold">Admin Panel</h1>
                    <div>{/* Right side of header, e.g. UserNav */}</div>
                </header>
                <main className="p-6 bg-secondary/20 flex-1">
                    {children}
                </main>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
