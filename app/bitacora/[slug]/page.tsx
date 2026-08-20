import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  entradasBitacora,
  obtenerEntradaPorSlug,
  obtenerEntradasRelacionadas
} from "@/lib/bitacora";

const formatoFecha = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

export function generateStaticParams() {
  return entradasBitacora.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entrada = obtenerEntradaPorSlug(params.slug);
  if (!entrada) return {};
  return {
    title: `${entrada.titulo} — Bitácora`,
    description: entrada.seoDescripcion,
    openGraph: {
      title: entrada.titulo,
      description: entrada.seoDescripcion
    }
  };
}

export default function EntradaBitacoraPage({ params }: { params: { slug: string } }) {
  const entrada = obtenerEntradaPorSlug(params.slug);
  if (!entrada) notFound();

  const relacionadas = obtenerEntradasRelacionadas(entrada);

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Ruta de navegación" className="mb-6 font-sans text-xs text-grisCalido">
        <Link href="/bitacora" className="underline-grow">Bitácora</Link>
        <span className="mx-2">/</span>
        <span>{entrada.titulo}</span>
      </nav>

      <article className="mx-auto max-w-2xl">
        <p className="entry-label mb-3 uppercase text-grisCalido">
          {formatoFecha.format(new Date(entrada.fecha))} · {entrada.tiempoLecturaMin} min de lectura
        </p>
        <h1 className="mb-6 font-serif text-4xl text-negroSuave sm:text-5xl">{entrada.titulo}</h1>
        <p className="mb-8 font-sans text-lg text-grisCalido">{entrada.bajada}</p>

        {/* Imagen opcional de la entrada: PLACEHOLDER.
            Archivo esperado: public/images/bitacora/{entrada.slug}.jpg
            Proporción recomendada: 16:9. Tamaño mínimo: 1200x675px.
            Alt sugerido: la bajada de la entrada.
            Se reemplaza acá por un <Image> de next/image cuando exista el archivo real. */}
        {entrada.imagen && (
          <div className="mb-8 flex h-56 items-center justify-center rounded border border-beigeLine bg-beige">
            <span className="entry-label text-grisCalido">Imagen de la entrada</span>
          </div>
        )}

        <div className="flex flex-col gap-5 font-sans leading-relaxed text-grisCalido">
          {entrada.contenido.map((parrafo, i) => (
            <p key={i}>{parrafo}</p>
          ))}
        </div>
      </article>

      {relacionadas.length > 0 && (
        <section className="mx-auto mt-16 max-w-2xl border-t border-beigeLine pt-10">
          <p className="entry-label mb-4 uppercase text-grisCalido">Entradas relacionadas</p>
          <ul className="flex flex-col gap-4">
            {relacionadas.map((r) => (
              <li key={r.slug}>
                <Link href={`/bitacora/${r.slug}`} className="underline-grow font-serif text-lg text-negroSuave">
                  {r.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
