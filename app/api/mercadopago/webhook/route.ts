import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";
import { obtenerClienteMercadoPago } from "@/lib/mercadopago";

// Webhook de Mercado Pago. Documentación de referencia (verificar antes de
// publicar, por si Mercado Pago actualizó el formato):
// https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/your-integrations/notifications/webhooks
//
// Reglas de seguridad que sigue esta ruta:
// - Nunca confía en el cuerpo de la notificación por sí solo: siempre
//   vuelve a consultar el pago real contra la API de Mercado Pago.
// - Valida la firma (`x-signature`) contra MERCADOPAGO_WEBHOOK_SECRET
//   antes de procesar nada.
// - Es idempotente: si la notificación llega duplicada (Mercado Pago
//   reintenta si no respondemos 200 a tiempo), no vuelve a aplicar el
//   mismo cambio dos veces.

function validarFirma(request: NextRequest, dataId: string): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const encabezadoFirma = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");

  if (!secret || !encabezadoFirma || !requestId) return false;

  const partes: Record<string, string> = {};
  for (const par of encabezadoFirma.split(",")) {
    const [clave, valor] = par.split("=");
    if (clave && valor) partes[clave.trim()] = valor.trim();
  }
  const ts = partes.ts;
  const v1 = partes.v1;
  if (!ts || !v1) return false;

  const manifiesto = `id:${dataId};request-id:${requestId};ts:${ts};`;
  const hashCalculado = crypto.createHmac("sha256", secret).update(manifiesto).digest("hex");

  const bufferCalculado = Buffer.from(hashCalculado, "utf8");
  const bufferRecibido = Buffer.from(v1, "utf8");
  if (bufferCalculado.length !== bufferRecibido.length) return false;
  return crypto.timingSafeEqual(bufferCalculado, bufferRecibido);
}

function mapearEstado(
  status: string | undefined
): "PENDIENTE" | "APROBADO" | "EN_PROCESO" | "RECHAZADO" | "CANCELADO" {
  switch (status) {
    case "approved":
      return "APROBADO";
    case "in_process":
      return "EN_PROCESO";
    case "rejected":
      return "RECHAZADO";
    case "cancelled":
    case "refunded":
    case "charged_back":
      return "CANCELADO";
    case "pending":
    default:
      return "PENDIENTE";
  }
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);

  let cuerpo: { type?: string; data?: { id?: string } } = {};
  try {
    cuerpo = await request.json();
  } catch {
    // Algunas notificaciones de MP llegan solo por query params.
  }

  const tipo = url.searchParams.get("type") ?? cuerpo.type;
  const dataId = url.searchParams.get("data.id") ?? url.searchParams.get("id") ?? cuerpo.data?.id;

  // Solo procesamos notificaciones de pago. Confirmamos recepción de
  // cualquier otro tipo (merchant_order, etc.) sin hacer nada más, para
  // que Mercado Pago no reintente innecesariamente.
  if (tipo && tipo !== "payment") {
    return NextResponse.json({ recibido: true }, { status: 200 });
  }

  if (!dataId) {
    return NextResponse.json({ error: "Falta el id del pago en la notificación." }, { status: 400 });
  }

  if (!validarFirma(request, String(dataId))) {
    return NextResponse.json({ error: "No se pudo validar la firma de la notificación." }, { status: 401 });
  }

  const client = obtenerClienteMercadoPago();
  if (!client) {
    return NextResponse.json({ error: "Mercado Pago no está configurado en este entorno." }, { status: 500 });
  }

  let pago;
  try {
    pago = await new Payment(client).get({ id: String(dataId) });
  } catch (error) {
    console.error("No se pudo consultar el pago en Mercado Pago:", error);
    return NextResponse.json({ error: "No se pudo consultar el pago." }, { status: 502 });
  }

  const referenciaExterna = pago.external_reference;
  if (!referenciaExterna) {
    return NextResponse.json({ error: "El pago no tiene referencia externa asociada." }, { status: 400 });
  }

  const pedido = await prisma.pedido.findUnique({
    where: { referenciaExterna },
    include: { items: true }
  });
  if (!pedido) {
    return NextResponse.json({ error: "No se encontró el pedido correspondiente." }, { status: 404 });
  }

  const nuevoEstado = mapearEstado(pago.status);
  const paymentId = String(pago.id);

  // Idempotencia: si ya guardamos este mismo pago con este mismo estado,
  // no hacemos nada más (evita procesar dos veces reintentos de MP).
  if (pedido.mercadoPagoPaymentId === paymentId && pedido.estado === nuevoEstado) {
    return NextResponse.json({ recibido: true, sinCambios: true }, { status: 200 });
  }

  const pasaAAprobadoPorPrimeraVez = nuevoEstado === "APROBADO" && pedido.estado !== "APROBADO";

  await prisma.pedido.update({
    where: { id: pedido.id },
    data: {
      estado: nuevoEstado,
      mercadoPagoPaymentId: paymentId
    }
  });

  if (pasaAAprobadoPorPrimeraVez) {
    await descontarStock(pedido.items);
  }

  return NextResponse.json({ recibido: true }, { status: 200 });
}

/**
 * Descuenta stock una sola vez por pedido (protegido por
 * `pasaAAprobadoPorPrimeraVez`, calculado antes de guardar el nuevo
 * estado). No baja de 0. Para volúmenes altos convendría envolver esto en
 * una transacción con lock a nivel de fila; para el volumen inicial de
 * Bitácora Curiosa, este enfoque es suficiente.
 */
async function descontarStock(
  items: { productoId: string; varianteId: string | null; cantidad: number }[]
) {
  for (const item of items) {
    if (item.varianteId) {
      const stockRow = await prisma.productoStock.findUnique({
        where: { productoId: item.productoId }
      });
      if (!stockRow) continue;
      const stockVariantes = { ...(stockRow.stockVariantes as Record<string, number>) };
      const actual = stockVariantes[item.varianteId] ?? 0;
      stockVariantes[item.varianteId] = Math.max(0, actual - item.cantidad);
      await prisma.productoStock.update({
        where: { productoId: item.productoId },
        data: { stockVariantes }
      });
    } else {
      await prisma.$executeRaw`
        UPDATE productos_stock
        SET stock = GREATEST(stock - ${item.cantidad}, 0), "actualizadoEn" = now()
        WHERE "productoId" = ${item.productoId}
      `;
    }
  }
}
