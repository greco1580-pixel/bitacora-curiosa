import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pago no procesado — Bitácora Curiosa"
};

export default function PagoErrorPage({
  searchParams
}: {
  searchParams: { external_reference?: string };
}) {
  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <p className="entry-label mb-2 uppercase text-grisCalido">Pago no procesado</p>
      <h1 className="mb-4 font-serif text-3xl text-negroSuave">
        No pudimos procesar el pago.
      </h1>
      <p className="max-w-prose font-sans text-sm text-grisCalido">
        Puede haber sido un rechazo del medio de pago o que se canceló el intento. Tu pedido
        quedó guardado; podés volver a intentar el pago o escribirnos si preferís coordinar de
        otra forma.
      </p>
      {searchParams.external_reference && (
        <p className="mt-2 max-w-prose font-sans text-sm text-grisCalido">
          Número de referencia:{" "}
          <span className="font-mono text-negroSuave">{searchParams.external_reference}</span>
        </p>
      )}
      <div className="mt-8 flex gap-4">
        <Link
          href="/checkout"
          className="rounded bg-negroSuave px-6 py-3 font-sans text-sm text-paper hover:bg-tierraDark"
        >
          Volver a intentar
        </Link>
        <Link
          href="/contacto"
          className="rounded border border-beigeLine px-6 py-3 font-sans text-sm text-negroSuave hover:bg-beige/40"
        >
          Contactarnos
        </Link>
      </div>
    </div>
  );
}
