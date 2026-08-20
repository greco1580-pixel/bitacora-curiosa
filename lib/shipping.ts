// Configuración centralizada de envío.
//
// ⚠️ VALORES DE DEMOSTRACIÓN — reemplazar por tarifas reales antes de
// publicar. Estos números son inventados para poder probar el flujo de
// compra de punta a punta; no representan costos reales de ningún correo.
//
// Cómo reemplazar: editar TARIFAS_ENVIO_DEMO_ARS. Las claves son nombres
// de provincia tal como los devuelve el <select> de /checkout
// (ver PROVINCIAS_ARGENTINA más abajo). Si una provincia no tiene tarifa
// cargada, el checkout NO asume envío gratis ni deja pasar un total
// incorrecto: muestra un mensaje pidiendo coordinar el envío a mano.

export const TARIFAS_ENVIO_DEMO_ARS: Record<string, number> = {
  "Ciudad Autónoma de Buenos Aires": 2500,
  "Buenos Aires": 3500,
  Córdoba: 4800,
  "Santa Fe": 4800,
  Mendoza: 5500
  // Agregar el resto de las provincias con su tarifa real antes de publicar.
};

export const PROVINCIAS_ARGENTINA = [
  "Ciudad Autónoma de Buenos Aires",
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán"
] as const;

/**
 * Devuelve el costo de envío en ARS para una provincia, o `null` si todavía
 * no hay una tarifa configurada para esa zona. `null` NUNCA debe
 * interpretarse como envío gratuito: la UI y la API deben pedir
 * coordinación manual en ese caso.
 */
export function calcularCostoEnvio(provincia: string): number | null {
  return TARIFAS_ENVIO_DEMO_ARS[provincia] ?? null;
}
