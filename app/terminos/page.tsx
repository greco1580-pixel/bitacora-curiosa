import type { Metadata } from "next";
import { DATOS_COMERCIALES } from "@/lib/commerce-config";

export const metadata: Metadata = {
  title: "Términos y condiciones — Bitácora Curiosa",
  description: "Condiciones de compra."
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <p className="font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60 mb-2">Legal</p>
        <h1 className="mb-6 font-serif text-2xl sm:text-3xl font-normal text-ink/80">
          Términos y condiciones
        </h1>

        <div className="flex flex-col gap-6 font-sans text-xs sm:text-sm leading-relaxed text-body/75">
          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Quién vende</h2>
            <p>
              {DATOS_COMERCIALES.razonSocial} — CUIT {DATOS_COMERCIALES.cuit} —{" "}
              {DATOS_COMERCIALES.domicilioComercial}. Contacto:{" "}
              {DATOS_COMERCIALES.emailAtencion}, {DATOS_COMERCIALES.horarioAtencion}.
            </p>
          </section>

          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Precios y pago</h2>
            <p>
              Los precios se muestran en pesos argentinos (ARS) e incluyen los impuestos
              vigentes. El pago se procesa a través de Mercado Pago. El pedido queda confirmado
              recién cuando se acredita el pago.
            </p>
          </section>

          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Entrega</h2>
            <p>
              Ofrecemos envío a domicilio (con costo calculated según tu provincia) y retiro sin
              cargo en un punto a coordinar. El detalle está en Envíos y cambios.
            </p>
          </section>

          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Arrepentimiento y cambios</h2>
            <p>
              Tenés derecho de arrepentimiento en los términos de la Ley 24.240. Podés
              ejercerlo desde el botón de arrepentimiento, sin necesidad de registrarte.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}