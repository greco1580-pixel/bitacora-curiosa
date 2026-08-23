"use client";

import { useState } from "react";
import { DATOS_COMERCIALES } from "@/lib/commerce-config";

export default function ArrepentimientoClient() {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codigo, setCodigo] = useState<string | null>(null);

  async function manejarEnvio(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError(null);
    setEnviando(true);

    const formData = new FormData(evento.currentTarget);
    try {
      const respuesta = await fetch("/api/arrepentimiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreCompleto: String(formData.get("nombreCompleto") || ""),
          emailContacto: String(formData.get("emailContacto") || ""),
          numeroPedido: String(formData.get("numeroPedido") || "") || undefined,
          motivo: String(formData.get("motivo") || "")
        })
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) {
        setError(datos.error || "No se pudo registrar la solicitud.");
        return;
      }
      setCodigo(datos.codigo);
    } catch {
      setError("Hubo un problema de conexión. Probá de nuevo en un momento.");
    } finally {
      setEnviando(false);
    }
  }

  if (codigo) {
    return (
      <div className="mx-auto max-w-content px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <p className="entry-label mb-2 uppercase text-grisCalido">Solicitud registrada</p>
          <h1 className="mb-4 font-serif text-3xl text-negroSuave">
            Recibimos tu solicitud de arrepentimiento.
          </h1>
          <p className="font-sans text-sm text-grisCalido">
            Tu código de solicitud es:
          </p>
          <p className="mt-2 font-mono text-2xl text-negroSuave">{codigo}</p>
          <p className="mt-6 font-sans text-sm text-grisCalido">
            Guardalo como comprobante. Te vamos a contactar a la dirección de email que
            indicaste para coordinar los próximos pasos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-4 pt-28 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <p className="entry-label mb-3 uppercase text-grisCalido">Derecho del consumidor</p>
        <h1 className="mb-4 font-serif text-4xl text-negroSuave sm:text-5xl">
          Botón de arrepentimiento
        </h1>
        <p className="font-sans leading-relaxed text-grisCalido">
          Tenés derecho a arrepentirte de tu compra dentro de los plazos que establece la ley,
          sin necesidad de registrarte ni dar motivos. Completá este formulario y te vamos a
          contactar para coordinar la devolución.
        </p>

        <form onSubmit={manejarEnvio} className="mt-8 flex flex-col gap-4" noValidate>
          <Campo id="nombreCompleto" label="Nombre completo" required />
          <Campo id="emailContacto" label="Email de contacto" type="email" required />
          <Campo
            id="numeroPedido"
            label="Número de pedido (si lo tenés a mano)"
          />
          <div>
            <label htmlFor="motivo" className="mb-1 block font-sans text-sm text-grisCalido">
              Contanos brevemente qué compra querés dejar sin efecto
            </label>
            <textarea
              id="motivo"
              name="motivo"
              required
              rows={4}
              className="w-full rounded border border-beigeLine bg-paper px-3 py-2 font-sans text-sm text-negroSuave"
            />
          </div>

          {error && (
            <p role="alert" className="rounded border border-tierra/40 bg-tierra/5 p-4 font-sans text-sm text-tierraDark">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="mt-2 rounded bg-negroSuave px-6 py-3.5 font-sans text-sm text-paper hover:bg-tierraDark disabled:opacity-60"
          >
            {enviando ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>

        <hr className="stitch-divider my-12" />

        <p className="font-sans text-[0.7rem] leading-relaxed text-body/70 opacity-80">
          {DATOS_COMERCIALES.razonSocial} — {DATOS_COMERCIALES.domicilioComercial} — CUIT{" "}
          {DATOS_COMERCIALES.cuit}. Consultas: {DATOS_COMERCIALES.emailAtencion},{" "}
          {DATOS_COMERCIALES.horarioAtencion}.
        </p>
      </div>
    </div>
  );
}

function Campo({
  id,
  label,
  type = "text",
  required = false
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-sans text-sm text-grisCalido">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded border border-beigeLine bg-paper px-3 py-2 font-sans text-sm text-negroSuave"
      />
    </div>
  );
}