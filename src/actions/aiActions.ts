
"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Product, Reclamacion, SiteConfig } from "@/types";

const productsFilePath = path.join(process.cwd(), "src/data/products.json");
const reclamacionesFilePath = path.join(process.cwd(), "src/data/reclamaciones.json");
const configFilePath = path.join(process.cwd(), "src/lib/config.json");
const publicImagesPath = path.join(process.cwd(), "public/images");
const globalsCssPath = path.join(process.cwd(), "src/app/globals.css");

// --- Product Functions ---

export async function readProducts(): Promise<Product[]> {
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
  imagenes: z.array(z.any()).optional(),
  destacado: z.boolean().optional(),
});

async function saveImages(images: File[], productId: string): Promise<string[]> {
    if (!images || images.length === 0) return [];
    
    const imagePaths: string[] = [];
    const productImagesPath = path.join(publicImagesPath, productId);

    try {
        await fs.mkdir(productImagesPath, { recursive: true });
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            if (image.size === 0) continue;
            
            const imageExtension = image.name.split('.').pop();
            const imageName = `${Date.now()}_${i}.${imageExtension}`;
            const imageFullPath = path.join(productImagesPath, imageName);
            const imageBuffer = Buffer.from(await image.arrayBuffer());
            await fs.writeFile(imageFullPath, imageBuffer);
            imagePaths.push(`/images/${productId}/${imageName}`);
        }
    } catch (error) {
        console.error("Error saving images:", error);
    }
    return imagePaths;
}


export async function addProduct(formData: FormData) {
  const validatedFields = productSchema.safeParse({
    nombre: formData.get("nombre"),
    descripcion: formData.get("descripcion"),
    precio: formData.get("precio"),
    categoria: formData.get("categoria"),
    imagenes: formData.getAll("imagenes"),
    destacado: formData.get("destacado") === "on",
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return {
        errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const products = await readProducts();
  const productId = `prod_${new Date().getTime()}`;
  const { imagenes, ...productData } = validatedFields.data;
  
  const newProduct: Product = {
    id: productId,
    ...productData,
    imagenes: [], // Default empty
  };

  if (imagenes && imagenes.length > 0) {
      const imageFiles = imagenes.filter(img => img instanceof File && img.size > 0) as File[];
      const savedImagePaths = await saveImages(imageFiles, productId);
      newProduct.imagenes = savedImagePaths;
  }

  products.push(newProduct);
  await writeProducts(products);
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
    const imagesToDelete = formData.get('imagesToDelete') as string | null;
    
    const validatedFields = productSchema.safeParse({
        id: formData.get('id'),
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        precio: formData.get('precio'),
        categoria: formData.get('categoria'),
        imagenes: formData.getAll("imagenes"),
        destacado: formData.get("destacado") === "on",
    });

    if (!validatedFields.success || !validatedFields.data.id) {
         console.error(validatedFields.error);
        return {
            errors: validatedFields.error?.flatten().fieldErrors,
        };
    }

    const { id, imagenes, ...updatedData } = validatedFields.data;
    let products = await readProducts();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return { errors: { form: ['Product not found'] } };
    }
    
    const existingProduct = products[productIndex];
    let imagePaths = existingProduct.imagenes;

    // Handle image deletion
    if (imagesToDelete) {
        const pathsToDelete = imagesToDelete.split(',').filter(p => p);
        for (const imagePath of pathsToDelete) {
            try {
                await fs.unlink(path.join(process.cwd(), 'public', imagePath));
            } catch (error) {
                console.error(`Failed to delete image file: ${imagePath}`, error);
            }
        }
        imagePaths = imagePaths.filter(p => !pathsToDelete.includes(p));
    }


    // Handle new image upload
    if (imagenes && imagenes.length > 0) {
        const imageFiles = imagenes.filter(img => img instanceof File && img.size > 0) as File[];
        const newImagePaths = await saveImages(imageFiles, id);
        imagePaths = [...imagePaths, ...newImagePaths];
    }

    const updatedProduct: Product = {
        ...existingProduct,
        ...updatedData,
        imagenes: imagePaths,
    };

    products[productIndex] = updatedProduct;
    await writeProducts(products);

    revalidatePath("/admin/products");
    revalidatePath(`/products/${id}`);
    revalidatePath(`/admin/products/edit/${id}`);
    redirect("/admin/products");
}


export async function deleteProduct(productId: string) {
    if(!productId) return;

    let products = await readProducts();
    const productToDelete = products.find(p => p.id === productId);
    
    products = products.filter(p => p.id !== productId);
    await writeProducts(products);
    
    if (productToDelete) {
      const productImagesPath = path.join(publicImagesPath, productId);
      try {
        await fs.rm(productImagesPath, { recursive: true, force: true });
      } catch (error) {
        console.error(`Error deleting product image folder ${productImagesPath}:`, error);
      }
    }

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


// --- Config Functions ---
export async function readConfig(): Promise<SiteConfig> {
  try {
    const configData = await fs.readFile(configFilePath, "utf-8");
    const config = JSON.parse(configData);
    
    // Fallback for potentially null values to avoid errors in components
    const defaultConfig: SiteConfig = {
      variablesCss: {
        colorPrimario: "#113f69",
        colorSecundario: "#3eac68",
        colorFondo: "#f3f5f6",
        colorTexto: "#3f4750",
        colorAcento: "#6d28d9",
        darkColorPrimario: "#7bbaf3",
        darkColorSecundario: "#b1a2e8",
        darkColorFondo: "#2b323c",
        darkColorTexto: "#f8f9fa",
        darkColorAcento: "#a78bfa",
      },
      menus: [],
      titulos: {
        homepageHero: "Bienvenido a TiendaExpress",
        catalogo: "Nuestro Catálogo",
        carrito: "Tu Carrito",
        checkout: "Finalizar Compra",
        sobreNosotros: "Sobre Nosotros",
        contacto: "Contáctanos"
      },
      textos: {
        mensajeBienvenida: "Gracias por visitarnos",
        instruccionesCheckout: "Completa tus datos para finalizar tu pedido.",
        descripcionHomepage: "Los mejores productos, seleccionados para ti.",
        descripcionSobreNosotros: "Somos una tienda comprometida con la calidad.",
        infoContacto: "Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios."
      },
      contacto: {
        telefono: "N/A",
        correo: "N/A",
        direccion: "N/A",
        horarioAtencion: "N/A"
      },
      configuracionGeneral: {
        numeroWhatsApp: "",
        logoUrl: "/logo.svg",
        eslogan: "Rápido, fácil y a tu puerta."
      }
    };

    // Deep merge to apply defaults only where needed
    return {
        ...defaultConfig,
        ...config,
        variablesCss: { ...defaultConfig.variablesCss, ...config.variablesCss },
        menus: config.menus || defaultConfig.menus,
        titulos: { ...defaultConfig.titulos, ...config.titulos },
        textos: { ...defaultConfig.textos, ...config.textos },
        contacto: { ...defaultConfig.contacto, ...config.contacto },
        configuracionGeneral: { ...defaultConfig.configuracionGeneral, ...config.configuracionGeneral },
    };
  } catch (error) {
    console.error("Error reading config file, returning defaults:", error);
    // In case of a file read error, return a fully default configuration
    // This isn't ideal but prevents the site from crashing.
    const defaultConfig: SiteConfig = {
      variablesCss: {
        colorPrimario: "#113f69",
        colorSecundario: "#3eac68",
        colorFondo: "#f3f5f6",
        colorTexto: "#3f4750",
        colorAcento: "#6d28d9",
        darkColorPrimario: "#7bbaf3",
        darkColorSecundario: "#b1a2e8",
        darkColorFondo: "#2b323c",
        darkColorTexto: "#f8f9fa",
        darkColorAcento: "#a78bfa",
      },
      menus: [
        { titulo: "Inicio", enlace: "/" },
        { titulo: "Catálogo", enlace: "/products" },
        { titulo: "Sobre Nosotros", enlace: "/about" },
        { titulo: "Contacto", enlace: "/contact" }
      ],
      titulos: {
        homepageHero: "Bienvenido a TiendaExpress",
        catalogo: "Nuestro Catálogo",
        carrito: "Tu Carrito",
        checkout: "Finalizar Compra",
        sobreNosotros: "Sobre Nosotros",
        contacto: "Contáctanos"
      },
      textos: {
        mensajeBienvenida: "Gracias por visitarnos",
        instruccionesCheckout: "Completa tus datos para finalizar tu pedido.",
        descripcionHomepage: "Los mejores productos, seleccionados para ti.",
        descripcionSobreNosotros: "Somos una tienda comprometida con la calidad.",
        infoContacto: "Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios."
      },
      contacto: {
        telefono: "123-456-7890",
        correo: "info@tiendaexpress.com",
        direccion: "Calle Falsa 123, Ciudad",
        horarioAtencion: "Lun-Vie: 9am - 6pm"
      },
      configuracionGeneral: {
        numeroWhatsApp: "1234567890",
        logoUrl: "/logo.svg",
        eslogan: "Rápido, fácil y a tu puerta."
      }
    };
    return defaultConfig;
  }
}


async function writeConfig(config: SiteConfig): Promise<void> {
  try {
    const data = JSON.stringify(config, null, 2);
    await fs.writeFile(configFilePath, data, "utf8");
  } catch (error) {
    console.error("Error writing config file:", error);
  }
}

function hexToHsl(hex: string): string {
    if (!hex) return '0 0% 0%';
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
}


async function updateCssVariables(config: SiteConfig) {
    try {
        let cssContent = await fs.readFile(globalsCssPath, 'utf8');

        const updateTheme = (themeSelector: string, themeColors: any) => {
            const themeRegex = new RegExp(`(${themeSelector}\\s*{[\\s\\S]*?})`, 'g');
            
            return cssContent.replace(themeRegex, (match) => {
                let updatedTheme = match;
                for (const [key, value] of Object.entries(themeColors)) {
                    if (value) {
                       const hslValue = hexToHsl(value as string);
                       const propRegex = new RegExp(`(--${key}:\\s*.*?);`);
                       if (propRegex.test(updatedTheme)) {
                          updatedTheme = updatedTheme.replace(propRegex, `--${key}: ${hslValue};`);
                       }
                    }
                }
                return updatedTheme;
            });
        };

        cssContent = updateTheme(':root', {
            'background': config.variablesCss.colorFondo,
            'foreground': config.variablesCss.colorTexto,
            'primary': config.variablesCss.colorPrimario,
            'secondary': config.variablesCss.colorSecundario,
            'accent': config.variablesCss.colorAcento,
        });
        
        cssContent = updateTheme('.dark', {
            'background': config.variablesCss.darkColorFondo,
            'foreground': config.variablesCss.darkColorTexto,
            'primary': config.variablesCss.darkColorPrimario,
            'secondary': config.variablesCss.darkColorSecundario,
            'accent': config.variablesCss.darkColorAcento,
        });

        await fs.writeFile(globalsCssPath, cssContent, 'utf8');

    } catch (error) {
        console.error("Error updating CSS variables:", error);
    }
}


export async function updateConfig(formData: FormData) {
  const currentConfig = await readConfig();

  const newConfig: SiteConfig = {
      ...currentConfig,
      titulos: {
          homepageHero: formData.get('tituloHomepageHero') as string,
          catalogo: formData.get('tituloCatalogo') as string,
          carrito: formData.get('tituloCarrito') as string,
          checkout: formData.get('tituloCheckout') as string,
          sobreNosotros: formData.get('tituloSobreNosotros') as string,
          contacto: formData.get('tituloContacto') as string,
      },
      textos: {
          ...currentConfig.textos,
          mensajeBienvenida: formData.get('textoMensajeBienvenida') as string,
          instruccionesCheckout: formData.get('textoInstruccionesCheckout') as string,
          descripcionHomepage: formData.get('textoDescripcionHomepage') as string,
          descripcionSobreNosotros: formData.get('textoDescripcionSobreNosotros') as string,
          infoContacto: formData.get('textoInfoContacto') as string,
      },
      contacto: {
          telefono: formData.get('contactoTelefono') as string,
          correo: formData.get('contactoCorreo') as string,
          direccion: formData.get('contactoDireccion') as string,
          horarioAtencion: formData.get('contactoHorarioAtencion') as string,
      },
      configuracionGeneral: {
          ...currentConfig.configuracionGeneral,
          numeroWhatsApp: formData.get('generalNumeroWhatsApp') as string,
          eslogan: formData.get('generalEslogan') as string,
      }
  };

  await writeConfig(newConfig);

  // Revalidate all paths to reflect changes immediately
  revalidatePath('/', 'layout');

  redirect('/admin/config');
}

export async function updateTheme(formData: FormData) {
    const currentConfig = await readConfig();

    const newConfig: SiteConfig = {
        ...currentConfig,
        variablesCss: {
            ...currentConfig.variablesCss,
            colorPrimario: formData.get('colorPrimario') as string,
            colorSecundario: formData.get('colorSecundario') as string,
            colorFondo: formData.get('colorFondo') as string,
            colorTexto: formData.get('colorTexto') as string,
            colorAcento: formData.get('colorAcento') as string,
            darkColorPrimario: formData.get('darkColorPrimario') as string,
            darkColorSecundario: formData.get('darkColorSecundario') as string,
            darkColorFondo: formData.get('darkColorFondo') as string,
            darkColorTexto: formData.get('darkColorTexto') as string,
            darkColorAcento: formData.get('darkColorAcento') as string,
        },
    };

    await writeConfig(newConfig);
    await updateCssVariables(newConfig);

    revalidatePath('/', 'layout');
    redirect('/admin/theme');
}
