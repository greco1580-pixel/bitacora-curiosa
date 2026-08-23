"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
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
    const precio = item.producto?.precio || item.precio || 0;
    return acc + precio * item.cantidad;
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
    const telefonoLimpio = String(formData.get("telefono") || "").replace(/\D/g, "");

    const cuerpo = {
      items: (items || []).map((i: any) => {
        const prod = i.producto || i;
        return {
          productoId: prod.id || i.productoId || i.id,
          titulo: prod.nombre || prod.name || "Producto Nolá",
          precio: Number(prod.precio || prod.price || 0),
          cantidad: Number(i.cantidad || 1),
          ...(i.varianteId ? { varianteId: i.varianteId } : {})
        };
      }),
      metodoEntrega,
      datosComprador: {
        nombre: String(formData.get("nombre") || "").trim(),
        apellido: String(formData.get("apellido") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        telefono: telefonoLimpio,
        ...(formData.get("dni") ? { dni: String(formData.get("dni")).trim() } : {})
      },
      datosEnvio:
        metodoEntrega === "ENVIO"
          ? {
              provincia,
              localidad: String(formData.get("localidad") || "").trim(),
              codigoPostal: String(formData.get("codigoPostal") || "").trim(),
              direccion: String(formData.get("direccion") || "").trim(),
              numero: String(formData.get("numero") || "").trim(),
              ...(formData.get("pisoDepto") ? { pisoDepto: String(formData.get("pisoDepto")).trim() } : {}),
              ...(formData.get("indicaciones") ? { indicaciones: String(formData.get("indicaciones")).trim() } : {})
            }
          : undefined
    };

    try {
      const respuesta = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo)
      });

      const texto = await respuesta.text();
      let datos: any = {};
      try {
        datos = JSON.parse(texto);
      } catch {
        setError(`Error del servidor (${respuesta.status}): ${texto.slice(0, 150)}`);
        return;
      }

      if (!respuesta.ok) {
        const err = datos as RespuestaCheckoutError;
        if (err.requiereCoordinacionManual) {
          setCoordinacionManual(true);
        }
        const detalleTexto = err.detalles ? ` (${JSON.stringify(err.detalles)})` : "";
        setError((err.error || `Error ${respuesta.status}`) + detalleTexto);
        return;
      }

      const ok = datos as RespuestaCheckoutOk;
      vaciarCarrito();

      if (ok.initPoint) {
        window.location.href = ok.initPoint;
        return;
      }

      setResultado(ok);
    } catch (e: any) {
      setError(`Error de red: ${e?.message || "No se pudo establecer conexión."}`);
    } finally {
      setEnviando(false);
    }
  }

  if (resultado) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl text-[#6b635b] mb-2">¡Gracias, ya recibimos tu pedido!</h1>
        <p className="font-sans text-xs text-[#8c827a]">
          Número de referencia: <span className="font-mono text-[#2d2a26]">{resultado.referenciaExterna}</span>
        </p>
        <p className="mt-4 font-sans text-xs text-[#8c827a] max-w-prose">{resultado.mensaje}</p>
        <Link
          href="/tienda"
          className="mt-8 inline-block rounded-2xl bg-[#93a085] px-8 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  if (cargado && items?.length === 0) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl text-[#6b635b] mb-4">Tu carrito está vacío</h1>
        <Link
          href="/tienda"
          className="mt-4 inline-block rounded-2xl bg-[#93a085] px-8 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
        >
          Ver tienda
        </Link>
      </div>
    );
  }

  const total = subtotal + (costoEnvioEstimado ?? 0);

  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#6b635b]">Checkout</h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <form id="checkout-form" onSubmit={manejarEnvio} className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl font-normal text-[#6b635b]">Tus datos</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="nombre" label="Nombre" required />
              <Campo id="apellido" label="Apellido" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="email" label="Email" type="email" required />
              <Campo id="telefono" label="Teléfono" type="tel" required />
            </div>
            <Campo id="dni" label="DNI (opcional)" />
          </section>

          <section className="flex flex-col gap-4 pt-4 border-t border-[#e2ded6]/60">
            <h2 className="font-serif text-xl font-normal text-[#6b635b]">Entrega</h2>
            <div className="flex gap-6 font-sans text-xs text-[#8c827a]" role="radiogroup" aria-label="Método de entrega">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="metodoEntrega"
                  checked={metodoEntrega === "ENVIO"}
                  onChange={() => setMetodoEntrega("ENVIO")}
                  className="accent-[#93a085]"
                />
                <span className={metodoEntrega === "ENVIO" ? "text-[#2d2a26] font-medium" : "text-[#8c827a]"}>
                  Envío a domicilio
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="metodoEntrega"
                  checked={metodoEntrega === "RETIRO"}
                  onChange={() => setMetodoEntrega("RETIRO")}
                  className="accent-[#93a085]"
                />
                <span className={metodoEntrega === "RETIRO" ? "text-[#2d2a26] font-medium" : "text-[#8c827a]"}>
                  Retiro sin cargo
                </span>
              </label>
            </div>

            {metodoEntrega === "RETIRO" ? (
              <p className="font-sans text-xs text-[#8c827a] py-1">
                Punto de retiro: <span className="text-[#2d2a26] font-medium">{RETIRO_PUNTO.descripcion}</span>. Coordinamos el horario por email.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="provincia" className="mb-1 block font-sans text-xs text-[#8c827a]">
                    Provincia
                  </label>
                  <select
                    id="provincia"
                    name="provincia"
                    required
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d3c9] !bg-transparent px-3 py-2 font-sans text-xs text-[#2d2a26] focus:border-[#93a085] focus:outline-none transition-colors"
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
                  <p className="font-sans text-xs text-[#8c827a] py-1">
                    Aún no tenemos una tarifa calculada para {provincia}. Coordinamos el costo por email.
                  </p>
                )}
              </div>
            )}
          </section>

          {error && (
            <p role="alert" className="font-sans text-xs text-red-700">
              {error}
              {coordinacionManual && " Completá tus datos igual: te vamos a escribir para coordinar."}
            </p>
          )}

          <div className="lg:hidden">
            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-2xl bg-[#93a085] py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {enviando ? "PROCESANDO..." : "PAGAR AHORA"}
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-2xl border border-[#e5e0d8] bg-[#f2eee9]/80 p-6 sm:p-7">
          <h2 className="font-serif text-xl font-normal text-[#6b635b] mb-5">Resumen</h2>
          
          <ul className="flex flex-col gap-2.5 pb-5 border-b border-[#e2ded6]">
            {(items || []).map((item: any, idx: number) => {
              const producto = item.producto || item;
              if (!producto) return null;
              return (
                <li
                  key={`${producto.id || idx}-${item.varianteId ?? ""}`}
                  className="flex justify-between items-center font-sans text-xs"
                >
                  <span className="text-[#8c827a]">
                    {producto.nombre || producto.title} <span className="text-[11px] text-[#8c827a]/70">× {item.cantidad}</span>
                  </span>
                  <span className="font-serif text-[#2d2a26]">
                    {formatoARS((producto.precio || producto.price || 0) * item.cantidad)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-3.5 flex justify-between font-sans text-xs text-[#8c827a]">
            <span>Subtotal</span>
            <span className="font-serif text-[#2d2a26]">{formatoARS(subtotal)}</span>
          </div>

          <div className="mt-2.5 flex justify-between font-sans text-xs text-[#8c827a] pb-5 border-b border-[#e2ded6]">
            <span>Envío</span>
            <span className="font-serif text-[#2d2a26]">
              {costoEnvioEstimado === null ? "A calcular" : formatoARS(costoEnvioEstimado)}
            </span>
          </div>

          <div className="mt-5 flex justify-between items-baseline">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#8c827a] font-medium">TOTAL</span>
            <span className="font-serif text-xl font-normal text-[#2d2a26]">{formatoARS(total)}</span>
          </div>

          <div className="mt-5 hidden lg:block">
            <button
              type="submit"
              form="checkout-form"
              disabled={enviando}
              className="w-full rounded-2xl bg-[#93a085] py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-60"
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
      <label htmlFor={id} className="mb-1 block font-sans text-xs text-[#8c827a]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-xl border border-[#d8d3c9] !bg-transparent px-3 py-2 font-sans text-xs text-[#2d2a26] focus:border-[#93a085] focus:outline-none transition-colors"
      />
    </div>
  );
}