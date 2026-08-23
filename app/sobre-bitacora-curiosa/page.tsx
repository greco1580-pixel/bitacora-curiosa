import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sobre Bitácora Curiosa — Bitácora Curiosa",
  description: "Sensaciones, preguntas e ilustraciones hechas objeto.",
};

export default function SobreBitacoraCuriosaPage() {
  return (
    <div className="mx-auto max-w-[850px] px-6 py-8 md:py-12">
      
      {/* ==========================================
          REGISTRO 001 · PUNTO DE PARTIDA
         ========================================== */}
      <section className="relative mb-12 md:mb-16">
        <header className="mb-6">
          <p className="text-[0.55rem] tracking-[0.2em] text-muted/60 uppercase mb-2 flex items-center gap-1.5">
            <span className="text-[7px] opacity-60">●</span> REGISTRO 001 · PUNTO DE PARTIDA
          </p>
          <h1 className="font-[family-name:var(--font-fraunces,serif)] text-ink text-2xl sm:text-3xl font-normal tracking-tight mb-4">
            Sobre Bitácora Curiosa
          </h1>
          
          {/* Frase destacada */}
          <div className="border-l border-[#A6B4C4]/40 bg-[#F2F5F8]/30 pl-4 py-2 max-w-[550px]">
            <p className="font-[family-name:var(--font-fraunces,serif)] text-xs sm:text-sm italic text-ink/80">
              Entender qué me pasaba fue el punto de partida.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Texto */}
          <div className="md:col-span-7 space-y-6">
            
            <div>
              <span className="inline-block text-[0.55rem] tracking-[0.15em] uppercase text-[#678294] border border-[#678294]/20 bg-[#678294]/5 px-2 py-0.5 rounded-sm mb-2 font-normal">
                OBSERVAR
              </span>
              <p className="text-xs md:text-sm text-body/80 leading-relaxed">
                Empecé a registrar sensaciones, preguntas y experiencias que no sabía bien cómo nombrar. Buscar respuestas me llevó a investigar sobre neurodivergencia y, en ese proceso, también a conocerme de otra manera.
              </p>
            </div>

            <div>
              <span className="inline-block text-[0.55rem] tracking-[0.15em] uppercase text-[#7A936E] border border-[#7A936E]/20 bg-[#7A936E]/5 px-2 py-0.5 rounded-sm mb-2 font-normal">
                INVESTIGAR
              </span>
              <p className="text-xs md:text-sm text-body/80 leading-relaxed">
                Con cada cosa que aprendía aparecían nuevas preguntas. Ya no se trataba solamente de encontrar una explicación, sino de entenderme mejor, releer experiencias pasadas y descubrir por qué ciertas cosas se sentían como se sentían.
              </p>
            </div>

            <div>
              <span className="inline-block text-[0.55rem] tracking-[0.15em] uppercase text-[#887396] border border-[#887396]/20 bg-[#887396]/5 px-2 py-0.5 rounded-sm mb-2 font-normal">
                TRADUCIR
              </span>
              <div className="space-y-3">
                <p className="text-xs md:text-sm text-body/80 leading-relaxed">
                  Las ilustraciones aparecieron durante ese recorrido. Siempre comprendí mejor el mundo a través de imágenes y escenas que de explicaciones puramente teóricas, así que se convirtieron en una forma de traducir lo que sentía, darle cuerpo a experiencias difíciles de explicar y transitar el proceso.
                </p>
                <p className="text-xs md:text-sm text-body/80 leading-relaxed">
                  Entre esas imágenes apareció <em className="font-[family-name:var(--font-fraunces,serif)] italic text-ink">Monstruito</em>: una forma de volver visible todo eso que muchas veces solo podía sentir por dentro.
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-body/80 leading-relaxed italic border-l border-muted/20 pl-3 py-0.5">
              Bitácora Curiosa nació de ahí: de observar, sentir, investigar y encontrar maneras de poner en palabras e imágenes lo que muchas veces ocurre por dentro.
            </p>

            <div>
              <span className="inline-block text-[0.55rem] tracking-[0.15em] uppercase text-[#678294] border border-[#678294]/20 bg-[#678294]/5 px-2 py-0.5 rounded-sm mb-2 font-normal">
                ACERCAR
              </span>
              <p className="text-xs md:text-sm text-body/80 leading-relaxed">
                Con el tiempo surgió la idea de convertir algunas de esas frases e ilustraciones en pequeñas cosas que pudieran acompañar la vida cotidiana. Así aparecieron los stickers: una manera de tener más cerca una sensación, una idea o algo en lo que reconocerse.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Cartografía */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-20">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-black/5 bg-black/[0.01] p-2 rounded-sm">
                <Image
                  src="/origen-bg.png"
                  alt="Cartografía visual y mapa de procesos"
                  fill
                  className="object-contain p-2 mix-blend-multiply opacity-75"
                />
              </div>
              <p className="mt-2 text-[0.55rem] tracking-[0.15em] uppercase text-muted/50 text-center font-mono">
                Mapa interno · Registro en proceso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Separador sutil */}
      <hr className="my-10 md:my-12 border-t border-dashed border-black/10" />

      {/* ==========================================
          REGISTRO 002 · DETRÁS DE LA BITÁCORA
         ========================================== */}
      <section className="relative mb-12 md:mb-16">
        <header className="mb-6">
          <p className="text-[0.55rem] tracking-[0.2em] text-muted/60 uppercase mb-2 flex items-center gap-1.5">
            <span className="text-[7px] opacity-60">●</span> REGISTRO 002 · DETRÁS DE LA BITÁCORA
          </p>
          <h2 className="font-[family-name:var(--font-fraunces,serif)] text-ink text-xl md:text-2xl font-normal tracking-tight mb-4">
            Quién está detrás
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 space-y-4">
            <p className="font-[family-name:var(--font-fraunces,serif)] text-sm md:text-base text-ink/90">
              Detrás de Bitácora Curiosa estoy yo, Lucía.
            </p>
            <p className="text-xs md:text-sm text-body/80 leading-relaxed">
              Observo, siento, investigo y trato de traducir esas experiencias en palabras y escenas. Muchas veces una idea aparece primero como una imagen; después busco la manera de darle forma.
            </p>
            <p className="text-xs md:text-sm text-body/80 leading-relaxed">
              El proyecto crece así, generalmente mientras otras cuatro cosas también están ocurriendo. Cada texto, ilustración y sticker empezó primero como una anotación en algún margen.
            </p>
          </div>

          {/* Card Lateral estilo TyC */}
          <div className="md:col-span-5">
            <div className="border border-black/5 bg-black/[0.015] p-4 rounded-sm">
              <p className="text-[0.55rem] tracking-[0.15em] uppercase text-ink/60 mb-3 font-mono">
                Método poco lineal
              </p>
              <div className="space-y-2 text-[0.72rem] text-body/75 leading-relaxed font-mono">
                <p>1. Observar</p>
                <p>2. Sentir</p>
                <p>3. Investigar</p>
                <p>4. Traducir</p>
                <p className="pt-2 text-ink/60 italic border-t border-dashed border-black/10 font-sans text-[0.7rem]">
                  ↺ Volver a observar (generalmente mientras otras cuatro cosas también están ocurriendo).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separador sutil */}
      <hr className="my-10 md:my-12 border-t border-dashed border-black/10" />

      {/* ==========================================
          REGISTRO 003 · LO QUE PASA POR DENTRO
         ========================================== */}
      <section id="monstruito" className="relative scroll-mt-24">
        <header className="mb-6">
          <p className="text-[0.55rem] tracking-[0.2em] text-muted/60 uppercase mb-2 flex items-center gap-1.5">
            <span className="text-[7px] opacity-60">●</span> REGISTRO 003 · LO QUE PASA POR DENTRO
          </p>
          <h2 className="font-[family-name:var(--font-fraunces,serif)] text-ink text-xl md:text-2xl font-normal tracking-tight mb-4">
            Quién es Monstruito
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 space-y-4">
            <p className="text-xs md:text-sm text-body/80 leading-relaxed">
              Monstruito representa el sistema nervioso y todo eso que suele quedar por dentro: la curiosidad, la sensibilidad, la sobreestimulación, el entusiasmo y el ruido mental.
            </p>

            <div className="border-l border-[#C1B5CA]/40 bg-[#F6F4F8]/30 pl-4 py-2 max-w-[550px]">
              <p className="font-[family-name:var(--font-fraunces,serif)] text-xs sm:text-sm italic text-ink/80">
                No es una mascota. Es una forma de darle cuerpo y expresión a cosas que a veces resultan difíciles de explicar solamente con palabras.
              </p>
            </div>

            <p className="text-xs md:text-sm text-body/80 leading-relaxed">
              En algunas ilustraciones observa desde un costado. En otras, es el protagonista. Puede estar curioso, saturado, entusiasmado, confundido o en plena investigación paralela. Su lugar cambia, pero siempre muestra algo de lo que está pasando por dentro.
            </p>
          </div>

          {/* Card Lateral */}
          <div className="md:col-span-5">
            <div className="border border-black/5 bg-black/[0.015] p-4 rounded-sm">
              <p className="text-[0.55rem] tracking-[0.15em] uppercase text-ink/60 mb-3 font-mono">
                Estado Variable
              </p>
              <div className="flex flex-wrap gap-x-1.5 gap-y-2 text-[0.7rem] text-body/75 leading-relaxed font-mono">
                <span>Curioso</span> <span className="text-muted/30">/</span>
                <span>Saturado</span> <span className="text-muted/30">/</span>
                <span>Entusiasmado</span> <span className="text-muted/30">/</span>
                <span>Confundido</span> <span className="text-muted/30">/</span>
                <span>Sensible</span> <span className="text-muted/30">/</span>
                <span>Investigando</span> <span className="text-muted/30">/</span>
                <span>En silencio</span> <span className="text-muted/30">/</span>
                <span>Mentalmente ocupado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}