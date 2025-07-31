
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { CartIcon } from '@/components/cart/CartIcon';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { SiteConfig } from '@/types';

export function Header({ config }: { config: SiteConfig }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-full items-center justify-between px-4">
        {/* Desktop Header */}
        <div className="hidden md:flex w-full items-center justify-between">
          <div className="flex-1">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>
          <nav className="flex flex-1 justify-center items-center gap-6 text-sm font-medium">
            {config.menus.map((item) => (
              <Link
                key={item.enlace}
                href={item.enlace}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === item.enlace
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {item.titulo}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 justify-end items-center gap-4">
             <CartIcon config={config} />
          </div>
        </div>


        {/* Mobile Header Layout */}
        <div className="flex md:hidden items-center justify-between w-full">
            {/* Mobile Menu (Left) */}
             <Sheet>
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
                    <Logo />
                  </div>
                  <nav className="grid gap-4">
                    {config.menus.map((item) => (
                      <Link
                        key={item.enlace}
                        href={item.enlace}
                        className={cn(
                          'text-lg font-medium transition-colors hover:text-foreground/80',
                          pathname === item.enlace
                            ? 'text-foreground'
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
                <Logo />
            </Link>
          </div>

           {/* Cart Icon (Right) */}
            <div className="flex items-center">
                <CartIcon config={config} />
            </div>
        </div>
      </div>
    </header>
  );
}
