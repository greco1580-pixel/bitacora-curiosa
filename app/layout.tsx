import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
//@ts-ignore
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart-context";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"]
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600"]
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: {
    default: "Bitácora Curiosa — Objetos para cerebros que registran demasiado",
    template: "%s — Bitácora Curiosa"
  },
  description:
    "Bitácora Curiosa es una marca editorial sobre neurodivergencia, sobreestimulación y vida cotidiana, con stickers, indumentaria y papelería.",
  openGraph: {
    title: "Bitácora Curiosa",
    description: "Objetos para cerebros que registran demasiado.",
    type: "website",
    locale: "es_AR"
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-negroSuave focus:px-4 focus:py-2 focus:text-paper"
          >
            Saltar al contenido
          </a>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
