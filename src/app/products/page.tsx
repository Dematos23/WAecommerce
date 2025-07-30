import { ProductGrid } from "@/components/products/ProductGrid";
import { config } from "@/lib/config";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

export default function ProductsPage() {
  const products = productsData as Product[];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          {config.titulos.catalogo}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
            Explora nuestra colección completa de productos.
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
