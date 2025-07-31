
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      tenantId: string;
    } & DefaultSession['user'];
  }
}


export interface Product {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: number;
  categoria: string;
  imagenes: string[];
  destacado?: boolean;
}

export interface Reclamacion {
    id: string;
    fechaReclamo: string;
    nombreCompleto: string;
    domicilio?: string;
    tipoDocumento: string;
    numeroDocumento: string;
    email: string;
    telefono?: string;
    nombreApoderado?: string;
    tipoBien: string;
    montoReclamado?: string;
    descripcionBien?: string;
    tipoReclamacion: string;
    detalleReclamacion: string;
    pedido?: string;
    fechaRegistro: string;
    estado: 'pendiente' | 'en-proceso' | 'resuelto';
    observacionesVendedor?: string;
}

export interface MenuItem {
  titulo: string;
  enlace: string;
}

export interface SiteConfig {
  header: {
    menu: MenuItem[];
  };
  footer: {
    eslogan: string;
    socialLinks: { name: string; url: string }[];
    navigation: MenuItem[];
    legal: MenuItem[];
    contacto: {
      telefono: string;
      correo: string;
      direccion: string;
    };
    copyright: string;
  };
  homepage: {
    hero: {
      title: string;
      description: string;
      ctaPrimary: { text: string; link: string };
      ctaSecondary: { text: string; link: string };
    };
    features: {
      preTitle: string;
      title: string;
      description: string;
      items: {
        icon: string;
        name: string;
        description: string;
      }[];
    };
    secondaryHero: {
      enabled: boolean;
      title: string;
      description: string;
      cta: { text: string; link: string };
    };
  };
  pricingPage: {
    title: string;
    description: string;
    plans: {
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      cta: { text: string; link: string };
      popular?: boolean;
    }[];
  };
  contactPage: {
    title: string;
    description: string;
    formTitle: string;
  };
  configuracionGeneral: {
    nombreTienda: string;
    logoUrl: string;
    displayMode?: 'logo' | 'name' | 'both';
  };
}


export interface Tenant {
    id: string;
    name: string;
    slug: string;
    ownerId: string;
    createdAt: any; // Firestore timestamp
    config?: Partial<SiteConfig>;
}
