import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { Preference } from "mercadopago";
import { prisma } from "@/lib/prisma";
import { productos } from "@/data/products";
import { calcularCostoEnvio } from "@/lib/shipping";
import { RETIRO_PUNTO } from "@/lib/commerce-config";
import { obtenerClienteMercadoPago, obtenerUrlBase } from "@/lib/mercadopago";

// Todos los precios y el stock se vuelven a validar acá, en el servidor.
// Nunca se confía en montos ni cantidades que llegan desde el navegador
// (ver punto 8 y 10 del brief).

const itemSchema = z.object({
  productoId: z.string().min(1),
  varianteId: z.string().optional(),
  cantidad: z.number().int().positive().max(50)
});

const datosEnvioSchema = z.object({
  provincia: z.string().min(1),
  localidad: z.string().min(1),
  codigoPostal: z.string().min(3),
  direccion: z.string().min(1),
  numero: z.string().min(1),
  pisoDepto: z.string().optional(),
  indicaciones: z.string().optional()
});

const checkoutSchema = z.object({
  items: z.array(itemSchema).min(1),
  metodoEntrega: z.enum(["ENVIO", "RETIRO"]),
  datosComprador: z.object({
    nombre: z.string().min(1),
    apellido: z.string().min(1),
    email: z.string().email(),
    telefono: z.string().min(6),
    dni: z.string().optional()
  }),
  datosEnvio: datosEnvioSchema.optional()
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la solicitud no es JSON válido." },
      { status: 400 }
    );
  }

  const parseado = checkoutSchema.safeParse(body);
  if (!parseado.success) {
    return NextResponse.json(
      { error: "Datos de checkout inválidos.", detalles: parseado.error.flatten() },
      { status: 400 }
    );
  }

  const { items, metodoEntrega, datosComprador, datosEnvio } = parseado.data;

  if (metodoEntrega === "ENVIO" && !datosEnvio) {
    return NextResponse.json(
      { error: "Faltan los datos de envío." },
      { status: 400 }
    );
  }

  // 1) Revalidar cada ítem contra el catálogo real (precio, existencia)
  //    y contra el stock vivo en la base de datos.
  const stocksDb = await prisma.productoStock.findMany({
    where: { productoId: { in: items.map((i) => i.productoId) } }
  });
  const stockPorProducto = new Map(stocksDb.map((s) => [s.productoId, s]));

  const errores: string[] = [];
  const itemsValidados: {
    productoId: string;
    varianteId?: string;
    nombre: string;
    precioUnitario: number;
    cantidad: number;
  }[] = [];

  for (const item of items) {
    const producto = productos.find((p) => p.id === item.productoId);
    if (!producto) {
      errores.push(`El producto "${item.productoId}" ya no existe.`);
      continue;
    }

    const stockRow = stockPorProducto.get(producto.id);
    // Si todavía no se cargó el stock en la base (no se corrió el seed),
    // usamos el stock del catálogo como último recurso, pero avisamos.
    let stockDisponible: number;
    if (item.varianteId) {
      const variante = producto.variantes?.find((v) => v.id === item.varianteId);
      if (!variante) {
        errores.push(`La variante "${item.varianteId}" de "${producto.nombre}" no existe.`);
        continue;
      }
      const stockVariantesDb = (stockRow?.stockVariantes as Record<string, number>) ?? {};
      stockDisponible = stockRow ? stockVariantesDb[item.varianteId] ?? 0 : variante.stock;
    } else {
      stockDisponible = stockRow ? stockRow.stock : producto.stock;
    }

    if (item.cantidad > stockDisponible) {
      errores.push(
        `No hay stock suficiente de "${producto.nombre}"${item.varianteId ? ` (${item.varianteId})` : ""}. Disponible: ${stockDisponible}.`
      );
      continue;
    }

    itemsValidados.push({
      productoId: producto.id,
      varianteId: item.varianteId,
      nombre: producto.nombre,
      precioUnitario: producto.precio, // precio autoritativo, nunca el del cliente
      cantidad: item.cantidad
    });
  }

  if (errores.length > 0) {
    return NextResponse.json({ error: "No se pudo validar el carrito.", detalles: errores }, { status: 409 });
  }

  const subtotal = itemsValidados.reduce(
    (acc, i) => acc + i.precioUnitario * i.cantidad,
    0
  );

  // 2) Calcular el envío en el servidor (nunca confiar en un total armado en el cliente).
  let costoEnvio = 0;
  if (metodoEntrega === "ENVIO" && datosEnvio) {
    const tarifa = calcularCostoEnvio(datosEnvio.provincia);
    if (tarifa === null) {
      return NextResponse.json(
        {
          error:
            "Todavía no tenemos una tarifa de envío cargada para esa provincia. Vamos a coordinar el costo manualmente por email antes de confirmar el pago.",
          requiereCoordinacionManual: true
        },
        { status: 422 }
      );
    }
    costoEnvio = tarifa;
  }
  // metodoEntrega === "RETIRO" → costoEnvio queda en 0 (RETIRO_PUNTO.costo)
  void RETIRO_PUNTO;

  const total = subtotal + costoEnvio;

  // 3) Registrar el pedido como PENDIENTE antes de redirigir a Mercado Pago
  //    (la creación de la preferencia de pago se conecta en la próxima fase).
  const referenciaExterna = `bc_${nanoid(12)}`;

  const pedido = await prisma.pedido.create({
    data: {
      referenciaExterna,
      metodoEntrega,
      nombre: datosComprador.nombre,
      apellido: datosComprador.apellido,
      email: datosComprador.email,
      telefono: datosComprador.telefono,
      dni: datosComprador.dni,
      provincia: datosEnvio?.provincia,
      localidad: datosEnvio?.localidad,
      codigoPostal: datosEnvio?.codigoPostal,
      direccion: datosEnvio?.direccion,
      numero: datosEnvio?.numero,
      pisoDepto: datosEnvio?.pisoDepto,
      indicaciones: datosEnvio?.indicaciones,
      subtotal,
      costoEnvio,
      total,
      items: {
        create: itemsValidados
      }
    },
    include: { items: true }
  });

  return NextResponse.json(
    {
      pedidoId: pedido.id,
      referenciaExterna: pedido.referenciaExterna,
      subtotal,
      costoEnvio,
      total,
      ...(await crearPreferenciaMercadoPago(pedido, itemsValidados, costoEnvio))
    },
    { status: 201 }
  );
}

/**
 * Intenta crear la preferencia de pago de Mercado Pago para el pedido ya
 * registrado. Si no hay credenciales configuradas, o si la llamada a
 * Mercado Pago falla, el pedido queda igual como PENDIENTE en la base
 * (ya se creó antes de esto) y se le avisa a la persona compradora que el
 * pago se va a coordinar manualmente — nunca se afirma que el pago
 * funciona si no es cierto.
 */
async function crearPreferenciaMercadoPago(
  pedido: { id: string; referenciaExterna: string; email: string },
  items: { nombre: string; precioUnitario: number; cantidad: number }[],
  costoEnvio: number
): Promise<{ initPoint?: string; mensaje: string; mercadoPagoConfigurado: boolean }> {
  const client = obtenerClienteMercadoPago();
  if (!client) {
    return {
      mercadoPagoConfigurado: false,
      mensaje:
        "Pedido registrado como pendiente. Todavía no configuramos el cobro automático: te vamos a escribir por email para coordinar el pago."
    };
  }

  try {
    const urlBase = obtenerUrlBase();
    const itemsPreferencia = items.map((item) => ({
      title: item.nombre,
      quantity: item.cantidad,
      unit_price: item.precioUnitario,
      currency_id: "ARS"
    }));
    if (costoEnvio > 0) {
      itemsPreferencia.push({
        title: "Envío",
        quantity: 1,
        unit_price: costoEnvio,
        currency_id: "ARS"
      });
    }

    const preferencia = await new Preference(client).create({
      body: {
        items: itemsPreferencia,
        payer: { email: pedido.email },
        external_reference: pedido.referenciaExterna,
        metadata: { pedidoId: pedido.id },
        back_urls: {
          success: `${urlBase}/pago/exito`,
          pending: `${urlBase}/pago/pendiente`,
          failure: `${urlBase}/pago/error`
        },
        auto_return: "approved",
        notification_url: `${urlBase}/api/mercadopago/webhook`
      }
    });

    await prisma.pedido.update({
      where: { id: pedido.id },
      data: { mercadoPagoPreferenceId: preferencia.id }
    });

    const initPoint = preferencia.init_point ?? preferencia.sandbox_init_point;
    return {
      mercadoPagoConfigurado: true,
      initPoint: initPoint ?? undefined,
      mensaje: initPoint
        ? "Pedido registrado. Redirigiendo a Mercado Pago para completar el pago."
        : "Pedido registrado, pero Mercado Pago no devolvió un link de pago. Te vamos a contactar para coordinar."
    };
  } catch (error) {
    console.error("Error creando preferencia de Mercado Pago:", error);
    return {
      mercadoPagoConfigurado: true,
      mensaje:
        "Pedido registrado como pendiente. Hubo un problema iniciando el pago con Mercado Pago; te vamos a escribir por email para coordinarlo."
    };
  }
}
