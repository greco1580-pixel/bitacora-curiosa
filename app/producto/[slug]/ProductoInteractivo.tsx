"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { storeConfig } from "@/lib/store-config";
import InterestModal from "@/components/InterestModal";

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
  const [modalAbierto, setModalAbierto] = useState(false);
  const { agregarAlCarrito, abrirCarrito } = useCart();

  const formatoARS = (precio: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(precio);
  };

  const handleAgregar = () => {
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto as any);
    }
    if (abrirCarrito) abrirCarrito();
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        {producto.number && (
          <span className="font-sans text-[0.68rem] font-normal uppercase tracking-[0.2em] text-muted/70">
            {producto.number}
          </span>
        )}
        
        <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-ink/85 leading-snug">
          {producto.nombre}
        </h1>
        
        <p className="mt-2 font-sans text-xl font-light text-ink/80">
          {formatoARS(producto.precio)}
        </p>

        {producto.shortDescription && (
          <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-muted/90 font-light">
            {producto.shortDescription}
          </p>
        )}

        {storeConfig.mode === "preview" ? (
          /* MODO PREVIEW / REGISTRO PREVIO */
          <div className="mt-6 border-l-2 border-[#678294]/40 bg-[#F2F5F8]/40 p-4 rounded-r-sm space-y-3">
            <p className="text-[0.6rem] font-mono tracking-[0.2em] text-[#678294] uppercase">
              REGISTRO PREVIO
            </p>
            <h3 className="font-serif text-ink text-sm sm:text-base">
              Este pack forma parte de la primera tanda.
            </h3>
            <p className="text-xs text-body/80 leading-relaxed font-sans font-light">
              Todavía no está disponible para comprar. Si te interesa, dejá tu correo y te avisamos apenas se abra la preventa.
            </p>
            <button
              type="button"
              onClick={() => setModalAbierto(true)}
              className="w-full py-2.5 bg-[#678294] hover:bg-[#556d7e] text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors mt-2 cursor-pointer"
            >
              ANOTAR ESTE PACK
            </button>
            <p className="text-[0.65rem] text-muted/70 font-mono text-center pt-0.5">
              Esto no genera una compra ni reserva una unidad.
            </p>
          </div>
        ) : (
          /* MODO NORMAL / CARRITO */
          <div className="mt-6 flex items-center gap-3">
            {/* Control de cantidad */}
            <div className="flex items-center rounded-lg border border-line/50 bg-surface/80">
              <button
                type="button"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="px-3 py-2.5 font-sans text-xs font-light text-ink/70 hover:text-ink transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="px-3 font-sans text-xs font-medium text-ink/80">{cantidad}</span>
              <button
                type="button"
                onClick={() => setCantidad((c) => c + 1)}
                className="px-3 py-2.5 font-sans text-xs font-light text-ink/70 hover:text-ink transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Botón principal */}
            <button
              type="button"
              onClick={handleAgregar}
              className="flex-1 rounded-lg px-5 py-2.5 font-sans text-xs uppercase tracking-wider font-medium text-white bg-olive/85 hover:bg-olive transition-all duration-200 shadow-sm cursor-pointer text-center"
            >
              Agregar al carrito
            </button>
          </div>
        )}
      </div>

      {/* Modal de Registro de Interés */}
      <InterestModal
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
        productoNombre={producto.nombre}
      />
    </>
  );
}