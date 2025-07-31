
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
            <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">Política de Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
                <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <h2>¿Qué son las cookies?</h2>
                <p>
                    Las cookies son pequeños archivos de texto que se almacenan en su computadora o dispositivo móvil cuando visita un sitio web. Se utilizan para recordar sus preferencias y recopilar información sobre cómo utiliza el sitio.
                </p>

                <h2>Cómo utilizamos las cookies</h2>
                <p>
                    Utilizamos cookies para mejorar su experiencia en nuestro sitio, por ejemplo, para mantenerlo conectado y recordar sus preferencias. También utilizamos cookies de terceros para análisis y publicidad.
                </p>

                <h2>Sus opciones</h2>
                <p>
                    Puede optar por deshabilitar las cookies a través de la configuración de su navegador, pero tenga en cuenta que algunas partes de nuestro sitio pueden no funcionar correctamente sin ellas.
                </p>

                <p>...</p>
                <p className="text-center text-muted-foreground mt-8">
                    Este es un documento de ejemplo. Por favor, asegúrese de cumplir con las regulaciones locales sobre cookies.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
