
export interface MenuItem {
  title: string;
  link: string;
}

export interface SiteConfig {
  cssVariables: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    decorativeColor: string;
    fontFamily: string;
    h1Size: string;
    h2Size: string;
    h3Size: string;
    paragraphSize: string;
    buttonFontSize: string;
    baseMargin: string;
    basePadding: string;
    borderRadius: string;
  };
  header: {
    menu: { title: string; link: string }[];
  };
  footer: {
    slogan: string;
    socialLinks: { name: string; url: string }[];
    navigation: { title: string; link: string }[];
    legal: { title: string; link: string }[];
    contact: {
      phone: string;
      email: string;
      address: string;
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
  generalConfig: {
    storeName: string;
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
