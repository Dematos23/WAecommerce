
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, TrendingUp, Brush, ChevronRight, Icon } from "lucide-react";
import Link from "next/link";
import { readConfig } from "@/actions/aiActions";
import type { SiteConfig } from "@/types";

const icons: { [key: string]: React.ReactNode } = {
  Store: <Store className="h-8 w-8 text-white" />,
  TrendingUp: <TrendingUp className="h-8 w-8 text-white" />,
  Brush: <Brush className="h-8 w-8 text-white" />,
};

export default async function SaaSLandingPage() {
  const config: SiteConfig = await readConfig();
  const { homepage } = config;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-background py-20 md:py-32">
           <div className="container mx-auto px-4 text-center">
            <h1 className="text-primary mb-4 h1">
              {homepage.hero.title}
            </h1>
            <p className="text-foreground max-w-3xl mx-auto mb-8 p">
              {homepage.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" variant="accent" className="font-bold text-lg">
                <Link href={homepage.hero.ctaPrimary.link}>
                  {homepage.hero.ctaPrimary.text}
                  <ChevronRight className="ml-2 h-5 w-5"/>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <span className="text-sm font-bold tracking-wider uppercase text-decorative">{homepage.features.preTitle}</span>
              <h2 className="text-foreground mt-2 h2">{homepage.features.title}</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto p">
                {homepage.features.description}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {homepage.features.items.map((feature, index) => (
                <Card key={index} className="text-center bg-transparent border-none shadow-none">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary rounded-full p-4">
                         {icons[feature.icon] || <Store className="h-8 w-8 text-white" />}
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
        {homepage.secondaryHero?.enabled && (
            <section className="bg-primary py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-primary-foreground h2">{homepage.secondaryHero.title}</h2>
                <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto p">
                {homepage.secondaryHero.description}
                </p>
                <Button asChild size="lg" variant="accent" className="mt-8 font-bold text-lg">
                <Link href={homepage.secondaryHero.cta.link}>
                    {homepage.secondaryHero.cta.text}
                    <ChevronRight className="ml-2 h-5 w-5"/>
                </Link>
                </Button>
            </div>
            </section>
        )}
      </main>
    </div>
  );
}
