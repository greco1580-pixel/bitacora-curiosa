"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatoARS } from "@/lib/format";

export default function CarritoPage() {
  const { items = [], eliminarDelCarrito, actualizarCantidad, limpiarCarrito } = useCart();

  const subtotal = items.reduce((acc, item) => {
    const precio = item.producto?.precio || 0;
    return acc + precio * item.cantidad;
  }, 0);

  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="font-serif text-2xl sm:text-3xl text-ink/85 font-normal mb-8">
        Carrito de Compras
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="font-sans text-sm text-muted/80 font-light">
            Tu carrito está vacío.
          </p>
          <Link
            href="/tienda"
            className="inline-block bg-olive/85 hover:bg-olive text-white px-6 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
          >
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 border-b border-line/30 pb-4 pt-2"
              >
                <div className="flex-1 min-w-[180px]">
                  <h3 className="font-serif text-base text-ink/85 font-normal leading-snug">
                    {item.producto?.nombre || item.producto?.name || "Producto"}
                  </h3>
                  <p className="font-sans text-xs text-muted/80 font-light mt-1">
                    {formatoARS(item.producto?.precio || 0)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-line/40 bg-surface/80">
                    <button
                      type="button"
                      onClick={() => actualizarCantidad(index, item.cantidad - 1)}
                      className="px-2.5 py-1 font-sans text-xs text-ink/70 hover:text-ink transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2 font-sans text-xs font-medium text-ink/80">
                      {item.cantidad}
                    </span>
                    <button
                      type="button"
                      onClick={() => actualizarCantidad(index, item.cantidad + 1)}
                      className="px-2.5 py-1 font-sans text-xs text-ink/70 hover:text-ink transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => eliminarDelCarrito(index)}
                    className="font-sans text-xs text-red-800/60 hover:text-red-700 transition-colors ml-2 cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={limpiarCarrito}
              className="mt-4 font-sans text-xs text-muted/70 hover:text-ink underline transition-colors cursor-pointer"
            >
              Vaciar carrito
            </button>
          </div>

          <div className="lg:col-span-5 bg-surface/50 border border-line/40 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="font-serif text-lg text-ink/85 font-normal pb-2 border-b border-line/30">
              Resumen
            </h2>

            <div className="space-y-2.5 font-sans text-xs text-muted/80">
              <div className="flex justify-between items-center">
                <span className="font-light">Subtotal</span>
                <span className="font-medium text-ink/80">{formatoARS(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-light">Envío</span>
                <span className="font-medium text-ink/80">A calcular en checkout</span>
              </div>
            </div>

            <div className="pt-3 border-t border-line/30 flex justify-between items-center">
              <span className="font-sans text-xs font-medium text-ink/80 uppercase tracking-wider">
                Total
              </span>
              <span className="font-serif text-lg text-ink/90 font-medium">
                {formatoARS(subtotal)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-olive/85 hover:bg-olive text-white text-center py-3 rounded-lg font-sans text-xs uppercase tracking-wider transition-all duration-200 shadow-sm mt-4"
            >
              Finalizar Compra
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}