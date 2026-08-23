"use client";

import { useState } from "react";

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: React.ReactNode;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `faq-btn-${item.id}`;
        const contentId = `faq-content-${item.id}`;

        return (
          <div
            key={item.id}
            className={`group rounded border border-border/50 transition-colors duration-200 ease-in-out ${
              isOpen
                ? "border-l-2 border-l-[#8797A6] bg-[#EBF0F3] border-t-border/50 border-r-border/50 border-b-border/50"
                : "bg-surface/60 hover:bg-surface"
            }`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-serif text-base text-ink/90 sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sageDark/50 rounded-sm"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-normal tracking-widest text-muted/70 select-none">
                    {item.number}
                  </span>
                  <span className="font-normal">{item.question}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-lg font-light leading-none text-muted/80 transition-transform duration-200 motion-reduce:transition-none select-none"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>

            <div
              id={contentId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pt-1 pb-5 font-sans text-xs sm:text-sm leading-relaxed text-body/80 border-t border-dashed border-border/30">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}