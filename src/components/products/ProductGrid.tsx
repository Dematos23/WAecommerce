import type { Product, SiteConfig } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  config: SiteConfig;
}

export function ProductGrid({ products, config }: ProductGridProps) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {products.map((product) => (
        <div key={product.id} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)]">
          <ProductCard product={product} config={config} />
        </div>
      ))}
    </div>
  );
}
