"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { CartSheet } from "./CartSheet";
import { useState } from "react";
import type { SiteConfig } from "@/types";

export function CartIcon({ config }: { config: SiteConfig }) {
  const { cartCount } = useCart();
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <CartSheet open={isSheetOpen} onOpenChange={setSheetOpen} config={config}>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => setSheetOpen(true)}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
    </CartSheet>
  );
}
