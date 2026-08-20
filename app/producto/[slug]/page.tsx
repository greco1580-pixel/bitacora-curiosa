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
    <div className="mx-auto max-w-content px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14 items-start">
        
        {/* Imagen a la izquierda */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line/40 bg-surface/50 shadow-sm">
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
        <div className="lg:sticky lg:top-8 lg:h-fit flex flex-col space-y-4">
          
          {/* Botones de compra y selector interactivo */}
          <ProductoInteractivo producto={producto} />

          {/* Descripción larga suave */}
          {producto.longDescription && (
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-muted/80 font-light pt-1">
              {producto.longDescription}
            </p>
          )}

          {/* Bloque QUÉ INCLUYE suavizado */}
          <div className="pt-6 border-t border-line/40 mt-4">
            <h3 className="mb-3 font-sans text-[0.68rem] font-normal uppercase tracking-[0.18em] text-muted/70">
              QUÉ INCLUYE
            </h3>
            
            <div className="rounded-xl border border-line/30 bg-surface/40 p-3.5 sm:p-4">
              <dl className="divide-y divide-line/20 font-sans text-xs text-ink/80">
                <div className="flex justify-between py-2">
                  <dt className="text-muted/75 font-light">Cantidad</dt>
                  <dd className="font-medium text-ink/90">{producto.stickerCount}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted/75 font-light">Formato</dt>
                  <dd className="font-medium text-ink/90">{producto.format}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted/75 font-light">Material</dt>
                  <dd className="font-medium text-ink/90">{producto.material}</dd>
                </div>
              </dl>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}