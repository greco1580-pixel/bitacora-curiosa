"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatoARS } from "@/lib/format";

export default function ProductCard({ producto, variant }: { producto: any; variant?: string }) {
  const { agregarAlCarrito } = useCart();
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Extrae la primera variante si existe, o pasa null
    const varianteId = producto?.variantes?.[0]?.id ?? null;
    
    // Ejecuta la función con los 3 parámetros requeridos
    agregarAlCarrito(producto, varianteId, 1);

    // Feedback visual en el botón
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1800);
  };

  return (
    <div
      style={{
        backgroundColor: "#fbf9f5",
        border: "1px solid #d9cba3",
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
          {/* Si hay imagen en el array la muestra; si no, muestra el N.° */}
          {producto?.imagenes?.[0] ? (
            <img 
              src={producto.imagenes[0]} 
              alt={producto.nombre || producto.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.85rem", color: "#6e655a" }}>
              {producto?.numero || `N.º ${producto?.id}`}
            </span>
          )}
        </div>

        {producto?.categoria && (
          <p style={{ color: "#8A9A7B", fontSize: "0.65rem", textTransform: "uppercase", fontWeight: 600, margin: 0 }}>
            {producto.categoria}
          </p>
        )}
        <h3 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "1.05rem", color: "#2a241c", margin: "4px 0 8px 0", fontWeight: 600 }}>
          {producto?.nombre || producto?.name}
        </h3>
        <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.9rem", color: "#2a241c", fontWeight: 600, marginBottom: "12px" }}>
          {formatoARS(producto?.precio || 0)}
        </p>
      </Link>

      <button
        type="button"
        onClick={handleAgregar}
        style={{
          width: "100%",
          padding: "10px 0",
          backgroundColor: agregado ? "#7A8B6E" : "#8A9A7B", // Verde oliva pastel (con variante activa)
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          fontFamily: "var(--font-archivo, sans-serif)",
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background-color 0.2s ease, transform 0.1s ease"
        }}
      >
        {agregado ? "✓ Agregado" : "Agregar al carrito"}
      </button>
    </div>
  );
}