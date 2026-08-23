import type { Metadata } from "next";
import { DATOS_COMERCIALES } from "@/lib/commerce-config";

export const metadata: Metadata = {
  title: "Privacidad — Bitácora Curiosa",
  description: "Política de privacidad."
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <p className="font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60 mb-2">Legal</p>
        <h1 className="mb-6 font-serif text-2xl sm:text-3xl font-normal text-ink/80">Privacidad</h1>

        <div className="flex flex-col gap-6 font-sans text-xs sm:text-sm leading-relaxed text-body/75">
          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Qué datos recolectamos</h2>
            <p>
              Cuando comprás en Bitácora Curiosa, recolectamos los datos necesarios para
              procesar tu pedido: nombre, apellido, email, teléfono y, si elegís envío a
              domicilio, tu dirección. Si pagás con Mercado Pago, el procesamiento del pago lo
              hace Mercado Pago según su propia política de privacidad; nosotros no vemos ni
              guardamos los datos de tu tarjeta.
            </p>
          </section>

          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Para qué los usamos</h2>
            <p>
              Únicamente para procesar tu compra, coordinar el envío o retiro, y responder tus
              consultas. No vendemos ni compartimos tus datos con terceros para fines
              publicitarios.
            </p>
          </section>

          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Tus derechos</h2>
            <p>
              Como titular de tus datos, tenés derecho de acceso, rectificación y supresión, en
              los términos de la Ley 25.326. Podés ejercerlos escribiendo a{" "}
              <span className="text-ink/85">{DATOS_COMERCIALES.emailAtencion}</span>.
            </p>
          </section>

          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Datos de la empresa</h2>
            <p>
              {DATOS_COMERCIALES.razonSocial} — CUIT {DATOS_COMERCIALES.cuit} —{" "}
              {DATOS_COMERCIALES.domicilioComercial}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}