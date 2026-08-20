import Image from "next/image";

const instagramPosts = [
  {
    id: 1,
    url: "https://www.instagram.com/p/...", // Reemplazá por tu enlace
    imagen: "/post1.png",
    alt: "Publicación 1",
  },
  {
    id: 2,
    url: "https://www.instagram.com/p/...", // Reemplazá por tu enlace
    imagen: "/post2.png",
    alt: "Publicación 2",
  },
  {
    id: 3,
    url: "https://www.instagram.com/p/DaEav4YEZZm/?img_index=1",
    imagen: "/post3.png",
    alt: "Publicación 3",
  },
  {
    id: 4,
    url: "https://www.instagram.com/p/DZLr-fNkaL8/?img_index=1",
    imagen: "/post4.png",
    alt: "Publicación 4",
  },
];

export default function InstagramSection() {
  return (
    <section className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="font-serif text-lg sm:text-xl font-normal text-ink/85">
          Seguir en Instagram
        </h2>
        <a
          href="https://www.instagram.com/bitacoracuriosa"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 font-sans text-xs text-ink/70 hover:text-olive transition-colors"
        >
          <span>Ver perfil</span>
          <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg bg-paper border border-beigeLine/40 block"
          >
            <Image
              src={post.imagen}
              alt={post.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}