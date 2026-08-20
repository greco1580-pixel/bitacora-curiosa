import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pago pendiente — Bitácora Curiosa"
};

export default function PagoPendientePage({
  searchParams
}: {
  searchParams: { external_reference?: string };
}) {
  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <p className="entry-label mb-2 uppercase text-grisCalido">Pago pendiente</p>
      <h1 className="mb-4 font-serif text-3xl text-negroSuave">Tu pago está en proceso.</h1>
      <p className="max-w-prose font-sans text-sm text-grisCalido">
        Esto pasa con algunos medios de pago (por ejemplo, pagos en efectivo o transferencias
        que tardan en acreditarse). En cuanto se confirme, te vamos a escribir por email.
      </p>
      {searchParams.external_reference && (
        <p className="mt-2 max-w-prose font-sans text-sm text-grisCalido">
          Número de referencia:{" "}
          <span className="font-mono text-negroSuave">{searchParams.external_reference}</span>
        </p>
      )}
      <Link
        href="/tienda"
        className="mt-8 inline-block rounded bg-negroSuave px-6 py-3 font-sans text-sm text-paper hover:bg-tierraDark"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}
