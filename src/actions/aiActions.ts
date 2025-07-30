
"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Product } from "@/types";

const productsFilePath = path.join(process.cwd(), "src/data/products.json");

async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(productsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products file:", error);
    return [];
  }
}

async function writeProducts(products: Product[]): Promise<void> {
  try {
    const data = JSON.stringify(products, null, 2);
    await fs.writeFile(productsFilePath, data, "utf8");
  } catch (error) {
    console.error("Error writing products file:", error);
  }
}

const productSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre es requerido."),
  descripcion: z.string().nullable(),
  precio: z.coerce.number().min(0, "El precio debe ser un número positivo."),
  categoria: z.string().min(1, "La categoría es requerida."),
  imagen: z.string().min(1, "La URL de la imagen es requerida."),
});

export async function addProduct(formData: FormData) {
  const validatedFields = productSchema.safeParse({
    nombre: formData.get("nombre"),
    descripcion: formData.get("descripcion"),
    precio: formData.get("precio"),
    categoria: formData.get("categoria"),
    imagen: formData.get("imagen"),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return {
        errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const products = await readProducts();
  const newProduct: Product = {
    id: `prod_${new Date().getTime()}`,
    ...validatedFields.data,
  };

  products.push(newProduct);
  await writeProducts(products);
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
    const validatedFields = productSchema.safeParse({
        id: formData.get('id'),
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        precio: formData.get('precio'),
        categoria: formData.get('categoria'),
        imagen: formData.get('imagen'),
    });

    if (!validatedFields.success || !validatedFields.data.id) {
         console.error(validatedFields.error);
        return {
            errors: validatedFields.error?.flatten().fieldErrors,
        };
    }

    const { id, ...updatedData } = validatedFields.data;
    let products = await readProducts();
    
    products = products.map(p => p.id === id ? { ...p, ...updatedData } : p);

    await writeProducts(products);

    revalidatePath("/admin/products");
    revalidatePath(`/products`);
    revalidatePath("/");
    redirect("/admin/products");
}


export async function deleteProduct(productId: string) {
    if(!productId) return;

    let products = await readProducts();
    products = products.filter(p => p.id !== productId);
    await writeProducts(products);

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
    redirect("/admin/products");
}
