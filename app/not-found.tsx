import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center px-4 py-28 text-center sm:px-6 lg:px-8">
      <p className="entry-label mb-3 uppercase text-grisCalido">Página no encontrada</p>
      <h1 className="font-serif text-4xl text-negroSuave">Esto no estaba en el registro.</h1>
      <p className="mt-4 max-w-md font-sans text-sm text-grisCalido">
        Puede que el enlace esté roto o que la página se haya movido de lugar.
      </p>
      <Link
        href="/"
        className="mt-8 rounded bg-negroSuave px-7 py-3.5 font-sans text-sm text-paper hover:bg-tierraDark"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
