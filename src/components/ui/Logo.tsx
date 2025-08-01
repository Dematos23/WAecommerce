
import type { SiteConfig } from '@/types';

import Image from 'next/image';
import { Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';

const manrope = Manrope({ subsets: ['latin'], weight: ["700"] });


export function Logo({ config, showName = true }: { config: SiteConfig, showName?: boolean }) {
  const displayMode = config?.generalConfig?.displayMode || 'both';

  const showIcon = (displayMode === 'logo' || displayMode === 'both');
  const renderName = showName && (displayMode === 'name' || displayMode === 'both');
  

  return (
    <div className='flex items-center gap-2'>
        {showIcon && (
          <div className="rounded-lg p-1">
            <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
          </div>
        )}
      {renderName && (
        <span className={cn(
            "text-5xl font-bold tracking-tight text-foreground",
            manrope.className
        )}>
          Kima
        </span>
      )}
    </div>
  );
}
