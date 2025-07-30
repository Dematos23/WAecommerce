import { config } from "@/lib/config";
import { CheckoutForm } from "./CheckoutForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
       <Card className="w-full">
         <CardHeader>
           <CardTitle className="text-3xl font-bold tracking-tight font-headline">{config.titulos.checkout}</CardTitle>
           <CardDescription>{config.textos.instruccionesCheckout}</CardDescription>
         </CardHeader>
         <CardContent>
           <CheckoutForm />
         </CardContent>
       </Card>
    </div>
  );
}
