import type { Metadata } from "next";
import Link from "next/link";
import { RETIRO_PUNTO } from "@/lib/commerce-config";

export const metadata: Metadata = {
  title: "Envíos y cambios — Bitácora Curiosa",
  description: "Cómo llega tu pedido y cómo cambiarlo si hace falta."
};

export default function EnviosCambiosPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* 2. Recorte ilustrativo en el margen derecho */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute right-0 top-12 hidden h-96 w-64 select-none opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sageDark via-transparent to-transparent [mask-image:radial-gradient(circle,white_20%,transparent_70%)] lg:block" 
      />

      {/* Cabecera Editorial */}
      <header className="mb-10 max-w-xl">
        <p className="font-mono text-[0.65rem] font-normal uppercase tracking-[0.2em] text-sageDark/90">
          ANTES DE COMPRAR · REGISTRO 01
        </p>
        <h1 className="mt-2 font-serif text-3xl font-normal text-ink/90 sm:text-4xl">
          Envíos y cambios
        </h1>
      </header>

      {/* 1. Estructura general de 2 columnas */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        
        {/* Columna Principal */}
        <main className="lg:col-span-7">

          {/* 4. Recorrido visual sutil (PEDIDO → PREPARACIÓN → DESPACHO O RETIRO) */}
          <div className="mb-10 rounded-sm border border-border/40 bg-sand/20 p-4">
            <p className="mb-3 font-mono text-[0.6rem] font-medium uppercase tracking-widest text-muted/70">
              RECORRIDO DEL PEDIDO
            </p>
            <div className="flex items-center justify-between text-center font-mono text-[0.65rem] text-ink/70">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sageDark/60" />
                <span>PEDIDO</span>
              </div>
              <span className="text-muted/40">→</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blueDark/60" />
                <span>PREPARACIÓN</span>
              </div>
              <span className="text-muted/40">→</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sageDark/60" />
                <span>DESPACHO O RETIRO</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 font-sans text-xs leading-relaxed text-body/80 sm:text-sm">
            
            {/* 3. Sección numerada 01 */}
            <section className="border-b border-dashed border-border/40 pb-8">
              <h2 className="mb-2 font-serif text-lg sm:text-xl font-normal text-ink/85 flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-sageDark/90 tracking-wide font-normal">01 —</span>
                Envío a domicilio
              </h2>
              <p>
                Calculamos el costo según tu provincia al finalizar la compra. Los despachos se
                realizan dentro de los 2 a 4 días hábiles posteriores a la confirmación del pago.
                Te enviaremos el código de seguimiento por email apenas el paquete esté en camino.
              </p>
            </section>

            {/* 3. Sección numerada 02 */}
            <section className="border-b border-dashed border-border/40 pb-8">
              <h2 className="mb-2 font-serif text-lg sm:text-xl font-normal text-ink/85 flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-blueDark/90 tracking-wide font-normal">02 —</span>
                Retiro sin cargo
              </h2>
              <p>
                Elegís esta opción en el checkout, sin costo adicional. Retiro en:{" "}
                <span className="text-ink/85 font-medium">{RETIRO_PUNTO.descripcion}</span>. Coordinamos
                el horario por email después de confirmado el pedido.
              </p>
            </section>

            {/* 3. Sección numerada 03 */}
            <section>
              <h2 className="mb-2 font-serif text-lg sm:text-xl font-normal text-ink/85 flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-sageDark/90 tracking-wide font-normal">03 —</span>
                Cambios y devoluciones
              </h2>
              <p>
                Si querés realizar un cambio por falla o preferencia, tenés hasta 10 días de corrido
                desde que recibís el producto. El ítem debe estar sin uso y en su empaque original.
                Escribinos a nuestro email de contacto para coordinarlo.
              </p>
              <p className="mt-3">
                Si querés ejercer tu derecho de arrepentimiento, podés hacerlo sin necesidad de
                registrarte desde el{" "}
                <Link href="/arrepentimiento" className="text-olive hover:underline transition-colors">
                  botón de arrepentimiento
                </Link>
                .
              </p>
            </section>

          </div>
        </main>

        {/* Columna de Margen a la Derecha */}
        <aside className="lg:col-span-5">
          <div className="sticky top-12 rounded-sm border border-border/50 bg-paper/50 p-5 shadow-none backdrop-blur-xs">
            <p className="mb-3 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-sageDark">
              DATOS RÁPIDOS
            </p>
            
            <div className="space-y-4 font-sans text-xs leading-relaxed text-body/80">
              <div>
                <p className="font-mono text-[0.65rem] font-semibold text-ink/70 uppercase tracking-wide">
                  DESPACHO
                </p>
                <p>Entre 2 y 4 días hábiles después de confirmar el pago.</p>
              </div>

              <div className="border-t border-dashed border-border/30 pt-3">
                <p className="font-mono text-[0.65rem] font-semibold text-ink/70 uppercase tracking-wide">
                  RETIRO
                </p>
                <p>{RETIRO_PUNTO.descripcion}, sin costo.</p>
              </div>

              <div className="border-t border-dashed border-border/30 pt-3">
                <p className="font-mono text-[0.65rem] font-semibold text-ink/70 uppercase tracking-wide">
                  CAMBIOS
                </p>
                <p>Hasta 10 días corridos desde que recibís el producto.</p>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
