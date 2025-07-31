
import { ProductForm } from "../product-form";
import { readProducts } from "@/actions/aiActions";

export default async function NewProductPage() {
    const products = await readProducts();
    const categories = [...new Set(products.map(p => p.categoria))];

    return (
        <div className="container mx-auto p-4 md:p-8">
             <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Añadir Nuevo Producto</h1>
                <ProductForm categories={categories} />
            </div>
        </div>
    )
}
