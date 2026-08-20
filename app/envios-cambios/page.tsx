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
              Calculamos el costo según tu provincia al finalizar la compra. Si todavía no
              tenemos una tarifa cargada para tu zona, te contactamos por email para
              coordinarlo antes de confirmar el pago — nunca asumimos que el envío es gratis
              por defecto.
            </p>
            <p className="mt-2">[COMPLETAR: tiempos de entrega reales una vez despachado.]</p>
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
            <p className="mt-2">[COMPLETAR: plazo y condiciones reales de cambios.]</p>
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
