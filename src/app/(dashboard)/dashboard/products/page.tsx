
"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, MoreHorizontal, Trash2, Edit, Search } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";


export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [maxPrice, setMaxPrice] = useState(500);

    // This is a placeholder for the tenantId. In a real app, this would come from the session or context.
    const tenantId = "default"; // Replace with actual tenantId

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const productsData = await readProducts(tenantId);
            setProducts(productsData);
            
            if (productsData.length > 0) {
                const maxProductPrice = Math.max(...productsData.map(p => p.precio));
                const ceiledMaxPrice = Math.ceil(maxProductPrice);
                setMaxPrice(ceiledMaxPrice);
                setPriceRange([0, ceiledMaxPrice]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [tenantId]);

    const categories = useMemo(() => {
        const allCategories = products.map((p) => p.categoria);
        return ["all", ...Array.from(new Set(allCategories))];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const searchMatch = searchTerm === "" ||
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase());

            const categoryMatch = selectedCategory === "all" ||
                product.categoria === selectedCategory;

            const priceMatch = product.precio >= priceRange[0] && product.precio <= priceRange[1];

            return searchMatch && categoryMatch && priceMatch;
        });
    }, [products, searchTerm, selectedCategory, priceRange]);
    
    if (loading) {
        return <AdminProductsSkeleton />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Gestionar Productos</h1>
                    <p className="text-muted-foreground">Añade, edita o elimina productos de tu tienda.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/products/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Añadir Producto
                    </Link>
                </Button>
            </div>
            
            <Card className="mb-6">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Buscar por nombre..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                     <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="md:w-[200px]">
                            <SelectValue placeholder="Filtrar por categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(cat => (
                                <SelectItem key={cat} value={cat} className="capitalize">
                                    {cat === 'all' ? 'Todas las categorías' : cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="flex-1 md:max-w-xs">
                        <label className="text-sm text-muted-foreground mb-2 block">
                            Precio: ${priceRange[0]} - ${priceRange[1]}
                        </label>
                        <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            min={0}
                            max={maxPrice}
                            step={1}
                        />
                    </div>
                </CardContent>
            </Card>

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
                                <TableHead>Destacado</TableHead>
                                <TableHead>
                                    <span className="sr-only">Acciones</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
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
                                        {product.destacado ? (
                                            <Badge>Sí</Badge>
                                        ) : (
                                            <Badge variant="secondary">No</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <ProductActions tenantId={tenantId} id={product.id} />
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

function ProductActions({ tenantId, id }: { tenantId: string, id: string }) {
    const deleteProductWithId = deleteProduct.bind(null, tenantId, id);

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
                    <Link href={`/dashboard/products/edit/${id}`} className="flex items-center gap-2 cursor-pointer">
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

function AdminProductsSkeleton() {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Skeleton className="h-9 w-64 mb-2" />
                    <Skeleton className="h-5 w-80" />
                </div>
                <Skeleton className="h-10 w-36" />
            </div>
            <Card className="mb-6">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-full md:w-[200px]" />
                    <div className="flex-1 md:max-w-xs">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-5 w-full" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <TableHead key={i}><Skeleton className="h-5 w-full" /></TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-16 w-16 rounded-md" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
