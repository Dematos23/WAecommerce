export interface Product {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: number;
  categoria: string;
  imagen: string;
}

export interface CartItem extends Product {
  quantity: number;
}
