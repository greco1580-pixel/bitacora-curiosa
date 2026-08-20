"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatoARS } from "@/lib/format";

const ENVIO_ESTIMADO = 3500;

export default function CartDrawer() {
  const router = useRouter();
  const { items = [], isOpen, cerrarCarrito, eliminarDelCarrito, actualizarCantidad } = useCart();

  if (!isOpen) return null;

  // Calculamos el subtotal dinámicamente sumando items
  const subtotal = items.reduce((acc, item) => {
    const precio = item.producto?.precio || 0;
    return acc + precio * item.cantidad;
  }, 0);

  const envio = items.length > 0 ? ENVIO_ESTIMADO : 0;
  const total = subtotal + envio;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
      }}
      onClick={cerrarCarrito}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "100%",
          backgroundColor: "#fbf9f5",
          padding: "24px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowY: "auto"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces, serif)", margin: 0, color: "#2a241c" }}>Tu Carrito</h2>
            <button
              onClick={cerrarCarrito}
              style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#2a241c" }}
            >
              ✕
            </button>
          </div>

          {items.length === 0 ? (
            <p style={{ color: "#6e655a", fontFamily: "var(--font-mono, monospace)", fontSize: "0.9rem" }}>
              El carrito está vacío.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: "1px solid #d9cba3",
                    paddingBottom: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, color: "#2a241c" }}>
                      {item.producto?.nombre || item.producto?.name || "Producto"}
                    </p>
                    <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "#6e655a" }}>
                      {formatoARS(item.producto?.precio || 0)}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={() => actualizarCantidad(index, item.cantidad - 1)}
                      style={{ padding: "2px 8px", cursor: "pointer" }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: "0.9rem", fontFamily: "var(--font-mono, monospace)" }}>
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => actualizarCantidad(index, item.cantidad + 1)}
                      style={{ padding: "2px 8px", cursor: "pointer" }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => eliminarDelCarrito(index)}
                      style={{ color: "#a00", background: "none", border: "none", cursor: "pointer", marginLeft: "8px" }}
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
          <div style={{ borderTop: "2px solid #d9cba3", paddingTop: "16px", marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
              <span>Subtotal:</span>
              <strong>{formatoARS(subtotal)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
              <span>Envío estimado:</span>
              <strong>{formatoARS(envio)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "1.1rem" }}>
              <strong>Total:</strong>
              <strong>{formatoARS(total)}</strong>
            </div>

            <button
              onClick={() => {
                cerrarCarrito();
                router.push("/carrito");
              }}
              style={{
                width: "100%",
                padding: "12px 0",
                backgroundColor: "#8A9A7B",
                color: "#f7f3ea",
                border: "none",
                borderRadius: "4px",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
            >
              Iniciar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}