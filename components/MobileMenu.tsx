"use client";

import Link from "next/link";
import { useEffect } from "react";

interface Props {
  abierto: boolean;
  onCerrar: () => void;
  enlaces: { href: string; label: string }[];
}

export default function MobileMenu({ abierto, onCerrar, enlaces }: Props) {
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <button
        aria-label="Cerrar menú"
        onClick={onCerrar}
        className="absolute inset-0 bg-negroSuave/30"
      />
      <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 bg-paper px-6 py-6 shadow-card">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-serif text-lg text-negroSuave">Menú</span>
          <button onClick={onCerrar} aria-label="Cerrar menú" className="p-1 text-negroSuave">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <hr className="stitch-divider mb-4" />
        <nav className="flex flex-col gap-5">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              onClick={onCerrar}
              className="font-serif text-2xl text-negroSuave"
            >
              {e.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto entry-label">Bitácora Curiosa — registro en curso</div>
      </div>
    </div>
  );
}
