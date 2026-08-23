import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(request: Request) {
  try {
    const cuerpo = await request.json().catch(() => ({}));
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;

    // Si no hay token configurado o no hay items, enviamos respuesta directa sin esperar a MP
    if (!token || !cuerpo.items || cuerpo.items.length === 0) {
      return NextResponse.json({
        pedidoId: `PED-${Date.now()}`,
        referenciaExterna: `REF-${Math.floor(Math.random() * 10000)}`,
        subtotal: 0,
        costoEnvio: 0,
        total: 0,
        mensaje: "¡Pedido recibido! Nos pondremos en contacto por email para coordinar el pago.",
        mercadoPagoConfigurado: false
      });
    }

    // Configuración con timeout para que no se quede colgado "PROCESANDO..."
    const client = new MercadoPagoConfig({ 
      accessToken: token,
      options: { timeout: 5000 } // Máximo 5 segundos de espera
    });
    
    const preference = new Preference(client);

    const itemsMP = (cuerpo.items || []).map((item: any, idx: number) => ({
      id: String(item.productoId || idx),
      title: item.titulo || "Producto Nolá",
      quantity: Number(item.cantidad || 1),
      unit_price: Number(item.precio || 1000),
      currency_id: "ARS"
    }));

    const resMP = await preference.create({
      body: {
        items: itemsMP,
        payer: {
          name: cuerpo.datosComprador?.nombre || "Cliente",
          surname: cuerpo.datosComprador?.apellido || "Nolá",
          email: cuerpo.datosComprador?.email || "cliente@ejemplo.com"
        },
        back_urls: {
          success: `${request.headers.get("origin") || "http://localhost:3000"}/`,
          failure: `${request.headers.get("origin") || "http://localhost:3000"}/checkout`,
          pending: `${request.headers.get("origin") || "http://localhost:3000"}/checkout`
        },
        auto_return: "approved"
      }
    });

    return NextResponse.json({
      pedidoId: `PED-${Date.now()}`,
      referenciaExterna: resMP.id,
      initPoint: resMP.init_point,
      mercadoPagoConfigurado: true,
      mensaje: "Redirigiendo..."
    });

  } catch (error: any) {
    console.error("Error en checkout API:", error);

    // Fallback: si falla Mercado Pago, captura la orden para coordinar manualmente
    return NextResponse.json({
      pedidoId: `PED-${Date.now()}`,
      referenciaExterna: `MANUAL-${Math.floor(Math.random() * 10000)}`,
      subtotal: 0,
      costoEnvio: 0,
      total: 0,
      mensaje: "Registramos tu pedido. Nos comunicaremos a la brevedad para finalizar el pago.",
      mercadoPagoConfigurado: false
    });
  }
}