
export interface MenuItem {
  titulo: string;
  enlace: string;
}

export interface SiteConfig {
  variablesCss: {
    colorPrimario: string;
    colorSecundario: string;
    colorFondo: string;
    colorTexto: string;
    colorAcento: string;
    colorDecorativo: string;
    fontFamily: string;
    h1Size: string;
    h2Size: string;
    h3Size: string;
    paragraphSize: string;
    buttonFontSize: string;
    marginBase: string;
    paddingBase: string;
    borderRadius: string;
  };
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


export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    providerId: string | undefined;
    createdAt: any; // Firestore timestamp
    type: 'admin' | 'client';
}
