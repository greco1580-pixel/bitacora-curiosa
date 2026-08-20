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
          {/* Si hay imagen en el array la muestra; si no, muestra el N.° */}
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

        {/* Categoría: Tono más atenuado y tracking fino */}
        {producto?.categoria && (
          <p style={{ color: "rgba(138, 154, 123, 0.8)", fontSize: "0.65rem", textTransform: "uppercase", fontWeight: 500, letterSpacing: "0.08em", margin: 0 }}>
            {producto.categoria}
          </p>
        )}

        {/* Nombre del producto: Peso reducido de semibold (600) a medium (500) y color tinta suavizado */}
        <h3 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "1.05rem", color: "#423b32", margin: "4px 0 6px 0", fontWeight: 500, lineHeight: 1.3 }}>
          {producto?.nombre || producto?.name}
        </h3>

        {/* Precio: Cambio de grosor (400) y tono gris cálido que no compite con la imagen */}
        <p style={{ fontFamily: "var(--font-sans, sans-serif)", fontSize: "0.875rem", color: "#6b6257", fontWeight: 400, marginBottom: "14px" }}>
          {formatoARS(producto?.precio || 0)}
        </p>
      </Link>

      {/* Botón: Tipografía y color suave */}
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
    </div>
  );
}