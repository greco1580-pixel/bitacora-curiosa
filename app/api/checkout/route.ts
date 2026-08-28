import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const cuerpo = await request.json().catch(() => ({}));
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    const { items, datosComprador, envio } = cuerpo;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío." }, { status: 400 });
    }

    // Identificador único para Mercado Pago y la DB
    const referenciaExterna = `PED-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Calculamos los montos enteros en ARS
    const subtotal = items.reduce(
      (acc: number, item: any) => acc + (Number(item.precio) || 0) * Number(item.cantidad || 1),
      0
    );
    const costoEnvio = Number(envio?.costo || 0);
    const total = subtotal + costoEnvio;

    // 1. Guardar el pedido en Prisma respetando el schema exacto
    const nuevoPedido = await prisma.pedido.create({
      data: {
        referenciaExterna,
        estado: "PENDIENTE",
        metodoEntrega: envio?.metodo === "RETIRO" ? "RETIRO" : "ENVIO",

        // Datos Comprador
        nombre: datosComprador?.nombre || "Cliente",
        apellido: datosComprador?.apellido || "Bitácora",
        email: datosComprador?.email || "cliente@ejemplo.com",
        telefono: datosComprador?.telefono || "Sin teléfono",
        dni: datosComprador?.dni || null,

        // Datos Envío
        provincia: envio?.provincia || null,
        localidad: envio?.localidad || null,
        codigoPostal: envio?.codigoPostal || null,
        direccion: envio?.direccion || null,
        numero: envio?.numero || null,
        pisoDepto: envio?.pisoDepto || null,
        indicaciones: envio?.indicaciones || null,

        // Totales
        subtotal,
        costoEnvio,
        total,

        // Ítems del pedido
        items: {
          create: items.map((item: any) => ({
            productoId: String(item.productoId || item.id),
            varianteId: item.varianteId || null,
            nombre: item.titulo || item.nombre || "Producto Bitácora",
            precioUnitario: Math.round(Number(item.precio || 0)),
            cantidad: Number(item.cantidad || 1),
          })),
        },
      },
    });

    // 2. Fallback si Mercado Pago no está configurado (Compra manual)
    if (!token) {
      return NextResponse.json({
        pedidoId: nuevoPedido.id,
        referenciaExterna,
        subtotal,
        costoEnvio,
        total,
        mensaje: "¡Pedido recibido! Nos pondremos en contacto por email para coordinar el pago.",
        mercadoPagoConfigurado: false,
      });
    }

    // 3. Crear Preferencia en Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: token,
      options: { timeout: 5000 },
    });

    const preference = new Preference(client);
    const origin = request.headers.get("origin") || "http://localhost:3000";

    const itemsMP = items.map((item: any, idx: number) => ({
      id: String(item.productoId || item.id || idx),
      title: item.titulo || item.nombre || "Producto Bitácora",
      quantity: Number(item.cantidad || 1),
      unit_price: Math.round(Number(item.precio || 0)),
      currency_id: "ARS",
    }));

    // Sumar el costo de envío como un item si aplica
    if (costoEnvio > 0) {
      itemsMP.push({
        id: "envio",
        title: "Costo de Envío",
        quantity: 1,
        unit_price: costoEnvio,
        currency_id: "ARS",
      });
    }

    const resMP = await preference.create({
      body: {
        items: itemsMP,
        external_reference: referenciaExterna,
        payer: {
          name: datosComprador?.nombre || "Cliente",
          surname: datosComprador?.apellido || "Bitácora",
          email: datosComprador?.email || "cliente@ejemplo.com",
        },
        back_urls: {
          success: `${origin}/checkout/exito`,
          failure: `${origin}/checkout`,
          pending: `${origin}/checkout`,
        },
        auto_return: "approved",
      },
    });

    // Actualizamos el pedido con el id de preferencia generado
    await prisma.pedido.update({
      where: { id: nuevoPedido.id },
      data: { mercadoPagoPreferenceId: resMP.id },
    });

    return NextResponse.json({
      pedidoId: nuevoPedido.id,
      referenciaExterna,
      initPoint: resMP.init_point,
      mercadoPagoConfigurado: true,
      mensaje: "Redirigiendo a Mercado Pago...",
    });
  } catch (error: any) {
    console.error("Error en checkout API:", error);

    return NextResponse.json(
      { error: "Ocurrió un error al procesar el pedido en la base de datos." },
      { status: 500 }
    );
  }
}