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

    // Reutilización del backend de contacto o servicio de mail (Resend, SendGrid, etc.)
    const webhookUrl = process.env.INTEREST_WEBHOOK_URL || process.env.CONTACT_FORM_WEBHOOK;
    
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PREVIEW_INTEREST_REGISTER", data: payload }),
      });

      if (!response.ok) {
        throw new Error("Error en el servidor de envíos remotos");
      }
    } else {
      // Fallback a consola de servidor si aún no se configuró el webhook externo
      console.log("[REGISTRO PREVIO REGISTRADO]:", payload);
    }

    return NextResponse.json({ success: true, data: payload });
  } catch (error) {
    console.error("Error al procesar registro de interés:", error);
    return NextResponse.json(
      { error: "No pudimos guardar la anotación en el servidor." },
      { status: 500 }
    );
  }
}