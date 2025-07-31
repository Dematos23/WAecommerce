
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
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { usePathname } from 'next/navigation';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

// Metadata can't be dynamic on a client component, so we define it statically.
// export const metadata: Metadata = {
//   title: 'Kima - Lanza tu Tienda Online en Minutos',
//   description: 'La plataforma todo-en-uno para crear y gestionar tu e-commerce.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  
  useEffect(() => {
    const fetchConfig = async () => {
      const siteConfig = await readConfig();
      setConfig(siteConfig);
    };
    fetchConfig();
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const isDashboard = pathname.startsWith('/dashboard');
  const isAdmin = pathname.startsWith('/admin');

  if (loading) {
    return (
      <html lang="es">
        <body className={cn('min-h-screen bg-background font-body antialiased', manrope.variable)}>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  const showHeaderFooter = config && !isDashboard && !isAdmin;

  return (
    <html lang="es">
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          manrope.variable
        )}
      >
        <Providers>
          <div className="relative flex flex-col bg-background min-h-screen">
            {showHeaderFooter && <Header config={config} user={user} />}
            <main className="flex-1">{children}</main>
            {showHeaderFooter && <Footer config={config} />}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
