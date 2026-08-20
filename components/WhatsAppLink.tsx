// Reemplazar el número por el número real de WhatsApp del negocio,
// en formato internacional sin espacios ni signos: 54911XXXXXXXX
const NUMERO_WHATSAPP = "5491100000000";
const MENSAJE_DEFAULT = "Hola! Tengo una consulta sobre Bitácora Curiosa.";

interface Props {
  variant?: "link" | "button";
  texto?: string;
  mensaje?: string;
}

export default function WhatsAppLink({
  variant = "link",
  texto = "Escribinos por WhatsApp",
  mensaje = MENSAJE_DEFAULT
}: Props) {
  const href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

  if (variant === "button") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded border border-beigeLine bg-beige px-5 py-3 font-sans text-sm text-negroSuave transition-colors hover:bg-beige/70"
      >
        <IconoWhatsApp />
        {texto}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline-grow inline-flex items-center gap-1.5 font-sans text-sm text-negroSuave"
    >
      <IconoWhatsApp pequeno />
      {texto}
    </a>
  );
}

function IconoWhatsApp({ pequeno }: { pequeno?: boolean }) {
  const s = pequeno ? 15 : 18;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8.5 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4.2.5.6 1.4.7 1.5.1.1.1.3 0 .4-.1.2-.2.3-.3.4-.1.1-.3.3-.4.4-.1.1-.3.3-.1.6.2.3.8 1.2 1.7 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.2.4-.2.6-.1.2.1 1.4.7 1.7.8.3.1.4.2.5.3.1.2.1.9-.2 1.4-.3.6-1.5 1.1-2.1 1.1-.6 0-1.3.2-3.9-1-2.7-1.2-4.4-4-4.5-4.2-.1-.2-1-1.3-1-2.5s.6-1.8.8-2Z"
        fill="currentColor"
      />
    </svg>
  );
}
