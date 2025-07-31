
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
            <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">Términos y Condiciones</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
                <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <h2>1. Aceptación de los Términos</h2>
                <p>
                    Bienvenido a Kima. Al utilizar nuestros servicios, usted acepta estar sujeto a los siguientes términos y condiciones. Si no está de acuerdo con alguna parte de los términos, no podrá utilizar nuestros servicios.
                </p>

                <h2>2. Descripción del Servicio</h2>
                <p>
                    Kima proporciona una plataforma de software como servicio (SaaS) que permite a los usuarios crear y gestionar sus propias tiendas de comercio electrónico. Los servicios incluyen alojamiento, herramientas de gestión de productos, procesamiento de pedidos y personalización de la tienda.
                </p>

                <h2>3. Cuentas de Usuario</h2>
                <p>
                    Para acceder a la mayoría de las funciones de la plataforma, debe registrarse para obtener una cuenta. Usted es responsable de mantener la confidencialidad de su información de inicio de sesión y de todas las actividades que ocurran en su cuenta.
                </p>

                <h2>4. Contenido del Usuario</h2>
                <p>
                    Usted conserva todos los derechos sobre el contenido que carga en su tienda (productos, imágenes, textos). Sin embargo, nos otorga una licencia para alojar, mostrar y distribuir su contenido según sea necesario para operar y promocionar la plataforma.
                </p>

                <h2>5. Limitación de Responsabilidad</h2>
                <p>
                    En la máxima medida permitida por la ley, Kima no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo, ni de ninguna pérdida de beneficios o ingresos.
                </p>

                <p>...</p>
                <p className="text-center text-muted-foreground mt-8">
                    Este es un documento de ejemplo. Por favor, consulte con un profesional legal para crear sus propios términos y condiciones.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
