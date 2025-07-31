import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/components/cart/CartProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { readConfig } from '@/actions/aiActions';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TiendaExpress',
  description: 'Rápido, fácil y a tu puerta.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await readConfig();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          inter.variable
        )}
      >
        <CartProvider>
          <div className="relative flex flex-col bg-background min-h-screen">
            <Header config={config} />
            <main className="flex-1">{children}</main>
            <Footer config={config} />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
