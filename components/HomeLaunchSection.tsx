import Link from "next/link";
import { storeConfig } from "@/lib/store-config";

export function HomeLaunchSection() {
  if (storeConfig.mode === "available") return null;

  const isPreview = storeConfig.mode === "preview";

  return (
    <section className="my-12 py-8 border-y border-dashed border-black/10 bg-[#FAF9F5]/50">
      <div className="mx-auto max-w-[850px] px-6 relative">
        <p className="text-[0.55rem] font-mono tracking-[0.2em] text-[#678294] uppercase mb-2">
          {isPreview ? "ANOTACIÓN DE LANZAMIENTO" : "PREVENTA · PRIMERA TANDA"}
        </p>

        <h2 className="font-[family-name:var(--font-fraunces,serif)] text-ink text-xl sm:text-2xl font-normal mb-3">
          {isPreview ? "La primera tanda está tomando forma." : "La primera tanda ya acepta pedidos."}
        </h2>

        <p className="text-xs sm:text-sm text-body/80 leading-relaxed max-w-[600px] mb-6">
          {isPreview
            ? "Los stickers todavía están en producción. Mientras tanto, podés recorrer los packs y anotar cuál te gustaría tener cerca. Te avisamos cuando se abra la preventa."
            : "Los stickers están en producción y ya podés elegir tu pack. Los pedidos comenzarán a despacharse dentro del período informado."}
        </p>

        <div className="flex items-center gap-4 relative inline-block">
          <Link
            href="/tienda"
            className="inline-block px-4 py-2 border border-black/20 bg-white hover:bg-black/5 text-ink text-xs font-mono tracking-widest uppercase rounded-sm transition-colors"
          >
            {isPreview ? "EXPLORAR Y ANOTAR →" : "VER PACKS EN PREVENTA →"}
          </Link>

          {isPreview && (
            <div className="hidden sm:flex items-center gap-2 text-[0.6rem] font-mono text-muted/60 italic">
              <span className="w-8 h-[1px] bg-muted/30"></span>
              <span>esto todavía no es una compra</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}