
'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import type { SiteConfig } from '@/types';
import { readConfig } from '@/actions/siteActions';
import { Skeleton } from './skeleton';

export function AppLoader() {
    const [config, setConfig] = useState<SiteConfig | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            const siteConfig = await readConfig();
            setConfig(siteConfig);
        };
        fetchConfig();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="animate-pulse">
                {config ? (
                    <Logo config={config} />
                ) : (
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                )}
            </div>
             <p className="text-muted-foreground mt-4">Cargando...</p>
        </div>
    );
}

