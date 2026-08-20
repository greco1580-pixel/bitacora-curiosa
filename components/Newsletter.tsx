"use client";

import { useState, FormEvent } from "react";

export default function Newsletter() {
  const [enviado, setEnviado] = useState(false);
  const [email, setEmail] = useState("");

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    // TODO: conectar a un proveedor de newsletter (Mailchimp, Resend, etc.)
    // cuando el backend esté disponible. Por ahora, solo confirma en UI.
    setEnviado(true);
  }

  return (
    <section className="border-t border-beigeLine bg-beige/40">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl text-negroSuave">Correo ocasional</h2>
          <p className="mt-3 font-sans text-sm text-grisCalido">
            Cero spam. Algunas ideas dando vueltas, cuando hay algo que valga la pena contar.
          </p>

          {enviado ? (
            <p className="mt-6 entry-label text-verde">
              Registrado. Ya sos parte de esta bitácora.
            </p>
          ) : (
            <form
              onSubmit={manejarEnvio}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
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
                className="rounded border border-beigeLine bg-paper px-4 py-3 font-sans text-sm text-negroSuave outline-none focus-visible:border-tierra sm:w-64"
              />
              <button
                type="submit"
                className="rounded bg-negroSuave px-6 py-3 font-sans text-sm text-paper transition-colors hover:bg-tierraDark"
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
