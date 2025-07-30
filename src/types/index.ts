
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
