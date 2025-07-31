
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

export interface SiteConfig {
  variablesCss: {
    colorPrimario: string;
    colorSecundario: string;
    colorFondo: string;
    colorTexto: string;
    colorAcento: string;
  };
  menus: {
    label: string;
    href: string;
  }[];
  titulos: {
    homepageHero: string;
    catalogo: string;
    carrito: string;
    checkout: string;
    sobreNosotros: string;
    contacto: string;
  };
  textos: {
    mensajeBienvenida: string;
    instruccionesCheckout: string;
    descripcionHomepage: string;
    descripcionSobreNosotros: string;
    infoContacto: string;
  };
  contacto: {
    telefono: string;
    correo: string;
    direccion: string;
    horarioAtencion: string;
  };
  configuracionGeneral: {
    nombreTienda: string;
    numeroWhatsApp: string;
    logoUrl: string;
    eslogan: string;
    mensajePedidoWhatsApp?: string;
    displayMode?: 'logo' | 'name' | 'both';
    heroImageUrl?: string;
  };
  secondaryHero?: {
    enabled: boolean;
    title: string;
    description: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
  };
  productCard: {
    nameAlign: 'left' | 'center';
    descriptionAlign: 'left' | 'center';
    priceAlign: 'left' | 'center';
    buttonStyle: 'default' | 'outline';
    shadow: 'none' | 'sm' | 'md' | 'lg';
    imagePosition: 'top' | 'afterName' | 'afterDescription' | 'afterPrice';
  };
  informacionLegal: {
    razonSocial: string;
    ruc: string;
    direccionLegal: string;
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
