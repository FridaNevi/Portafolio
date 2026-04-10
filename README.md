# Frida Ninel — Portafolio

Portfolio personal construido con **Next.js 14**, **TypeScript** y **Tailwind CSS**.
Diseño basado en el prototipo de Figma original.

---

## Instalación

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Estructura del proyecto

```
frida-ninel-portfolio/
├── app/
│   ├── layout.tsx          ← Root layout + metadata global
│   ├── page.tsx            ← Homepage (Hero + Carrusel)
│   ├── globals.css         ← Estilos base + fuente Inter
│   ├── imfine/page.tsx
│   ├── itsokey/page.tsx
│   ├── gomazine/page.tsx
│   ├── eclipsis/page.tsx
│   ├── villa/page.tsx
│   ├── memoriaysilencio/page.tsx
│   └── ecos/page.tsx
├── components/
│   ├── Navbar.tsx          ← Barra de navegación (negra, fija)
│   ├── Hero.tsx            ← Sección principal con foto y bio
│   ├── FeatureCarousel.tsx ← Carrusel (mobile 1 card / desktop 3 cards)
│   ├── CarouselCard.tsx    ← Tarjeta individual del carrusel
│   └── ProjectLayout.tsx   ← Layout reutilizable para páginas de proyecto
├── hooks/
│   └── useWindowSize.ts    ← Hook responsive (reemplaza useActiveBreakpoint de Figma)
├── lib/
│   └── projects.ts         ← ⭐ TODA la data de proyectos en un solo lugar
└── public/
    └── images/             ← ⭐ AQUÍ van todos tus assets
```

---

## ⭐ Cómo agregar tus imágenes

Coloca tus archivos en `/public/images/` con estos nombres exactos:

| Archivo                          | Usado en                          |
|----------------------------------|-----------------------------------|
| `hero.jpg`                       | Foto principal del Hero           |
| `imfine.png`                     | Carrusel + página /imfine         |
| `itsokey.png`                    | Carrusel + página /itsokey        |
| `gomazine.png`                   | Carrusel + página /gomazine       |
| `eclipsis.png`                   | Carrusel + página /eclipsis       |
| `villa.png`                      | Carrusel + página /villa          |
| `memoriaysilencio.png`           | Carrusel + página /memoriaysilencio |
| `ecos.png`                       | Carrusel + página /ecos           |

Puedes usar `.jpg`, `.png`, `.webp` — solo actualiza la extensión en `lib/projects.ts`.

---

## ⭐ Cómo editar contenido

Todo el texto de los proyectos está centralizado en **`lib/projects.ts`**.
Cada proyecto tiene:

```ts
{
  slug: "imfine",          // ← URL: /imfine
  title: "IM FINE",
  description: "...",      // ← Subtítulo en la tarjeta del carrusel
  image: "/images/imfine.png",
  date: "Julio 7, 2024",
  categories: ["Proyecto académico", "Diseño gráfico"],
  quote: "Sometimes 'I'm fine' is just a beautiful lie.",
  sections: [
    {
      heading: "Concepto y mensaje",
      body: ["párrafo 1", "párrafo 2"],
      list: ["item 1", "item 2"],   // opcional
    },
    // ...
  ],
}
```

---

## Rutas

| Ruta                  | Página                        |
|-----------------------|-------------------------------|
| `/`                   | Home (Hero + Portafolio)      |
| `/imfine`             | IM FINE                       |
| `/itsokey`            | IT'S OKEY                     |
| `/gomazine`           | Gomazine                      |
| `/eclipsis`           | El despertar de Orión         |
| `/villa`              | Silueta de Francisco Villa    |
| `/memoriaysilencio`   | Memoria y Silencio            |
| `/ecos`               | Ecos de una vida              |

---

## Deploy

```bash
npm run build
```

Compatible con Vercel, Netlify, o cualquier hosting de Node.js.
Para Vercel: conecta el repo y hace deploy automático.
