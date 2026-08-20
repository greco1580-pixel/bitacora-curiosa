import Link from "next/link";

const categorias = [
  { href: "/tienda?categoria=stickers", label: "Stickers", numero: "01" },
  { href: "/tienda?categoria=packs", label: "Packs", numero: "02" },
  { href: "/tienda?categoria=indumentaria", label: "Indumentaria", numero: "03" },
  { href: "/tienda?categoria=papeleria", label: "Papelería", numero: "04" },
  { href: "/tienda", label: "Todo", numero: "05" }
];

export default function CategoryLinks() {
  return null;
  return (
    <section className="mx-auto max-w-content px-4 py-6 sm:px-6 lg:px-8">
      <hr className="stitch-divider mb-8" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {categorias.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col gap-1 rounded border border-beigeLine bg-beige/50 px-4 py-5 transition-colors hover:bg-beige"
          >
            <span className="entry-label text-grisCalido">{c.numero}</span>
            <span className="font-serif text-lg text-negroSuave">{c.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
