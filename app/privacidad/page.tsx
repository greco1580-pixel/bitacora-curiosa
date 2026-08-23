import type { Metadata } from "next";
import { DATOS_COMERCIALES } from "@/lib/commerce-config";

export const metadata: Metadata = {
  title: "Privacidad — Bitácora Curiosa",
  description: "Política de privacidad."
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="entry-label mb-3 uppercase text-grisCalido">Legal</p>
        <h1 className="mb-8 font-serif text-4xl text-negroSuave sm:text-5xl">Privacidad</h1>

        <div className="flex flex-col gap-6 font-sans leading-relaxed text-grisCalido">
          <section>
            <h2 className="font-serif text-xl text-negroSuave">Qué datos recolectamos</h2>
            <p className="mt-2">
              Cuando comprás en Bitácora Curiosa, recolectamos los datos necesarios para
              procesar tu pedido: nombre, apellido, email, teléfono y, si elegís envío a
              domicilio, tu dirección. Si pagás con Mercado Pago, el procesamiento del pago lo
              hace Mercado Pago según su propia política de privacidad; nosotros no vemos ni
              guardamos los datos de tu tarjeta.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-negroSuave">Para qué los usamos</h2>
            <p className="mt-2">
              Únicamente para procesar tu compra, coordinar el envío o retiro, y responder tus
              consultas. No vendemos ni compartimos tus datos con terceros para fines
              publicitarios.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-negroSuave">Tus derechos</h2>
            <p className="mt-2">
              Como titular de tus datos, tenés derecho de acceso, rectificación y supresión, en
              los términos de la Ley 25.326. Podés ejercerlos escribiendo a{" "}
              {DATOS_COMERCIALES.emailAtencion}.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-negroSuave">Datos de la empresa</h2>
            <p className="mt-2">
              {DATOS_COMERCIALES.razonSocial} — CUIT {DATOS_COMERCIALES.cuit} —{" "}
              {DATOS_COMERCIALES.domicilioComercial}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}