import Link from "next/link";

const categorias = [
  { href: "/tienda?categoria=stickers", label: "Stickers", numero: "01" },
  { href: "/tienda?categoria=packs", label: "Packs", numero: "02" },
  { href: "/tienda?categoria=indumentaria", label: "Indumentaria", numero: "03" },
  { href: "/tienda?categoria=papeleria", label: "Papelería", numero: "04" },
  { href: "/tienda", label: "Todo", numero: "05" }
];

export default function CategoryLinks() {
  return (
    <section className="mx-auto max-w-content px-4 py-6 sm:px-6 lg:px-8">
      <hr className="stitch-divider mb-8 opacity-60" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {categorias.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col justify-between rounded-lg border border-beigeLine/60 bg-paper/50 p-4 transition-all hover:border-olive/50 hover:bg-paper"
          >
            <span className="font-mono text-[0.65rem] text-muted/60 tracking-wider">
              {c.numero}
            </span>
            <span className="font-serif text-base text-ink/80 group-hover:text-olive transition-colors mt-3">
              {c.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
