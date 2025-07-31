
import type { SiteConfig } from '@/types';
import { Package } from 'lucide-react';
import Image from 'next/image';
import { Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';

const manrope = Manrope({ subsets: ['latin'], weight: ["700"] });


export function Logo({ config, showName = true }: { config: SiteConfig, showName?: boolean }) {
  const displayMode = config?.configuracionGeneral?.displayMode || 'both';

  const showIcon = (displayMode === 'logo' || displayMode === 'both') && config?.configuracionGeneral?.logoUrl;
  const renderName = showName && (displayMode === 'name' || displayMode === 'both');
  
  const iconFallback = !config?.configuracionGeneral?.logoUrl || config.configuracionGeneral.logoUrl.endsWith('svg');

  return (
    <div className='flex items-center gap-2'>
        <div className="rounded-lg bg-primary p-2">
            <Package className="h-6 w-6 text-primary-foreground" />
        </div>
      {renderName && (
        <span className={cn(
            "text-2xl font-bold tracking-tight text-foreground",
            manrope.className
        )}>
          {config?.configuracionGeneral?.nombreTienda || 'Kima'}
        </span>
      )}
    </div>
  );
}
