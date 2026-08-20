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
        <p className="entry-label mb-2 uppercase text-grisCalido">Pedido registrado</p>
        <h1 className="mb-4 font-serif text-3xl text-negroSuave">
          Gracias, ya tenemos tu pedido.
        </h1>
        <p className="max-w-prose font-sans text-sm text-grisCalido">
          Número de referencia: <span className="font-mono text-negroSuave">{resultado.referenciaExterna}</span>
        </p>
        <p className="mt-4 max-w-prose font-sans text-sm text-grisCalido">
          {resultado.mensaje}
        </p>
        <Link
          href="/tienda"
          className="mt-8 inline-block rounded bg-negroSuave px-6 py-3 font-sans text-sm text-paper hover:bg-tierraDark"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  if (cargado && items?.length === 0) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-serif text-xl text-negroSuave">Tu carrito está vacío.</p>
        <Link
          href="/tienda"
          className="mt-6 inline-block rounded bg-negroSuave px-6 py-3 font-sans text-sm text-paper hover:bg-tierraDark"
        >
          Ver tienda
        </Link>
      </div>
    );
  }

  const total = subtotal + (costoEnvioEstimado ?? 0);

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <p className="entry-label mb-2 uppercase text-grisCalido">Último paso</p>
      <h1 className="mb-8 font-serif text-4xl text-negroSuave">Checkout</h1>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <form onSubmit={manejarEnvio} className="flex flex-col gap-8" noValidate>
          <fieldset className="flex flex-col gap-4">
            <legend className="font-serif text-lg text-negroSuave">Tus datos</legend>
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

          <fieldset className="flex flex-col gap-4">
            <legend className="font-serif text-lg text-negroSuave">Entrega</legend>
            <div className="flex gap-4 font-sans text-sm text-negroSuave" role="radiogroup" aria-label="Método de entrega">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="metodoEntrega"
                  checked={metodoEntrega === "ENVIO"}
                  onChange={() => setMetodoEntrega("ENVIO")}
                />
                Envío a domicilio
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="metodoEntrega"
                  checked={metodoEntrega === "RETIRO"}
                  onChange={() => setMetodoEntrega("RETIRO")}
                />
                Retiro sin cargo
              </label>
            </div>

            {metodoEntrega === "RETIRO" ? (
              <p className="rounded border border-beigeLine bg-beige/40 p-4 font-sans text-sm text-grisCalido">
                Retiro en: <span className="text-negroSuave">{RETIRO_PUNTO.descripcion}</span>. Coordinamos el
                horario por email después de confirmar el pedido.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="provincia" className="mb-1 block font-sans text-sm text-grisCalido">
                    Provincia
                  </label>
                  <select
                    id="provincia"
                    name="provincia"
                    required
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    className="w-full rounded border border-beigeLine bg-paper px-3 py-2 font-sans text-sm text-negroSuave"
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
                  <p className="rounded border border-beigeLine bg-beige/40 p-4 font-sans text-sm text-grisCalido">
                    Todavía no tenemos una tarifa cargada para {provincia}. Vamos a coordinar el costo de envío por
                    email antes de confirmar el pago.
                  </p>
                )}
              </div>
            )}
          </fieldset>

          {error && (
            <p role="alert" className="rounded border border-tierra/40 bg-tierra/5 p-4 font-sans text-sm text-tierraDark">
              {error}
              {coordinacionManual && " Completá tus datos igual: te vamos a escribir para coordinar."}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="rounded bg-negroSuave px-6 py-3.5 font-sans text-sm text-paper hover:bg-tierraDark disabled:opacity-60"
          >
            {enviando ? "Procesando..." : "Confirmar pedido"}
          </button>
          <p className="font-sans text-xs text-grisCalido">
            Después de confirmar, el pago con Mercado Pago se conecta en el siguiente paso del desarrollo. Por ahora
            tu pedido queda registrado como pendiente.
          </p>
        </form>

        <aside className="h-fit rounded border border-beigeLine bg-beige/40 p-6">
          <h2 className="font-serif text-xl text-negroSuave">Resumen</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {(items || []).map((item: any) => {
              const producto = productos.find((p) => p.id === (item.productoId || item.id));
              if (!producto) return null;
              return (
                <li
                  key={`${item.productoId || item.id}-${item.varianteId ?? ""}`}
                  className="flex justify-between font-sans text-sm text-grisCalido"
                >
                  <span>
                    {producto.nombre} × {item.cantidad}
                  </span>
                  <span className="font-mono text-negroSuave">
                    {formatoARS(producto.precio * item.cantidad)}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex justify-between border-t border-beigeLine pt-4 font-sans text-sm text-grisCalido">
            <span>Subtotal</span>
            <span className="font-mono text-negroSuave">{formatoARS(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between font-sans text-sm text-grisCalido">
            <span>Envío</span>
            <span className="font-mono text-negroSuave">
              {costoEnvioEstimado === null ? "A coordinar" : formatoARS(costoEnvioEstimado)}
            </span>
          </div>
          <div className="mt-4 flex justify-between border-t border-beigeLine pt-4 font-sans text-lg text-negroSuave">
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
      <label htmlFor={id} className="mb-1 block font-sans text-sm text-grisCalido">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded border border-beigeLine bg-paper px-3 py-2 font-sans text-sm text-negroSuave"
      />
    </div>
  );
}