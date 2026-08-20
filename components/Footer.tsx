import Link from "next/link";
import WhatsAppLink from "@/components/WhatsAppLink";

export default function Footer() {
  return (
    <footer className="border-t border-beigeLine bg-beige/60">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-serif text-xl text-negroSuave">Bitácora Curiosa</p>
            <p className="mt-3 max-w-[22ch] font-sans text-sm text-grisCalido">
              Objetos para cerebros que registran demasiado.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="entry-label uppercase text-grisCalido">Tienda</p>
            <Link href="/tienda" className="underline-grow text-sm text-negroSuave">Ver todo</Link>
            <Link href="/tienda?categoria=stickers" className="underline-grow text-sm text-negroSuave">Stickers</Link>
            <Link href="/envios-cambios" className="underline-grow text-sm text-negroSuave">Envíos y cambios</Link>
          </div>

          <div className="flex flex-col gap-3">
            <p className="entry-label uppercase text-grisCalido">Ayuda</p>
            <Link href="/preguntas-frecuentes" className="underline-grow text-sm text-negroSuave">Preguntas frecuentes</Link>
            <Link href="/contacto" className="underline-grow text-sm text-negroSuave">Contacto</Link>
            <WhatsAppLink variant="link" texto="Escribinos" />
          </div>

          <div className="flex flex-col gap-3">
            <p className="entry-label uppercase text-grisCalido">Legal</p>
            <Link href="/privacidad" className="underline-grow text-sm text-negroSuave">Privacidad</Link>
            <Link href="/terminos" className="underline-grow text-sm text-negroSuave">Términos y condiciones</Link>
            <Link href="/arrepentimiento" className="underline-grow text-sm font-medium text-tierraDark">
              BOTÓN DE ARREPENTIMIENTO
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p className="entry-label uppercase text-grisCalido">Comunidad</p>
            <a
              href="https://instagram.com/bitacoracuriosa"
              target="_blank"
              rel="noreferrer"
              className="underline-grow text-sm text-negroSuave"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@lutdachosa"
              target="_blank"
              rel="noreferrer"
              className="underline-grow text-sm text-negroSuave"
            >
              TikTok
            </a>
          </div>
        </div>

        <hr className="stitch-divider my-10" />

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="font-sans text-xs text-grisCalido">
            © {new Date().getFullYear()} Bitácora Curiosa. Todo lo que ves acá se sigue registrando.
          </p>
          <p className="entry-label text-grisCalido">Hecho a mano, pensando en otras cuatro cosas.</p>
        </div>
      </div>
    </footer>
  );
}
