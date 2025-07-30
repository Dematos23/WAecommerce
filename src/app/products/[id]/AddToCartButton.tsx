
"use client";

import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "¡Añadido al carrito!",
      description: `${product.nombre} ha sido añadido a tu carrito.`,
    });
  };

  return (
    <Button size="lg" onClick={handleAddToCart}>
      <ShoppingCart className="mr-2" />
      Añadir al carrito
    </Button>
  );
}
