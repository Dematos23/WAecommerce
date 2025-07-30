
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CookiesPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight font-headline">
            Política de Cookies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>
                Esta Política de Cookies explica qué son las cookies y cómo las usamos. Debes leer esta política para comprender qué tipo de cookies utilizamos, o la información que recopilamos mediante cookies y cómo se utiliza esa información.
            </p>

            <h2 className="text-xl font-semibold text-foreground pt-4">¿Qué son las cookies?</h2>
            <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando visitas un sitio web. Permiten que el sitio web recuerde información sobre tu visita, como tu idioma preferido y otras opciones, lo que puede facilitar tu próxima visita y hacer que el sitio te resulte más útil.
            </p>
            
            <h2 className="text-xl font-semibold text-foreground pt-4">Cómo usamos las cookies</h2>
            <p>
                Usamos cookies por varias razones que se detallan a continuación. Desafortunadamente, en la mayoría de los casos, no existen opciones estándar de la industria para deshabilitar las cookies sin deshabilitar completamente la funcionalidad y las características que agregan a este sitio. Se recomienda que dejes activadas todas las cookies si no estás seguro de si las necesitas o no, en caso de que se utilicen para proporcionar un servicio que utilizas.
            </p>

            <h2 className="text-xl font-semibold text-foreground pt-4">Desactivación de cookies</h2>
            <p>
                Puedes evitar la instalación de cookies ajustando la configuración de tu navegador (consulta la Ayuda de tu navegador para saber cómo hacerlo). Ten en cuenta que deshabilitar las cookies afectará la funcionalidad de este y muchos otros sitios web que visites. La desactivación de cookies generalmente resultará en la desactivación también de ciertas funcionalidades y características de este sitio.
            </p>

             <h2 className="text-xl font-semibold text-foreground pt-4">Más información</h2>
            <p>
                Esperamos que esto haya aclarado las cosas para ti. Si hay algo sobre lo que no estás seguro de si necesitas o no, generalmente es más seguro dejar las cookies habilitadas en caso de que interactúe con una de las funciones que utilizas en nuestro sitio. Para más información, puedes contactarnos a través de nuestros métodos de contacto preferidos.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
