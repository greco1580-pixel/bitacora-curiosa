import { MetadataRoute } from "next";
import { productos } from "@/data/products";
import { entradasBitacora } from "@/lib/bitacora";

// Reemplazar por el dominio real cuando esté disponible.
const SITE_URL = "https://www.bitacoracuriosa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasEstaticas = [
    "",
    "/tienda",
    "/el-proyecto",
    "/lucia-y-monstruito",
    "/bitacora",
    "/preguntas-frecuentes",
    "/envios-cambios",
    "/privacidad",
    "/terminos",
    "/arrepentimiento",
    "/contacto",
    "/carrito"
    // /checkout y /pago/* quedan afuera a propósito: son pasos de un flujo
    // transaccional, no páginas que interese indexar.
  ].map((ruta) => ({
    url: `${SITE_URL}${ruta}`,
    lastModified: new Date()
  }));

  const paginasProductos = productos.map((p) => ({
    url: `${SITE_URL}/producto/${p.slug}`,
    lastModified: new Date()
  }));

  const paginasBitacora = entradasBitacora.map((e) => ({
    url: `${SITE_URL}/bitacora/${e.slug}`,
    lastModified: new Date(e.fecha)
  }));

  return [...paginasEstaticas, ...paginasProductos, ...paginasBitacora];
}
