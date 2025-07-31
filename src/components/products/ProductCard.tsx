
"use client";

import type { Product } from "@/types";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "¡Añadido al carrito!",
      description: `${product.nombre} ha sido añadido a tu carrito.`,
    });
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg group">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.imagenes?.[0] || 'https://placehold.co/400x400.png'}
              alt={product.nombre}
              fill
              className="object-cover"
              data-ai-hint={`${product.categoria} product`}
            />
             <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Eye className="h-8 w-8 text-white" />
            </div>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <CardTitle className="mb-2 text-lg font-semibold">{product.nombre}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4 h-10 overflow-hidden">
          {product.descripcion || `Descubre más sobre ${product.nombre}.`}
        </p>
        <p className="text-xl font-bold text-primary">
          {formatCurrency(product.precio)}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
