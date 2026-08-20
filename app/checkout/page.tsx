"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatoARS } from "@/lib/format";

const PROVINCIAS = [
  "Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán"
];

const COSTO_ENVIO = 3500;

export default function CheckoutPage() {
  const { items = [] } = useCart();
  const [tipoEntrega, setTipoEntrega] = useState<"envio" | "retiro">("envio");

  const subtotal = items.reduce((acc, item) => {
    const precio = item.producto?.precio || 0;
    return acc + precio * item.cantidad;
  }, 0);

  const costoEnvioActual = tipoEntrega === "envio" && items.length > 0 ? COSTO_ENVIO : 0;
  const total = subtotal + costoEnvioActual;

  const styleInput = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e3dcce",
    borderRadius: "8px",
    backgroundColor: "#faf8f4",
    color: "#3a342c",
    fontSize: "0.88rem",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "all 0.2s ease"
  };

  const styleLabel = {
    display: "block",
    fontSize: "0.82rem",
    marginBottom: "6px",
    color: "#7a7266",
    fontWeight: 400
  };

  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 20px" }}>
      <p style={{ fontSize: "0.72rem", letterSpacing: "0.12em", color: "#8c8275", textTransform: "uppercase", marginBottom: "4px" }}>
        Último paso
      </p>
      <h1 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "2.4rem", color: "#3a342c", marginBottom: "36px", fontWeight: 300, letterSpacing: "-0.01em" }}>
        Checkout
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "48px", alignItems: "start" }}>
        {/* Formulario Izquierda */}
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Datos Personales */}
          <div>
            <h2 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "1.25rem", color: "#3a342c", marginBottom: "18px", fontWeight: 400 }}>
              Tus datos
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={styleLabel}>Nombre</label>
                <input type="text" required style={styleInput} />
              </div>
              <div>
                <label style={styleLabel}>Apellido</label>
                <input type="text" required style={styleInput} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={styleLabel}>Email</label>
                <input type="email" required style={styleInput} />
              </div>
              <div>
                <label style={styleLabel}>Teléfono</label>
                <input type="tel" required style={styleInput} />
              </div>
            </div>

            <div>
              <label style={styleLabel}>DNI (opcional)</label>
              <input type="text" style={styleInput} />
            </div>
          </div>

          <hr style={{ borderColor: "#eae3d2", borderTop: "1px solid #eae3d2", borderBottom: "none", margin: "4px 0" }} />

          {/* Forma de Entrega */}
          <div>
            <h2 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "1.25rem", color: "#3a342c", marginBottom: "18px", fontWeight: 400 }}>
              Entrega
            </h2>

            <div style={{ display: "flex", gap: "28px", marginBottom: "22px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.88rem", color: "#3a342c" }}>
                <input
                  type="radio"
                  name="entrega"
                  checked={tipoEntrega === "envio"}
                  onChange={() => setTipoEntrega("envio")}
                  style={{ accentColor: "#8A9A7B", width: "16px", height: "16px" }}
                />
                Envío a domicilio
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.88rem", color: "#3a342c" }}>
                <input
                  type="radio"
                  name="entrega"
                  checked={tipoEntrega === "retiro"}
                  onChange={() => setTipoEntrega("retiro")}
                  style={{ accentColor: "#8A9A7B", width: "16px", height: "16px" }}
                />
                Retiro sin cargo
              </label>
            </div>

            {/* Campos de Dirección */}
            {tipoEntrega === "envio" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={styleLabel}>Provincia</label>
                  <select style={styleInput}>
                    <option value="">Elegí una provincia</option>
                    {PROVINCIAS.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={styleLabel}>Localidad</label>
                    <input type="text" required style={styleInput} />
                  </div>
                  <div>
                    <label style={styleLabel}>Código postal</label>
                    <input type="text" required style={styleInput} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={styleLabel}>Dirección</label>
                    <input type="text" required style={styleInput} />
                  </div>
                  <div>
                    <label style={styleLabel}>Número</label>
                    <input type="text" required style={styleInput} />
                  </div>
                </div>

                <div>
                  <label style={styleLabel}>Piso / depto (opcional)</label>
                  <input type="text" style={styleInput} />
                </div>
              </div>
            ) : (
              <div style={{ border: "1px dashed #dcd4c3", padding: "18px", borderRadius: "10px", backgroundColor: "#faf8f4", color: "#3a342c" }}>
                <p style={{ margin: "0 0 6px 0", fontWeight: 500, fontSize: "0.9rem" }}>Punto de retiro en Villa Bosch:</p>
                <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", color: "#6e655a" }}>Showroom</p>
                <p style={{ margin: "0 0 10px 0", fontSize: "0.82rem", color: "#8c8275" }}>Horarios de atención: Lunes a Viernes de 10:00 a 18:00 hs.</p>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7a5e", fontWeight: 500 }}>
                  Te enviaremos la dirección exacta por email una vez confirmado el pago.
                </p>
              </div>
            )}
          </div>
        </form>

        {/* Resumen de Compra - Réplica de la tarjeta del Carrito */}
        <div style={{
          backgroundColor: "#f4f1ea",
          border: "1px solid #e8e2d5",
          padding: "28px 24px",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.02)"
        }}>
          <h2 style={{
            fontFamily: "var(--font-fraunces, serif)",
            margin: "0 0 24px 0",
            fontSize: "1.35rem",
            color: "#3a342c",
            fontWeight: 400
          }}>
            Resumen
          </h2>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "0.85rem", color: "#8c8275" }}>
            <span>Subtotal</span>
            <span style={{ color: "#3a342c", fontWeight: 500 }}>{formatoARS(subtotal)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "0.85rem", color: "#8c8275" }}>
            <span>Envío</span>
            <span style={{ color: "#3a342c", fontWeight: 500 }}>{tipoEntrega === "envio" ? formatoARS(costoEnvioActual) : "Gratis"}</span>
          </div>

          <hr style={{ borderColor: "#e2dacd", borderTop: "1px solid #e2dacd", borderBottom: "none", margin: "16px 0 20px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px" }}>
            <span style={{ color: "#8c8275", fontWeight: 400, textTransform: "uppercase", fontSize: "0.78rem", letterSpacing: "0.08em" }}>TOTAL</span>
            <span style={{ color: "#2a241c", fontWeight: 500, fontFamily: "var(--font-fraunces, serif)", fontSize: "1.35rem" }}>{formatoARS(total)}</span>
          </div>

          <button
            type="button"
            style={{
              width: "100%",
              padding: "14px 0",
              backgroundColor: "#8A9A7B",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontWeight: 500,
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "0.75rem",
              boxShadow: "0 2px 6px rgba(138, 154, 123, 0.25)"
            }}
          >
            Pagar ahora
          </button>
        </div>
      </div>
    </div>
  );
}