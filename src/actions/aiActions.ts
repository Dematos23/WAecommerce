
"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Product, Reclamacion } from "@/types";

const productsFilePath = path.join(process.cwd(), "src/data/products.json");
const reclamacionesFilePath = path.join(process.cwd(), "src/data/reclamaciones.json");

// --- Product Functions ---

async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(productsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        await fs.writeFile(productsFilePath, '[]', 'utf8');
        return [];
    }
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
  destacado: z.boolean().optional(),
});

export async function addProduct(formData: FormData) {
  const validatedFields = productSchema.safeParse({
    nombre: formData.get("nombre"),
    descripcion: formData.get("descripcion"),
    precio: formData.get("precio"),
    categoria: formData.get("categoria"),
    imagen: formData.get("imagen"),
    destacado: formData.get("destacado") === "on",
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
        destacado: formData.get("destacado") === "on",
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


// --- Reclamaciones Functions ---

async function readReclamaciones(): Promise<Reclamacion[]> {
  try {
    const data = await fs.readFile(reclamacionesFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
     if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        await fs.writeFile(reclamacionesFilePath, '[]', 'utf8');
        return [];
    }
    console.error("Error reading reclamaciones file:", error);
    return [];
  }
}

async function writeReclamaciones(reclamaciones: Reclamacion[]): Promise<void> {
  try {
    const data = JSON.stringify(reclamaciones, null, 2);
    await fs.writeFile(reclamacionesFilePath, data, "utf8");
  } catch (error) {
    console.error("Error writing reclamaciones file:", error);
  }
}

const reclamacionSchema = z.object({
  fechaReclamo: z.string(),
  nombreCompleto: z.string(),
  domicilio: z.string().optional(),
  tipoDocumento: z.string(),
  numeroDocumento: z.string(),
  email: z.string(),
  telefono: z.string().optional(),
  nombreApoderado: z.string().optional(),
  tipoBien: z.string(),
  montoReclamado: z.string().optional(),
  descripcionBien: z.string().optional(),
  tipoReclamacion: z.string(),
  detalleReclamacion: z.string(),
  pedido: z.string().optional(),
});


export async function addReclamacion(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = reclamacionSchema.safeParse(data);
    
    if (!validatedFields.success) {
        console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
        // Here you might want to return the errors to the form
        return { errors: validatedFields.error.flatten().fieldErrors };
    }
    
    const reclamaciones = await readReclamaciones();
    const newId = (reclamaciones.length + 1).toString().padStart(5, '0');

    const newReclamacion: Reclamacion = {
        id: `REC-${new Date().getFullYear()}-${newId}`,
        ...validatedFields.data,
        fechaRegistro: new Date().toISOString(),
        estado: 'pendiente'
    };

    reclamaciones.push(newReclamacion);
    await writeReclamaciones(reclamaciones);
    
    // TODO: Implement email sending logic here
    // sendEmailToClient(newReclamacion);
    // sendEmailToBusiness(newReclamacion);

    revalidatePath('/reclamaciones');
    redirect('/reclamaciones/confirmacion');
}
