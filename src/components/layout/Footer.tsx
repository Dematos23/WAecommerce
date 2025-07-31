
import { Logo } from '@/components/ui/Logo';
import { Mail, Phone, Clock, MapPin, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import type { SiteConfig } from '@/types';

export function Footer({ config }: { config: SiteConfig }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          {/* Columna Izquierda: Logo y Social */}
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center gap-2">
                <Logo config={config} />
            </div>
            <p className="mt-4 text-primary-foreground/80 max-w-xs">
              {config.configuracionGeneral.eslogan || 'Tu tienda, a tu manera.'}
            </p>
            <div className="flex gap-4 mt-4">
                <Link href="#"><Instagram className="h-6 w-6 text-accent" /></Link>
                <Link href="#"><Facebook className="h-6 w-6 text-accent" /></Link>
                <Link href="#"><Twitter className="h-6 w-6 text-accent" /></Link>
            </div>
          </div>

          {/* Columna 2: Navegación */}
           <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navegación</h3>
            <ul className="space-y-3 text-primary-foreground/80">
              <li><Link href="/#features">Características</Link></li>
              <li><Link href="/pricing">Precios</Link></li>
              <li><Link href="/contact">Contacto</Link></li>
            </ul>
          </div>


          {/* Columna 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3 text-primary-foreground/80">
               <li><Link href="/terms">Términos y Condiciones</Link></li>
               <li><Link href="/privacy">Política de Privacidad</Link></li>
               <li><Link href="/cookies">Política de Cookies</Link></li>
            </ul>
          </div>


          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contáctanos</h3>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <span>{config.contacto.telefono}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <span>{config.contacto.correo}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span>{config.contacto.direccion}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Separador Naranja */}
        <div className="w-full h-1 bg-orange-500 my-8 rounded-full"></div>

        {/* Texto de Copyright */}
        <div className="text-center text-sm text-primary-foreground/80">
          <p>
            {`© ${currentYear} Kima. Todos los derechos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
