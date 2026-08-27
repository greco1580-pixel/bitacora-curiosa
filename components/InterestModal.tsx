"use client";

import { useState } from "react";

interface InterestModalProps {
  abierto: boolean;
  onCerrar: () => void;
  productoNombre?: string;
  modo?: "preview" | "sin-stock"; // Nueva prop para alternar textos
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-[#fbf9f5] p-6 shadow-xl border border-[#d9cba3]">
        <button
          onClick={onCerrar}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {enviado ? (
          <div className="py-6 text-center">
            <h3 className="font-serif text-xl text-[#423b32] mb-2">¡Listo! Te avisamos.</h3>
            <p className="font-sans text-sm text-[#6b6257]">
              {esSinStock
                ? "Te enviaremos un correo apenas repongamos el stock de este producto."
                : "Te avisaremos en cuanto abramos la preventa."}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-[0.65rem] font-mono uppercase tracking-widest text-[#8a9a7b] mb-1">
              {esSinStock ? "PRODUCTO AGOTADO" : "REGISTRO PREVIO"}
            </p>

            <h3 className="font-serif text-xl text-[#423b32] mb-3">
              {esSinStock
                ? `Anotarme para reingreso de ${productoNombre || "este producto"}`
                : `Anotarme para ${productoNombre || "la preventa"}`}
            </h3>

            <p className="font-sans text-xs text-[#6b6257] mb-4 leading-relaxed">
              {esSinStock
                ? "Dejá tu e-mail y te notificaremos cuando vuelva a haber stock disponible."
                : "Dejá tu e-mail para enterarte en cuanto abramos la preventa de esta primera tanda."}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-[#d9cba3] bg-white px-3 py-2 text-sm text-[#423b32] outline-none focus:border-[#8a9a7b]"
              />

              <button
                type="submit"
                disabled={cargando}
                className="w-full rounded bg-[#6b8292] py-2.5 text-xs font-mono uppercase tracking-wider text-white transition-colors hover:bg-[#596d7b] disabled:opacity-50"
              >
                {cargando ? "ENVIANDO..." : "NOTIFICARME"}
              </button>
            </form>

            <p className="mt-3 text-center font-sans text-[0.7rem] text-[#8c8275]">
              No genera compromiso de compra ni reserva.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}