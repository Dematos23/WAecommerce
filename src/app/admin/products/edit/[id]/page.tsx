
import { ProductForm } from "../../product-form";
import type { Product } from "@/types";
import { readProducts } from "@/actions/aiActions";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const products = await readProducts();
    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="container mx-auto p-4 md:p-8">
                <h1 className="text-2xl font-bold">Producto no encontrado</h1>
            </div>
        );
    }

    return (
         <div className="container mx-auto p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>
                <ProductForm product={product} />
            </div>
        </div>
    )
}

    