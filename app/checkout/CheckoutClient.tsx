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
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <p className="entry-label mb-2 uppercase text-xs tracking-wider text-grisCalido">Pedido registrado</p>
        <h1 className="mb-4 font-serif text-3xl text-negroSuave">¡Gracias, ya recibimos tu pedido!</h1>
        <p className="font-sans text-sm text-grisCalido">
          Número de referencia: <span className="font-mono text-negroSuave">{resultado.referenciaExterna}</span>
        </p>
        <p className="mt-4 font-sans text-sm text-grisCalido max-w-prose">{resultado.mensaje}</p>
        <Link
          href="/tienda"
          className="mt-8 inline-block rounded-xl bg-[#93a085] px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  if (cargado && items?.length === 0) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-negroSuave mb-4">Tu carrito está vacío</h1>
        <Link
          href="/tienda"
          className="mt-4 inline-block rounded-xl bg-[#93a085] px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
        >
          Ver tienda
        </Link>
      </div>
    );
  }

  const total = subtotal + (costoEnvioEstimado ?? 0);

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="entry-label mb-1 text-xs uppercase tracking-widest text-grisCalido font-medium">
          Último paso
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-negroSuave">Checkout</h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <form onSubmit={manejarEnvio} className="flex flex-col gap-10" noValidate>
          {/* Tus Datos */}
          <section className="flex flex-col gap-5">
            <h2 className="font-serif text-2xl text-negroSuave">Tus datos</h2>
            
            <div className="grid gap-5 sm:grid-cols-2">
              <Campo id="nombre" label="Nombre" required />
              <Campo id="apellido" label="Apellido" required />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Campo id="email" label="Email" type="email" required />
              <Campo id="telefono" label="Teléfono" type="tel" required />
            </div>

            <Campo id="dni" label="DNI (opcional)" />
          </section>

          {/* Entrega */}
          <section className="flex flex-col gap-6 pt-4 border-t border-beigeLine/50">
            <h2 className="font-serif text-2xl text-negroSuave">Entrega</h2>
            
            <div className="flex gap-6 font-sans text-sm text-negroSuave" role="radiogroup" aria-label="Método de entrega">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="metodoEntrega"
                  checked={metodoEntrega === "ENVIO"}
                  onChange={() => setMetodoEntrega("ENVIO")}
                  className="accent-[#93a085]"
                />
                <span className={metodoEntrega === "ENVIO" ? "text-negroSuave font-medium" : "text-grisCalido"}>
                  Envío a domicilio
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="metodoEntrega"
                  checked={metodoEntrega === "RETIRO"}
                  onChange={() => setMetodoEntrega("RETIRO")}
                  className="accent-[#93a085]"
                />
                <span className={metodoEntrega === "RETIRO" ? "text-negroSuave font-medium" : "text-grisCalido"}>
                  Retiro sin cargo
                </span>
              </label>
            </div>

            {metodoEntrega === "RETIRO" ? (
              <p className="font-sans text-sm text-grisCalido py-2">
                Punto de retiro: <span className="text-negroSuave font-medium">{RETIRO_PUNTO.descripcion}</span>. Coordinamos el horario por email.
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="provincia" className="mb-1.5 block font-sans text-xs text-grisCalido">
                    Provincia
                  </label>
                  <select
                    id="provincia"
                    name="provincia"
                    required
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    className="w-full rounded-xl border border-beigeLine/80 bg-transparent px-3.5 py-2.5 font-sans text-sm text-negroSuave focus:border-[#93a085] focus:outline-none transition-colors"
                  >
                    <option value="">Elegí una provincia</option>
                    {PROVINCIAS_ARGENTINA.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Campo id="localidad" label="Localidad" required />
                  <Campo id="codigoPostal" label="Código postal" required />
                </div>

                <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
                  <Campo id="direccion" label="Dirección" required />
                  <Campo id="numero" label="Número" required />
                </div>

                <Campo id="pisoDepto" label="Piso / depto (opcional)" />
                <Campo id="indicaciones" label="Indicaciones de entrega (opcional)" />

                {provincia && costoEnvioEstimado === null && (
                  <p className="font-sans text-sm text-grisCalido py-2">
                    Aún no tenemos una tarifa calculada para {provincia}. Coordinamos el costo por email.
                  </p>
                )}
              </div>
            )}
          </section>

          {error && (
            <p role="alert" className="font-sans text-sm text-tierraDark">
              {error}
              {coordinacionManual && " Completá tus datos igual: te vamos a escribir para coordinar."}
            </p>
          )}

          <div className="lg:hidden">
            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-2xl bg-[#93a085] py-4 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {enviando ? "PROCESANDO..." : "PAGAR AHORA"}
            </button>
          </div>
        </form>

        {/* Resumen - Fiel al carrito */}
        <aside className="h-fit rounded-2xl border border-beigeLine/70 bg-[#f4f2eb]/60 p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-negroSuave mb-6">Resumen</h2>
          
          <ul className="flex flex-col gap-3 pb-6 border-b border-beigeLine/60">
            {(items || []).map((item: any) => {
              const producto = productos.find((p) => p.id === (item.productoId || item.id));
              if (!producto) return null;
              return (
                <li
                  key={`${item.productoId || item.id}-${item.varianteId ?? ""}`}
                  className="flex justify-between items-center font-sans text-sm"
                >
                  <span className="text-grisCalido">
                    {producto.nombre} <span className="text-xs text-grisCalido/70">× {item.cantidad}</span>
                  </span>
                  <span className="font-mono text-negroSuave text-sm">
                    {formatoARS(producto.precio * item.cantidad)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex justify-between font-sans text-sm text-grisCalido">
            <span>Subtotal</span>
            <span className="font-mono text-negroSuave">{formatoARS(subtotal)}</span>
          </div>

          <div className="mt-3 flex justify-between font-sans text-sm text-grisCalido pb-6 border-b border-beigeLine/60">
            <span>Envío</span>
            <span className="font-mono text-negroSuave">
              {costoEnvioEstimado === null ? "A coordinar" : formatoARS(costoEnvioEstimado)}
            </span>
          </div>

          <div className="mt-6 flex justify-between items-baseline font-sans text-negroSuave">
            <span className="text-xs uppercase tracking-wider text-grisCalido font-medium">TOTAL</span>
            <span className="font-serif text-2xl font-normal">{formatoARS(total)}</span>
          </div>

          <div className="mt-6 hidden lg:block">
            <button
              type="submit"
              onClick={(e) => {
                const form = document.querySelector("form");
                if (form) form.requestSubmit();
              }}
              disabled={enviando}
              className="w-full rounded-2xl bg-[#93a085] py-4 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {enviando ? "PROCESANDO..." : "PAGAR AHORA"}
            </button>
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
      <label htmlFor={id} className="mb-1.5 block font-sans text-xs text-grisCalido">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-xl border border-beigeLine/80 bg-transparent px-3.5 py-2.5 font-sans text-sm text-negroSuave focus:border-[#93a085] focus:outline-none transition-colors"
      />
    </div>
  );
}