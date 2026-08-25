import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, productId, productName, productPrice, sourcePage, consent } = body;

    if (!email || !productId || !consent) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios para el registro de interés." },
        { status: 400 }
      );
    }

    const payload = {
      email: email.trim().toLowerCase(),
      name: name ? name.trim() : null,
      productId,
      productName,
      productPrice,
      sourcePage: sourcePage || "/tienda",
      createdAt: new Date().toISOString(),
      consent: Boolean(consent),
    };

    const webhookUrl = process.env.INTEREST_WEBHOOK_URL || process.env.CONTACT_FORM_WEBHOOK;
    
    // LOG 1: Verificar si la variable existe en producción
    console.log("DIAGNÓSTICO WEBHOOK URL:", webhookUrl ? "VARIABLE DETECTADA" : "VARIABLE NO ENCONTRADA (NULL)");

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "La variable INTEREST_WEBHOOK_URL no está configurada en el servidor." },
        { status: 500 }
      );
    }

    // Intento de envío al Webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "PREVIEW_INTEREST_REGISTER", data: payload }),
    });

    // LOG 2: Imprimir el status HTTP exacto que devuelve Make
    console.log("DIAGNÓSTICO MAKE STATUS CODE:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      // LOG 3: Imprimir la respuesta exacta de Make si falla
      console.error("DIAGNÓSTICO ERROR MAKE BODY:", errorText);
      
      return NextResponse.json(
        { error: `Make devolvió error ${response.status}: ${errorText}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: payload });
  } catch (error: any) {
    console.error("Error al procesar registro de interés:", error);
    return NextResponse.json(
      { error: error?.message || "No pudimos guardar la anotación en el servidor." },
      { status: 500 }
    );
  }
}