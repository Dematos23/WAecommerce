
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Store, TrendingUp, Brush, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SaaSLandingPage() {
  const features = [
    {
      icon: <Store className="h-8 w-8 text-white" />,
      name: "Tu Propia Tienda",
      description: "Crea y personaliza tu tienda en línea con tu propia marca, logo y productos.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      name: "Gestión Sencilla",
      description: "Un panel de control intuitivo para gestionar tus productos, pedidos y clientes sin complicaciones.",
    },
    {
      icon: <Brush className="h-8 w-8 text-white" />,
      name: "Diseño Personalizable",
      description: "Elige colores, fuentes y estilos para que tu tienda refleje la identidad de tu marca.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-background py-20 md:py-32">
           <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-semibold text-primary mb-4">
              Lanza tu Tienda Online en Minutos, no en Meses.
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-8">
              Kima te da las herramientas para crear y gestionar tu e-commerce de forma rápida, fácil y sin comisiones por venta.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" variant="accent" className="font-bold text-lg">
                <Link href="/register">
                  Empezar Gratis
                  <ChevronRight className="ml-2 h-5 w-5"/>
                </Link>
              </Button>
              <Button asChild size="lg" variant="link" className="font-bold text-lg text-primary">
                <Link href="/contact">
                  Hablar con un experto
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <span className="text-sm font-bold tracking-wider uppercase text-orange-500">POR QUÉ ELEGIR KIMA</span>
              <h2 className="text-4xl font-semibold text-foreground mt-2">Todo lo que necesitas para vender en línea</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Desde la configuración inicial hasta la gestión diaria, nuestra plataforma está diseñada para simplificar tu vida.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center bg-transparent border-none shadow-none">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary rounded-full p-4">
                         {feature.icon}
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-semibold text-foreground">{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-base">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-semibold text-primary-foreground">¿Listo para empezar a vender?</h2>
            <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto text-lg">
              Únete a cientos de emprendedores que ya confían en nuestra plataforma. Crea tu cuenta y lanza tu tienda hoy mismo.
            </p>
            <Button asChild size="lg" variant="accent" className="mt-8 font-bold text-lg">
              <Link href="/register">
                Crear mi Tienda Ahora
                <ChevronRight className="ml-2 h-5 w-5"/>
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
