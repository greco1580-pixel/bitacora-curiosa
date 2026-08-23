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
      className="fixed inset-0 z-[9999] flex justify-end bg-black/30 backdrop-blur-[2px] transition-opacity"
      onClick={cerrarCarrito}
    >
      <div
        className="w-full max-w-[380px] sm:max-w-[420px] h-full bg-surface/95 border-l border-line/40 p-6 flex flex-col justify-between overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-line/30">
            <h2 className="font-serif text-xl text-ink/85 font-normal">Tu Carrito</h2>
            <button
              onClick={cerrarCarrito}
              className="text-muted/70 hover:text-ink text-base transition-colors p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {items.length === 0 ? (
            <p className="font-sans text-xs text-muted/80 font-light py-8 text-center">
              El carrito está vacío.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-line/30 pb-3 flex justify-between items-center gap-2"
                >
                  <div>
                    <p className="font-serif text-sm text-ink/85 font-normal leading-snug">
                      {item.producto?.nombre || item.producto?.name || "Producto"}
                    </p>
                    <p className="font-sans text-xs text-muted/80 font-light mt-1">
                      {formatoARS(item.producto?.precio || 0)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-lg border border-line/40 bg-surface/80">
                      <button
                        onClick={() => actualizarCantidad(index, item.cantidad - 1)}
                        className="px-2 py-0.5 font-sans text-xs text-ink/70 hover:text-ink transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-sans text-xs font-medium text-ink/80">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => actualizarCantidad(index, item.cantidad + 1)}
                        className="px-2 py-0.5 font-sans text-xs text-ink/70 hover:text-ink transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => eliminarDelCarrito(index)}
                      className="font-sans text-xs text-red-800/50 hover:text-red-700 transition-colors ml-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line/40 pt-4 mt-6 space-y-3">
            <div className="flex justify-between items-center font-sans text-xs text-muted/80 font-light">
              <span>Subtotal</span>
              <span className="font-medium text-ink/80">{formatoARS(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center font-sans text-xs text-muted/80 font-light">
              <span>Envío</span>
              <span className="font-medium text-ink/80">A calcular en checkout</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-line/20">
              <span className="font-sans text-xs font-medium uppercase tracking-wider text-ink/80">
                Total
              </span>
              <span className="font-serif text-base text-ink/90 font-medium">
                {formatoARS(subtotal)}
              </span>
            </div>

            <button
              onClick={() => {
                cerrarCarrito();
                router.push("/carrito");
              }}
              className="w-full bg-olive/85 hover:bg-olive text-white py-3 rounded-lg font-sans text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer mt-2"
            >
              Iniciar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}