
import { Logo } from '@/components/ui/Logo';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import type { SiteConfig } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

// Custom SVG components for missing icons
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={cn("h-6 w-6", className)}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.15-4.14-1.71-6.42.4-1.99 1.97-3.66 3.87-4.33 1.9-.67 3.91-.56 5.65.39.01 1.67.02 3.34.01 5.02-.01 1.22-.4 2.42-1.12 3.45-1.16 1.66-3.24 2.43-5.18 2.09-1.94-.34-3.41-1.82-3.83-3.66-.33-1.46-.05-2.99.68-4.31.75-1.34 1.89-2.4 3.21-3.01.02-3.3.01-6.6-.02-9.9.02-.12.02-.23.02-.35.28-.06.56-.1.85-.14Z" />
    </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={cn("h-6 w-6", className)}>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2M12.04 20.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42 1.56 1.56 2.42 3.62 2.42 5.82-1.01 4.54-4.71 8.24-9.25 8.24m4.52-6.13c-.25-.12-1.47-.72-1.7-.81-.22-.08-.38-.12-.54.12-.16.25-.64.81-.79.97-.14.17-.29.18-.54.06-.25-.12-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.38-.43s.17-.25.25-.42c.08-.17.04-.31-.02-.43-.06-.12-.54-1.29-.74-1.77-.2-.48-.4-.41-.54-.42-.14 0-.29-.01-.45-.01-.16 0-.42.06-.64.31-.22.25-.86.85-.86 2.07 0 1.22.88 2.39 1 2.56.12.17 1.71 2.59 4.15 3.66 2.44 1.07 2.44.71 2.89.69.45-.02 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.05-.12-.2-.18-.44-.3Z" />
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
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          {/* Columna Izquierda: Logo y Social */}
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center gap-2">
                <Logo config={config} />
            </div>
            <p className="mt-4 text-primary-foreground/80 max-w-xs">
              {footer.eslogan}
            </p>
            <div className="flex gap-2 mt-4">
              {footer.socialLinks.map(social => (
                <Button key={social.name} asChild variant="ghost" size="icon" className="text-accent hover:bg-accent/20 hover:text-accent rounded-full">
                  <Link href={social.url} aria-label={social.name}>
                    {socialIcons[social.name]}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Columna 2: Navegación */}
           <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navegación</h3>
            <ul className="space-y-3 text-primary-foreground/80">
              {footer.navigation.map(link => (
                <li key={link.enlace}><Link href={link.enlace} className="hover:text-accent transition-colors">{link.titulo}</Link></li>
              ))}
            </ul>
          </div>


          {/* Columna 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3 text-primary-foreground/80">
               {footer.legal.map(link => (
                <li key={link.enlace}><Link href={link.enlace} className="hover:text-accent transition-colors">{link.titulo}</Link></li>
              ))}
            </ul>
          </div>


          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contáctanos</h3>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <span>{footer.contacto.telefono}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <span>{footer.contacto.correo}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span>{footer.contacto.direccion}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Separador Naranja */}
        <div className="w-full h-1 bg-orange-500 my-8 rounded-full"></div>

        {/* Texto de Copyright */}
        <div className="text-center text-sm text-primary-foreground/80">
          <p>
            {footer.copyright.replace('{year}', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
}
