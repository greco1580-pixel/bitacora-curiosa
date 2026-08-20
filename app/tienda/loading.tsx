export default function CargandoTienda() {
  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 h-9 w-40 animate-pulse rounded bg-beige" />
      <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-[4/5] animate-pulse rounded bg-beige" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-beige" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-beige" />
          </div>
        ))}
      </div>
    </div>
  );
}
