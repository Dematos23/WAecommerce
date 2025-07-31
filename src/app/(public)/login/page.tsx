import { LoginForm } from './login-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Logo } from '@/components/ui/Logo';
import { readConfig } from '@/actions/aiActions';
import Link from 'next/link';

export default async function LoginPage() {
    const config = await readConfig();

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-background p-4 pt-20">
      <Card className="w-full max-w-sm border-none shadow-none bg-transparent">
        <CardHeader className="text-center">
            <div className='flex justify-center mb-4'>
                <Logo config={config} showName={false} />
            </div>
          <CardTitle className="text-3xl font-semibold text-foreground">Bienvenido de vuelta</CardTitle>
          <CardDescription className="text-muted-foreground">Ingresa a tu panel de control para gestionar tu tienda.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
           <p className="mt-4 text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Regístrate
              </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
