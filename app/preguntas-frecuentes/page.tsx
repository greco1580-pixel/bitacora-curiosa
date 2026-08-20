"use client";

import { useState } from "react";

const faqs = [
  {
    question: "¿Qué medios de pago aceptan?",
    answer:
      "Pagás con Mercado Pago (tarjetas de crédito, débito, dinero en cuenta y otros medios que habilita Mercado Pago) directamente en el checkout.",
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer:
      "Hacemos envíos a todo el territorio argentino. El costo se calcula según tu provincia al finalizar la compra; si todavía no tenemos tarifa cargada para tu zona, te contactamos para coordinarlo.",
  },
  {
    question: "¿Puedo retirar el pedido en persona?",
    answer:
      "Sí, sin cargo, en un punto a coordinar. Elegís la opción de retiro en el checkout y te escribimos para acordar día y horario.",
  },
  {
    question: "¿Cuánto tardan en preparar mi pedido?",
    answer:
      "La preparación es inmediata. Te avisamos cuando esté listo para retirar o haya sido entregado al correo.",
  },
  {
    question: "¿Cuánto tarda en llegar el pedido?",
    answer:
      "Una vez despachado, los tiempos habitualmente van de 2 a 5 días hábiles según la localidad.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-paper min-h-screen py-12 px-6">
      <div className="max-w-[760px] mx-auto">
        {/* Encabezado Armonizado */}
        <div className="mb-8">
          <p className="text-[0.65rem] font-sans font-normal uppercase tracking-[0.2em] text-muted/60 mb-2">
            CONSULTAS FRECUENTES
          </p>
          <h1 className="font-serif text-xl sm:text-2xl md:text-3xl text-ink/80 font-normal leading-snug">
            Preguntas frecuentes
          </h1>
        </div>

        {/* Lista de Acordeones */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-surface border border-line rounded-lg overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-serif text-ink/80 text-lg sm:text-xl font-normal pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`text-olive transition-transform duration-200 text-xl font-light ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-body text-[0.95rem] leading-relaxed border-t border-line/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}