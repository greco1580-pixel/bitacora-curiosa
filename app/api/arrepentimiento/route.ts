import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { customAlphabet } from "nanoid";
import { prisma } from "@/lib/prisma";

// Botón de arrepentimiento — Ley de Defensa del Consumidor (Argentina).
// Accesible sin registro, pide solo lo necesario para identificar la
// compra y genera un código único como comprobante.

const generarCodigo = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 8);

const schema = z.object({
  nombreCompleto: z.string().min(1),
  emailContacto: z.string().email(),
  numeroPedido: z.string().optional(),
  motivo: z.string().min(1).max(2000)
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const parseado = schema.safeParse(body);
  if (!parseado.success) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios.", detalles: parseado.error.flatten() },
      { status: 400 }
    );
  }

  const { nombreCompleto, emailContacto, numeroPedido, motivo } = parseado.data;

  // Si el número de pedido ingresado coincide con un pedido o una
  // referencia externa real, lo vinculamos; si no, igual se guarda la
  // solicitud con el número tal como lo escribió la persona.
  let pedidoId: string | undefined;
  if (numeroPedido) {
    const pedido = await prisma.pedido.findFirst({
      where: {
        OR: [{ id: numeroPedido }, { referenciaExterna: numeroPedido }]
      }
    });
    if (pedido) pedidoId = pedido.id;
  }

  const codigo = `ARR-${generarCodigo()}`;

  await prisma.solicitudArrepentimiento.create({
    data: {
      codigo,
      pedidoId,
      numeroPedidoIngresado: pedidoId ? undefined : numeroPedido,
      nombreCompleto,
      emailContacto,
      motivo
    }
  });

  return NextResponse.json({ codigo }, { status: 201 });
}
