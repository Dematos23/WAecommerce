
import { getSession, logout } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, ShoppingBag, LogOut, FileJson } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default async function AdminPage() {
  const session = await getSession();

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <div className="min-h-screen bg-secondary/30">
        <AdminHeader />
        <main className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ManagementCard
                    title="Gestionar Productos"
                    description="Añade, edita o elimina productos de tu tienda."
                    icon={<ShoppingBag className="h-8 w-8 text-primary" />}
                    link="/dashboard/products"
                />
                <ManagementCard
                    title="Configuración del Sitio"
                    description="Edita los títulos, textos e información de contacto."
                    icon={<FileJson className="h-8 w-8 text-primary" />}
                    link="/dashboard/config"
                />
                <ManagementCard
                    title="Ajustes del Tema"
                    description="Personaliza la apariencia de tu sitio web."
                    icon={<Settings className="h-8 w-8 text-primary" />}
                    link="/dashboard/theme"
                />
            </div>
        </main>
    </div>
  );
}

function AdminHeader() {
    return (
        <header className="bg-card shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold">Panel de Admin</h1>
                <form action={async () => {
                    'use server';
                    await logout();
                    redirect('/');
                }}>
                    <Button type="submit" variant="ghost">
                        Cerrar Sesión <LogOut className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </div>
        </header>
    )
}

interface ManagementCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
}

function ManagementCard({ title, description, icon, link }: ManagementCardProps) {
    return (
        <Link href={link}>
            <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                    {icon}
                    <div>
                        <CardTitle>{title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription>{description}</CardDescription>
                </CardContent>
            </Card>
        </Link>
    )
}
