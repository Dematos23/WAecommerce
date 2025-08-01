
"use client";

import type { Metadata } from 'next';
import './globals.css';
import { Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { readConfig } from '@/actions/aiActions';
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
      const siteConfig = await readConfig();
      setConfig(siteConfig);
    };
    fetchConfig();
  }, []);

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isDashboard = pathname.startsWith('/dashboard');
  const isAdmin = pathname.startsWith('/admin');
  const showHeaderFooter = config && !isDashboard && !isAdmin;

  // Show a global loading indicator while auth state is resolving,
  // or while the config for public pages is loading.
  if (loading || (!config && !isDashboard && !isAdmin && !isAuthPage)) {
    return <AppLoader />
  }
  
  return (
    <div className="relative flex flex-col bg-background min-h-screen">
      {showHeaderFooter && <Header config={config} user={user} />}
      <main className="flex-1">{children}</main>
      {showHeaderFooter && <Footer config={config} />}
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
