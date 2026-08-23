"use client";

import { useState, FormEvent } from "react";

export default function ContactoPage() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

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
        setError("Hubo un problema al enviar tu mensaje. Por favor, intentalo de nuevo.");
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
        {/* Etiqueta y Título ajustados en escala */}
        <p className="font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60 mb-1.5">
          Contacto
        </p>
        <h1 className="mb-3 font-serif text-2xl sm:text-3xl font-normal text-ink/80">
          Escribinos
        </h1>
        <p className="mb-8 font-sans text-xs sm:text-sm leading-relaxed text-body/75">
          Para consultas sobre pedidos, productos o cualquier otra cosa que se te haya
          ocurrido mientras mirabas la tienda.
        </p>

        {enviado ? (
          <div className="rounded-lg border border-olive/30 bg-olive/5 p-6 text-center">
            <p className="font-serif text-lg text-olive mb-1">¡Mensaje recibido!</p>
            <p className="font-sans text-xs sm:text-sm text-body/75">
              Muchas gracias por escribirnos. Te respondemos al mail en cuanto lo leamos.
            </p>
          </div>
        ) : (
          <form onSubmit={manejarEnvio} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nombre" className="font-sans text-xs sm:text-sm font-medium text-ink/75">
                Nombre
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
                Correo electrónico
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
              <label htmlFor="mensaje" className="font-sans text-xs sm:text-sm font-medium text-ink/75">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={5}
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
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}