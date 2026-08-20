import ProductCard from "@/components/ProductCard";
import { productos } from "@/data/products";

export default function TiendaPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-[0.65rem] font-sans font-normal uppercase tracking-[0.2em] text-muted/60 mb-2">
          CATÁLOGO COMPLETO
        </p>
        <h1 className="font-serif text-xl sm:text-2xl md:text-3xl text-ink/80 font-normal leading-snug">
          Todos los packs
        </h1>
      </div>

      {/* Grilla 3 columnas en escritorio */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} variant="catalog" />
        ))}
      </div>
    </div>
  );
}