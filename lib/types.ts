export type Categoria = "stickers" | "packs" | "indumentaria" | "papeleria";

export interface Variante {
  id: string;
  nombre: string; // p.ej. "Talle M", "Color tierra"
  stock: number;
}

export interface Producto {
  id: string;
  slug: string;
  numero: string;
  number: string;
  nombre: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  stickerCount: string;
  format: string;
  material: string;
  precio: number;
  categoria: string;
  imagenes: string[];
  stock: number;
  destacado?: boolean;
  variantes?: Array<{ id: string; nombre: string; stock?: number }>;
}

export interface ItemCarrito {
  productoId: string;
  varianteId?: string;
  cantidad: number;
}
