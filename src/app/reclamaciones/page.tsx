
import { readConfig } from "@/actions/aiActions";
import { ReclamacionesForm } from "./ReclamacionesForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default async function ReclamacionesPage() {
  const config = await readConfig();
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
       <Card className="w-full">
         <CardHeader>
            <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl font-bold tracking-tight font-headline">Libro de Reclamaciones</CardTitle>
            </div>
           <CardDescription>Conforme a lo establecido en el Código de Protección y Defensa del Consumidor – Ley N° 29571</CardDescription>
         </CardHeader>
         <CardContent>
           <ReclamacionesForm config={config} />
         </CardContent>
       </Card>
    </div>
  );
}
