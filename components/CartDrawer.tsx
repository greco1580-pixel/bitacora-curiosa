"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatoARS } from "@/lib/format";

export default function CartDrawer() {
  const router = useRouter();
  const { items = [], isOpen, cerrarCarrito, eliminarDelCarrito, actualizarCantidad } = useCart();

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => {
    const precio = item.producto?.precio || 0;
    return acc + precio * item.cantidad;
  }, 0);

  return (
    <div
      className="fixed inset-0 z-[9999] flex justify-end bg-[#2d2926]/40 backdrop-blur-[2px] transition-opacity"
      onClick={cerrarCarrito}
    >
      <div
        className="w-full max-w-[380px] sm:max-w-[420px] h-full bg-[#faf8f5] border-l border-[#6b5b7b]/20 p-6 md:p-7 flex flex-col justify-between overflow-y-auto shadow-2xl relative"
        style={{
          backgroundImage: "radial-gradient(#6b5b7b 0.4px, transparent 0.4px)",
          backgroundSize: "12px 12px",
          backgroundColor: "#faf8f5",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header del Carrito */}
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#6b5b7b]/15">
            <div>
              <span className="text-[0.65rem] font-mono uppercase tracking-[0.18em] text-[#6b5b7b] block">
                CURIOSIDADES SELECCIONADAS
              </span>
              <h2 className="font-serif text-xl text-[#423b32] font-normal leading-tight">
                Tu Carrito
              </h2>
            </div>
            <button
              onClick={cerrarCarrito}
              className="text-[#8c8275]/50 hover:text-[#423b32] transition-colors p-1 font-mono text-xs cursor-pointer"
              aria-label="Cerrar carrito"
            >
              ✕
            </button>
          </div>

          {/* Carrito Vacío */}
          {items.length === 0 ? (
            <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
              <span className="text-[0.65rem] font-mono uppercase tracking-[0.18em] text-[#6b5b7b]/80 mb-2">
                SIN SELECCIÓN
              </span>
              <h4 className="font-serif text-lg text-[#423b32] mb-2 font-normal">
                Todavía no elegiste ninguna curiosidad
              </h4>
              <p className="font-sans text-xs text-[#6b6257] leading-relaxed max-w-xs mb-6">
                Explorá nuestra selección de objetos para dar con ese pequeño hallazgo diario.
              </p>
              <button
                onClick={cerrarCarrito}
                className="px-5 py-2 rounded border border-[#6b5b7b]/30 text-[#6b5b7b] hover:bg-[#6b5b7b]/5 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                IR A EXPLORAR
              </button>
            </div>
          ) : (
            /* Lista de Ítems */
            <div className="flex flex-col gap-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-[#6b5b7b]/15 pb-4 flex justify-between items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-[#423b32] font-normal leading-snug truncate">
                      {item.producto?.nombre || item.producto?.name || "Producto"}
                    </p>
                    <p className="font-sans text-xs text-[#6b6257] mt-1">
                      {formatoARS(item.producto?.precio || 0)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Controles de cantidad */}
                    <div className="flex items-center rounded border border-[#6b5b7b]/20 bg-white/80 shadow-sm">
                      <button
                        onClick={() => actualizarCantidad(index, item.cantidad - 1)}
                        className="px-2.5 py-1 font-mono text-xs text-[#544660] hover:bg-[#6b5b7b]/10 transition-colors cursor-pointer rounded-l"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono text-xs text-[#423b32]">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => actualizarCantidad(index, item.cantidad + 1)}
                        className="px-2.5 py-1 font-mono text-xs text-[#544660] hover:bg-[#6b5b7b]/10 transition-colors cursor-pointer rounded-r"
                      >
                        +
                      </button>
                    </div>

                    {/* Eliminar ítem */}
                    <button
                      onClick={() => eliminarDelCarrito(index)}
                      className="text-[#8c8275]/50 hover:text-[#9e4a4a] transition-colors p-1 font-mono text-xs cursor-pointer"
                      title="Quitar objeto"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer del Carrito */}
        {items.length > 0 && (
          <div className="border-t border-[#6b5b7b]/20 pt-5 mt-6 space-y-3">
            <div className="flex justify-between items-center font-sans text-xs text-[#6b6257]">
              <span>Subtotal</span>
              <span className="font-medium text-[#423b32]">{formatoARS(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center font-sans text-xs text-[#6b6257]">
              <span>Envío</span>
              <span className="text-[#8c8275]/80 italic">A calcular en checkout</span>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#6b5b7b]/15">
              <span className="font-mono text-xs uppercase tracking-wider text-[#6b5b7b]">
                Total
              </span>
              <span className="font-serif text-lg text-[#423b32] font-medium">
                {formatoARS(subtotal)}
              </span>
            </div>

            <button
              onClick={() => {
                cerrarCarrito();
                router.push("/carrito");
              }}
              className="w-full bg-[#6b5b7b] hover:bg-[#584967] text-[#faf8f5] py-3 rounded text-xs font-mono uppercase tracking-[0.12em] transition-all duration-200 shadow-sm active:scale-[0.99] cursor-pointer mt-3"
            >
              INICIAR COMPRA
            </button>
          </div>
        )}
      </div>
    </div>
  );
}