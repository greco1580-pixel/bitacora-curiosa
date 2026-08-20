import type { Metadata } from "next";
import ArrepentimientoClient from "./ArrepentimientoClient";

export const metadata: Metadata = {
  title: "Botón de arrepentimiento — Bitácora Curiosa",
  description: "Ejercé tu derecho de arrepentimiento sin necesidad de registrarte."
};

export default function ArrepentimientoPage() {
  return <ArrepentimientoClient />;
}
