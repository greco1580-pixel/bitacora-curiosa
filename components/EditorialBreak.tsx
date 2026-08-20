export default function EditorialBreak({
  texto,
  numero
}: {
  texto: string;
  numero?: string;
}) {
  return null;
  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        {numero && <p className="entry-label mb-4 uppercase text-grisCalido">{numero}</p>}
        <p className="font-serif text-2xl italic leading-snug text-negroSuave sm:text-3xl">
          {texto}
        </p>
      </div>
    </div>
  );
}
