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
    <section className="py-12">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-negroSuave">Seguir en Instagram</h2>
        <a
          href="https://www.instagram.com/" // Cambiá por el link a tu perfil
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest text-grisCalido hover:underline"
        >
          Ver perfil →
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg bg-stone-200 block"
          >
            <img
              src={post.imagen}
              alt={post.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 block"
            />
          </a>
        ))}
      </div>
    </section>
  );
}