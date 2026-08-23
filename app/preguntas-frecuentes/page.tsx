import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion, FaqItem } from "./components/FaqAccordion";

export const metadata: Metadata = {
  title: "Preguntas frecuentes — Bitácora Curiosa",
  description: "Respuestas a las dudas más comunes sobre envíos, pagos y productos.",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "01",
    number: "01",
    question: "¿Qué medios de pago puedo usar?",
    answer: (
      <p>
        Aceptamos pagos a través de Mercado Pago con tarjetas de crédito, débito y saldo en cuenta. También podés abonar mediante transferencia bancaria. El pedido se confirma una vez acreditado el pago.
      </p>
    ),
  },
  {
    id: "02",
    number: "02",
    question: "¿Hacen envíos a todo el país?",
    answer: (
      <p>
        Sí, hacemos envíos a todo el país. El costo se calcula según tu provincia al finalizar la compra. Si todavía no aparece una tarifa para tu zona, nos comunicamos con vos para coordinarlo.
      </p>
    ),
  },
  {
    id: "03",
    number: "03",
    question: "¿Puedo retirar el pedido en persona?",
    answer: (
      <p>
        Sí, podés retirar tu pedido sin cargo por Villa Bosch (Partido de Tres de Febrero), previa coordinación de día y horario una vez que tu compra esté lista.
      </p>
    ),
  },
  {
    id: "04",
    number: "04",
    question: "¿Cuánto tardan en preparar mi pedido?",
    answer: (
      <p>
        Preparamos tu pedido en el momento. Te avisamos apenas esté listo para retirar o haya sido entregado al correo.
      </p>
    ),
  },
  {
    id: "05",
    number: "05",
    question: "¿Cuánto tarda en llegar el pedido?",
    answer: (
      <p>
        Una vez despachado, el plazo depende del correo y de la localidad de destino. Vas a recibir el código de seguimiento apenas el pedido esté en camino.
      </p>
    ),
  },
  {
    id: "06",
    number: "06",
    question: "¿Cómo cuido los stickers para que duren?",
    answer: (
      <p>
        Pegalos sobre una superficie limpia, seca y lisa. Aunque resisten el agua, evitá la fricción constante, el calor intenso y los lavados agresivos.
      </p>
    ),
  },
];

export default function PreguntasFrecuentesPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Encabezado Principal */}
      <header className="mb-6 max-w-xl">
        <p className="font-mono text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/70">
          CONSULTAS FRECUENTES
        </p>
        <h1 className="mt-2 font-serif text-3xl font-normal text-ink/90 sm:text-4xl">
          Preguntas frecuentes
        </h1>
        <p className="mt-3 max-w-prose font-sans text-xs sm:text-sm text-body/75 leading-relaxed">
          Algunas respuestas para que ninguna duda quede dando vueltas.
        </p>
      </header>

      {/* Anotación Mobile */}
      <div className="mb-8 block lg:hidden">
        <div className="relative overflow-hidden rounded-sm border border-dashed border-sageDark/30 bg-sageDark/5 p-4">
          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-sageDark/90">
            ANOTACIONES ÚTILES
          </p>
          <p className="mt-1 font-sans text-xs text-body/80">
            Antes, durante y después de comprar.
          </p>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <main className="lg:col-span-8">
          <FaqAccordion items={FAQ_ITEMS} />

          <footer className="mt-10 border-t border-dashed border-border/50 pt-6">
            <p className="font-sans text-xs sm:text-sm text-body/80">
              ¿Todavía quedó algo dando vueltas?{" "}
              <Link
                href="/contacto"
                className="inline-flex items-center gap-1 font-medium text-ink/90 underline decoration-border/80 underline-offset-4 transition-colors hover:text-sageDark hover:decoration-sageDark"
              >
                Escribinos →
              </Link>
            </p>
          </footer>
        </main>

        {/* Anotación Desktop */}
        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-12 rounded-sm border border-dashed border-sageDark/30 bg-sageDark/5 p-5">
            <svg
              aria-hidden="true"
              className="mb-3 h-4 w-24 text-sageDark/40"
              fill="none"
              viewBox="0 0 100 12"
            >
              <path
                d="M0 6 C20 0, 30 12, 50 6 C70 0, 80 12, 100 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>

            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-sageDark/90">
              ANOTACIONES ÚTILES
            </p>
            <p className="mt-1.5 font-sans text-xs leading-relaxed text-body/80">
              Antes, durante y después de comprar.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}