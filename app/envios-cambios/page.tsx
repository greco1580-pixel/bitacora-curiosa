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
      <div className="mx-auto max-w-2xl">
        <p className="entry-label mb-3 uppercase text-grisCalido">Antes de comprar</p>
        <h1 className="mb-8 font-serif text-4xl text-negroSuave sm:text-5xl">
          Envíos y cambios
        </h1>

        <div className="flex flex-col gap-8 font-sans leading-relaxed text-grisCalido">
          <section>
            <h2 className="font-serif text-xl text-negroSuave">Envío a domicilio</h2>
            <p className="mt-2">
              Calculamos el costo según tu provincia al finalizar la compra. Los despachos se
              realizan dentro de los 2 a 4 días hábiles posteriores a la confirmación del pago.
              Te enviaremos el código de seguimiento por email apenas el paquete esté en camino.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-negroSuave">Retiro sin cargo</h2>
            <p className="mt-2">
              Elegís esta opción en el checkout, sin costo adicional. Retiro en:{" "}
              <span className="text-negroSuave">{RETIRO_PUNTO.descripcion}</span>. Coordinamos
              el horario por email después de confirmado el pedido.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-negroSuave">Cambios y devoluciones</h2>
            <p className="mt-2">
              Si querés realizar un cambio por falla o preferencia, tenés hasta 10 días de corrido
              desde que recibís el producto. El ítem debe estar sin uso y en su empaque original.
              Escribinos a nuestro email de contacto para coordinarlo.
            </p>
            <p className="mt-2">
              Si querés ejercer tu derecho de arrepentimiento, podés hacerlo sin necesidad de
              registrarte desde el{" "}
              <Link href="/arrepentimiento" className="underline-grow text-tierra">
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
