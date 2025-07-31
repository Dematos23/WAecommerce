
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Product, Reclamacion, SiteConfig, Tenant } from "@/types";
import { sendReclamacionConfirmation, sendReclamacionNotification } from "@/lib/email";
import { db } from "@/lib/firebase";
import { getTenant } from "@/lib/tenant";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';

// --- Product Functions ---

export async function readProducts(): Promise<Product[]> {
    const tenant = await getTenant();
    if (!tenant) return [];

    const productsRef = collection(db, 'tenants', tenant.id, 'products');
    const snapshot = await getDocs(productsRef);
    
    if (snapshot.empty) {
        return [];
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

async function writeProducts(products: Product[]): Promise<void> {
    // This function will now be handled by addProduct, updateProduct, deleteProduct
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
    // This should be updated to use a cloud storage like Firebase Storage
    // For now, we'll keep the existing logic but it's not multi-tenant safe
    if (!images || images.length === 0) return [];
    console.warn("Image saving is not multi-tenant safe and should be migrated to a cloud storage provider.");
    return [];
}


export async function addProduct(formData: FormData) {
  const tenant = await getTenant();
  if (!tenant) throw new Error("Tenant not found");

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

  const { id, imagenes, ...productData } = validatedFields.data;
  const productsRef = collection(db, 'tenants', tenant.id, 'products');
  const newDocRef = await addDoc(productsRef, {
    ...productData,
    imagenes: [], // Default empty, should be handled by a proper image upload service
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
    const tenant = await getTenant();
    if (!tenant) throw new Error("Tenant not found");
    
    const validatedFields = productSchema.safeParse({
        id: formData.get('id'),
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        precio: formData.get('precio'),
        categoria: formData.get("categoria"),
        destacado: formData.get("destacado") === "on",
    });

    if (!validatedFields.success || !validatedFields.data.id) {
         console.error(validatedFields.error);
        return {
            errors: validatedFields.error?.flatten().fieldErrors,
        };
    }

    const { id, ...updatedData } = validatedFields.data;
    const productRef = doc(db, 'tenants', tenant.id, 'products', id);
    
    await updateDoc(productRef, {
        ...updatedData
    });

    revalidatePath("/admin/products");
    revalidatePath(`/products/${id}`);
    revalidatePath(`/admin/products/edit/${id}`);
    redirect("/admin/products");
}


export async function deleteProduct(productId: string) {
    if(!productId) return;
    const tenant = await getTenant();
    if (!tenant) throw new Error("Tenant not found");

    const productRef = doc(db, 'tenants', tenant.id, 'products', productId);
    await deleteDoc(productRef);
    
    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
    redirect("/admin/products");
}


// --- Reclamaciones Functions ---

async function readReclamaciones(): Promise<Reclamacion[]> {
    const tenant = await getTenant();
    if (!tenant) return [];
    
    const reclamacionesRef = collection(db, 'tenants', tenant.id, 'reclamaciones');
    const snapshot = await getDocs(query(reclamacionesRef, orderBy('fechaRegistro', 'desc')));
    
    if (snapshot.empty) {
        return [];
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reclamacion));
}

async function writeReclamaciones(reclamaciones: Reclamacion[]): Promise<void> {
  //This will be handled by addReclamacion
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
    const tenant = await getTenant();
    if (!tenant) throw new Error("Tenant not found");

    const data = Object.fromEntries(formData.entries());
    const validatedFields = reclamacionSchema.safeParse(data);
    
    if (!validatedFields.success) {
        console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
        return { errors: validatedFields.error.flatten().fieldErrors };
    }
    
    const newReclamacionData = {
        ...validatedFields.data,
        fechaRegistro: new Date().toISOString(),
        estado: 'pendiente'
    };

    const reclamacionesRef = collection(db, 'tenants', tenant.id, 'reclamaciones');
    const newDocRef = await addDoc(reclamacionesRef, newReclamacionData);

    const newReclamacion: Reclamacion = {
        id: newDocRef.id,
        ...newReclamacionData
    }
    
    const config = await readConfig();

    try {
        await sendReclamacionConfirmation(newReclamacion, config);
        await sendReclamacionNotification(newReclamacion, config);
    } catch (error) {
        console.error("Failed to send reclamacion emails:", error);
    }

    revalidatePath('/reclamaciones');
    redirect('/reclamaciones/confirmacion');
}


// --- Config Functions ---
export async function readConfig(): Promise<SiteConfig> {
  const tenant = await getTenant();
  
  const defaultConfig: SiteConfig = {
      variablesCss: {
        colorPrimario: "#113f69",
        colorSecundario: "#3eac68",
        colorFondo: "#f3f5f6",
        colorTexto: "#3f4750",
        colorAcento: "#6d28d9",
      },
      menus: [],
      titulos: {
        homepageHero: "Bienvenido a Tu Tienda",
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
        infoContacto: "Estamos aquí para ayudarte."
      },
      contacto: {
        telefono: "N/A",
        correo: "N/A",
        direccion: "N/A",
        horarioAtencion: "N/A"
      },
      configuracionGeneral: {
        nombreTienda: tenant?.name ?? "TiendaExpress",
        numeroWhatsApp: "",
        logoUrl: "/logo.svg",
        eslogan: "Rápido, fácil y a tu puerta.",
        mensajePedidoWhatsApp: "¡Gracias por tu compra! 😊",
        displayMode: 'both',
        heroImageUrl: '',
      },
      secondaryHero: {
        enabled: false,
        title: "",
        description: "",
        imageUrl: "",
        ctaText: "",
        ctaLink: ""
      },
      productCard: {
        nameAlign: 'left',
        descriptionAlign: 'left',
        priceAlign: 'left',
        buttonStyle: 'default',
        shadow: 'md',
        imagePosition: 'top'
      },
      informacionLegal: {
        razonSocial: "Tu Razón Social S.A.C.",
        ruc: "12345678901",
        direccionLegal: "Tu Dirección Fiscal, Ciudad, País"
      }
    };

  if (!tenant) {
      return defaultConfig;
  }

  const tenantConfig = (tenant.config || {}) as Partial<SiteConfig>;
  
  return {
      ...defaultConfig,
      ...tenantConfig,
      variablesCss: { ...defaultConfig.variablesCss, ...tenantConfig.variablesCss },
      menus: tenantConfig.menus || defaultConfig.menus,
      titulos: { ...defaultConfig.titulos, ...tenantConfig.titulos },
      textos: { ...defaultConfig.textos, ...tenantConfig.textos },
      contacto: { ...defaultConfig.contacto, ...tenantConfig.contacto },
      configuracionGeneral: { ...defaultConfig.configuracionGeneral, ...tenantConfig.configuracionGeneral, nombreTienda: tenant.name },
      secondaryHero: { ...defaultConfig.secondaryHero, ...tenantConfig.secondaryHero },
      productCard: { ...defaultConfig.productCard, ...tenantConfig.productCard },
      informacionLegal: { ...defaultConfig.informacionLegal, ...tenantConfig.informacionLegal },
  };
}


async function writeConfig(config: SiteConfig): Promise<void> {
  const tenant = await getTenant();
  if (!tenant) throw new Error("Tenant not found");

  const tenantRef = doc(db, 'tenants', tenant.id);
  await updateDoc(tenantRef, { config });
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
    // This is now a client-side concern, handled dynamically.
    // This function can be removed or adapted if static CSS generation is needed.
}


export async function updateConfig(formData: FormData) {
  const currentConfig = await readConfig();

  // Image handling should be migrated to a proper cloud storage solution
  const logoUrl = currentConfig.configuracionGeneral.logoUrl;
  const heroImageUrl = currentConfig.configuracionGeneral.heroImageUrl;
  const secondaryHeroImageUrl = currentConfig.secondaryHero?.imageUrl || "";


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
          nombreTienda: formData.get('generalNombreTienda') as string,
          logoUrl: logoUrl,
          heroImageUrl: heroImageUrl,
          displayMode: formData.get('generalDisplayMode') as 'logo' | 'name' | 'both',
          numeroWhatsApp: formData.get('generalNumeroWhatsApp') as string,
          eslogan: formData.get('generalEslogan') as string,
          mensajePedidoWhatsApp: formData.get('generalMensajePedidoWhatsApp') as string,
      },
      secondaryHero: {
        enabled: formData.get('secondaryHeroEnabled') === 'on',
        title: formData.get('secondaryHeroTitle') as string,
        description: formData.get('secondaryHeroDescription') as string,
        imageUrl: secondaryHeroImageUrl,
        ctaText: formData.get('secondaryHeroCtaText') as string,
        ctaLink: formData.get('secondaryHeroCtaLink') as string,
      },
      informacionLegal: {
        razonSocial: formData.get('legalRazonSocial') as string,
        ruc: formData.get('legalRuc') as string,
        direccionLegal: formData.get('legalDireccion') as string,
      }
  };

  await writeConfig(newConfig);
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
        },
        productCard: {
            nameAlign: formData.get('productCardNameAlign') as 'left' | 'center',
            descriptionAlign: formData.get('productCardDescriptionAlign') as 'left' | 'center',
            priceAlign: formData.get('productCardPriceAlign') as 'left' | 'center',
            buttonStyle: formData.get('productCardButtonStyle') as 'default' | 'outline',
            shadow: formData.get('productCardShadow') as 'none' | 'sm' | 'md' | 'lg',
            imagePosition: formData.get('productCardImagePosition') as 'top' | 'afterName' | 'afterDescription' | 'afterPrice',
        }
    };

    await writeConfig(newConfig);
    revalidatePath('/', 'layout');
    redirect('/admin/theme');
}
