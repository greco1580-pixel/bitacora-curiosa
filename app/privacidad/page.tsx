import type { Metadata } from "next";
import { DATOS_COMERCIALES } from "@/lib/commerce-config";

export const metadata: Metadata = {
  title: "Privacidad — Bitácora Curiosa",
  description: "Política de privacidad."
};

export default function PrivacidadPage() {
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
          PROTECCIÓN DE DATOS · MARCO LEGAL
        </p>
        <h1 className="mt-2 font-serif text-3xl font-normal text-ink/90 sm:text-4xl">
          Privacidad
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
                Qué datos recolectamos
              </h2>
              <p>
                Cuando comprás en Bitácora Curiosa, recolectamos los datos necesarios para
                procesar tu pedido: nombre, apellido, email, teléfono y, si elegís envío a
                domicilio, tu dirección. Si pagás con Mercado Pago, el procesamiento del pago lo
                hace Mercado Pago según su propia política de privacidad; nosotros no vemos ni
                guardamos los datos de tu tarjeta.
              </p>
            </section>

            {/* Sección numerada 02 */}
            <section className="border-b border-dashed border-border/40 pb-8">
              <h2 className="mb-2 font-serif text-lg sm:text-xl font-normal text-ink/85 flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-blueDark/90 tracking-wide font-normal">02 —</span>
                Para qué los usamos
              </h2>
              <p>
                Únicamente para procesar tu compra, coordinar el envío o retiro, y responder tus
                consultas. No vendemos ni compartimos tus datos con terceros para fines
                publicitarios.
              </p>
            </section>

            {/* Sección numerada 03 */}
            <section className="border-b border-dashed border-border/40 pb-8">
              <h2 className="mb-2 font-serif text-lg sm:text-xl font-normal text-ink/85 flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-sageDark/90 tracking-wide font-normal">03 —</span>
                Tus derechos
              </h2>
              <p>
                Como titular de tus datos, tenés derecho de acceso, rectificación y supresión, en
                los términos de la Ley 25.326. Podés ejercerlos escribiendo a{" "}
                <span className="font-mono text-ink/90 font-medium">{DATOS_COMERCIALES.emailAtencion}</span>.
              </p>
            </section>

            {/* Sección numerada 04 */}
            <section>
              <h2 className="mb-2 font-serif text-lg sm:text-xl font-normal text-ink/85 flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-blueDark/90 tracking-wide font-normal">04 —</span>
                Datos de la empresa
              </h2>
              <p>
                {DATOS_COMERCIALES.razonSocial} — CUIT {DATOS_COMERCIALES.cuit} —{" "}
                {DATOS_COMERCIALES.domicilioComercial}.
              </p>
            </section>

          </div>
        </main>

        {/* Columna de Margen */}
        <aside className="lg:col-span-5">
          <div className="sticky top-12 rounded-sm border border-border/50 bg-paper/50 p-5 shadow-none backdrop-blur-xs">
            <p className="mb-2 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-sageDark">
              LEY 25.326
            </p>
            <p className="font-sans text-xs leading-relaxed text-body/80">
              Tus datos personales están protegidos conforme a la legislación vigente en la República Argentina. Podés solicitar su modificación o eliminación en cualquier momento.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}