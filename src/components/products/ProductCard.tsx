
"use client";

import { useEffect, useState } from "react";
import type { Product, SiteConfig } from "@/types";
import Image from "next/image";
import {
  Card,
  CardContent,
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
import { getCachedConfig } from "@/lib/config";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    getCachedConfig().then(setConfig);
  }, []);

  if (!config) {
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

  const { productCard } = config;

  const cardClasses = cn(
    "flex h-full flex-col overflow-hidden transition-shadow duration-300 group",
    {
      'shadow-none': productCard.shadow === 'none',
      'hover:shadow-sm': productCard.shadow === 'sm',
      'shadow-sm': productCard.shadow === 'sm',
      'hover:shadow-md': productCard.shadow === 'sm',
      'shadow-md': productCard.shadow === 'md',
      'hover:shadow-lg': productCard.shadow === 'md',
      'shadow-lg': productCard.shadow === 'lg',
      'hover:shadow-xl': productCard.shadow === 'lg',
    }
  );

  const nameClasses = cn("mb-2 text-lg font-semibold h-14 flex items-start", {
    "text-center justify-center": productCard.nameAlign === 'center',
    "text-left": productCard.nameAlign === 'left'
  });
  const descriptionClasses = cn("text-sm text-muted-foreground mb-4 h-10 overflow-hidden", {
    "text-center": productCard.descriptionAlign === 'center',
    "text-left": productCard.descriptionAlign === 'left'
  });
  const priceClasses = cn("text-xl font-bold text-primary", {
    "text-center": productCard.priceAlign === 'center',
    "text-left": productCard.priceAlign === 'left'
  });

  const ImageComponent = () => (
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
  );

  const NameComponent = () => <CardTitle className={nameClasses}><span>{product.nombre}</span></CardTitle>;
  const DescriptionComponent = () => <div className={descriptionClasses}>{product.descripcion || `Descubre más sobre ${product.nombre}.`}</div>;
  const PriceComponent = () => <p className={priceClasses}>{formatCurrency(product.precio)}</p>;
  
  const CardBody = () => (
    <div className="flex-1 flex flex-col">
      <div className="flex-grow">
        {productCard.imagePosition === 'afterName' && <NameComponent />}
        {productCard.imagePosition !== 'afterName' && <NameComponent />}
        {productCard.imagePosition === 'afterName' && <ImageComponent/>}
        
        {productCard.imagePosition !== 'afterDescription' && <DescriptionComponent />}
        {productCard.imagePosition === 'afterDescription' && <DescriptionComponent />}
        {productCard.imagePosition === 'afterDescription' && <ImageComponent/>}
      </div>

      <div>
          {productCard.imagePosition === 'afterPrice' && <PriceComponent/>}
          {productCard.imagePosition !== 'afterPrice' && <PriceComponent/>}
          {productCard.imagePosition === 'afterPrice' && <div className="mt-4"><ImageComponent /></div>}
      </div>
    </div>
  );

  return (
    <Card className={cardClasses}>
        {productCard.imagePosition === 'top' && <ImageComponent />}
        <CardContent className="p-6 flex-1 flex flex-col">
             <CardBody />
        </CardContent>
        <CardFooter className="p-6 pt-0">
            <Button className="w-full" onClick={handleAddToCart} variant={productCard.buttonStyle}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Añadir al carrito
            </Button>
        </CardFooter>
    </Card>
  );
}
