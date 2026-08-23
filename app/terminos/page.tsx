import type { Metadata } from "next";
import { DATOS_COMERCIALES } from "@/lib/commerce-config";

export const metadata: Metadata = {
  title: "Términos y condiciones — Bitácora Curiosa",
  description: "Condiciones de compra."
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="entry-label mb-3 uppercase text-grisCalido">Legal</p>
        <h1 className="mb-8 font-serif text-4xl text-negroSuave sm:text-5xl">
          Términos y condiciones
        </h1>

        <div className="flex flex-col gap-6 font-sans leading-relaxed text-grisCalido">
          <section>
            <h2 className="font-serif text-xl text-negroSuave">Quién vende</h2>
            <p className="mt-2">
              {DATOS_COMERCIALES.razonSocial} — CUIT {DATOS_COMERCIALES.cuit} —{" "}
              {DATOS_COMERCIALES.domicilioComercial}. Contacto:{" "}
              {DATOS_COMERCIALES.emailAtencion}, {DATOS_COMERCIALES.horarioAtencion}.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-negroSuave">Precios y pago</h2>
            <p className="mt-2">
              Los precios se muestran en pesos argentinos (ARS) e incluyen los impuestos
              vigentes. El pago se procesa a través de Mercado Pago. El pedido queda confirmado
              recién cuando se acredita el pago.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-negroSuave">Entrega</h2>
            <p className="mt-2">
              Ofrecemos envío a domicilio (con costo calculado según tu provincia) y retiro sin
              cargo en un punto a coordinar. El detalle está en Envíos y cambios.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-negroSuave">Arrepentimiento y cambios</h2>
            <p className="mt-2">
              Tenés derecho de arrepentimiento en los términos de la Ley 24.240. Podés
              ejercerlo desde el botón de arrepentimiento, sin necesidad de registrarte.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}