"use client";

import { useState, FormEvent } from "react";
import WhatsAppLink from "@/components/WhatsAppLink";

export default function ContactoPage() {
  const [enviado, setEnviado] = useState(false);

  function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    // TODO: conectar a un endpoint real (formspree, resend, backend propio, etc.)
    setEnviado(true);
  }

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <p className="entry-label mb-3 uppercase text-grisCalido">Contacto</p>
        <h1 className="mb-4 font-serif text-4xl text-negroSuave sm:text-5xl">Escribinos</h1>
        <p className="mb-8 font-sans text-sm leading-relaxed text-grisCalido">
          Para consultas sobre pedidos, productos o cualquier otra cosa que se te haya
          ocurrido mientras mirabas la tienda.
        </p>

        <div className="mb-10">
          <WhatsAppLink variant="button" texto="Escribir por WhatsApp" />
        </div>

        <hr className="stitch-divider mb-10" />

        {enviado ? (
          <p className="entry-label text-verde">
            Mensaje enviado. Te respondemos en cuanto podamos.
          </p>
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
            <button
              type="submit"
              className="self-start rounded bg-negroSuave px-7 py-3.5 font-sans text-sm text-paper hover:bg-tierraDark"
            >
              Enviar mensaje
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
