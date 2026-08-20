"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-24 md:pt-20 md:pb-32 flex flex-wrap items-center justify-between gap-12 lg:gap-16">
      
      {/* Columna de Texto */}
      <div className="flex-1 basis-[450px]">
        <p className="text-[0.75rem] tracking-[0.15em] text-muted uppercase mb-5">
          Bitácora N.º 001 — Registro abierto
        </p>

        <h1 className="font-[family-name:var(--font-fraunces,serif)] text-ink text-5xl sm:text-6xl leading-[1.1] mb-8 font-normal">
          <span className="block">Bitácora</span>
          <span className="block ml-[22%]">Curiosa</span>
        </h1>

        <p className="text-[1.15rem] text-body italic mb-10 leading-[1.6]">
          Ideas y objetos para cerebros que registran demasiado.
        </p>

        {/* Botones adaptados a la paleta de Tailwind */}
        <div className="flex gap-4 flex-wrap">
          <Link
            href="/tienda"
            className="px-7 py-3.5 bg-olive hover:bg-olive-dark text-white rounded font-semibold text-[0.95rem] transition-colors"
          >
            Explorar la tienda
          </Link>
          <Link
            href="/sobre-bitacora-curiosa"
            className="px-7 py-3.5 bg-transparent text-ink border border-[#d9cba3] hover:bg-surface rounded font-semibold text-[0.95rem] transition-colors"
          >
            Abrir la Bitácora
          </Link>
        </div>
      </div>

      {/* Columna de Imagen (con difuminado suave) */}
      <div className="flex-1 basis-[350px] flex justify-center lg:justify-end">
        <div 
          className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px]"
          style={{
            WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 72%)",
            maskImage: "radial-gradient(circle, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 72%)"
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