
'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Home, Users, Settings, CreditCard } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import type { SiteConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

// Mock config for the logo until a proper server-side fetching strategy is implemented for this client layout.
const mockConfig: SiteConfig = {
  generalConfig: {
    storeName: "Kima",
    logoUrl: "/images/logo.png",
    displayMode: "both"
  }
} as SiteConfig;


function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };
    
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Logo config={mockConfig} />
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
                        <SidebarMenuButton href="/admin/plans" isActive={pathname.startsWith('/admin/plans')} tooltip="Plans">
                            <CreditCard />
                            <span>Plans</span>
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
             <div className="p-4 mt-auto">
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
                <main className="p-6 bg-secondary/20 flex-1 min-h-screen">
                    {children}
                </main>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
