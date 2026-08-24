import Link from "next/link";
import { storeConfig } from "@/lib/store-config";

export function AnnouncementBar() {
  if (storeConfig.mode === "available") return null;

  return (
    <aside className="w-full border-b border-[#678294]/20 bg-[#F2F5F8] text-ink py-1.5 px-4">
      <div className="mx-auto max-w-[1100px] flex flex-col sm:flex-row items-center justify-between text-[0.6rem] sm:text-[0.65rem] font-mono tracking-wider gap-1">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#678294]"></span>
          <span>
            {storeConfig.mode === "preview" && (
              <>PRIMERA TANDA EN PREPARACIÓN <span className="opacity-40">·</span> REGISTRO PREVIO ABIERTO</>
            )}
            {storeConfig.mode === "preorder" && (
              <>
                PRIMERA TANDA <span className="opacity-40">·</span> PREVENTA ABIERTA <span className="opacity-40">·</span> DESPACHOS ENTRE EL {storeConfig.preorderDispatchStart} Y EL {storeConfig.preorderDispatchEnd}
              </>
            )}
          </span>
        </div>
        <Link
          href="/tienda"
          className="underline hover:text-[#678294] transition-colors whitespace-nowrap uppercase"
        >
          EXPLORAR LOS PACKS →
        </Link>
      </div>
    </aside>
  );
}