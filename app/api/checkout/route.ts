import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(request: Request) {
  try {
    let cuerpo: any;
    try {
      cuerpo = await request.json();
    } catch {
      return NextResponse.json(
        { error: "El cuerpo de la petición no es un JSON válido." },
        { status: 400 }
      );
    }

    if (!cuerpo.items || !Array.isArray(cuerpo.items) || cuerpo.items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío o la estructura de ítems es inválida." },
        { status: 400 }
      );
    }

    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;

    // Si no hay token de Mercado Pago, genera el pedido exitoso en modo manual
    if (!token) {
      return NextResponse.json({
        pedidoId: `PED-${Date.now()}`,
        referenciaExterna: `REF-${Math.floor(Math.random() * 10000)}`,
        subtotal: 0,
        costoEnvio: 0,
        total: 0,
        mensaje: "Pedido registrado con éxito. Nos pondremos en contacto por email para coordinar el pago y la entrega.",
        mercadoPagoConfigurado: false
      });
    }

    const client = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(client);

    const itemsMP = cuerpo.items.map((item: any, index: number) => ({
      id: String(item.productoId || index),
      title: item.titulo || "Producto",
      quantity: Math.max(1, Number(item.cantidad) || 1),
      unit_price: Math.max(1, Number(item.precio) || 1000),
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
      mensaje: "Redirigiendo a Mercado Pago..."
    });

  } catch (error: any) {
    console.error("Error en API /api/checkout:", error);

    return NextResponse.json(
      {
        error: "No se pudo procesar la orden.",
        detalles: error?.message || String(error),
        requiereCoordinacionManual: true
      },
      { status: 500 }
    );
  }
}