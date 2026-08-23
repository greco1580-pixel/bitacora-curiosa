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
        <p className="entry-label mb-3 uppercase text-grisCalido">Contacto</p>
        <h1 className="mb-4 font-serif text-4xl text-negroSuave sm:text-5xl">Escribinos</h1>
        <p className="mb-10 font-sans text-sm leading-relaxed text-grisCalido">
          Para consultas sobre pedidos, productos o cualquier otra cosa que se te haya
          ocurrido mientras mirabas la tienda.
        </p>

        {enviado ? (
          <div className="rounded border border-tierra/40 bg-tierra/5 p-6">
            <p className="font-sans text-sm text-tierraDark">
              Mensaje enviado correctamente. Te respondemos en cuanto podamos.
            </p>
          </div>
        ) : (
          <form onSubmit={manejarEnvio} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nombre" className="font-sans text-sm text-negroSuave">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                required
                className="rounded border border-beigeLine bg-paper px-4 py-3 font-sans text-sm outline-none focus-visible:border-tierra"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-sans text-sm text-negroSuave">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded border border-beigeLine bg-paper px-4 py-3 font-sans text-sm outline-none focus-visible:border-tierra"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mensaje" className="font-sans text-sm text-negroSuave">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={5}
                className="resize-none rounded border border-beigeLine bg-paper px-4 py-3 font-sans text-sm outline-none focus-visible:border-tierra"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="mt-2 self-start rounded bg-negroSuave px-7 py-3.5 font-sans text-sm text-paper hover:bg-tierraDark disabled:opacity-60 transition-colors"
            >
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}