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
    <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Recorte ilustrativo en el margen derecho */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute right-0 top-12 hidden h-96 w-64 select-none opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sageDark via-transparent to-transparent [mask-image:radial-gradient(circle,white_20%,transparent_70%)] lg:block" 
      />

      {/* Cabecera Editorial */}
      <header className="mb-8 max-w-xl">
        <p className="font-mono text-[0.65rem] font-normal uppercase tracking-[0.2em] text-sageDark/90">
          DERECHO DEL CONSUMIDOR · REGISTRO LEGAL
        </p>
        <h1 className="mt-2 font-serif text-3xl font-normal text-ink/90 sm:text-4xl">
          Botón de arrepentimiento
        </h1>
        <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-body/80">
          Tenés derecho a arrepentirte de tu compra dentro de los plazos que establece la
          ley, sin necesidad de registrarte ni dar motivos. Completá este formulario y te
          vamos a contactar para coordinar la devolución.
        </p>
      </header>

      {/* Grid de 2 columnas */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        
        {/* Columna Principal */}
        <main className="lg:col-span-7">
          {enviado ? (
            /* Confirmación estilo registro / checkout */
            <div className="rounded-sm border border-dashed border-sageDark/40 bg-sand/20 p-6 sm:p-8">
              <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sageDark">
                SOLICITUD REGISTRADA
              </p>
              <h2 className="mt-2 font-serif text-xl sm:text-2xl font-normal text-ink/90">
                Arrepentimiento procesado.
              </h2>
              <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-body/80">
                Recibimos tu solicitud. Nos pondremos en contacto a la brevedad para coordinar la devolución y la gestión correspondiente.
              </p>
            </div>
          ) : (
            <form onSubmit={manejarEnvio} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className="font-mono text-xs font-normal text-ink/80">
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  placeholder="Tu nombre y apellido"
                  className="rounded-sm border border-border/70 bg-paper/50 px-3.5 py-2.5 font-sans text-xs sm:text-sm text-ink placeholder:text-muted/50 outline-none transition-colors focus:border-sageDark focus:ring-1 focus:ring-sageDark/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-xs font-normal text-ink/80">
                  Email de contacto
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="nombre@correo.com"
                  className="rounded-sm border border-border/70 bg-paper/50 px-3.5 py-2.5 font-sans text-xs sm:text-sm text-ink placeholder:text-muted/50 outline-none transition-colors focus:border-sageDark focus:ring-1 focus:ring-sageDark/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pedido" className="font-mono text-xs font-normal text-ink/80 flex items-center justify-between">
                  <span>Número de pedido</span>
                  <span className="text-[0.65rem] text-muted/60 lowercase font-sans">(opcional)</span>
                </label>
                <input
                  id="pedido"
                  name="pedido"
                  type="text"
                  placeholder="Ej: #1042"
                  className="rounded-sm border border-border/70 bg-paper/50 px-3.5 py-2.5 font-sans text-xs sm:text-sm text-ink placeholder:text-muted/50 outline-none transition-colors focus:border-sageDark focus:ring-1 focus:ring-sageDark/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="motivo" className="font-mono text-xs font-normal text-ink/80">
                  Detalle de la compra
                </label>
                <textarea
                  id="motivo"
                  name="motivo"
                  required
                  rows={4}
                  placeholder="Contanos qué ítem o pedido querés dejar sin efecto."
                  className="resize-none rounded-sm border border-border/70 bg-paper/50 px-3.5 py-2.5 font-sans text-xs sm:text-sm text-ink placeholder:text-muted/50 outline-none transition-colors focus:border-sageDark focus:ring-1 focus:ring-sageDark/30"
                />
              </div>

              {error && (
                <p className="font-mono text-xs text-red-600/90">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={enviando}
                className="mt-2 self-start rounded-sm bg-olive px-6 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-all hover:bg-olive/90 focus:outline-none focus:ring-2 focus:ring-olive/40 focus:ring-offset-1 disabled:opacity-60 flex items-center gap-2 group"
              >
                <span>{enviando ? "Enviando..." : "Enviar solicitud"}</span>
                {!enviando && <span className="transition-transform group-hover:translate-x-1">→</span>}
              </button>
            </form>
          )}
        </main>

        {/* Columna de Margen */}
        <aside className="lg:col-span-5">
          <div className="sticky top-12 rounded-sm border border-border/50 bg-paper/50 p-5 shadow-none backdrop-blur-xs">
            <p className="mb-2 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-sageDark">
              MARCO NORMATIVO
            </p>
            <p className="font-sans text-xs leading-relaxed text-body/80">
              Podés solicitar la revocación dentro de los 10 días corridos contados a partir de la entrega del producto o la celebración del contrato. El producto debe estar sin uso.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}