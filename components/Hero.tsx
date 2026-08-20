"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-12 md:pt-20 md:pb-32 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">
      
      {/* Columna de Texto */}
      <div className="flex-1 w-full text-center md:text-left flex flex-col items-center md:items-start">
        {/* Label superior ultra sutil */}
        <p className="text-[0.65rem] tracking-[0.2em] text-muted/60 uppercase mb-3">
          Bitácora N.º 001 — Registro abierto
        </p>

        {/* Título con más presencia y escala en mobile */}
        <h1 className="font-[family-name:var(--font-fraunces,serif)] text-ink text-5xl sm:text-6xl md:text-7xl leading-[1.02] mb-6 font-normal tracking-tight">
          <span>Bitácora</span>
          <span className="block italic text-olive/90 md:ml-[15%]">Curiosa</span>
        </h1>

        {/* Bajada sutil */}
        <p className="text-xs sm:text-sm md:text-base text-body/75 italic mb-8 leading-[1.6] max-w-[340px] md:max-w-[400px]">
          Ideas y objetos para cerebros que registran demasiado.
        </p>

        {/* Botones */}
        <div className="flex gap-3 justify-center md:justify-start w-full sm:w-auto">
          <Link
            href="/tienda"
            className="px-5 py-2.5 text-[0.8rem] bg-olive hover:bg-olive-dark text-white rounded transition-colors tracking-wide font-medium"
          >
            Explorar la tienda
          </Link>
          <Link
            href="/sobre-bitacora-curiosa"
            className="px-5 py-2.5 text-[0.8rem] bg-transparent text-ink/80 border border-beigeLine hover:bg-surface rounded transition-colors tracking-wide"
          >
            Abrir la Bitácora
          </Link>
        </div>
      </div>

      {/* Columna de Ilustración */}
      <div className="flex-1 w-full flex justify-center md:justify-end mt-2 md:mt-0">
        <div 
          className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px]"
          style={{
            WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 75%)",
            maskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 75%)"
          }}
        >
          <Image
            src="/images/monstruito.png"
            alt="Ilustración Monstruito"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

    </section>
  );
}