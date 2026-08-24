"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatoARS } from "@/lib/format";
import { storeConfig } from "@/lib/store-config";
import { InterestModal } from "@/components/InterestModal";

export default function ProductCard({ producto, variant }: { producto: any; variant?: string }) {
  const { agregarAlCarrito } = useCart();
  const [agregado, setAgregado] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleAgregar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (storeConfig.mode === "preview") {
      setModalAbierto(true);
      return;
    }

    const varianteId = producto?.variantes?.[0]?.id ?? null;
    agregarAlCarrito(producto, varianteId, 1);

    setAgregado(true);
    setTimeout(() => setAgregado(false), 1800);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#fbf9f5",
          border: "1px solid rgba(217, 203, 163, 0.6)",
          borderRadius: "8px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%"
        }}
      >
        <Link href={`/producto/${producto?.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1/1",
              backgroundColor: "#efece6",
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {producto?.imagenes?.[0] ? (
              <img 
                src={producto.imagenes[0]} 
                alt={producto.nombre || producto.name} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.85rem", color: "#8c8275" }}>
                {producto?.numero || `N.º ${producto?.id}`}
              </span>
            )}
          </div>

          {producto?.categoria && (
            <p style={{ color: "rgba(138, 154, 123, 0.8)", fontSize: "0.65rem", textTransform: "uppercase", fontWeight: 500, letterSpacing: "0.08em", margin: 0 }}>
              {producto.categoria}
            </p>
          )}

          <h3 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "1.05rem", color: "#423b32", margin: "4px 0 6px 0", fontWeight: 500, lineHeight: 1.3 }}>
            {producto?.nombre || producto?.name}
          </h3>

          <p style={{ fontFamily: "var(--font-sans, sans-serif)", fontSize: "0.875rem", color: "#6b6257", fontWeight: 400, marginBottom: "14px" }}>
            {formatoARS(producto?.precio || 0)}
          </p>
        </Link>

        {storeConfig.mode === "preview" ? (
          <div>
            <p className="text-[0.6rem] font-mono text-muted/70 uppercase tracking-widest mb-1.5 text-center">
              EN PRODUCCIÓN
            </p>
            <button
              type="button"
              onClick={handleAgregar}
              className="w-full py-2 border border-black/15 bg-transparent hover:bg-black/5 text-ink text-[0.7rem] font-mono tracking-wider uppercase rounded-sm transition-colors"
            >
              AVISAME CUANDO ABRA →
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAgregar}
            style={{
              width: "100%",
              padding: "9px 0",
              backgroundColor: agregado ? "#7A8B6E" : "#8A9A7B",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              fontFamily: "var(--font-archivo, sans-serif)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background-color 0.2s ease, transform 0.1s ease"
            }}
          >
            {agregado ? "✓ Agregado" : "Agregar al carrito"}
          </button>
        )}
      </div>

      <InterestModal
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
        productoNombre={producto?.nombre || producto?.name}
      />
    </>
  );
}