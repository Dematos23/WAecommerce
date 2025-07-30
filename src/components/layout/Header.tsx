"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { config } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { CartIcon } from '@/components/cart/CartIcon';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
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

        <div className="flex items-center gap-4">
          <CartIcon />
          <Sheet>
            <SheetTrigger asChild>
               <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-8 px-6">
              <Logo />
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
        </div>
      </div>
    </header>
  );
}