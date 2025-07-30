
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MoreHorizontal, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProduct, readProducts } from "@/actions/aiActions";


export default async function AdminProductsPage() {
    const products = await readProducts();

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Gestionar Productos</h1>
                    <p className="text-muted-foreground">Añade, edita o elimina productos de tu tienda.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/products/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Añadir Producto
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Imagen</span>
                                </TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>
                                    <span className="sr-only">Acciones</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Image
                                            alt={product.nombre}
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src={product.imagenes?.[0] || "https://placehold.co/64x64.png"}
                                            width="64"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{product.nombre}</TableCell>
                                    <TableCell>{product.categoria}</TableCell>
                                    <TableCell>${product.precio.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <ProductActions id={product.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

function ProductActions({ id }: { id: string }) {
    const deleteProductWithId = deleteProduct.bind(null, id);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/admin/products/edit/${id}`} className="flex items-center gap-2 cursor-pointer">
                        <Edit className="h-4 w-4" />
                        <span>Editar</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <form action={deleteProductWithId} className="w-full">
                        <button type="submit" className="flex items-center gap-2 text-red-500 w-full">
                           <Trash2 className="h-4 w-4" />
                           <span>Eliminar</span>
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

    