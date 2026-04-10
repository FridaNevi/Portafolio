import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frida Ninel — Portafolio",
  description:
    "Artista visual y escritora mexicana. Proyectos audiovisuales y literarios con una mirada introspectiva.",
  openGraph: {
    title: "Frida Ninel — Portafolio",
    description:
      "Artista visual y escritora mexicana. Proyectos audiovisuales y literarios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#FAFAFA] text-[#0A0A0A] antialiased">
        {children}
      </body>
    </html>
  );
}
