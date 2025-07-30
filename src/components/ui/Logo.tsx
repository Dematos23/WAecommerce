import { Package } from 'lucide-react';

export function Logo() {
  return (
    <>
      <div className="rounded-lg bg-primary p-2">
        <Package className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        TiendaExpress
      </span>
    </>
  );
}
