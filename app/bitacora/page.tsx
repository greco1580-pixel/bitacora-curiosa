import type { Metadata } from "next";
import Link from "next/link";
import { entradasBitacora } from "@/lib/bitacora";

export const metadata: Metadata = {
  title: "Bitácora — Bitácora Curiosa",
  description: "Notas sobre neurodivergencia, sobrecarga, curiosidades y vida cotidiana."
};

const formatoFecha = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

export default function BitacoraIndexPage() {
  const entradas = [...entradasBitacora].sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <p className="entry-label mb-3 uppercase text-grisCalido">Índice editorial</p>
      <h1 className="mb-10 font-serif text-4xl text-negroSuave sm:text-5xl">Bitácora</h1>

      <ul className="flex flex-col gap-8">
        {entradas.map((entrada) => (
          <li key={entrada.slug} className="border-b border-beigeLine pb-8">
            <Link href={`/bitacora/${entrada.slug}`} className="group">
              <p className="entry-label mb-1 text-grisCalido">
                {formatoFecha.format(new Date(entrada.fecha))} · {entrada.tiempoLecturaMin} min
                de lectura
              </p>
              <h2 className="font-serif text-2xl text-negroSuave underline-grow">
                {entrada.titulo}
              </h2>
              <p className="mt-2 max-w-prose font-sans text-sm text-grisCalido">
                {entrada.bajada}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
