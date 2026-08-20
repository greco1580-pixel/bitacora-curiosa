"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatoARS } from "@/lib/format";

const ENVIO_ESTIMADO = 3500;

export default function CarritoPage() {
  const { items = [], eliminarDelCarrito, actualizarCantidad, limpiarCarrito } = useCart();

  // Cálculo del subtotal
  const subtotal = items.reduce((acc, item) => {
    const precio = item.producto?.precio || 0;
    return acc + precio * item.cantidad;
  }, 0);

  const envio = items.length > 0 ? ENVIO_ESTIMADO : 0;
  const total = subtotal + envio;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "2rem", color: "#2a241c", marginBottom: "30px" }}>
        Carrito de Compras
      </h1>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontFamily: "var(--font-mono, monospace)", color: "#6e655a", marginBottom: "20px" }}>
            Tu carrito está vacío.
          </p>
          <Link
            href="/tienda"
            style={{
              padding: "12px 24px",
              backgroundColor: "#556b2f",
              color: "#f7f3ea",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "40px" }}>
          {/* Listado de Productos */}
          <div>
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #d9cba3",
                  padding: "16px 0"
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontFamily: "var(--font-fraunces, serif)", color: "#2a241c" }}>
                    {item.producto?.nombre || item.producto?.name || "Producto"}
                  </h3>
                  <p style={{ margin: 0, fontFamily: "var(--font-mono, monospace)", color: "#6e655a" }}>
                    {formatoARS(item.producto?.precio || 0)}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={() => actualizarCantidad(index, item.cantidad - 1)}
                    style={{ padding: "4px 10px", cursor: "pointer" }}
                  >
                    -
                  </button>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontWeight: 600 }}>
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => actualizarCantidad(index, item.cantidad + 1)}
                    style={{ padding: "4px 10px", cursor: "pointer" }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => eliminarDelCarrito(index)}
                    style={{ color: "#a00", background: "none", border: "none", cursor: "pointer", marginLeft: "12px" }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={limpiarCarrito}
              style={{
                marginTop: "20px",
                background: "none",
                border: "none",
                color: "#6e655a",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "0.85rem"
              }}
            >
              Vaciar carrito
            </button>
          </div>

          {/* Resumen de Compra */}
          <div style={{ backgroundColor: "#fbf9f5", border: "1px solid #d9cba3", padding: "24px", borderRadius: "8px", height: "fit-content" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces, serif)", margin: "0 0 20px 0", fontSize: "1.3rem" }}>
              Resumen
            </h2>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Subtotal</span>
              <strong>{formatoARS(subtotal)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Envío</span>
              <strong>{formatoARS(envio)}</strong>
            </div>

            <hr style={{ borderColor: "#d9cba3", margin: "16px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "1.2rem" }}>
              <strong>Total</strong>
              <strong>{formatoARS(total)}</strong>
            </div>

            <Link
              href="/checkout"
              style={{
                display: "block",
                textAlign: "center",
                width: "100%",
                padding: "14px 0",
                backgroundColor: "#8A9A7B",
                color: "#f7f3ea",
                textDecoration: "none",
                borderRadius: "4px",
                fontWeight: 600,
                boxSizing: "border-box"
              }}
            >
              Finalizar Compra
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}