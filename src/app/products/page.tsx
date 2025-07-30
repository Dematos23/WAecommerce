"use client";

import { useState, useMemo } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { config } from "@/lib/config";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductSort } from "@/components/products/ProductSort";

export default function ProductsPage() {
  const [sortOrder, setSortOrder] = useState("precio-asc");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const allCategories = productsData.map((p) => p.categoria);
    return ["all", ...Array.from(new Set(allCategories))];
  }, []);

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = [...productsData] as Product[];

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
  }, [selectedCategory, sortOrder]);

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
      
      <div className="flex justify-end mb-6 md:hidden">
          <ProductSort value={sortOrder} onValueChange={setSortOrder} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </aside>
        <main className="md:col-span-3">
           <div className="hidden md:flex justify-end mb-6">
            <ProductSort value={sortOrder} onValueChange={setSortOrder} />
          </div>
          {sortedAndFilteredProducts.length > 0 ? (
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
