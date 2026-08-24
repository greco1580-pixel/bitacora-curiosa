"use client";

import { useState } from "react";

export interface InterestModalProps {
  abierto: boolean;
  onCerrar: () => void;
  productoNombre: string;
}

export function InterestModal({ abierto, onCerrar, productoNombre }: InterestModalProps) {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  if (!abierto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setCargando(true);

    try {
      // Generamos un ID amigable basado en el nombre del producto
      const generatedId = productoNombre.toLowerCase().trim().replace(/\s+/g, "-");

      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          productName: productoNombre,
          productId: generatedId,
          consent: true, // Campo obligatorio requerido por la API
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "/tienda",
        }),
      });

      if (!response.ok) {
        throw new Error("Respuesta no válida del servidor");
      }

      setEnviado(true);
    } catch (err) {
      console.error("Error al registrar interés:", err);
    } finally {
      setCargando(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setEnviado(false);
    onCerrar();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-xl bg-[#FAF8F5] p-6 shadow-xl border border-black/10">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-xs font-mono text-muted hover:text-ink transition-colors"
        >
          ✕
        </button>

        {!enviado ? (
          <div className="space-y-4">
            <div>
              <p className="text-[0.6rem] font-mono tracking-[0.2em] text-[#678294] uppercase mb-1">
                REGISTRO PREVIO
              </p>
              <h3 className="font-serif text-lg text-ink font-normal">
                Anotarme para {productoNombre}
              </h3>
            </div>

            <p className="text-xs text-body/80 leading-relaxed font-sans font-light">
              Dejá tu e-mail para enterarte en cuanto abramos la preventa de esta primera tanda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-sm border border-black/15 bg-white/80 px-3 py-2 text-xs text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-[#678294]"
              />
              <button
                type="submit"
                disabled={cargando}
                className="w-full rounded-sm bg-[#678294] py-2.5 text-xs font-mono uppercase tracking-wider text-white transition-colors hover:bg-[#556d7e] disabled:opacity-50 cursor-pointer"
              >
                {cargando ? "Anotando..." : "Notificarme"}
              </button>
            </form>

            <p className="text-[0.62rem] text-muted/70 font-mono text-center">
              No genera compromiso de compra ni reserva.
            </p>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <h3 className="font-serif text-xl text-ink font-normal">¡Anotado!</h3>
            <p className="text-xs text-body/80 font-sans font-light">
              Te avisaremos al correo apenas se habilite la preventa de {productoNombre}.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 text-xs font-mono uppercase tracking-wider underline text-[#678294] hover:text-ink cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterestModal;