"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Categoria,
  Proyecto,
  categorias,
  perfil,
  todosLosProyectos,
} from "@/lib/projects";

const heroLayerBack = "/assets/fotografia/capa1.jpg";

const categoriaBlurb: Record<Categoria, string> = {
  audiovisual:
    "Cortometrajes y piezas narrativas que exploran la introspección, la memoria y el silencio a través de la imagen en movimiento.",
  branding:
    "Sistemas de identidad visual completos, del concepto a la construcción de un manual de marca.",
  libro:
    "Diseño editorial para obra literaria: tipografía, grilla y maquetación al servicio del contenido.",
  carteles:
    "Piezas gráficas conceptuales que combinan tipografía experimental y narrativa visual.",
  fotografia:
    "Series fotográficas documentales y conceptuales sobre memoria, cultura y paisaje.",
  ilustraciones:
    "Ilustración digital y editorial con enfoque narrativo y comercial.",
};

function getCoverImage(item: Proyecto): string {
  if (item.tipo === "imagen") return item.src;
  if (item.tipo === "video") return item.thumbnail;
  return item.portada;
}

function getProjectImages(item: Proyecto): string[] {
  if (item.tipo !== "imagen") return [];
  const galeria = item.galeria && item.galeria.length > 0 ? item.galeria : [item.src];
  return Array.from(new Set(galeria));
}

type Slide =
  | { type: "cover" }
  | { type: "about" }
  | { type: "category"; categoria: Categoria }
  | { type: "contact" };

const featuredCategorias: Categoria[] = ["fotografia", "audiovisual"];

function buildSlides(): Slide[] {
  return [
    { type: "cover" },
    { type: "about" },
    ...featuredCategorias.map((c) => ({ type: "category" as const, categoria: c })),
    { type: "contact" },
  ];
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.32em] text-[#E24C4C]">
      <span className="h-px w-12 bg-[#E24C4C]" />
      {children}
    </div>
  );
}

function CoverSlide() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0A0A0A] px-6 py-10 text-white md:px-16 md:py-14">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center grayscale opacity-[0.16]"
        style={{ backgroundImage: `url("${heroLayerBack}")` }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.88)_70%,rgba(10,10,10,0.98)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-50" />

      <div className="relative z-10 flex items-center justify-between">
        <Kicker>Portafolio visual · 2026</Kicker>
        <p className="hidden text-xs font-bold uppercase tracking-[0.28em] text-white/50 md:block">
          {perfil.ciudad}, México
        </p>
      </div>

      <div className="relative z-10">
        <h1 className="text-6xl font-black leading-[0.86] tracking-normal sm:text-7xl md:text-[8rem]">
          {perfil.nombre}
        </h1>
        <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/70 md:text-xl">
          {perfil.profesion}. {perfil.tagline}
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-[0.68rem] font-black uppercase tracking-[0.24em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <span>Fotografía / Audiovisual</span>
        <span>Usa las flechas o desliza para navegar →</span>
      </div>
    </div>
  );
}

function AboutSlide() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-10 overflow-y-auto bg-[#0A0A0A] px-6 py-10 text-white md:px-16 md:py-14">
      <Kicker>Sobre mí</Kicker>

      <h2 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
        {perfil.bio}
      </h2>

      <p className="max-w-2xl text-base font-medium leading-relaxed text-white/60 md:text-lg">
        {perfil.bioExtendida.trim()}
      </p>

      <div className="grid max-w-2xl grid-cols-2 gap-6 border-t border-white/15 pt-6 sm:grid-cols-4">
        <div>
          <p className="text-3xl font-black leading-none md:text-4xl">
            {todosLosProyectos.length}
          </p>
          <p className="mt-2 text-[0.66rem] font-black uppercase tracking-[0.22em] text-white/45">
            Proyectos
          </p>
        </div>
        <div>
          <p className="text-3xl font-black leading-none md:text-4xl">
            {categorias.length}
          </p>
          <p className="mt-2 text-[0.66rem] font-black uppercase tracking-[0.22em] text-white/45">
            Categorías
          </p>
        </div>
        <div>
          <p className="text-3xl font-black leading-none md:text-4xl">
            {perfil.ciudad}
          </p>
          <p className="mt-2 text-[0.66rem] font-black uppercase tracking-[0.22em] text-white/45">
            Ciudad
          </p>
        </div>
        <div>
          <p className="text-3xl font-black leading-none text-emerald-400 md:text-4xl">
            {perfil.disponible ? "Sí" : "No"}
          </p>
          <p className="mt-2 text-[0.66rem] font-black uppercase tracking-[0.22em] text-white/45">
            Disponible
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectPopup({
  project,
  imageIndex,
  onClose,
  onPrev,
  onNext,
}: {
  project: Proyecto;
  imageIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const images = getProjectImages(project);
  const many = images.length > 1;
  const categoryLabel = categorias.find((c) => c.id === project.categoria)?.label ?? project.categoria;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.titulo}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white md:right-8 md:top-8"
      >
        ✕
      </button>

      <div
        className="flex h-full w-full max-w-5xl flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-[#0d0d0d]">
          {project.tipo === "video" ? (
            <video
              src={project.videoUrl}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          ) : (
            <>
              <Image
                key={images[imageIndex]}
                src={images[imageIndex]}
                alt={project.titulo}
                fill
                priority
                sizes="90vw"
                className="object-contain"
              />
              {many && (
                <>
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Anterior"
                    className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-2xl text-white/70 backdrop-blur-sm transition hover:bg-black/75 hover:text-white"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Siguiente"
                    className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-2xl text-white/70 backdrop-blur-sm transition hover:bg-black/75 hover:text-white"
                  >
                    ›
                  </button>
                  <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[11px] tracking-[0.2em] text-white/60 backdrop-blur-sm">
                    {String(imageIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="shrink-0">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F05A5A]">
            {categoryLabel} · {project.año}
          </p>
          <h3 className="mt-1 text-2xl font-black leading-tight text-white md:text-3xl">
            {project.titulo}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
            {project.descripcion}
          </p>
        </div>
      </div>
    </div>
  );
}

function CategorySlide({
  categoria,
  onOpenProject,
}: {
  categoria: Categoria;
  onOpenProject: (project: Proyecto) => void;
}) {
  const meta = categorias.find((c) => c.id === categoria)!;
  const items = todosLosProyectos.filter((p) => p.categoria === categoria);
  const featured = items[0];

  if (items.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-[#0A0A0A] px-6 text-center text-white">
        <Kicker>{meta.label} · 00</Kicker>
        <p className="max-w-md text-base font-medium leading-relaxed text-white/45">
          Aún no hay proyectos publicados en esta categoría.
        </p>
      </div>
    );
  }

  return (
    <div className="relative grid h-full w-full grid-rows-[auto_1fr] overflow-y-auto bg-[#0A0A0A] text-white md:grid-cols-[1.1fr_0.9fr] md:grid-rows-1">
      <button
        type="button"
        onClick={() => featured && onOpenProject(featured)}
        aria-label={featured ? `Ver ${featured.titulo}` : undefined}
        className="relative order-2 flex min-h-[240px] w-full flex-col justify-end overflow-hidden border-t border-white/10 p-6 text-left md:order-1 md:min-h-0 md:border-r md:border-t-0 md:p-14"
      >
        {featured && (
          <Image
            src={getCoverImage(featured)}
            alt={featured.titulo}
            fill
            className="object-cover grayscale opacity-70 transition-opacity duration-300 hover:opacity-90"
            sizes="60vw"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.15)_0%,rgba(10,10,10,0.55)_55%,rgba(10,10,10,0.95)_100%)]" />
        <div className="relative z-10">
          <p className="text-[0.66rem] font-black uppercase tracking-[0.24em] text-[#F05A5A]">
            Pieza destacada · {featured?.tipo === "video" ? "ver video" : "ver foto"}
          </p>
          <h3 className="mt-2 text-2xl font-black leading-tight md:text-3xl">
            {featured?.titulo}
          </h3>
        </div>
      </button>

      <div className="order-1 flex flex-col justify-center gap-6 px-6 py-8 md:order-2 md:px-14 md:py-14">
        <Kicker>
          {meta.label} · {String(meta.count).padStart(2, "0")}
        </Kicker>
        <p className="max-w-md text-base font-medium leading-relaxed text-white/65 md:text-lg">
          {categoriaBlurb[categoria]}
        </p>

        <ul className="mt-2 flex flex-col divide-y divide-white/10 border-y border-white/10">
          {items.slice(0, 4).map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onOpenProject(item)}
                className="group flex w-full items-center justify-between gap-4 py-3.5 text-left text-sm font-bold text-white/75 transition-colors hover:text-white"
              >
                <span className="truncate">{item.titulo}</span>
                <span className="flex shrink-0 items-center gap-3 text-xs font-black tracking-[0.12em] text-white/35">
                  {item.año}
                  <span className="transition-transform group-hover:translate-x-1">
                    {item.tipo === "video" ? "▶" : "+"}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        {items.length > 4 && (
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">
            + {items.length - 4} proyecto{items.length - 4 === 1 ? "" : "s"} más en esta categoría
          </p>
        )}
      </div>
    </div>
  );
}

function ContactSlide() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-10 overflow-y-auto bg-[#0A0A0A] px-6 py-10 text-white md:px-16 md:py-14">
      <Kicker>Trabajemos juntas</Kicker>

      <h2 className="max-w-2xl text-5xl font-black leading-[0.92] md:text-7xl">
        {perfil.nombre}
      </h2>

      <div className="flex flex-wrap gap-3">
        {perfil.correo && (
          <a
            href={`mailto:${perfil.correo}`}
            className="inline-flex items-center bg-white px-6 py-3 text-sm font-black text-[#0A0A0A] transition-colors hover:bg-white/85"
          >
            {perfil.correo}
          </a>
        )}
        {perfil.cv && (
          <a
            href={perfil.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-white/35 px-6 py-3 text-sm font-black text-white transition-colors hover:border-white"
          >
            Descargar CV
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-6 text-sm font-semibold text-white/60">
        {perfil.instagram && <span>Instagram — {perfil.instagram}</span>}
        {perfil.linkedin && <span>{perfil.linkedin}</span>}
        {perfil.disponible && (
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Disponible para proyectos
          </span>
        )}
      </div>

      <Link
        href="/"
        className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-white/45 transition-colors hover:text-white"
      >
        ← Volver al sitio
      </Link>
    </div>
  );
}

function SlideContent({
  slide,
  onOpenProject,
}: {
  slide: Slide;
  onOpenProject: (project: Proyecto) => void;
}) {
  switch (slide.type) {
    case "cover":
      return <CoverSlide />;
    case "about":
      return <AboutSlide />;
    case "category":
      return <CategorySlide categoria={slide.categoria} onOpenProject={onOpenProject} />;
    case "contact":
      return <ContactSlide />;
  }
}

function slideLabel(slide: Slide): string {
  switch (slide.type) {
    case "cover":
      return "Portada";
    case "about":
      return "Sobre mí";
    case "category":
      return categorias.find((c) => c.id === slide.categoria)?.label ?? slide.categoria;
    case "contact":
      return "Contacto";
  }
}

export default function SlideDeck() {
  const slides = useMemo(buildSlides, []);
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const touchX = useRef<number | null>(null);
  const router = useRouter();

  const [openProject, setOpenProject] = useState<Proyecto | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const projectImages = openProject ? getProjectImages(openProject) : [];

  const openProjectPopup = useCallback((project: Proyecto) => {
    setOpenProject(project);
    setImageIndex(0);
  }, []);
  const closeProjectPopup = useCallback(() => setOpenProject(null), []);
  const nextImage = useCallback(
    () => setImageIndex((i) => (projectImages.length ? (i + 1) % projectImages.length : 0)),
    [projectImages.length],
  );
  const prevImage = useCallback(
    () =>
      setImageIndex((i) =>
        projectImages.length ? (i - 1 + projectImages.length) % projectImages.length : 0,
      ),
    [projectImages.length],
  );

  const goTo = useCallback(
    (i: number) => setIndex(Math.min(Math.max(i, 0), total - 1)),
    [total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (openProject) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeProjectPopup();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          nextImage();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prevImage();
        }
        return;
      }
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(total - 1);
      } else if (e.key === "Escape") {
        router.push("/");
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [next, prev, goTo, total, router, openProject, nextImage, prevImage, closeProjectPopup]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0A0A0A] text-white">
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `translateX(${(i - index) * 100}%)`,
              transition: "transform 620ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            aria-hidden={i !== index}
          >
            <SlideContent slide={slide} onOpenProject={openProjectPopup} />
          </div>
        ))}
      </div>

      {openProject && (
        <ProjectPopup
          project={openProject}
          imageIndex={imageIndex}
          onClose={closeProjectPopup}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <div
        className="absolute inset-0 z-20"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const d = e.changedTouches[0].clientX - touchX.current;
          if (d < -50) next();
          if (d > 50) prev();
          touchX.current = null;
        }}
        style={{ pointerEvents: "none" }}
      />

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-6 py-5 md:px-16 md:py-6">
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-white/60 transition-colors hover:text-white"
        >
          ← Sitio
        </Link>
        <p className="text-xs font-black uppercase tracking-[0.24em] text-white/40">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          <span className="ml-3 hidden text-white/60 sm:inline">{slideLabel(slides[index])}</span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="absolute left-0 top-0 z-30 h-[3px] w-full bg-white/10">
        <div
          className="h-full bg-[#E24C4C]"
          style={{
            width: `${((index + 1) / total) * 100}%`,
            transition: "width 620ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Prev / next arrows */}
      <button
        type="button"
        onClick={prev}
        disabled={index === 0}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xl text-white/70 backdrop-blur-sm transition hover:bg-black/70 hover:text-white disabled:opacity-0 md:left-6 md:h-12 md:w-12"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        disabled={index === total - 1}
        aria-label="Siguiente"
        className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xl text-white/70 backdrop-blur-sm transition hover:bg-black/70 hover:text-white disabled:opacity-0 md:right-6 md:h-12 md:w-12"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir a ${slideLabel(slide)}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}