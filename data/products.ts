import { Producto } from "@/lib/types";
export type { Producto };
export const productos: Producto[] = [
  {
    id: "p1",
    slug: "pack-n1-de-5",
    numero: "N.º 001",
    number: "PACK N.º 001",
    nombre: "Todo al mismo tiempo",
    name: "Todo al mismo tiempo",
    shortDescription: "Para cuando todo ocurre al mismo tiempo y hasta el silencio parece hacer ruido.",
    longDescription: "Una pequeña forma de ponerle palabras —y un poco de humor— a la sobreestimulación.",
    stickerCount: "5 stickers",
    format: "Formatos combinados",
    material: "Vinilo resistente al agua",
    precio: 6000,
    categoria: "stickers",
    imagenes: ["/images/productos/todo-al-mismo-tiempo.png"],
    stock: 42,
    destacado: true,
  },
  {
    id: "p2",
    slug: "pack-n2-de-5",
    numero: "N.º 002",
    number: "PACK N.º 002",
    nombre: "Adulto por error",
    name: "Adulto por error",
    shortDescription: "Para quienes aparentan adultez, pero internamente siguen improvisando.",
    longDescription: "Caos, neurodivergencia y un funcionamiento sospechosamente convincente.",
    stickerCount: "5 stickers",
    format: "Tamaño mediano",
    material: "Vinilo resistente al agua",
    precio: 6000,
    categoria: "stickers",
    imagenes: ["/images/productos/adulto-por-error.png"],
    stock: 30,
    destacado: true,
  },
  {
    id: "p3",
    slug: "pack-n3-de-5",
    numero: "N.º 003",
    number: "PACK N.º 003",
    nombre:"Una cosa llevó a siete",
    name: "Una cosa llevó a siete",
    shortDescription: "Empezaste con una idea. Ahora hay siete en curso y ninguna piensa esperar su turno.",
    longDescription: "Hiperfoco, sobrepensamiento y caminos mentales alternativos.",
    stickerCount: "5 stickers",
    format: "Tamaño mediano",
    material: "Vinilo resistente al agua",
    precio: 6000,
    categoria: "stickers",
    imagenes: ["/images/productos/una-cosa-llevo-a-siete.png"],
    stock: 25,
    destacado: true,
  },
  {
    id: "p4",
    slug: "pack-n4-de-10",
    numero: "N.º 004",
    number: "PACK N.º 004",
    nombre: "Cerebro ocupado",
    name: "Cerebro ocupado",
    shortDescription: "Memoria intermitente, instrucciones que se evaporan y demasiadas pestañas abiertas.",
    longDescription: "Distintas maneras de acompañar a un cerebro que nunca está realmente desocupado.",
    stickerCount: "10 stickers",
    format: "Tres tamaños",
    material: "Vinilo resistente al agua",
    precio: 10000,
    categoria: "stickers",
    imagenes: ["/images/productos/cerebro-ocupado.png"],
    stock: 15,
    destacado: true,
  },
  {
    id: "p5",
    slug: "pack-n5-de-10",
    numero: "N.º 005",
    number: "PACK N.º 005",
    nombre: "Acercarse bajo su propio riesgo",
    name: "Acercarse bajo su propio riesgo",
    shortDescription: "Una advertencia amable: hoy puede haber sarcasmo, sobreestimulación y capacidad limitada.",
    longDescription: "Para comunicarte sin gastar los recursos que te quedan.",
    stickerCount: "11 stickers",
    format: "Tres tamaños",
    material: "Vinilo resistente al agua",
    precio: 10000,
    categoria: "stickers",
    imagenes: ["/images/productos/acercarse-bajo-su-propio-riesgo.png"],
    stock: 18,
    destacado: false, // Forzamos false para que solo 4 vayan a portada
  },
];

export function obtenerProductoPorSlug(slugOrId: string) {
  return productos.find(
    (p) =>
      p.slug === slugOrId ||
      p.id === slugOrId ||
      `p${p.id}` === slugOrId ||
      String(p.id) === slugOrId
  );
}

export function obtenerDestacados(): Producto[] {
  return productos.filter((p) => p.destacado).slice(0, 4);
}

export function obtenerRelacionados(producto: Producto, cantidad = 4): Producto[] {
  return productos
    .filter((p) => p.id !== producto.id && p.categoria === producto.categoria)
    .slice(0, cantidad);
}