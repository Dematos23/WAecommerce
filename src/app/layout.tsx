
import type { Metadata } from 'next';
import './globals.css';
import { Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { readConfig } from '@/actions/aiActions';
import { Providers } from './providers';
import { getSession } from '@/lib/auth';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'Kima - Lanza tu Tienda Online en Minutos',
  description: 'La plataforma todo-en-uno para crear y gestionar tu e-commerce.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [config, session] = await Promise.all([
    readConfig(),
    getSession()
  ]);
  
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
            <Header config={config} session={session} />
            <main className="flex-1">{children}</main>
            <Footer config={config} />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
