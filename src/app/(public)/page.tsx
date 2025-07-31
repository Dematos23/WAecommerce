
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Store, TrendingUp, Brush } from "lucide-react";
import Link from "next/link";

export default function SaaSLandingPage() {
  const features = [
    {
      icon: <Store className="h-8 w-8 text-primary" />,
      name: "Tu Propia Tienda",
      description: "Crea y personaliza tu tienda en línea con tu propia marca, logo y productos.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      name: "Gestión Sencilla",
      description: "Un panel de control intuitivo para gestionar tus productos, pedidos y clientes sin complicaciones.",
    },
    {
      icon: <Brush className="h-8 w-8 text-primary" />,
      name: "Diseño Personalizable",
      description: "Elige colores, fuentes y estilos para que tu tienda refleje la identidad de tu marca.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-secondary/30 py-20 md:py-32">
           <div className="absolute inset-0 bg-black/50 z-0"></div>
           <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 font-headline">
              Lanza tu Tienda Online en Minutos
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              La plataforma todo-en-uno para crear y gestionar tu e-commerce de forma rápida, fácil y sin comisiones por venta.
            </p>
            <Button asChild size="lg" className="shadow-lg hover:scale-105 transition-transform">
              <Link href="/register">
                Empezar Gratis
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight font-headline">Todo lo que necesitas para vender en línea</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Desde la configuración inicial hasta la gestión diaria, nuestra plataforma está diseñada para simplificar tu vida.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">{feature.icon}</div>
                    <CardTitle>{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight font-headline">¿Listo para empezar a vender?</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Únete a cientos de emprendedores que ya confían en nuestra plataforma. Crea tu cuenta y lanza tu tienda hoy mismo.
            </p>
            <Button asChild size="lg" className="mt-8 shadow-lg hover:scale-105 transition-transform">
              <Link href="/register">
                Crear mi Tienda Ahora
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
