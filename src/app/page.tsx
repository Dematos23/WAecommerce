
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import { readProducts, readConfig } from "@/actions/aiActions";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import type { SiteConfig } from "@/types";

export default async function Home() {
  const products = await readProducts();
  const config = await readConfig();
  const featuredProducts = products.filter(p => p.destacado);

  const heroStyle = config.configuracionGeneral.heroImageUrl
    ? { backgroundImage: `url(${config.configuracionGeneral.heroImageUrl})` }
    : {};

  return (
    <div className="flex flex-col">
      <section 
        className="relative bg-secondary/30 py-20 md:py-32 bg-cover bg-center"
        style={heroStyle}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 font-headline">
            {config.titulos.homepageHero}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            {config.configuracionGeneral.eslogan}
          </p>
          <Button asChild size="lg" className="shadow-lg hover:scale-105 transition-transform">
            <Link href="/products">
              Ver Catálogo <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {config.secondaryHero?.enabled && (
        <section className="bg-card">
          <div className="container mx-auto px-4 relative">
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col justify-center py-12 md:py-24 pr-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{config.secondaryHero.title}</h2>
                <p className="text-muted-foreground text-lg mb-6">{config.secondaryHero.description}</p>
              </div>
              <div className="relative min-h-[300px] md:h-auto">
                 <Image 
                    src={config.secondaryHero.imageUrl || "https://placehold.co/600x600.png"}
                    alt={config.secondaryHero.title || "Hero image"}
                    fill
                    className="object-cover"
                 />
              </div>
            </div>
             <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center">
                <Button asChild size="lg" variant="ghost" className="text-xl font-bold text-white bg-black/30 hover:bg-black/50 hover:tracking-widest transition-all duration-300 ease-in-out">
                    <Link href={config.secondaryHero.ctaLink || "#"}>
                        {config.secondaryHero.ctaText || "Comprar Ahora"}
                    </Link>
                </Button>
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight font-headline">Productos Destacados</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              {config.textos.descripcionHomepage}
            </p>
          </div>
          <ProductGrid products={featuredProducts} config={config as SiteConfig} />
        </div>
      </section>
      
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight font-headline">{config.textos.mensajeBienvenida}</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Cada producto en nuestra tienda es seleccionado cuidadosamente para asegurar la mejor calidad y tu completa satisfaction.
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
