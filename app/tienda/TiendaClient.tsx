"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { productos } from "@/data/products";
import { Categoria } from "@/lib/types";

const categorias: { valor: Categoria | "todo"; label: string }[] = [
  { valor: "todo", label: "Todo" },
  { valor: "stickers", label: "Stickers" },
  { valor: "packs", label: "Packs" },
  { valor: "indumentaria", label: "Indumentaria" },
  { valor: "papeleria", label: "Papelería" }
];

type Orden = "relevancia" | "precio-asc" | "precio-desc" | "nombre";

export default function TiendaClient() {
  const params = useSearchParams();
  const categoriaInicial = (params.get("categoria") as Categoria | null) ?? "todo";

  const [categoria, setCategoria] = useState<Categoria | "todo">(categoriaInicial);
  const [orden, setOrden] = useState<Orden>("relevancia");
  const [busqueda, setBusqueda] = useState("");

  const resultados = useMemo(() => {
    let lista = [...productos];

    if (categoria !== "todo") {
      lista = lista.filter((p) => p.categoria === categoria);
    }

    if (busqueda.trim()) {
      const q = busqueda.trim().toLowerCase();
      lista = lista.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          (p as any).descripcionCorta?.toLowerCase().includes(q)
      );
    }

    switch (orden) {
      case "precio-asc":
        lista.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        lista.sort((a, b) => b.precio - a.precio);
        break;
      case "nombre":
        lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
        break;
      default:
        break;
    }

    return lista;
  }, [categoria, orden, busqueda]);

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="entry-label mb-2 uppercase text-grisCalido">Catálogo</p>
        <h1 className="font-serif text-4xl text-negroSuave">Tienda</h1>
      </div>

      {/* Filtros discretos, no estilo marketplace */}
      <div className="mb-8 flex flex-col gap-4 border-y border-beigeLine py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {categorias.map((c) => (
            <button
              key={c.valor}
              onClick={() => setCategoria(c.valor)}
              className={`font-sans text-sm underline-grow ${
                categoria === c.valor ? "text-tierra" : "text-negroSuave/80"
              }`}
              aria-pressed={categoria === c.valor}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="buscar">
            Buscar productos
          </label>
          <input
            id="buscar"
            type="search"
            placeholder="Buscar…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="rounded border border-beigeLine bg-paper px-3 py-2 font-sans text-sm text-negroSuave outline-none focus-visible:border-tierra sm:w-44"
          />
          <label className="sr-only" htmlFor="orden">
            Ordenar por
          </label>
          <select
            id="orden"
            value={orden}
            onChange={(e) => setOrden(e.target.value as Orden)}
            className="rounded border border-beigeLine bg-paper px-3 py-2 font-sans text-sm text-negroSuave outline-none focus-visible:border-tierra"
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre A–Z</option>
          </select>
        </div>
      </div>

      {resultados.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-20 text-center">
          <p className="font-serif text-xl text-negroSuave">No encontramos nada con esos filtros.</p>
          <p className="font-sans text-sm text-grisCalido">
            Probá con otra categoría o borrá la búsqueda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
          {resultados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}
