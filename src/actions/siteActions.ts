
"use server";

import type { SiteConfig } from "@/types";
import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';


const CONFIG_COLLECTION = 'siteConfig';
const CONFIG_DOC_ID = 'main';

/**
 * Reads the site configuration from the local `config.json` file as a fallback.
 */
async function readConfigFromJson(): Promise<SiteConfig> {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'config.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const config = JSON.parse(fileContent);
  return config as SiteConfig;
}

/**
 * Reads the site configuration from Firestore using the Admin SDK.
 * This is used for the main SaaS landing page and global elements.
 * If Firestore is unavailable, it gracefully falls back to the local config.json.
 */
export async function readConfig(): Promise<SiteConfig> {
  try {
    const docRef = adminDb.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return docSnap.data() as SiteConfig;
    } else {
      console.log("Config document not found in Firestore, falling back to local JSON.");
      return await readConfigFromJson();
    }
  } catch (error) {
    console.error("Error reading config from Firestore with Admin SDK, falling back to local JSON.", error);
    return await readConfigFromJson();
  }
}

/**
 * Updates the site configuration in Firestore using the Admin SDK.
 * @param {SiteConfig} configData - The new configuration object to save.
 */
export async function updateConfig(configData: SiteConfig): Promise<{ success: boolean; error?: string }> {
  try {
    const docRef = adminDb.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID);
    await docRef.set(configData, { merge: true });
    
    // Revalidate all paths that might use this config
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error: any) {
    console.error("Error updating config in Firestore with Admin SDK:", error);
    return { success: false, error: error.message };
  }
}


/**
 * Initializes the Firestore config document from a hardcoded JSON object.
 * This is intended to be run once to migrate the data.
 */
export async function initializeConfig(): Promise<{ success: boolean; error?: string }> {
    console.log("Initializing Firestore config from hardcoded JSON object using Admin SDK...");
    
    const configData = {
      "cssVariables": {
        "primaryColor": "#1D63FF",
        "secondaryColor": "#F8F8F9",
        "backgroundColor": "#F8F8F9",
        "textColor": "#111111",
        "accentColor": "#FFCE32",
        "decorativeColor": "#F95B03",
        "fontFamily": "Manrope",
        "h1Size": "48px",
        "h2Size": "36px",
        "h3Size": "28px",
        "paragraphSize": "18px",
        "buttonFontSize": "16px",
        "baseMargin": "1rem",
        "basePadding": "1rem",
        "borderRadius": "0.5rem"
      },
      "header": {
        "menu": [
          { "title": "Características", "link": "/#features" },
          { "title": "Precios", "link": "/pricing" },
          { "title": "Contacto", "link": "/contact" }
        ]
      },
      "footer": {
        "slogan": "Tu tienda, a tu manera.",
        "socialLinks": [
          { "name": "Instagram", "url": "#" },
          { "name": "Facebook", "url": "#" },
          { "name": "TikTok", "url": "#" }
        ],
        "navigation": [
          { "title": "Características", "link": "/#features" },
          { "title": "Precios", "link": "/pricing" },
          { "title": "Contacto", "link": "/contact" }
        ],
        "legal": [
          { "title": "Términos y Condiciones", "link": "/terms" },
          { "title": "Política de Privacidad", "link": "/privacy" },
          { "title": "Política de Cookies", "link": "/cookies" }
        ],
        "contact": {
          "phone": "+51 987 654 321",
          "email": "contacto@kima.com",
          "address": "Lima, Perú"
        },
        "copyright": "© {year} Kima. Todos los derechos reservados."
      },
      "homepage": {
        "hero": {
          "title": "Lanza tu Tienda Online en Minutos, no en Meses.",
          "description": "Kima te da las herramientas para crear y gestionar tu e-commerce de forma rápida, fácil y sin comisiones por venta.",
          "ctaPrimary": { "text": "Empieza ahora", "link": "/register" },
          "ctaSecondary": { "text": "Login", "link": "/login" }
        },
        "features": {
          "preTitle": "POR QUÉ ELEGIR KIMA",
          "title": "Todo lo que necesitas para vender en línea",
          "description": "Desde la configuración inicial hasta la gestión diaria, nuestra plataforma está diseñada para simplificar tu vida.",
          "items": [
            {
              "icon": "Store",
              "name": "Tu Propia Tienda",
              "description": "Crea y personaliza tu tienda en línea con tu propia marca, logo y productos."
            },
            {
              "icon": "TrendingUp",
              "name": "Gestión Sencilla",
              "description": "Un panel de control intuitivo para gestionar tus productos, pedidos y clientes sin complicaciones."
            },
            {
              "icon": "Brush",
              "name": "Diseño Personalizable",
              "description": "Elige colores, fuentes y estilos para que tu tienda refleje la identidad de tu marca."
            }
          ]
        },
        "secondaryHero": {
          "enabled": true,
          "title": "¿Listo para empezar a vender?",
          "description": "Únete a cientos de emprendedores que ya confían en nuestra plataforma. Crea tu cuenta y lanza tu tienda hoy mismo.",
          "cta": { "text": "Crear mi Tienda Ahora", "link": "/register" }
        }
      },
      "pricingPage": {
        "title": "Planes y Precios",
        "description": "Elige el plan que mejor se adapte a las necesidades de tu negocio.",
        "plans": [
          {
            "name": "Básico",
            "price": "$29",
            "period": "/mes",
            "description": "Ideal para pequeñas tiendas que recién empiezan.",
            "features": [
              "Hasta 100 productos",
              "Funcionalidad de e-commerce completa",
              "Soporte por correo electrónico"
            ],
            "cta": { "text": "Empezar Plan Básico", "link": "/register" }
          },
          {
            "name": "Profesional",
            "price": "$79",
            "period": "/mes",
            "description": "Perfecto para negocios en crecimiento con más volumen.",
            "features": [
              "Productos ilimitados",
              "Dominios personalizados",
              "Analíticas avanzadas",
              "Soporte prioritario 24/7"
            ],
            "cta": { "text": "Empezar Plan Profesional", "link": "/register" },
            "popular": true
          },
          {
            "name": "Empresarial",
            "price": "Custom",
            "period": "",
            "description": "Soluciones a medida para grandes empresas.",
            "features": [
              "Todo lo del plan Profesional",
              "APIs para integraciones",
              "Manager de cuenta dedicado",
              "SLA personalizado"
            ],
            "cta": { "text": "Contactar Ventas", "link": "/contact" }
          }
        ]
      },
      "contactPage": {
        "title": "Contáctanos",
        "description": "Estamos aquí para ayudarte. Rellena el formulario o utiliza nuestros datos de contacto.",
        "formTitle": "Envíanos un Mensaje"
      },
      "generalConfig": {
        "storeName": "Kima",
        "logoUrl": "/images/logo.png",
        "displayMode": "both"
      }
    };

    try {
        const docRef = adminDb.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID);
        await docRef.set(configData);
        console.log("Successfully initialized Firestore config with hardcoded data using Admin SDK.");
        revalidatePath('/', 'layout');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to initialize Firestore config with Admin SDK:", error);
        return { success: false, error: error.message };
    }
}
