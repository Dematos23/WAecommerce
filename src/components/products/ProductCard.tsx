
"use client";

import type { Product, SiteConfig } from "@/types";
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
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { readConfig } from "@/actions/aiActions";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchConfig = async () => {
      const configData = await readConfig();
      setConfig(configData);
    }
    fetchConfig();
  }, []);

  if (!config) {
    // You can return a loading skeleton here
    return null;
  }

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

  const cardClasses = cn(
    "flex h-full flex-col overflow-hidden transition-shadow duration-300 group",
    {
      'shadow-none': config.productCard.shadow === 'none',
      'hover:shadow-sm': config.productCard.shadow === 'sm',
      'shadow-sm': config.productCard.shadow === 'sm',
      'hover:shadow-md': config.productCard.shadow === 'sm',
      'shadow-md': config.productCard.shadow === 'md',
      'hover:shadow-lg': config.productCard.shadow === 'md',
      'shadow-lg': config.productCard.shadow === 'lg',
      'hover:shadow-xl': config.productCard.shadow === 'lg',
    }
  );

  const contentClasses = cn("flex-1 p-6", {
    "text-center": config.productCard.textAlign === 'center',
    "text-left": config.productCard.textAlign === 'left'
  });

  return (
    <Card className={cardClasses}>
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
      <CardContent className={contentClasses}>
        <CardTitle className="mb-2 text-lg font-semibold">{product.nombre}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4 h-10 overflow-hidden">
          {product.descripcion || `Descubre más sobre ${product.nombre}.`}
        </p>
        <p className="text-xl font-bold text-primary">
          {formatCurrency(product.precio)}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" onClick={handleAddToCart} variant={config.productCard.buttonStyle}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
