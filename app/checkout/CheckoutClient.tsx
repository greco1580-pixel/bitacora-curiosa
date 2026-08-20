"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { productos } from "@/data/products";
import { formatoARS } from "@/lib/format";
import { PROVINCIAS_ARGENTINA, calcularCostoEnvio } from "@/lib/shipping";
import { RETIRO_PUNTO } from "@/lib/commerce-config";

type MetodoEntrega = "ENVIO" | "RETIRO";

interface RespuestaCheckoutOk {
  pedidoId: string;
  referenciaExterna: string;
  subtotal: number;
  costoEnvio: number;
  total: number;
  mensaje: string;
  initPoint?: string;
  mercadoPagoConfigurado: boolean;
}

interface RespuestaCheckoutError {
  error: string;
  detalles?: unknown;
  requiereCoordinacionManual?: boolean;
}

export default function CheckoutClient() {
  const { items, vaciarCarrito, cargado } = useCart() as any;

  const subtotal = (items || []).reduce((acc: number, item: any) => {
    const prod = productos.find((p) => p.id === (item.productoId || item.id));
    return acc + (prod ? prod.precio * item.cantidad : 0);
  }, 0);

  const [metodoEntrega, setMetodoEntrega] = useState<MetodoEntrega>("ENVIO");
  const [provincia, setProvincia] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coordinacionManual, setCoordinacionManual] = useState(false);
  const [resultado, setResultado] = useState<RespuestaCheckoutOk | null>(null);

  const costoEnvioEstimado = useMemo(() => {
    if (metodoEntrega === "RETIRO") return 0;
    if (!provincia) return null;
    return calcularCostoEnvio(provincia);
  }, [metodoEntrega, provincia]);

  async function manejarEnvio(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError(null);
    setCoordinacionManual(false);
    setEnviando(true);

    const formData = new FormData(evento.currentTarget);
    const cuerpo = {
      items: (items || []).map((i: any) => ({
        productoId: i.productoId || i.id,
        varianteId: i.varianteId,
        cantidad: i.cantidad
      })),
      metodoEntrega,
      datosComprador: {
        nombre: String(formData.get("nombre") || ""),
        apellido: String(formData.get("apellido") || ""),
        email: String(formData.get("email") || ""),
        telefono: String(formData.get("telefono") || ""),
        dni: String(formData.get("dni") || "") || undefined
      },
      datosEnvio:
        metodoEntrega === "ENVIO"
          ? {
              provincia,
              localidad: String(formData.get("localidad") || ""),
              codigoPostal: String(formData.get("codigoPostal") || ""),
              direccion: String(formData.get("direccion") || ""),
              numero: String(formData.get("numero") || ""),
              pisoDepto: String(formData.get("pisoDepto") || "") || undefined,
              indicaciones: String(formData.get("indicaciones") || "") || undefined
            }
          : undefined
    };

    try {
      const respuesta = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo)
      });
      const datos = (await respuesta.json()) as RespuestaCheckoutOk | RespuestaCheckoutError;

      if (!respuesta.ok) {
        const err = datos as RespuestaCheckoutError;
        if (err.requiereCoordinacionManual) {
          setCoordinacionManual(true);
        }
        setError(err.error || "No se pudo procesar el pedido.");
        return;
      }

      const ok = datos as RespuestaCheckoutOk;
      vaciarCarrito();

      if (ok.initPoint) {
        window.location.href = ok.initPoint;
        return;
      }

      setResultado(ok);
    } catch {
      setError("Hubo un problema de conexión. Probá de nuevo en un momento.");
    } finally {
      setEnviando(false);
    }
  }

  if (resultado) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-beigeLine bg-paper p-8 shadow-sm text-center">
          <p className="entry-label mb-2 uppercase text-xs tracking-wider text-grisCalido font-medium">
            Pedido registrado
          </p>
          <h1 className="mb-4 font-serif text-3xl text-negroSuave">
            ¡Gracias, ya recibimos tu pedido!
          </h1>
          <p className="font-sans text-sm text-grisCalido mb-2">
            Número de referencia:{" "}
            <span className="font-mono font-semibold text-negroSuave bg-beige/50 px-2.5 py-1 rounded-md border border-beigeLine/60">
              {resultado.referenciaExterna}
            </span>
          </p>
          <p className="mt-4 font-sans text-sm text-grisCalido max-w-prose mx-auto leading-relaxed">
            {resultado.mensaje}
          </p>
          <Link
            href="/tienda"
            className="mt-8 inline-block rounded-xl bg-negroSuave px-8 py-3.5 font-sans text-sm font-medium text-paper hover:bg-tierraDark transition-colors shadow-sm"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  if (cargado && items?.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-beigeLine bg-paper p-10 shadow-sm">
          <p className="font-serif text-2xl text-negroSuave mb-2">Tu carrito está vacío</p>
          <p className="font-sans text-sm text-grisCalido mb-8">Elegí tus productos favoritos para continuar.</p>
          <Link
            href="/tienda"
            className="inline-block rounded-xl bg-negroSuave px-8 py-3.5 font-sans text-sm font-medium text-paper hover:bg-tierraDark transition-colors shadow-sm"
          >
            Ver tienda
          </Link>
        </div>
      </div>
    );
  }

  const total = subtotal + (costoEnvioEstimado ?? 0);

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="entry-label mb-1 text-xs uppercase tracking-widest text-grisCalido font-medium">
          Último paso
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-negroSuave">Checkout</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={manejarEnvio} className="flex flex-col gap-6" noValidate>
          {/* Tus Datos */}
          <fieldset className="rounded-2xl border border-beigeLine bg-paper p-6 sm:p-8 shadow-sm flex flex-col gap-5">
            <legend className="font-serif text-xl text-negroSuave px-2">Tus datos</legend>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="nombre" label="Nombre" required />
              <Campo id="apellido" label="Apellido" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="email" label="Email" type="email" required />
              <Campo id="telefono" label="Teléfono" type="tel" required />
            </div>

            <Campo id="dni" label="DNI (opcional)" />
          </fieldset>

          {/* Entrega */}
          <fieldset className="rounded-2xl border border-beigeLine bg-paper p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <legend className="font-serif text-xl text-negroSuave px-2">Entrega</legend>
            
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Método de entrega">
              <label 
                className={`flex items-center justify-center gap-2.5 rounded-xl border p-4 cursor-pointer font-sans text-sm font-medium transition-all ${
                  metodoEntrega === "ENVIO"
                    ? "border-negroSuave bg-beige/40 text-negroSuave shadow-sm"
                    : "border-beigeLine bg-paper text-grisCalido hover:border-beigeLine/80"
                }`}
              >
                <input
                  type="radio"
                  name="metodoEntrega"
                  checked={metodoEntrega === "ENVIO"}
                  onChange={() => setMetodoEntrega("ENVIO")}
                  className="accent-negroSuave"
                />
                Envío a domicilio
              </label>

              <label 
                className={`flex items-center justify-center gap-2.5 rounded-xl border p-4 cursor-pointer font-sans text-sm font-medium transition-all ${
                  metodoEntrega === "RETIRO"
                    ? "border-negroSuave bg-beige/40 text-negroSuave shadow-sm"
                    : "border-beigeLine bg-paper text-grisCalido hover:border-beigeLine/80"
                }`}
              >
                <input
                  type="radio"
                  name="metodoEntrega"
                  checked={metodoEntrega === "RETIRO"}
                  onChange={() => setMetodoEntrega("RETIRO")}
                  className="accent-negroSuave"
                />
                Retiro sin cargo
              </label>
            </div>

            {metodoEntrega === "RETIRO" ? (
              <div className="rounded-xl border border-beigeLine bg-beige/30 p-4 font-sans text-sm text-grisCalido leading-relaxed">
                <span className="font-medium text-negroSuave">Punto de retiro: </span>
                {RETIRO_PUNTO.descripcion}. Coordinamos el horario de retiro por email tras la confirmación de la compra.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="provincia" className="mb-1.5 block font-sans text-xs uppercase tracking-wider font-medium text-grisCalido">
                    Provincia
                  </label>
                  <select
                    id="provincia"
                    name="provincia"
                    required
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    className="w-full rounded-xl border border-beigeLine bg-paper px-3.5 py-2.5 font-sans text-sm text-negroSuave focus:border-negroSuave focus:outline-none transition-colors"
                  >
                    <option value="">Elegí una provincia</option>
                    {PROVINCIAS_ARGENTINA.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Campo id="localidad" label="Localidad" required />
                  <Campo id="codigoPostal" label="Código postal" required />
                </div>

                <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
                  <Campo id="direccion" label="Dirección" required />
                  <Campo id="numero" label="Número" required />
                </div>

                <Campo id="pisoDepto" label="Piso / depto (opcional)" />
                <Campo id="indicaciones" label="Indicaciones de entrega (opcional)" />

                {provincia && costoEnvioEstimado === null && (
                  <div className="rounded-xl border border-beigeLine bg-beige/30 p-4 font-sans text-sm text-grisCalido leading-relaxed">
                    Aún no disponemos de una tarifa automática para {provincia}. Coordinaremos el costo final de envío por email.
                  </div>
                )}
              </div>
            )}
          </fieldset>

          {error && (
            <div role="alert" className="rounded-xl border border-tierra/30 bg-tierra/5 p-4 font-sans text-sm text-tierraDark">
              {error}
              {coordinacionManual && " Completá tus datos igual: te vamos a escribir para coordinar."}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-xl bg-negroSuave py-4 font-sans text-sm font-medium text-paper hover:bg-tierraDark transition-colors shadow-sm disabled:opacity-60"
            >
              {enviando ? "Procesando..." : "PAGAR AHORA"}
            </button>
            <p className="font-sans text-xs text-center text-grisCalido leading-relaxed">
              Serás redirigido a Mercado Pago para completar tu compra de forma segura.
            </p>
          </div>
        </form>

        {/* Resumen */}
        <aside className="h-fit rounded-2xl border border-beigeLine bg-paper p-6 sm:p-8 shadow-sm sticky top-6">
          <h2 className="font-serif text-xl text-negroSuave pb-4 border-b border-beigeLine">Resumen de compra</h2>
          
          <ul className="mt-4 flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
            {(items || []).map((item: any) => {
              const producto = productos.find((p) => p.id === (item.productoId || item.id));
              if (!producto) return null;
              return (
                <li
                  key={`${item.productoId || item.id}-${item.varianteId ?? ""}`}
                  className="flex justify-between items-center font-sans text-sm"
                >
                  <span className="text-grisCalido font-medium truncate max-w-[200px]">
                    {producto.nombre} <span className="text-xs text-grisCalido/80">× {item.cantidad}</span>
                  </span>
                  <span className="font-mono text-negroSuave text-xs">
                    {formatoARS(producto.precio * item.cantidad)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex justify-between border-t border-beigeLine pt-4 font-sans text-sm text-grisCalido">
            <span>Subtotal</span>
            <span className="font-mono text-negroSuave">{formatoARS(subtotal)}</span>
          </div>

          <div className="mt-2.5 flex justify-between font-sans text-sm text-grisCalido">
            <span>Envío</span>
            <span className="font-mono text-negroSuave">
              {costoEnvioEstimado === null ? "A coordinar" : formatoARS(costoEnvioEstimado)}
            </span>
          </div>

          <div className="mt-5 flex justify-between border-t border-beigeLine pt-4 font-sans text-lg font-medium text-negroSuave">
            <span>Total</span>
            <span className="font-mono">{formatoARS(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Campo({
  id,
  label,
  type = "text",
  required = false
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-sans text-xs uppercase tracking-wider font-medium text-grisCalido">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-xl border border-beigeLine bg-paper px-3.5 py-2.5 font-sans text-sm text-negroSuave focus:border-negroSuave focus:outline-none transition-colors"
      />
    </div>
  );
}