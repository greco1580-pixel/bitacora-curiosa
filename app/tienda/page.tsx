import ProductCard from "@/components/ProductCard";
import { productos } from "@/data/products";

export default function TiendaPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="entry-label mb-1 font-sans text-xs font-medium uppercase tracking-wider text-sage-dark">
          CATÁLOGO COMPLETO
        </p>
        <h1 className="font-serif text-4xl text-ink">Todos los packs</h1>
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