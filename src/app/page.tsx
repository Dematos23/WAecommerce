
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { Product } from "@/types";
import { ArrowRight } from "lucide-react";
import { readProducts, readConfig } from "@/actions/aiActions";

export default async function Home() {
  const products = await readProducts();
  const config = await readConfig();
  const featuredProducts = products.filter(p => p.destacado);

  return (
    <div className="flex flex-col">
      <section className="bg-secondary/30 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary-foreground mb-4 font-headline">
            {config.titulos.homepageHero}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {config.configuracionGeneral.eslogan}
          </p>
          <Button asChild size="lg">
            <Link href="/products">
              Ver Catálogo <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight font-headline">Productos Destacados</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              {config.textos.descripcionHomepage}
            </p>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight font-headline">{config.textos.mensajeBienvenida}</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Cada producto en nuestra tienda es seleccionado cuidadosamente para asegurar la mejor calidad y tu completa satisfacción.
            </p>
             <Button asChild variant="link" className="mt-4 text-lg">
                <Link href="/about">
                    Conoce más sobre nosotros <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
