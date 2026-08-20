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

  // Cálculo de subtotal evitando $ NaN
  const subtotal = items.reduce((acc, item) => {
    const precio = item.producto?.precio || 0;
    return acc + precio * item.cantidad;
  }, 0);

  const costoEnvioActual = tipoEntrega === "envio" && items.length > 0 ? COSTO_ENVIO : 0;
  const total = subtotal + costoEnvioActual;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
      <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#6e655a", textTransform: "uppercase" }}>
        Último paso
      </p>
      <h1 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "2.2rem", color: "#2a241c", marginBottom: "30px" }}>
        Checkout
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "40px" }}>
        {/* Formulario */}
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Datos Personales */}
          <div>
            <h2 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "1.2rem", color: "#2a241c", marginBottom: "16px" }}>
              Tus datos
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>Nombre</label>
                <input type="text" required style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>Apellido</label>
                <input type="text" required style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>Email</label>
                <input type="email" required style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>Teléfono</label>
                <input type="tel" required style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>DNI (opcional)</label>
              <input type="text" style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }} />
            </div>
          </div>

          <hr style={{ borderColor: "#d9cba3", margin: "10px 0" }} />

          {/* Forma de Entrega */}
          <div>
            <h2 style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: "1.2rem", color: "#2a241c", marginBottom: "16px" }}>
              Entrega
            </h2>

            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.9rem" }}>
                <input
                  type="radio"
                  name="entrega"
                  checked={tipoEntrega === "envio"}
                  onChange={() => setTipoEntrega("envio")}
                />
                Envío a domicilio
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.9rem" }}>
                <input
                  type="radio"
                  name="entrega"
                  checked={tipoEntrega === "retiro"}
                  onChange={() => setTipoEntrega("retiro")}
                />
                Retiro sin cargo
              </label>
            </div>

            {/* Dirección de Envío */}
            {tipoEntrega === "envio" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>Provincia</label>
                  <select style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }}>
                    <option value="">Elegí una provincia</option>
                    {PROVINCIAS.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>Localidad</label>
                    <input type="text" required style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>Código postal</label>
                    <input type="text" required style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>Dirección</label>
                    <input type="text" required style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>Número</label>
                    <input type="text" required style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px" }}>Piso / depto (opcional)</label>
                  <input type="text" style={{ width: "100%", padding: "10px", border: "1px solid #d9cba3", borderRadius: "4px", backgroundColor: "#fbf9f5" }} />
                </div>
              </div>
            ) : (
              /* Punto de Retiro Detallado */
              <div style={{ border: "1px dashed #d9cba3", padding: "16px", borderRadius: "6px", backgroundColor: "#fbf9f5", color: "#2a241c" }}>
                <p style={{ margin: "0 0 6px 0", fontWeight: 600 }}>Punto de retiro en Villa Bosch:</p>
                <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem", color: "#555" }}>Showroom</p>
                <p style={{ margin: "0 0 10px 0", fontSize: "0.85rem", color: "#6e655a" }}>Horarios de atención: Lunes a Viernes de 10:00 a 18:00 hs.</p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#556b2f", fontWeight: 600 }}>
                  Te enviaremos la dirección exacta por email una vez confirmado el pago.
                </p>
              </div>
            )}
          </div>
        </form>

        {/* Resumen de Compra */}
        <div style={{ backgroundColor: "#fbf9f5", border: "1px solid #d9cba3", padding: "24px", borderRadius: "8px", height: "fit-content" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces, serif)", margin: "0 0 20px 0", fontSize: "1.3rem" }}>
            Resumen
          </h2>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.95rem" }}>
            <span>Subtotal</span>
            <strong>{formatoARS(subtotal)}</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.95rem" }}>
            <span>Envío</span>
            <strong>{tipoEntrega === "envio" ? formatoARS(costoEnvioActual) : "Gratis"}</strong>
          </div>

          <hr style={{ borderColor: "#d9cba3", margin: "16px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", fontSize: "1.2rem" }}>
            <strong>Total</strong>
            <strong>{formatoARS(total)}</strong>
          </div>

          <button
            type="button"
            style={{
              width: "100%",
              padding: "14px 0",
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
            Pagar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
