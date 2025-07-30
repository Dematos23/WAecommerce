
export interface Product {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: number;
  categoria: string;
  imagenes: string[];
  destacado?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
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
    fontFamily: string;
    marginBase: string;
    paddingBase: string;
    borderRadius: string;
    headingSize: string;
    paragraphSize: string;
  };
  menus: {
    titulo: string;
    enlace: string;
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
    pieDePagina: string;
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
    numeroWhatsApp: string;
    logoUrl: string;
    eslogan: string;
  };
}
