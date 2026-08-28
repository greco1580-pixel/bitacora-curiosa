import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      email, 
      name, 
      productId, 
      productName, 
      producto, // Soporta el campo enviado desde InterestModal
      productPrice, 
      sourcePage, 
      consent,
      motivo 
    } = body;

    // Solo exigimos email como obligatorio absoluto
    if (!email) {
      return NextResponse.json(
        { error: "El email es obligatorio." },
        { status: 400 }
      );
    }

    const payload = {
      email: email.trim().toLowerCase(),
      name: name ? name.trim() : null,
      productId: productId || "sin-id",
      productName: productName || producto || "Producto Bitácora",
      productPrice: productPrice || null,
      sourcePage: sourcePage || "/tienda",
      createdAt: new Date().toISOString(),
      consent: consent !== undefined ? Boolean(consent) : true,
      motivo: motivo || "preview",
    };

    const webhookUrl = process.env.INTEREST_WEBHOOK_URL || process.env.CONTACT_FORM_WEBHOOK;

    if (!webhookUrl) {
      console.warn("ALERTA: INTEREST_WEBHOOK_URL no encontrada en Vercel.");
      return NextResponse.json(
        { error: "La variable INTEREST_WEBHOOK_URL no está configurada en el servidor." },
        { status: 500 }
      );
    }

    // Envío al Webhook (Make / Zapier / Google Sheets)
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "PREVIEW_INTEREST_REGISTER", data: payload }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ERROR WEBHOOK STATUS:", response.status, errorText);
      return NextResponse.json(
        { error: `Webhook devolvió error ${response.status}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: payload });
  } catch (error: any) {
    console.error("Error al procesar registro de interés:", error);
    return NextResponse.json(
      { error: error?.message || "No pudimos guardar la anotación." },
      { status: 500 }
    );
  }
}