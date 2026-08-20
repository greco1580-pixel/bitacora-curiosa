import Image from "next/image";
import { notFound } from "next/navigation";
import { obtenerProductoPorSlug } from "@/data/products";
import ProductoInteractivo from "./ProductoInteractivo";

export default function ProductoPage({ params }: { params: { slug: string } }) {
  const producto = obtenerProductoPorSlug(params.slug);

  if (!producto) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        
        {/* Imagen a la izquierda */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-line bg-surface">
          {producto.imagenes?.[0] && (
            <Image
              src={producto.imagenes[0]}
              alt={producto.nombre}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>

        {/* Información e Interacción a la derecha */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <ProductoInteractivo producto={producto} />

          <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
            {producto.longDescription}
          </p>

          {/* Bloque QUÉ INCLUYE */}
          <div className="my-8 border-t border-line pt-6">
            <h3 className="mb-4 font-sans text-xs font-medium uppercase tracking-wider text-sage-dark">
              QUÉ INCLUYE
            </h3>
            <dl className="divide-y divide-line/60 font-sans text-sm">
              <div className="flex justify-between py-2.5">
                <dt className="text-muted">Cantidad</dt>
                <dd className="font-medium text-ink">{producto.stickerCount}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted">Formato</dt>
                <dd className="font-medium text-ink">{producto.format}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted">Material</dt>
                <dd className="font-medium text-ink">{producto.material}</dd>
              </div>
            </dl>
          </div>
        </div>

      </div>
    </div>
  );
}