
"use client";

import type { Metadata } from 'next';
import './globals.css';
import { Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { readConfig } from '@/actions/siteActions';
import { Providers } from './providers';
import { useEffect, useState } from 'react';
import type { SiteConfig } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import { AppLoader } from '@/components/ui/AppLoader';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

function AppContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchConfig = async () => {
      // No need to fetch config client-side anymore for public pages
      // as they get it from server components.
      // But we might need it for client components like the sidebar.
      if (pathname.startsWith('/admin') || !config) {
        const siteConfig = await readConfig();
        setConfig(siteConfig);
      }
    };
    fetchConfig();
  }, [pathname, config]);

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isAdmin = pathname.startsWith('/admin');
  
  // Decide whether to show the main header and footer
  // We don't show them on auth pages or admin pages
  const showHeaderFooter = !isAuthPage && !isAdmin;

  // Show a global loading indicator while auth state is resolving,
  // or while the config for public pages is loading.
  if (loading) {
    return <AppLoader />
  }
  
  return (
    <div className="relative flex flex-col bg-background min-h-screen">
      {showHeaderFooter && config && <Header config={config} user={user} />}
      <main className="flex-1">{children}</main>
      {showHeaderFooter && config && <Footer config={config} />}
    </div>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          manrope.variable
        )}
      >
        <Providers>
           <AppContent>{children}</AppContent>
           <Toaster />
        </Providers>
      </body>
    </html>
  );
}
