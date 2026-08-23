import type { Metadata } from "next";
import { DATOS_COMERCIALES } from "@/lib/commerce-config";

export const metadata: Metadata = {
  title: "Términos y condiciones — Bitácora Curiosa",
  description: "Condiciones de compra."
};

export default function TerminosPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Recorte ilustrativo en el margen derecho */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute right-0 top-12 hidden h-96 w-64 select-none opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sageDark via-transparent to-transparent [mask-image:radial-gradient(circle,white_20%,transparent_70%)] lg:block" 
      />

      {/* Cabecera Editorial */}
      <header className="mb-10 max-w-xl">
        <p className="font-mono text-[0.65rem] font-normal uppercase tracking-[0.2em] text-sageDark/90">
          CONDICIONES DE COMPRA · REGISTRO LEGAL
        </p>
        <h1 className="mt-2 font-serif text-3xl font-normal text-ink/90 sm:text-4xl">
          Términos y condiciones
        </h1>
      </header>

      {/* Grid de 2 columnas */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        
        {/* Columna Principal */}
        <main className="lg:col-span-7">
          <div className="flex flex-col gap-10 font-sans text-xs leading-relaxed text-body/80 sm:text-sm">
            
            {/* Sección numerada 01 */}
            <section className="border-b border-dashed border-border/40 pb-8">
              <h2 className="mb-2 font-serif text-lg sm:text-xl font-normal text-ink/85 flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-sageDark/90 tracking-wide font-normal">01 —</span>
                Quién vende
              </h2>
              <p>
                {DATOS_COMERCIALES.razonSocial} — CUIT {DATOS_COMERCIALES.cuit} —{" "}
                {DATOS_COMERCIALES.domicilioComercial}. Contacto:{" "}
                <span className="font-mono text-ink/90">{DATOS_COMERCIALES.emailAtencion}</span>, {DATOS_COMERCIALES.horarioAtencion}.
              </p>
            </section>

            {/* Sección numerada 02 */}
            <section className="border-b border-dashed border-border/40 pb-8">
              <h2 className="mb-2 font-serif text-lg sm:text-xl font-normal text-ink/85 flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-blueDark/90 tracking-wide font-normal">02 —</span>
                Precios y pago
              </h2>
              <p>
                Los precios se muestran en pesos argentinos (ARS) e incluyen los impuestos
                vigentes. El pago se procesa a través de Mercado Pago. El pedido queda confirmado
                recién cuando se acredita el pago.
              </p>
            </section>

            {/* Sección numerada 03 */}
            <section className="border-b border-dashed border-border/40 pb-8">
              <h2 className="mb-2 font-serif text-lg sm:text-xl font-normal text-ink/85 flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-sageDark/90 tracking-wide font-normal">03 —</span>
                Entrega
              </h2>
              <p>
                Ofrecemos envío a domicilio (con costo calculado según tu provincia) y retiro sin
                cargo en un punto a coordinar. El detalle está en Envíos y cambios.
              </p>
            </section>

            {/* Sección numerada 04 */}
            <section>
              <h2 className="mb-2 font-serif text-lg sm:text-xl font-normal text-ink/85 flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-blueDark/90 tracking-wide font-normal">04 —</span>
                Arrepentimiento y cambios
              </h2>
              <p>
                Tenés derecho de arrepentimiento en los términos de la Ley 24.240. Podés
                ejercerlo desde el botón de arrepentimiento, sin necesidad de registrarte.
              </p>
            </section>

          </div>
        </main>

        {/* Columna de Margen */}
        <aside className="lg:col-span-5">
          <div className="sticky top-12 rounded-sm border border-border/50 bg-paper/50 p-5 shadow-none backdrop-blur-xs">
            <p className="mb-2 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-sageDark">
              LEY DE DEFENSA DEL CONSUMIDOR
            </p>
            <p className="font-sans text-xs leading-relaxed text-body/80">
              Las operaciones comerciales realizadas en este sitio están sujetas a la Ley N° 24.240 de Defensa del Consumidor de la República Argentina y sus normas complementarias.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}