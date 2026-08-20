// Entradas de la Bitácora — CONTENIDO PROVISIONAL, marcado para reemplazo.
// Estructura tipada simple, en línea con /data/products.ts. Si más
// adelante el volumen editorial crece, esto se puede migrar a archivos
// MDX individuales sin cambiar la forma en que las páginas consumen
// `EntradaBitacora[]`.

export type CategoriaBitacora =
  | "neurodivergencia"
  | "sobrecarga"
  | "curiosidades"
  | "vinculos"
  | "vida-cotidiana"
  | "mente"
  | "humor";

export interface EntradaBitacora {
  slug: string;
  titulo: string;
  bajada: string;
  fecha: string; // ISO 8601
  categoria: CategoriaBitacora;
  tiempoLecturaMin: number;
  contenido: string[]; // párrafos, contenido provisional
  imagen?: string;
  seoDescripcion: string;
}

export const entradasBitacora: EntradaBitacora[] = [
  {
    slug: "treinta-y-siete-pestanas",
    titulo: "Treinta y siete pestañas y ninguna cerrada",
    bajada: "Sobre por qué cerrar una pestaña a veces se siente como perder algo.",
    fecha: "2026-05-04",
    categoria: "sobrecarga",
    tiempoLecturaMin: 3,
    seoDescripcion: "Una entrada breve sobre sobrecarga perceptiva y pestañas abiertas.",
    contenido: [
      "[CONTENIDO PROVISIONAL — reemplazar por la entrada real.]",
      "Hay algo particular en tener treinta y siete pestañas abiertas: ninguna se cierra del todo sola, y cerrarlas a mano se siente, por algún motivo, como tirar información importante."
    ]
  },
  {
    slug: "registro-diario-que-no-se-completa",
    titulo: "El cuaderno de registro que nunca se completa entero",
    bajada: "Empezar un hábito de registro y abandonarlo a la mitad, otra vez.",
    fecha: "2026-04-18",
    categoria: "vida-cotidiana",
    tiempoLecturaMin: 4,
    seoDescripcion: "Sobre empezar hábitos de registro y no sostenerlos, sin culpa.",
    contenido: [
      "[CONTENIDO PROVISIONAL — reemplazar por la entrada real.]",
      "El cuaderno se compra con toda la intención de escribir todos los días. Dura dos semanas. Después queda ahí, con la mitad de las páginas en blanco, como casi todos los intentos de registro diario."
    ]
  },
  {
    slug: "monstruito-y-el-mate-frio",
    titulo: "Monstruito y el mate que se enfría en la mesa",
    bajada: "Una escena chica sobre perder la noción del tiempo en medio de algo.",
    fecha: "2026-03-22",
    categoria: "curiosidades",
    tiempoLecturaMin: 2,
    seoDescripcion: "Una viñeta corta protagonizada por Monstruito.",
    contenido: [
      "[CONTENIDO PROVISIONAL — reemplazar por la entrada real.]",
      "El mate se enfría en la mesa mientras Monstruito sigue enredado en algo que empezó hace cuarenta minutos y que, en su momento, parecía que iba a llevar cinco."
    ]
  }
];

export function obtenerEntradaPorSlug(slug: string): EntradaBitacora | undefined {
  return entradasBitacora.find((e) => e.slug === slug);
}

export function obtenerEntradasRelacionadas(
  entrada: EntradaBitacora,
  cantidad = 3
): EntradaBitacora[] {
  return entradasBitacora
    .filter((e) => e.slug !== entrada.slug && e.categoria === entrada.categoria)
    .slice(0, cantidad);
}
