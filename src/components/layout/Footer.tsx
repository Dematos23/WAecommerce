
import { Logo } from '@/components/ui/Logo';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import type { SiteConfig } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

// Custom SVG components for missing icons
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("h-6 w-6", className)}>
        <path d="M12.528 8.013A5.5 5.5 0 1 1 20 12.5a5.5 5.5 0 0 1-7.472-4.487V1.5A5.5 5.5 0 1 1 8.5 7h4.028Z" />
    </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("h-6 w-6", className)}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
);


export function Footer({ config }: { config: SiteConfig }) {
  const currentYear = new Date().getFullYear();
  const { footer } = config;
  
  const socialIcons: { [key: string]: React.ReactNode } = {
    Instagram: <Instagram />,
    Facebook: <Facebook />,
    TikTok: <TikTokIcon />,
    WhatsApp: <WhatsAppIcon />,
  };

  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          {/* Columna Izquierda: Logo y Social */}
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center gap-2">
                <Logo config={config} />
            </div>
            <p className="mt-4 text-muted-foreground max-w-xs">
              {footer.eslogan}
            </p>
            <div className="flex gap-2 mt-4">
              {footer.socialLinks.map(social => (
                <Button key={social.name} asChild variant="ghost" size="icon" className="text-primary hover:bg-accent/20 hover:text-primary rounded-full">
                  <Link href={social.url} aria-label={social.name}>
                    {socialIcons[social.name]}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Columna 2: Navegación */}
           <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Navegación</h3>
            <ul className="space-y-3 text-muted-foreground">
              {footer.navigation.map(link => (
                <li key={link.enlace}><Link href={link.enlace} className="hover:text-primary transition-colors">{link.titulo}</Link></li>
              ))}
            </ul>
          </div>


          {/* Columna 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-muted-foreground">
               {footer.legal.map(link => (
                <li key={link.enlace}><Link href={link.enlace} className="hover:text-primary transition-colors">{link.titulo}</Link></li>
              ))}
            </ul>
          </div>


          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contáctanos</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>{footer.contacto.telefono}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>{footer.contacto.correo}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{footer.contacto.direccion}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Separador Naranja */}
        <div className="w-full h-1 bg-decorative my-8 rounded-full"></div>

        {/* Texto de Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            {footer.copyright.replace('{year}', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
}
