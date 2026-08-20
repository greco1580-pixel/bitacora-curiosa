"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

interface Producto {
  id: string;
  number?: string;
  nombre: string;
  precio: number;
  shortDescription?: string;
  longDescription?: string;
  stickerCount?: string;
  format?: string;
  material?: string;
  imagenes?: string[];
}

export default function ProductoInteractivo({ producto }: { producto: Producto }) {
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito, abrirCarrito } = useCart();

  const formatoARS = (precio: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(precio);
  };

  const handleAgregar = () => {
  // Ejecuta la función tantas veces como valga 'cantidad'
  for (let i = 0; i < cantidad; i++) {
    agregarAlCarrito(producto as any);
  }
  if (abrirCarrito) abrirCarrito();
};

  return (
    <div className="flex flex-col justify-center">
      {producto.number && (
        <span className="font-sans text-xs font-medium uppercase tracking-wider text-sage-dark">
          {producto.number}
        </span>
      )}
      <h1 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">{producto.nombre}</h1>
      <p className="mt-3 font-sans text-2xl font-semibold text-ink">{formatoARS(producto.precio)}</p>

      {producto.shortDescription && (
        <p className="mt-4 font-sans text-base leading-relaxed text-body">
          {producto.shortDescription}
        </p>
      )}

      <div className="mt-6 flex items-center space-x-4">
        {/* Control de cantidad */}
        <div className="flex items-center rounded-md border border-line bg-surface">
          <button
            type="button"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="px-3 py-2 font-sans text-sm font-medium text-ink hover:bg-paper cursor-pointer"
          >
            -
          </button>
          <span className="px-4 font-sans text-sm font-medium text-ink">{cantidad}</span>
          <button
            type="button"
            onClick={() => setCantidad((c) => c + 1)}
            className="px-3 py-2 font-sans text-sm font-medium text-ink hover:bg-paper cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Botón principal */}
        <button
  type="button"
  onClick={handleAgregar}
  style={{ color: "#F7F5EE", backgroundColor: "#8A9A7B" }}
  className="flex-1 rounded-md px-6 py-3 font-sans text-sm font-medium transition-colors duration-200 hover:opacity-90 focus:outline-none cursor-pointer text-center block"
>
  Agregar al carrito
</button>
      </div>
    </div>
  );
}