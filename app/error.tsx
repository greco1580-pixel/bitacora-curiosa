"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-content px-4 py-20 text-center">
      <h2 className="font-serif text-2xl text-negroSuave">Ocurrió un error inesperado</h2>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-stone-900 px-4 py-2 text-sm text-white"
      >
        Reintentar
      </button>
    </div>
  );
}