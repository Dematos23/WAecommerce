
import { ProductImageGallery } from "./ProductImageGallery";
import type { Product } from "@/types";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./AddToCartButton";
import { readProducts } from "@/actions/aiActions";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const products = await readProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <ProductImageGallery images={product.imagenes} productName={product.nombre} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline mb-2">{product.nombre}</h1>
          <p className="text-2xl font-bold text-primary mb-6">{formatCurrency(product.precio)}</p>
          <p className="text-muted-foreground mb-6">
            {product.descripcion || `Descubre más sobre ${product.nombre}.`}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

    