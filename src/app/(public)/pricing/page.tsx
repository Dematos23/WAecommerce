
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Básico",
      price: "$29",
      description: "Ideal para pequeñas tiendas que recién empiezan.",
      features: [
        "Hasta 100 productos",
        "Funcionalidad de e-commerce completa",
        "Soporte por correo electrónico",
      ],
      cta: "Empezar Plan Básico",
    },
    {
      name: "Profesional",
      price: "$79",
      description: "Perfecto para negocios en crecimiento con más volumen.",
      features: [
        "Productos ilimitados",
        "Dominios personalizados",
        "Analíticas avanzadas",
        "Soporte prioritario 24/7",
      ],
      cta: "Empezar Plan Profesional",
      popular: true,
    },
    {
      name: "Empresarial",
      price: "Custom",
      description: "Soluciones a medida para grandes empresas.",
      features: [
        "Todo lo del plan Profesional",
        "APIs para integraciones",
        "Manager de cuenta dedicado",
        "SLA personalizado",
      ],
      cta: "Contactar Ventas",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-semibold text-primary">Planes y Precios</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Elige el plan que mejor se adapte a las necesidades de tu negocio.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary border-2 shadow-lg' : ''}`}>
              <CardHeader className="p-6">
                {plan.popular && (
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                      Más Popular
                    </span>
                  </div>
                )}
                <CardTitle className="text-3xl text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-primary">{plan.price}</span>
                  {plan.price.startsWith('$') && <span className="text-lg text-muted-foreground">/mes</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 p-6 pt-0">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-3 h-6 w-6 flex-shrink-0 text-green-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6">
                <Button asChild size="lg" className="w-full text-lg" variant={plan.popular ? 'accent' : 'outline'}>
                  <Link href="/register">{plan.cta}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
