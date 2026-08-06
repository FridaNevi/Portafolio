import type { Metadata } from "next";
import SlideDeck from "@/components/SlideDeck";

export const metadata: Metadata = {
  title: "Presentación — Frida Ninel",
  description:
    "Presentación en slides del portafolio de Frida Ninel: identidad visual, diseño editorial y producción audiovisual.",
  openGraph: {
    title: "Presentación — Frida Ninel",
    description:
      "Presentación en slides del portafolio de Frida Ninel: identidad visual, diseño editorial y producción audiovisual.",
    type: "website",
  },
};

export default function PresentacionPage() {
  return <SlideDeck />;
}