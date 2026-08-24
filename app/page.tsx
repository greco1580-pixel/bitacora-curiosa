import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import InstagramSection from "@/components/InstagramSection";
import Newsletter from "@/components/Newsletter";
import Link from "next/link";
import { obtenerDestacados } from "@/data/products";
import { HomeLaunchSection } from "@/components/HomeLaunchSection";

export default function HomePage() {
  const destacados = obtenerDestacados();

  return (
    <>
      <Hero />

      <HomeLaunchSection />

      {/* SECCIÓN DESDE LA TIENDA */}
      <section className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[0.65rem] font-sans font-normal uppercase tracking-[0.2em] text-muted/60 mb-2">
            DESDE LA TIENDA
          </p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-ink/80 font-normal leading-snug">
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
            className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-ink/70 hover:text-olive transition-colors py-1"
          >
            <span>Ver todos los packs</span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* BLOQUE 1: Sobre Bitácora Curiosa */}
      <section className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60">
            Sobre Bitácora Curiosa
          </p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal leading-snug text-ink/85">
            Un registro de las cosas pequeñas que pasan adentro y afuera de la cabeza.
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-body/80 font-normal">
            Entender qué me pasaba fue el punto de partida. Empecé a registrar sensaciones, preguntas y experiencias que no sabía bien cómo nombrar. Buscar respuestas me llevó a investigar sobre neurodivergencia y, en ese proceso, también a conocerme de otra manera.
          </p>
          <Link
            href="/sobre-bitacora-curiosa"
            className="group mt-4 inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-ink/70 hover:text-olive transition-colors"
          >
            <span>Leer la historia completa del proyecto</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* BLOQUE 2: Monstruito */}
      <section className="mx-auto max-w-content px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-2">
          <p className="font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60">
            Universo narrativo
          </p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal leading-snug text-ink/85">
            Quién es Monstruito
          </h2>
          <p className="mt-1 font-sans text-sm sm:text-base leading-relaxed text-body/80 font-normal">
            Monstruito nació como una representación del sistema nervioso y de todo eso que suele quedar por dentro: la curiosidad, la sensibilidad, la sobreestimulación, el entusiasmo y el ruido mental.
          </p>
          <Link
            href="/sobre-bitacora-curiosa#monstruito"
            className="group mt-3 inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-ink/70 hover:text-olive transition-colors"
          >
            <span>Conocer a Monstruito</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* BANDA INFORMATIVA */}
      <section className="border-y border-beigeLine/50 bg-paper/40 py-2.5">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-sans text-[0.7rem] sm:text-xs text-body/75 text-center sm:text-left">
            Pagás con Mercado Pago, elegís envío a domicilio o retiro sin cargo. ¿Te arrepentiste de una compra?
          </p>
          <Link
            href="/arrepentimiento"
            className="shrink-0 font-sans text-[0.62rem] font-medium uppercase tracking-[0.12em] text-body/70 hover:text-olive transition-colors"
          >
            BOTÓN DE ARREPENTIMIENTO
          </Link>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="border-t border-beigeLine/60 bg-paper/40">
        <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60">
              Antes de escribirnos
            </p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-ink/85">
              Preguntas frecuentes
            </h2>
            <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-body/80 font-normal">
              Pagos, envíos, retiro y cambios — las respuestas más pedidas están en un solo lugar.
            </p>
            <Link
              href="/preguntas-frecuentes"
              className="mt-6 inline-block rounded bg-olive/90 px-6 py-2.5 font-sans text-xs uppercase tracking-wider font-medium text-paper transition-colors hover:bg-olive"
            >
              Ver preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>

      <InstagramSection />

      <Newsletter />
    </>
  );
}