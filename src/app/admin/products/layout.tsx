
import { Header } from "@/components/layout/Header";


export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-secondary/30 min-h-screen">
        <AdminProductsHeader />
        {children}
    </div>
  )
}

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { ArrowLeft, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

function AdminProductsHeader() {
    return (
        <header className="bg-card shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                 <Button asChild variant="outline">
                    <Link href="/admin">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al Panel
                    </Link>
                </Button>
                <h1 className="text-xl font-bold">Gestionar Productos</h1>
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