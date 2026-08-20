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
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      role="dialog" 
      aria-modal="true"
    >
      {/* Fondo oscuro traslúcido atenuado */}
      <div 
        onClick={onCerrar}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(2px)'
        }}
      />

      {/* Panel del menú lateral */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          width: '82%',
          maxWidth: '320px',
          height: '100%',
          backgroundColor: '#F7F4EE',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          boxShadow: '-4px 0 15px rgba(0,0,0,0.05)',
          borderLeft: '1px solid #ECE7DF'
        }}
      >
        {/* Cabecera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #ECE7DF' }}>
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: '#999999', fontWeight: 400 }}>Menú</span>
          <button 
            onClick={onCerrar} 
            aria-label="Cerrar menú" 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="#888888" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Enlaces */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '28px' }}>
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              onClick={onCerrar}
              className="font-serif text-lg"
              style={{ textDecoration: 'none', color: '#555555', fontWeight: 400 }}
            >
              {e.label}
            </Link>
          ))}
        </nav>

        {/* Pie */}
        <div style={{ marginTop: 'auto', paddingTop: '20px', fontSize: '11px', color: '#AAAAAA', borderTop: '1px solid #ECE7DF', letterSpacing: '0.03em' }}>
          Bitácora Curiosa — REGISTRO EN CURSO
        </div>
      </div>
    </div>
  );
}