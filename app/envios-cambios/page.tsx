import type { Metadata } from "next";
import Link from "next/link";
import { RETIRO_PUNTO } from "@/lib/commerce-config";

export const metadata: Metadata = {
  title: "Envíos y cambios — Bitácora Curiosa",
  description: "Cómo llega tu pedido y cómo cambiarlo si hace falta."
};

export default function EnviosCambiosPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <p className="font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60 mb-2">Antes de comprar</p>
        <h1 className="mb-6 font-serif text-2xl sm:text-3xl font-normal text-ink/80">
          Envíos y cambios
        </h1>

        <div className="flex flex-col gap-6 font-sans text-xs sm:text-sm leading-relaxed text-body/75">
          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Envío a domicilio</h2>
            <p>
              Calculamos el costo según tu provincia al finalizar la compra. Los despachos se
              realizan dentro de los 2 a 4 días hábiles posteriores a la confirmación del pago.
              Te enviaremos el código de seguimiento por email apenas el paquete esté en camino.
            </p>
          </section>

          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Retiro sin cargo</h2>
            <p>
              Elegís esta opción en el checkout, sin costo adicional. Retiro en:{" "}
              <span className="text-ink/85 font-medium">{RETIRO_PUNTO.descripcion}</span>. Coordinamos
              el horario por email después de confirmado el pedido.
            </p>
          </section>

          <section>
            <h2 className="mb-1.5 font-serif text-base sm:text-lg font-normal text-ink/75">Cambios y devoluciones</h2>
            <p>
              Si querés realizar un cambio por falla o preferencia, tenés hasta 10 días de corrido
              desde que recibís el producto. El ítem debe estar sin uso y en su empaque original.
              Escribinos a nuestro email de contacto para coordinarlo.
            </p>
            <p className="mt-2">
              Si querés ejercer tu derecho de arrepentimiento, podés hacerlo sin necesidad de
              registrarte desde el{" "}
              <Link href="/arrepentimiento" className="text-olive hover:underline transition-colors">
                botón de arrepentimiento
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
