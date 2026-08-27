"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { storeConfig } from "@/lib/store-config";
import { InterestModal } from "@/components/InterestModal";

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
          <span className="font-mono text-[0.65rem] font-normal uppercase tracking-[0.18em] text-[#6b5b7b]/80">
            {producto.number}
          </span>
        )}
        
        <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#423b32] leading-snug">
          {producto.nombre}
        </h1>
        
        <p className="mt-2 font-sans text-xl font-light text-[#423b32]/90">
          {formatoARS(producto.precio)}
        </p>

        {producto.shortDescription && (
          <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-[#6b6257] font-light">
            {producto.shortDescription}
          </p>
        )}

        {storeConfig.mode === "preview" ? (
          /* MODO PREVIEW / REGISTRO PREVIO CON ESTÉTICA EDITORIAL */
          <div className="mt-6 border-l-2 border-[#6b5b7b]/40 bg-[#faf8f5] p-5 rounded-r-md border border-t-0 border-r-0 border-b-0 border-[#6b5b7b]/15 shadow-sm space-y-3">
            <span className="text-[0.65rem] font-mono tracking-[0.18em] text-[#6b5b7b] uppercase block">
              REGISTRO PREVIO
            </span>
            <h3 className="font-serif text-[#423b32] text-sm sm:text-base font-normal">
              Este pack forma parte de la primera tanda.
            </h3>
            <p className="text-xs text-[#6b6257] leading-relaxed font-sans font-light">
              Todavía no está disponible para comprar. Si te interesa, dejá tu correo y te avisamos apenas se abra la preventa.
            </p>
            <button
              type="button"
              onClick={() => setModalAbierto(true)}
              className="w-full py-3 bg-[#6b5b7b] hover:bg-[#584967] text-[#faf8f5] text-xs font-mono tracking-[0.12em] uppercase rounded transition-all duration-200 mt-2 cursor-pointer shadow-sm active:scale-[0.99]"
            >
              ANOTAR ESTE PACK
            </button>
            <p className="text-[0.68rem] text-[#8c8275]/80 font-sans text-center pt-0.5">
              Esto no genera una compra ni reserva una unidad.
            </p>
          </div>
        ) : (
          /* MODO NORMAL / CARRITO */
          <div className="mt-6 flex items-center gap-3">
            {/* Control de cantidad */}
            <div className="flex items-center rounded border border-[#6b5b7b]/20 bg-white/80 shadow-sm">
              <button
                type="button"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="px-3 py-2 font-mono text-xs text-[#544660] hover:bg-[#6b5b7b]/10 transition-colors cursor-pointer rounded-l"
              >
                -
              </button>
              <span className="px-3 font-mono text-xs text-[#423b32]">{cantidad}</span>
              <button
                type="button"
                onClick={() => setCantidad((c) => c + 1)}
                className="px-3 py-2 font-mono text-xs text-[#544660] hover:bg-[#6b5b7b]/10 transition-colors cursor-pointer rounded-r"
              >
                +
              </button>
            </div>

            {/* Botón principal */}
            <button
              type="button"
              onClick={handleAgregar}
              className="flex-1 rounded py-3 px-5 font-mono text-xs uppercase tracking-[0.12em] text-[#faf8f5] bg-[#6b5b7b] hover:bg-[#584967] transition-all duration-200 shadow-sm cursor-pointer text-center active:scale-[0.99]"
            >
              Agregar al carrito
            </button>
          </div>
        )}
      </div>

      {/* Modal de Registro de Interés configurado en modo preview */}
      <InterestModal
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
        productoNombre={producto.nombre}
        modo="preview"
      />
    </>
  );
}