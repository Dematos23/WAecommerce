import type { SiteConfig } from '@/types';
import { Package } from 'lucide-react';
import Image from 'next/image';

export function Logo({ config }: { config: SiteConfig }) {
  const showIcon = !config.configuracionGeneral.logoUrl || config.configuracionGeneral.logoUrl.endsWith('svg');

  return (
    <>
      {showIcon ? (
        <div className="rounded-lg bg-primary p-2">
          <Package className="h-6 w-6 text-primary-foreground" />
        </div>
      ) : (
         <div className="relative h-10 w-10">
            <Image 
                src={config.configuracionGeneral.logoUrl}
                alt={`${config.configuracionGeneral.nombreTienda} logo`}
                fill
                className="object-contain"
            />
         </div>
      )}
      <span className="text-xl font-bold tracking-tight text-foreground">
        {config.configuracionGeneral.nombreTienda}
      </span>
    </>
  );
}
