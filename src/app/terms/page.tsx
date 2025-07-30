
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight font-headline">
            Términos y Condiciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>
                Bienvenido a TiendaExpress. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro sitio web. Al acceder a este sitio, asumimos que aceptas estos términos y condiciones en su totalidad. No continúes usando el sitio web de TiendaExpress si no aceptas todos los términos y condiciones establecidos en esta página.
            </p>

            <h2 className="text-xl font-semibold text-foreground pt-4">1. Licencia</h2>
            <p>
                A menos que se indique lo contrario, TiendaExpress y/o sus licenciantes son propietarios de los derechos de propiedad intelectual de todo el material en TiendaExpress. Todos los derechos de propiedad intelectual están reservados. Puedes ver y/o imprimir páginas desde https://tiendaexpress.example.com para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
            </p>
            <p>No debes:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Volver a publicar material de TiendaExpress.</li>
                <li>Vender, alquilar o sub-licenciar material de TiendaExpress.</li>
                <li>Reproducir, duplicar o copiar material de TiendaExpress.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground pt-4">2. Cuentas de usuario</h2>
            <p>
                Si creas una cuenta en nuestro sitio web, eres responsable de mantener la seguridad de tu cuenta y eres totalmente responsable de todas las actividades que ocurran bajo la cuenta y cualquier otra acción tomada en conexión con ella. Debes notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta o cualquier otra brecha de seguridad.
            </p>

            <h2 className="text-xl font-semibold text-foreground pt-4">3. Proceso de compra y pago</h2>
            <p>
                Al realizar un pedido, te comprometes a que todos los datos que nos proporcionas son verídicos y exactos, que eres un usuario autorizado de la tarjeta de crédito o débito utilizada para realizar tu pedido y que hay fondos suficientes para cubrir el coste de los productos. La confirmación del pedido se realiza a través de WhatsApp y el pago se coordina directamente con el cliente.
            </p>

             <h2 className="text-xl font-semibold text-foreground pt-4">4. Modificaciones a los Términos</h2>
            <p>
                Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días antes de que los nuevos términos entren en vigor. Lo que constituye un cambio material se determinará a nuestra sola discreción.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
