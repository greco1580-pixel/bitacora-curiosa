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
    padding: "10px 12px",
    border: "1px solid #e5dfd3",
    borderRadius: "6px",
    backgroundColor: "#fbf9f5",
    color: "#3a342c",
    fontSize: "0.85rem",
    outline: "none",
    boxSizing: "border-box" as const
  };

  const styleLabel = {
    display: "block",
    fontSize: "0.82rem",
    marginBottom: "6px",
    color: "#6e655a",
    fontWeight: 400
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#8c8275", textTransform: "uppercase" }}>
        Último paso
      </p>
      <h1 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "2rem", color: "#3a342c", marginBottom: "32px", fontWeight: 400 }}>
        Checkout
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "40px" }}>
        {/* Formulario */}
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Datos Personales */}
          <div>
            <h2 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "1.15rem", color: "#3a342c", marginBottom: "16px", fontWeight: 400 }}>
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

          <hr style={{ borderColor: "#eae3d2", borderTop: "1px solid #eae3d2", borderBottom: "none", margin: "8px 0" }} />

          {/* Forma de Entrega */}
          <div>
            <h2 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "1.15rem", color: "#3a342c", marginBottom: "16px", fontWeight: 400 }}>
              Entrega
            </h2>

            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem", color: "#3a342c" }}>
                <input
                  type="radio"
                  name="entrega"
                  checked={tipoEntrega === "envio"}
                  onChange={() => setTipoEntrega("envio")}
                  style={{ accentColor: "#8c8275" }}
                />
                Envío a domicilio
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem", color: "#3a342c" }}>
                <input
                  type="radio"
                  name="entrega"
                  checked={tipoEntrega === "retiro"}
                  onChange={() => setTipoEntrega("retiro")}
                  style={{ accentColor: "#8c8275" }}
                />
                Retiro sin cargo
              </label>
            </div>

            {/* Dirección de Envío */}
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
              <div style={{ border: "1px dashed #dcd4c3", padding: "16px", borderRadius: "6px", backgroundColor: "#fbf9f5", color: "#3a342c" }}>
                <p style={{ margin: "0 0 6px 0", fontWeight: 500, fontSize: "0.88rem" }}>Punto de retiro en Villa Bosch:</p>
                <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", color: "#6e655a" }}>Showroom</p>
                <p style={{ margin: "0 0 10px 0", fontSize: "0.82rem", color: "#8c8275" }}>Horarios de atención: Lunes a Viernes de 10:00 a 18:00 hs.</p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#6e655a", fontWeight: 500 }}>
                  Te enviaremos la dirección exacta por email una vez confirmado el pago.
                </p>
              </div>
            )}
          </div>
        </form>

        {/* Resumen de Compra - Igual que CartDrawer */}
        <div style={{ backgroundColor: "#fbf9f5", border: "1px solid #e5dfd3", padding: "24px", borderRadius: "8px", height: "fit-content" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces, serif)", margin: "0 0 18px 0", fontSize: "1.2rem", color: "#3a342c", fontWeight: 400 }}>
            Resumen
          </h2>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.85rem", color: "#6e655a" }}>
            <span>Subtotal:</span>
            <span style={{ color: "#3a342c", fontWeight: 500 }}>{formatoARS(subtotal)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.85rem", color: "#6e655a" }}>
            <span>Envío:</span>
            <span style={{ color: "#3a342c", fontWeight 500 }}>{tipoEntrega === "envio" ? formatoARS(costoEnvioActual) : "Gratis"}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", margin: "14px 0 18px 0", paddingTop: "10px", borderTop: "1px solid #eae3d2", fontSize: "1rem" }}>
            <span style={{ color: "#3a342c", fontWeight: 600, textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.05em" }}>Total:</span>
            <span style={{ color: "#2a241c", fontWeight: 600, fontFamily: "var(--font-fraunces, serif)" }}>{formatoARS(total)}</span>
          </div>

          <button
            type="button"
            style={{
              width: "100%",
              padding: "12px 0",
              backgroundColor: "#2a241c",
              color: "#fbf9f5",
              border: "none",
              borderRadius: "8px",
              fontWeight: 500,
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.75rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}
          >
            Pagar ahora
          </button>
        </div>
      </div>
    </div>
  );
}