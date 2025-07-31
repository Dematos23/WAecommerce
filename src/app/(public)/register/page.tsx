
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Crea tu Tienda</CardTitle>
          <CardDescription>Regístrate para lanzar tu e-commerce en minutos.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Formulario de registro próximamente...</p>
        </CardContent>
      </Card>
    </div>
  );
}
