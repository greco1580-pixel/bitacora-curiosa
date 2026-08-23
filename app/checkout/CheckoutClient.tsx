"use client";

import { useState, useMemo, useEffect } from "react";
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
  pagoAprobado?: boolean;
}

interface RespuestaCheckoutError {
  error: string;
  detalles?: unknown;
  requiereCoordinacionManual?: boolean;
}

export default function CheckoutClient() {
  const cartContext = useCart() as any;
  const items = cartContext?.items || [];
  const cargado = cartContext?.cargado ?? true;

  const [montado, setMontado] = useState(false);
  useEffect(() => {
    setMontado(true);
  }, []);

  const subtotal = useMemo(() => {
    return (items || []).reduce((acc: number, item: any) => {
      const precio = item.producto?.precio || item.precio || 0;
      return acc + precio * (item.cantidad || 1);
    }, 0);
  }, [items]);

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
      items: items.map((i: any) => {
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

      if (typeof cartContext?.vaciarCarrito === "function") {
        cartContext.vaciarCarrito();
      } else if (typeof cartContext?.clearCart === "function") {
        cartContext.clearCart();
      } else if (typeof cartContext?.vaciar === "function") {
        cartContext.vaciar();
      }

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

  function ejecutarSubmit() {
    const elForm = document.getElementById("checkout-form") as HTMLFormElement;
    if (elForm) {
      if (!elForm.checkValidity()) {
        elForm.reportValidity();
      } else {
        elForm.requestSubmit();
      }
    }
  }

  if (!montado) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8 text-center font-sans text-xs text-[#8c827a]">
        Cargando checkout...
      </div>
    );
  }

  // --- CONFIRMACIÓN CON COLORES Y TIPOGRAFÍAS DE BITÁCORA CURIOSA ---
  if (resultado) {
    const esPagoAprobado = Boolean(resultado.pagoAprobado);
    const numeroRegistro = resultado.referenciaExterna || resultado.pedidoId;

    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[#e5e0d8] bg-[#f2eee9]/60 p-6 sm:p-10 lg:p-12">
          
          {/* Detalles sutiles en la esquina superior derecha */}
          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full border border-dashed border-[#8c827a]/20" aria-hidden="true" />
          <div className="pointer-events-none absolute right-12 top-10 h-2 w-2 rounded-full bg-[#93a085]/40" aria-hidden="true" />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
            
            {/* COLUMNA IZQUIERDA */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#6b635b]">
                  REGISTRO COMPLETADO
                </span>

                <h1 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#6b635b] leading-tight">
                  Tu pedido ya quedó anotado.
                </h1>

                <p className="mt-4 font-sans text-xs sm:text-sm leading-relaxed text-[#8c827a]">
                  {esPagoAprobado
                    ? "Recibimos tu pedido y el pago fue confirmado. Ahora empieza la preparación."
                    : "Lo recibimos correctamente. En breve nos comunicamos con vos para coordinar el pago y contarte cómo sigue."}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#e2ded6] w-full">
                <p className="font-serif italic text-xs sm:text-sm text-[#6b635b]">
                  Gracias por llevarte una pequeña parte de la Bitácora.
                </p>

                <div className="mt-6">
                  <Link
                    href="/tienda"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#93a085] px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#93a085] focus:ring-offset-2"
                  >
                    SEGUIR CURIOSEANDO &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="flex flex-col gap-6">
              
              {/* Bloque con Número de Registro y Sello Editorial */}
              <div className="relative rounded-xl border border-[#e5e0d8] bg-[#faf8f5] p-6 shadow-xs">
                
                <div 
                  className="absolute -top-3 right-5 rotate-[2deg] rounded-md border border-[#93a085] bg-[#faf8f5] px-2.5 py-0.5"
                  aria-label="Estado: Recibido"
                >
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#93a085]">
                    RECIBIDO
                  </span>
                </div>

                <span className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-[#8c827a]">
                  N.º DE REGISTRO
                </span>

                <span className="mt-1 block font-mono text-xl sm:text-2xl font-semibold tracking-wide text-[#6b635b]">
                  {numeroRegistro}
                </span>

                <p className="mt-3 font-sans text-[11px] text-[#8c827a]">
                  Guardá este número por si necesitás escribirnos.
                </p>
              </div>

              {/* Secuencia Informativa */}
              <div className="rounded-xl border border-[#e5e0d8] bg-[#faf8f5] p-6">
                <h2 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#8c827a] mb-5">
                  ESTADO DEL REGISTRO
                </h2>

                <div className="relative flex flex-col gap-5">
                  <div 
                    className="absolute left-[7px] top-2 bottom-2 w-px bg-[#e2ded6]" 
                    aria-hidden="true" 
                  />

                  {/* Paso 1 */}
                  <div className="relative flex items-start gap-3">
                    <span className="relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#93a085] ring-4 ring-[#faf8f5]">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-sans text-xs font-semibold text-[#6b635b] leading-none">
                        PEDIDO RECIBIDO
                      </span>
                      <span className="font-sans text-[10px] text-[#93a085] mt-1">Completado</span>
                    </div>
                  </div>

                  {/* Paso 2 */}
                  <div className="relative flex items-start gap-3">
                    <span 
                      className={`relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-[#faf8f5] ${
                        esPagoAprobado ? "bg-[#93a085]" : "bg-[#80728c]"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-sans text-xs font-semibold text-[#6b635b] leading-none">
                        {esPagoAprobado ? "PAGO CONFIRMADO" : "PAGO A COORDINAR"}
                      </span>
                      <span 
                        className={`font-sans text-[10px] mt-1 ${
                          esPagoAprobado ? "text-[#93a085]" : "text-[#80728c] font-medium"
                        }`}
                      >
                        {esPagoAprobado ? "Completado" : "Estado actual"}
                      </span>
                    </div>
                  </div>

                  {/* Paso 3 */}
                  <div className="relative flex items-start gap-3">
                    <span className="relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#d8d3c9] ring-4 ring-[#faf8f5]" />
                    <div className="flex flex-col">
                      <span className="font-sans text-xs text-[#8c827a] leading-none">
                        PREPARACIÓN
                      </span>
                      <span className="font-sans text-[10px] text-[#8c827a]/70 mt-1">Pendiente</span>
                    </div>
                  </div>

                  {/* Paso 4 */}
                  <div className="relative flex items-start gap-3">
                    <span className="relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#d8d3c9] ring-4 ring-[#faf8f5]" />
                    <div className="flex flex-col">
                      <span className="font-sans text-xs text-[#8c827a] leading-none">
                        ENVÍO O RETIRO
                      </span>
                      <span className="font-sans text-[10px] text-[#8c827a]/70 mt-1">Pendiente</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
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
                <span className={metodoEntrega === "ENVIO" ? "text-[#6b635b] font-medium" : "text-[#8c827a]"}>
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
                <span className={metodoEntrega === "RETIRO" ? "text-[#6b635b] font-medium" : "text-[#8c827a]"}>
                  Retiro sin cargo
                </span>
              </label>
            </div>

            {metodoEntrega === "RETIRO" ? (
              <p className="font-sans text-xs text-[#8c827a] py-1">
                Punto de retiro: <span className="text-[#6b635b] font-medium">{RETIRO_PUNTO.descripcion}</span>. Coordinamos el horario por email.
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
                    className="w-full rounded-xl border border-[#d8d3c9] !bg-transparent px-3 py-2 font-sans text-xs text-[#6b635b] focus:border-[#93a085] focus:outline-none transition-colors"
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
              type="button"
              disabled={enviando}
              onClick={ejecutarSubmit}
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
                  <span className="font-serif text-[#6b635b]">
                    {formatoARS((producto.precio || producto.price || 0) * item.cantidad)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-3.5 flex justify-between font-sans text-xs text-[#8c827a]">
            <span>Subtotal</span>
            <span className="font-serif text-[#6b635b]">{formatoARS(subtotal)}</span>
          </div>

          <div className="mt-2.5 flex justify-between font-sans text-xs text-[#8c827a] pb-5 border-b border-[#e2ded6]">
            <span>Envío</span>
            <span className="font-serif text-[#6b635b]">
              {costoEnvioEstimado === null ? "A calcular" : formatoARS(costoEnvioEstimado)}
            </span>
          </div>

          <div className="mt-5 flex justify-between items-baseline">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#8c827a] font-medium">TOTAL</span>
            <span className="font-serif text-xl font-normal text-[#6b635b]">{formatoARS(total)}</span>
          </div>

          <div className="mt-5 hidden lg:block">
            <button
              type="button"
              disabled={enviando}
              onClick={ejecutarSubmit}
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
        className="w-full rounded-xl border border-[#d8d3c9] !bg-transparent px-3 py-2 font-sans text-xs text-[#6b635b] focus:border-[#93a085] focus:outline-none transition-colors"
      />
    </div>
  );
}