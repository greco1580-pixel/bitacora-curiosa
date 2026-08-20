"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import MobileMenu from "@/components/MobileMenu";

const enlaces = [
  { href: "/tienda", label: "Tienda" },
  { href: "/sobre-bitacora-curiosa", label: "Sobre Bitácora Curiosa" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" }
];

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { items = [], abrirCarrito } = useCart();

  // Se calcula la cantidad total sumando la propiedad 'cantidad' de cada ítem
  const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-beigeLine bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif italic text-base sm:text-lg tracking-normal text-olive/80 hover:text-olive transition-colors"
        >
          Bitácora Curiosa
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="underline-grow font-sans text-sm text-body/75 hover:text-olive transition-colors"
            >
              {e.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/tienda"
            aria-label="Buscar productos"
            className="hidden text-body/75 hover:text-olive transition-colors sm:block"
          >
            <IconoBuscar />
          </Link>
          <button
            aria-label="Mi cuenta (próximamente)"
            className="hidden text-body/50 transition-colors sm:block"
            title="Cuenta — próximamente"
          >
            <IconoCuenta />
          </button>
          <button
            onClick={abrirCarrito}
            aria-label={`Abrir carrito, ${cantidadTotal} productos`}
            className="relative text-body/75 hover:text-olive transition-colors"
          >
            <IconoCarrito />
            {cantidadTotal > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-tierra font-mono text-[10px] text-paper">
                {cantidadTotal}
              </span>
            )}
          </button>
          <button
            className="text-body/75 hover:text-olive transition-colors md:hidden"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(true)}
          >
            <IconoMenu />
          </button>
        </div>
      </div>

      <MobileMenu
        abierto={menuAbierto}
        onCerrar={() => setMenuAbierto(false)}
        enlaces={enlaces}
      />
    </header>
  );
}

function IconoBuscar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconoCuenta() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c1.5-3.6 4.3-5.4 7-5.4s5.5 1.8 7 5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconoCarrito() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h2l1.2 10.4A2 2 0 0 0 9.2 18h7.6a2 2 0 0 0 2-1.7L20 8H7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="21" r="1.3" fill="currentColor" />
      <circle cx="17" cy="21" r="1.3" fill="currentColor" />
    </svg>
  );
}
function IconoMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}