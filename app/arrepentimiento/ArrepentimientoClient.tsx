"use client";

import { useState, FormEvent } from "react";

export default function ArrepentimientoPage() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("_subject", "Solicitud de Arrepentimiento / Devolución");

    try {
      const respuesta = await fetch("https://formspree.io/f/mvkpynar", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (respuesta.ok) {
        setEnviado(true);
      } else {
        setError("Hubo un problema al enviar tu solicitud. Por favor, intentalo de nuevo.");
      }
    } catch {
      setError("Error de conexión. Revisá tu red e intentalo nuevamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <p className="font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60 mb-1.5">
          Derecho del Consumidor
        </p>
        <h1 className="mb-3 font-serif text-2xl sm:text-3xl font-normal text-ink/80">
          Botón de arrepentimiento
        </h1>
        <p className="mb-8 font-sans text-xs sm:text-sm leading-relaxed text-body/75">
          Tenés derecho a arrepentirte de tu compra dentro de los plazos que establece la
          ley, sin necesidad de registrarte ni dar motivos. Completá este formulario y te
          vamos a contactar para coordinar la devolución.
        </p>

        {enviado ? (
          <div className="rounded-lg border border-olive/30 bg-olive/5 p-6 text-center">
            <p className="font-serif text-lg text-olive mb-1">Solicitud enviada</p>
            <p className="font-sans text-xs sm:text-sm text-body/75">
              Recibimos tu solicitud de arrepentimiento. Nos pondremos en contacto a la brevedad para coordinar.
            </p>
          </div>
        ) : (
          <form onSubmit={manejarEnvio} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nombre" className="font-sans text-xs sm:text-sm font-medium text-ink/75">
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                required
                className="rounded-md border border-beigeLine/70 bg-paper/40 px-3.5 py-2.5 font-sans text-xs sm:text-sm text-ink outline-none transition-colors focus:border-olive focus:ring-1 focus:ring-olive/30"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-sans text-xs sm:text-sm font-medium text-ink/75">
                Email de contacto
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-md border border-beigeLine/70 bg-paper/40 px-3.5 py-2.5 font-sans text-xs sm:text-sm text-ink outline-none transition-colors focus:border-olive focus:ring-1 focus:ring-olive/30"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pedido" className="font-sans text-xs sm:text-sm font-medium text-ink/75">
                Número de pedido <span className="text-muted/60 font-normal">(si lo tenés a mano)</span>
              </label>
              <input
                id="pedido"
                name="pedido"
                className="rounded-md border border-beigeLine/70 bg-paper/40 px-3.5 py-2.5 font-sans text-xs sm:text-sm text-ink outline-none transition-colors focus:border-olive focus:ring-1 focus:ring-olive/30"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="motivo" className="font-sans text-xs sm:text-sm font-medium text-ink/75">
                Contanos brevemente qué compra querés dejar sin efecto
              </label>
              <textarea
                id="motivo"
                name="motivo"
                required
                rows={4}
                className="resize-none rounded-md border border-beigeLine/70 bg-paper/40 px-3.5 py-2.5 font-sans text-xs sm:text-sm text-ink outline-none transition-colors focus:border-olive focus:ring-1 focus:ring-olive/30"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-red-600/80">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="mt-1 self-start rounded-md bg-olive px-6 py-3 font-sans text-xs sm:text-sm font-medium text-paper transition-colors hover:bg-olive/90 disabled:opacity-60"
            >
              {enviando ? "Enviando..." : "Enviar solicitud"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}