"use client";

import { useState } from "react";

interface InterestModalProps {
  abierto: boolean;
  onCerrar: () => void;
  productoNombre?: string;
  modo?: "preview" | "sin-stock";
}

export function InterestModal({
  abierto,
  onCerrar,
  productoNombre,
  modo = "preview",
}: InterestModalProps) {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  if (!abierto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setCargando(true);
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, producto: productoNombre, motivo: modo }),
      });

      if (res.ok) {
        setEnviado(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const esSinStock = modo === "sin-stock";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2926]/40 backdrop-blur-[2px] p-4">
      <div 
        className="relative w-full max-w-md rounded-lg bg-[#faf8f5] p-7 md:p-8 shadow-2xl border border-[#6b5b7b]/20 overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(#6b5b7b 0.4px, transparent 0.4px)",
          backgroundSize: "12px 12px",
          backgroundColor: "#faf8f5"
        }}
      >
        {/* Detalle visual sutil en la esquina superior */}
        <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#6b5b7b]/5 pointer-events-none" />

        {/* Botón de cierre discreto */}
        <button
          onClick={onCerrar}
          className="absolute right-4 top-4 text-[#8c8275]/50 hover:text-[#423b32] transition-colors p-1 text-xs font-mono"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {enviado ? (
          <div className="py-6 text-center flex flex-col items-center">
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.18em] text-[#6b5b7b] mb-2 block">
              LISTO, QUEDÓ ANOTADO
            </span>
            <h3 className="font-serif text-2xl text-[#423b32] mb-3 font-normal">
              ¡Tomamos nota!
            </h3>
            <p className="font-sans text-xs text-[#6b6257] leading-relaxed max-w-xs mb-6">
              Te avisaremos al instante apenas tengamos novedades de este objeto.
            </p>
            <button
              onClick={onCerrar}
              className="px-6 py-2 rounded border border-[#6b5b7b]/30 text-[#6b5b7b] hover:bg-[#6b5b7b]/5 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              VOLVER A NAVEGAR
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Etiqueta superior */}
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.18em] text-[#6b5b7b]/90 mb-2 block">
              {esSinStock ? "SE FUE POR UN RATITO" : "REGISTRO PREVIO"}
            </span>

            {/* Título principal */}
            <h3 className="font-serif text-xl md:text-2xl text-[#423b32] font-normal leading-snug mb-2">
              {esSinStock
                ? "¿Querés que te avisemos cuando vuelva?"
                : "¿Querés enterarte cuando abra la preventa?"}
            </h3>

            {/* Nombre del producto destacado en caja suave */}
            {productoNombre && (
              <div className="my-2.5 inline-self-start px-3 py-1.5 rounded bg-[#6b5b7b]/8 border border-[#6b5b7b]/15 text-[#544660] font-serif text-sm italic">
                “{productoNombre}”
              </div>
            )}

            {/* Texto descriptivo */}
            <p className="font-sans text-xs text-[#6b6257] leading-relaxed mb-6 mt-1">
              {esSinStock
                ? "Dejanos tu mail y te contamos apenas repongamos."
                : "Dejanos tu mail para enterarte en cuanto abramos la preventa de esta tanda."}
            </p>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-[#6b5b7b]/25 bg-white/80 px-4 py-2.5 text-sm text-[#423b32] placeholder-[#8c8275]/60 outline-none focus:border-[#6b5b7b] focus:bg-white transition-all shadow-sm"
              />

              <button
                type="submit"
                disabled={cargando}
                className="w-full rounded bg-[#6b5b7b] py-3 text-xs font-mono uppercase tracking-[0.12em] text-[#faf8f5] transition-all hover:bg-[#584967] active:scale-[0.99] disabled:opacity-50 shadow-sm"
              >
                {cargando ? "ANOTANDO..." : "AVISAME CUANDO VUELVA"}
              </button>
            </form>

            {/* Aclaración inferior */}
            <p className="mt-5 text-center font-sans text-[0.7rem] text-[#8c8275]/80 leading-tight">
              Solo es un aviso: no reserva ni compromete la compra.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterestModal;