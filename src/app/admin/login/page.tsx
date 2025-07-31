
import { LoginForm } from './login-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Logo } from '@/components/ui/Logo';
import { readConfig } from '@/actions/aiActions';

export default async function LoginPage() {
  const config = await readConfig();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                 <Logo config={config} />
            </div>
          <CardTitle>Acceso de Administrador</CardTitle>
          <CardDescription>Por favor, ingresa tus credenciales para acceder al panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
