
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function HostnameDisplay() {
  const [hostname, setHostname] = useState<string | null>(null);

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  if (!hostname) {
    return null;
  }

  return (
    <Card className="mt-8 bg-secondary/50 border-dashed">
        <CardHeader>
            <CardTitle className="text-lg">Firebase Auth Domain</CardTitle>
            <CardDescription>
                To enable Google Sign-In, add the following domain to your Firebase project's authorized domains list.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="bg-background p-2 rounded-md font-mono text-sm text-center">
                {hostname}
            </div>
        </CardContent>
    </Card>
  );
}
