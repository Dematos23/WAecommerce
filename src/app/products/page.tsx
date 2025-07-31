
"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { SiteConfig, Product } from "@/types";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductSort } from "@/components/products/ProductSort";
import { readProducts, readConfig } from "@/actions/aiActions";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("precio-asc");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [products, configData] = await Promise.all([readProducts(), readConfig()]);
      setProductsData(products);
      setConfig(configData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const categories = useMemo(() => {
    const allCategories = productsData.map((p) => p.categoria);
    return ["all", ...Array.from(new Set(allCategories))];
  }, [productsData]);

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = [...productsData];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.categoria === selectedCategory);
    }

    switch (sortOrder) {
      case "precio-asc":
        filtered.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        filtered.sort((a, b) => b.precio - b.precio);
        break;
      case "nombre-asc":
        filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "nombre-desc":
        filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
    }

    return filtered;
  }, [selectedCategory, sortOrder, productsData]);
  
  if (loading || !config) {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="mb-10 text-center">
                <Skeleton className="h-10 w-64 mx-auto" />
                <Skeleton className="h-6 w-96 mx-auto mt-4" />
            </div>
            <div className="flex justify-end mb-6">
                <Skeleton className="h-10 w-48" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside className="md:col-span-1"><CardSkeleton /></aside>
                <main className="md:col-span-3">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
  }

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
      
      <div className="flex justify-end mb-6">
        <ProductSort value={sortOrder} onValueChange={setSortOrder} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
           {loading ? (
             <CardSkeleton />
           ) : (
             <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
           )}
        </aside>
        <main className="md:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : sortedAndFilteredProducts.length > 0 ? (
            <ProductGrid products={sortedAndFilteredProducts} />
          ) : (
             <div className="flex flex-col items-center justify-center text-center h-full py-16 bg-card rounded-lg">
                <p className="text-lg font-semibold">No se encontraron productos</p>
                <p className="text-muted-foreground mt-2">Intenta ajustar tus filtros.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[225px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

function CardSkeleton() {
    return (
        <div className="p-4 border rounded-lg space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </div>
        </div>
    )
}
