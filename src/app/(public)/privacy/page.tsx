
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
            <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">Política de Privacidad</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
                <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <h2>1. Información que Recopilamos</h2>
                <p>
                    Recopilamos información que usted nos proporciona directamente, como cuando crea una cuenta, y también información que se recopila automáticamente, como su dirección IP y tipo de navegador.
                </p>

                <h2>2. Cómo Usamos su Información</h2>
                <p>
                    Utilizamos la información que recopilamos para operar, mantener y mejorar nuestros servicios. También podemos usarla para comunicarnos con usted sobre promociones, nuevos productos y otras noticias sobre nuestra empresa.
                </p>
                
                <h2>3. Cómo Compartimos su Información</h2>
                <p>
                    No compartimos su información personal con terceros, excepto cuando sea necesario para cumplir con la ley o para proteger nuestros derechos.
                </p>

                <p>...</p>
                <p className="text-center text-muted-foreground mt-8">
                    Este es un documento de ejemplo. Por favor, consulte con un profesional legal para crear su propia política de privacidad.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
