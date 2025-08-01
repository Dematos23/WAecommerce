
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

// This is a server component that fetches config and passes it down.
async function PageSpecificWrapper({ children }: { children: React.ReactNode }) {
    const config = await readConfig();
    const pathname = usePathname();
    const { user } = useAuth();
    
    const isAuthPage = pathname === '/login' || pathname === '/register';
    const isAdmin = pathname.startsWith('/admin');
    const showHeaderFooter = !isAuthPage && !isAdmin;

    return (
        <div className="relative flex flex-col bg-background min-h-screen">
            {showHeaderFooter && <Header config={config} user={user} />}
            <main className="flex-1">{children}</main>
            {showHeaderFooter && <Footer config={config} />}
        </div>
    );
}


function AppContent({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const pathname = usePathname();
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    // Only fetch config for client-side rendered routes if needed.
    // Public pages will get config from Server Components.
    if (!config) {
        readConfig().then(setConfig);
    }
  }, [pathname, config]);
  
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isAdmin = pathname.startsWith('/admin');
  const showHeaderFooter = !isAuthPage && !isAdmin;
  
  if (loading) {
    return <AppLoader />;
  }
  
  // Admin layout and auth pages handle their own structure
  if (isAdmin) {
    return <>{children}</>;
  }
  
  if (isAuthPage) {
     return <main className="flex-1">{children}</main>;
  }

  // Render public pages with header/footer, passing config down
  if (!config) {
      return <AppLoader />;
  }

  return (
    <div className="relative flex flex-col bg-background min-h-screen">
      <Header config={config} />
      <main className="flex-1">{children}</main>
      <Footer config={config} />
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
