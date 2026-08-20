import { MercadoPagoConfig } from "mercadopago";

/**
 * Devuelve un cliente de Mercado Pago configurado, o `null` si todavía no
 * hay un Access Token cargado. El resto del código SIEMPRE debe chequear
 * este `null` y avisar con claridad que el pago no está disponible en vez
 * de simular que funciona (ver punto 10 del brief: nunca afirmar que el
 * pago funciona si faltan credenciales).
 */
export function obtenerClienteMercadoPago(): MercadoPagoConfig | null {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) return null;
  return new MercadoPagoConfig({ accessToken, options: { timeout: 8000 } });
}

export function mercadoPagoConfigurado(): boolean {
  return Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN);
}

/** URL base pública del sitio, usada para las back_urls y el webhook. */
export function obtenerUrlBase(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url) {
    throw new Error(
      "Falta configurar NEXT_PUBLIC_SITE_URL: es necesaria para armar las URLs de retorno de Mercado Pago."
    );
  }
  return url.replace(/\/$/, "");
}
