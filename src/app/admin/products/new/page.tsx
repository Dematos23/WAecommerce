
import { ProductForm } from "../product-form";

export default function NewProductPage() {
    return (
        <div className="container mx-auto p-4 md:p-8">
             <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Añadir Nuevo Producto</h1>
                <ProductForm />
            </div>
        </div>
    )
}
