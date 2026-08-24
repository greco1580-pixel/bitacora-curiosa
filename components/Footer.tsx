import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-beigeLine/60 bg-paper/60">
      {/* Banner compacto: Botón de arrepentimiento */}
      <section className="border-b border-beigeLine/50 bg-paper/30 py-2.5">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
            <p className="font-sans text-[0.7rem] sm:text-xs text-body/70">
              Pagás con Mercado Pago, elegís envío a domicilio o retiro sin cargo. ¿Te arrepentiste de una compra?
            </p>
            <Link
              href="/arrepentimiento"
              className="shrink-0 font-sans text-[0.62rem] font-medium uppercase tracking-[0.12em] text-body/60 hover:text-olive transition-colors"
            >
              Botón de arrepentimiento
            </Link>
          </div>
        </div>
      </section>

      {/* Enlaces principales del Footer */}
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Marca / Intro */}
          <div className="col-span-2 sm:col-span-1">
            <p className="font-serif text-lg sm:text-xl font-normal text-ink/85">
              Bitácora Curiosa
            </p>
            <p className="mt-2.5 max-w-[22ch] font-sans text-xs sm:text-sm leading-relaxed text-body/75">
              Objetos para cerebros que registran demasiado.
            </p>
          </div>

          {/* Columna Tienda */}
          <div className="flex flex-col gap-2.5">
            <p className="font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60">
              Tienda
            </p>
            <Link href="/tienda" className="font-sans text-xs sm:text-sm text-ink/75 hover:text-olive transition-colors">
              Ver todo
            </Link>
            <Link href="/tienda?categoria=stickers" className="font-sans text-xs sm:text-sm text-ink/75 hover:text-olive transition-colors">
              Stickers
            </Link>
            <Link href="/envios-cambios" className="font-sans text-xs sm:text-sm text-ink/75 hover:text-olive transition-colors">
              Envíos y cambios
            </Link>
          </div>

          {/* Columna Ayuda */}
          <div className="flex flex-col gap-2.5">
            <p className="font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60">
              Ayuda
            </p>
            <Link href="/preguntas-frecuentes" className="font-sans text-xs sm:text-sm text-ink/75 hover:text-olive transition-colors">
              Preguntas frecuentes
            </Link>
            <Link href="/contacto" className="font-sans text-xs sm:text-sm text-ink/75 hover:text-olive transition-colors">
              Contacto
            </Link>
          </div>

          {/* Columna Legal */}
          <div className="flex flex-col gap-2.5">
            <p className="font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60">
              Legal
            </p>
            <Link href="/privacidad" className="font-sans text-xs sm:text-sm text-ink/75 hover:text-olive transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="font-sans text-xs sm:text-sm text-ink/75 hover:text-olive transition-colors">
              Términos y condiciones
            </Link>
            <Link
              href="/arrepentimiento"
              className="mt-1 font-sans text-[0.65rem] font-medium uppercase tracking-[0.12em] text-body/70 hover:text-olive transition-colors"
            >
              Botón de arrepentimiento
            </Link>
          </div>

          {/* Columna Comunidad */}
          <div className="flex flex-col gap-2.5">
            <p className="font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted/60">
              Comunidad
            </p>
            <a
              href="https://instagram.com/bitacora__curiosa"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-xs sm:text-sm text-ink/75 hover:text-olive transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@bitacoracuriosa"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-xs sm:text-sm text-ink/75 hover:text-olive transition-colors"
            >
              TikTok
            </a>
          </div>
        </div>

        <hr className="stitch-divider my-8 opacity-50" />

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="font-sans text-xs text-body/65">
            © {new Date().getFullYear()} Bitácora Curiosa. Todo lo que ves acá se sigue registrando.
          </p>
          <p className="font-mono text-[0.65rem] text-muted/60 tracking-wider">
            Hecho a mano, pensando en otras cuatro cosas.
          </p>
        </div>
      </div>
    </footer>
  );
}