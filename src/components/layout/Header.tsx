
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { SiteConfig } from '@/types';
import { UserNav } from './UserNav';
import type { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

interface HeaderProps {
    config: SiteConfig;
    user: User | null;
}

export function Header({ config, user }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setSheetOpen] = useState(false);
  
  const isPublicSaasPage = ['/', '/login', '/register', '/contact', '/pricing', '/terms', '/privacy', '/cookies'].some(p => pathname === p);
  const isDashboardPage = pathname.startsWith('/dashboard');

  const renderCart = !isPublicSaasPage && !isDashboardPage;

  const navLinks = config.header.menu || [];
  
  useEffect(() => {
    setSheetOpen(false); // Close mobile menu on route change
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-full items-center justify-between px-4">
        {/* Desktop Header */}
        <div className="hidden md:flex w-full items-center justify-between">
          <div className="flex-1 flex items-center gap-2">
            <Link href="/">
              <Logo config={config} />
            </Link>
          </div>
          <nav className="flex flex-1 justify-center items-center gap-8 text-base font-medium">
              {navLinks.map((link) => (
                  <Link
                      key={link.enlace}
                      href={link.enlace}
                      className={cn(
                      'transition-colors text-foreground/80 hover:text-foreground',
                      pathname === link.enlace && 'text-primary font-semibold'
                      )}
                  >
                      {link.titulo}
                  </Link>
              ))}
          </nav>
          <div className="flex flex-1 justify-end items-center gap-4">
             <UserNav user={user} />
          </div>
        </div>


        {/* Mobile Header Layout */}
        <div className="flex md:hidden items-center justify-between w-full">
            {/* Mobile Menu (Left) */}
             <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                 <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                <div className="flex flex-col gap-4 py-8 px-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Logo config={config} />
                  </div>
                   <nav className="grid gap-4">
                    {navLinks.map((item) => (
                      <Link
                        key={item.enlace}
                        href={item.enlace}
                        className={cn(
                          'text-lg font-medium transition-colors hover:text-foreground/80',
                          pathname === item.enlace
                            ? 'text-primary'
                            : 'text-foreground/60'
                        )}
                      >
                        {item.titulo}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

          {/* Mobile Logo (Center) */}
          <div className="absolute left-1/2 -translate-x-1/2">
             <Link href="/">
                <Logo config={config} />
            </Link>
          </div>

           {/* Right Icons */}
            <div className="flex items-center gap-2">
                <UserNav user={user} />
            </div>
        </div>
      </div>
    </header>
  );
}
