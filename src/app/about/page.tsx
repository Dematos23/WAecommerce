import { config } from "@/lib/config";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight font-headline mb-4">
              {config.titulos.sobreNosotros}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {config.textos.descripcionSobreNosotros}
            </p>
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-lg">
             <Image 
                src="https://placehold.co/600x400.png"
                alt="About us image"
                fill
                className="object-cover"
                data-ai-hint="team business"
             />
          </div>
        </div>
      </div>
    </div>
  );
}
