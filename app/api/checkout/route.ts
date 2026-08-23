import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(request: Request) {
  try {
    const cuerpo = await request.json();

    // Verificación de credenciales
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    
    if (!token) {
      console.warn("MERCADOPAGO_ACCESS_TOKEN no está configurado.");
      return NextResponse.json({
        pedidoId: `PED-${Date.now()}`,
        referenciaExterna: `REF-${Math.floor(Math.random() * 10000)}`,
        subtotal: 0,
        costoEnvio: 0,
        total: 0,
        mensaje: "Pedido registrado. Nos pondremos en contacto para coordinar el pago.",
        mercadoPagoConfigurado: false
      });
    }

    const client = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(client);

    // Mapeo de items para la preferencia
    const itemsMP = (cuerpo.items || []).map((item: any) => ({
      id: String(item.productoId),
      title: "Producto Nolá",
      quantity: Number(item.cantidad),
      unit_price: Number(item.precio || 10000),
      currency_id: "ARS"
    }));

    const resMP = await preference.create({
      body: {
        items: itemsMP,
        payer: {
          name: cuerpo.datosComprador?.nombre || "Cliente",
          surname: cuerpo.datosComprador?.apellido || "Nolá",
          email: cuerpo.datosComprador?.email
        },
        back_urls: {
          success: `${request.headers.get("origin")}/`,
          failure: `${request.headers.get("origin")}/checkout`,
          pending: `${request.headers.get("origin")}/checkout`
        },
        auto_return: "approved"
      }
    });

    return NextResponse.json({
      pedidoId: `PED-${Date.now()}`,
      referenciaExterna: resMP.id,
      initPoint: resMP.init_point,
      mercadoPagoConfigurado: true,
      mensaje: "Redirigiendo a Mercado Pago..."
    });

  } catch (error: any) {
    console.error("Error en API Checkout:", error);

    return NextResponse.json(
      {
        error: "Ocurrió un error al procesar el pago.",
        detalles: error?.message || String(error),
        requiereCoordinacionManual: true
      },
      { status: 500 }
    );
  }
}