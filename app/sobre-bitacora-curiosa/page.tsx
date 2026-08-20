import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sobre Bitácora Curiosa",
  description:
    "El origen del proyecto, quién está detrás y el universo narrativo de Lucía y Monstruito.",
};

export default function SobrePage() {
  return (
    <div className="relative min-h-screen overflow-hidden py-12">
      {/* Imagen de fondo sutil que cubre TODA la página */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-15 mix-blend-multiply select-none">
        <Image
          src="/origen-bg.png"
          alt="Textura Bitácora Curiosa"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Contenido de texto por encima de la imagen */}
      <div className="relative z-10 mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* BLOQUE 1: CÓMO EMPEZÓ EL PROYECTO */}
          <p className="entry-label mb-3 font-sans font-medium uppercase tracking-wider text-sage-dark">
            Entrada de bitácora
          </p>
          <h1 className="mb-8 font-serif text-4xl text-ink sm:text-5xl">
            Sobre Bitácora Curiosa
          </h1>

          <div className="flex flex-col gap-5 font-sans leading-relaxed text-body">
            <p>
              Entender qué me pasaba fue el punto de partida. Empecé a registrar
              sensaciones, preguntas y experiencias que no sabía bien cómo
              nombrar. Buscar respuestas me llevó a investigar sobre
              neurodivergencia y, en ese proceso, también a conocerme de otra
              manera.
            </p>
            <p>
              Con cada cosa que aprendía aparecían nuevas preguntas. Ya no se
              trataba solamente de encontrar una explicación, sino de entenderme
              mejor, releer experiencias pasadas y descubrir por qué ciertas
              cosas se sentían como se sentían.
            </p>
            <p>
              Las ilustraciones aparecieron en medio de ese recorrido. Siempre
              comprendí mejor el mundo a través de imágenes y escenas que de
              explicaciones puramente teóricas, así que se convirtieron en una
              forma de traducir lo que sentía, darle cuerpo a experiencias
              difíciles de explicar y transitar el proceso.
            </p>
            <p>
              Bitácora Curiosa nació de ahí: de observar, sentir, investigar y
              encontrar maneras de poner en palabras e imágenes lo que muchas
              veces ocurre por dentro.
            </p>
            <p>
              Con el tiempo surgió la idea de convertir algunas de esas frases e
              ilustraciones en pequeñas cosas que pudieran acompañar la vida
              cotidiana. Así aparecieron los objetos: una manera de tener más
              cerca una sensación, una idea o algo en lo que reconocerse.
            </p>
          </div>

          <hr className="stitch-divider my-12 border-line" />

          {/* BLOQUE 2: QUIÉN ESTÁ DETRÁS (LUCÍA) */}
          <div className="flex flex-col gap-5 font-sans leading-relaxed text-body">
            <h2 className="mb-2 font-serif text-2xl text-ink">
              Quién está detrás
            </h2>
            <p>
              Detrás de Bitácora Curiosa estoy yo, Lucía. Observo, siento,
              investigo y trato de traducir esas experiencias en palabras y
              escenas. Muchas veces una idea aparece primero como una imagen;
              después busco la manera de darle forma.
            </p>
            <p>
              El proyecto crece así, generalmente mientras otras cuatro cosas
              también están ocurriendo. Cada texto, ilustración y sticker empezó
              primero como una anotación en algún margen.
            </p>
          </div>

          <hr className="stitch-divider my-12 border-line" />

          {/* BLOQUE 3: QUIÉN ES MONSTRUITO */}
          <div
            id="monstruito"
            className="flex flex-col gap-5 font-sans leading-relaxed text-body scroll-mt-20"
          >
            <h2 className="mb-2 font-serif text-2xl text-ink">
              Quién es <span className="italic">Monstruito</span>
            </h2>
            <p>
              Monstruito nació como una representación del sistema nervioso y de
              todo eso que suele quedar por dentro: la curiosidad, la
              sensibilidad, la sobreestimulación, el entusiasmo y el ruido
              mental.
            </p>
            <p>
              No es una mascota ni un personaje separado de la experiencia. Es
              una forma de darle cuerpo y expresión a cosas que a veces resultan
              difíciles de explicar solamente con palabras.
            </p>
            <p>
              En algunas ilustraciones observa desde un costado. En otras, es
              el protagonista. Puede estar curioso, saturado, entusiasmado,
              confundido o en plena investigación paralela. Su lugar cambia,
              pero siempre muestra algo de lo que está pasando por dentro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}