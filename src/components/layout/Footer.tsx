
import { config } from '@/lib/config';
import { Logo } from '@/components/ui/Logo';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const mapAddress = encodeURIComponent(config.contacto.direccion);
  const mapUrl = `https://maps.google.com/maps?q=${mapAddress}&output=embed`;

  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* Columna Izquierda: Logo y Descripción */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="mt-4 text-muted-foreground max-w-xs">
              {config.configuracionGeneral.eslogan}
            </p>
          </div>

          {/* Columna Central: Mapa */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
             <div className="flex items-center justify-center md:justify-start gap-3 mb-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{config.contacto.direccion}</span>
            </div>
            <div className="overflow-hidden rounded-lg h-48 w-full">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de ${config.contacto.direccion}`}
              ></iframe>
            </div>
          </div>

          {/* Columna Derecha: Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>{config.contacto.telefono}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>{config.contacto.correo}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>{config.contacto.horarioAtencion}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Texto de Copyright */}
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            {`© ${currentYear} TiendaExpress. Todos los derechos reservados.`}
            <Link href="/terms" className="ml-4 hover:underline">
              Términos y Condiciones
            </Link>
            <Link href="/cookies" className="ml-4 hover:underline">
              Política de Cookies
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
