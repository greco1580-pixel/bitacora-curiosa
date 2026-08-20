import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import InstagramSection from "@/components/InstagramSection";
import Newsletter from "@/components/Newsletter";
import Link from "next/link";
import { obtenerDestacados } from "@/data/products";

export default function HomePage() {
  const destacados = obtenerDestacados();

  return (
    <>
      <Hero />

      {/* SECCIÓN DESDE LA TIENDA */}
      <section className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="entry-label mb-1 font-sans text-xs font-medium uppercase tracking-wider text-sage-dark">
            DESDE LA TIENDA
          </p>
          <h2 className="font-serif text-3xl text-ink">
            Maneras de decirlo sin tener que explicarlo.
          </h2>
        </div>

        {/* Exactamente 4 packs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destacados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} variant="featured" />
          ))}
        </div>

        {/* Botón secundario hacia la tienda */}
        <div className="mt-10 text-center">
          <Link
            href="/tienda"
            className="inline-flex items-center rounded-md border border-line px-6 py-3 font-sans text-sm font-medium text-ink transition-colors duration-200 hover:border-blue-dark hover:text-blue-dark"
          >
            Ver todos los packs →
          </Link>
        </div>
      </section>

      {/* BLOQUE 1: Sobre Bitácora Curiosa */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="entry-label mb-3 font-sans font-medium uppercase tracking-wider text-sage-dark">
            Sobre Bitácora Curiosa
          </p>
          <h2 className="font-serif text-3xl text-ink">
            Un registro de las cosas pequeñas que pasan adentro y afuera de la cabeza.
          </h2>
          <p className="mt-5 font-sans leading-relaxed text-body">
            Entender qué me pasaba fue el punto de partida. Empecé a registrar sensaciones, preguntas y experiencias que no sabía bien cómo nombrar. Buscar respuestas me llevó a investigar sobre neurodivergencia y, en ese proceso, también a conocerme de otra manera.
          </p>
          <Link
            href="/sobre-bitacora-curiosa"
            className="mt-5 inline-block font-sans text-sm font-medium text-blue-dark hover:underline"
          >
            Leer la historia completa del proyecto →
          </Link>
        </div>
      </section>

      {/* BLOQUE 2: Monstruito */}
      <section className="mx-auto max-w-content px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-3">
          <p className="entry-label font-sans font-medium uppercase tracking-wider text-sage-dark">
            Universo narrativo
          </p>
          <h2 className="font-serif text-3xl text-ink">Quién es Monstruito</h2>
          <p className="font-sans leading-relaxed text-body">
            Monstruito nació como una representación del sistema nervioso y de todo eso que suele quedar por dentro: la curiosidad, la sensibilidad, la sobreestimulación, el entusiasmo y el ruido mental.
          </p>
          <Link
            href="/sobre-bitacora-curiosa#monstruito"
            className="mt-1 inline-block font-sans text-sm font-medium text-blue-dark hover:underline"
          >
            Conocer a Monstruito →
          </Link>
        </div>
      </section>

      {/* BANDA INFORMATIVA */}
      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-3 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="font-sans text-sm text-body">
            Pagás con Mercado Pago, elegís envío a domicilio o retiro sin cargo. ¿Te arrepentiste de una compra?
          </p>
          <a
            href="/arrepentimiento"
            className="shrink-0 font-sans text-sm font-medium text-ink hover:text-blue-dark hover:underline"
          >
            BOTÓN DE ARREPENTIMIENTO
          </a>
        </div>
      </section>

      <InstagramSection />

      {/* PREGUNTAS FRECUENTES */}
      <section className="border-t border-line bg-surface/40">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="entry-label mb-2 font-sans font-medium uppercase tracking-wider text-sage-dark">
              Antes de escribirnos
            </p>
            <h2 className="font-serif text-3xl text-ink">Preguntas frecuentes</h2>
            <p className="mt-4 font-sans text-body">
              Pagos, envíos, retiro y cambios — las respuestas más pedidas están en un solo lugar.
            </p>
            <a
              href="/preguntas-frecuentes"
              className="mt-6 inline-block rounded-md bg-ink px-6 py-3 font-sans text-sm font-medium text-paper hover:bg-graphite"
            >
              Ver preguntas frecuentes
            </a>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}