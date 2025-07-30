
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ConfirmacionPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 flex items-center justify-center min-h-[60vh]">
       <Card className="w-full text-center">
         <CardHeader>
           <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
           </div>
           <CardTitle className="text-2xl font-bold">¡Reclamo Enviado!</CardTitle>
           <CardDescription className="text-lg">Hemos recibido tu reclamo correctamente.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           <p className="text-muted-foreground">
             Te hemos enviado una copia de tu hoja de reclamación al correo electrónico que registraste. Nos pondremos en contacto contigo en el plazo establecido por ley.
           </p>
           <Button asChild>
             <Link href="/">Volver al Inicio</Link>
           </Button>
         </CardContent>
       </Card>
    </div>
  );
}

