import { config } from '@/lib/config';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-8">
        <Logo />
        <p className="text-sm text-muted-foreground">
          {config.textos.pieDePagina}
        </p>
      </div>
    </footer>
  );
}
