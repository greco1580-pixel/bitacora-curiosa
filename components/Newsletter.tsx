"use client";

import { useState, FormEvent } from "react";

export default function Newsletter() {
  const [enviado, setEnviado] = useState(false);
  const [email, setEmail] = useState("");

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setEnviado(true);
  }

  return (
    <section className="border-t border-olive/20 bg-olive/10 py-12">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-olive">
            Correo ocasional
          </h2>
          <p className="mt-2 font-sans text-xs sm:text-sm leading-relaxed text-body/80">
            Cero spam. Algunas ideas dando vueltas, cuando hay algo que valga la pena contar.
          </p>

          {enviado ? (
            <p className="mt-5 font-sans text-xs sm:text-sm font-medium text-olive">
              Registrado. Ya sos parte de esta bitácora.
            </p>
          ) : (
            <form
              onSubmit={manejarEnvio}
              className="mt-5 flex gap-2 justify-center"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full max-w-xs rounded-md border border-olive/30 bg-paper/90 px-3.5 py-2 font-sans text-xs text-ink placeholder:text-muted/60 focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive transition-all"
              />
              <button
                type="submit"
                className="rounded-md bg-olive px-4 py-2 font-sans text-xs font-medium text-paper hover:bg-olive/90 transition-colors shrink-0"
              >
                Sumarme
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}