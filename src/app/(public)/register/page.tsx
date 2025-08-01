
import { RegisterForm } from './register-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Logo } from '@/components/ui/Logo';
import { readConfig } from '@/actions/siteActions';
import Link from 'next/link';

export default async function RegisterPage() {
    const config = await readConfig();

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-background p-4 pt-20">
      <Card className="w-full max-w-sm border-none shadow-none bg-transparent">
        <CardHeader className="text-center">
            <div className='flex justify-center mb-4'>
                <Logo config={config} showName={false} />
            </div>
          <CardTitle className="text-3xl font-semibold text-foreground">Crea tu Cuenta</CardTitle>
          <CardDescription className="text-muted-foreground">Empieza a vender online hoy mismo.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
           <p className="mt-4 text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Inicia sesión
              </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
}

