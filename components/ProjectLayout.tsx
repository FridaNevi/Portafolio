"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { Proyecto, perfil } from "@/lib/projects";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type LightboxState = { images: string[]; index: number } | null;

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────

/** Combina arrays de imágenes y elimina duplicados y vacíos */
function buildImageList(...sources: (string | string[] | undefined | null)[]): string[] {
  const flat = sources.flatMap((s) =>
    Array.isArray(s) ? s : s ? [s] : []
  );
  // Dedup preservando orden
  return Array.from(new Set(flat.filter(Boolean)));
}

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useLightbox() {
  const [state, setState] = useState<LightboxState>(null);
  const open  = useCallback((images: string[], index = 0) => setState({ images, index }), []);
  const close = useCallback(() => setState(null), []);
  const next  = useCallback(() => setState((s) => s ? { ...s, index: (s.index + 1) % s.images.length } : null), []);
  const prev  = useCallback(() => setState((s) => s ? { ...s, index: (s.index - 1 + s.images.length) % s.images.length } : null), []);
  const goTo  = useCallback((i: number) => setState((s) => s ? { ...s, index: i } : null), []);
  return { state, open, close, next, prev, goTo };
}

// Keyboard estable via ref — nunca stale closures
function useKeyboard(
  enabled: boolean,
  onLeft: () => void,
  onRight: () => void,
  onEsc?: () => void
) {
  const ref = useRef({ onLeft, onRight, onEsc });
  useEffect(() => { ref.current = { onLeft, onRight, onEsc }; });
  useEffect(() => {
    if (!enabled) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  ref.current.onLeft();
      if (e.key === "ArrowRight") ref.current.onRight();
      if (e.key === "Escape")     ref.current.onEsc?.();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [enabled]);
}

function usePreload(images: string[], active: number) {
  useEffect(() => {
    if (!images.length) return;
    [images[active - 1], images[active], images[active + 1], images[active + 2]]
      .filter(Boolean)
      .forEach((src) => { const img = new window.Image(); img.src = src as string; });
  }, [images, active]);
}

function useThumbScroll(ref: React.RefObject<HTMLDivElement | null>, index: number) {
  useEffect(() => {
    ref.current
      ?.querySelector<HTMLElement>(`[data-thumb="${index}"]`)
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [ref, index]);
}

// ─────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────

function Lightbox({ state, onClose, onNext, onPrev, onGoTo }: {
  state: LightboxState;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (i: number) => void;
}) {
  const touchX    = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = state ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [state]);

  useKeyboard(!!state, onPrev, onNext, onClose);
  useThumbScroll(thumbsRef, state?.index ?? 0);

  if (!state) return null;
  const { images, index } = state;
  const many = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-[300] bg-black/96 backdrop-blur-sm"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const d = e.changedTouches[0].clientX - touchX.current;
        if (d < -50) onNext();
        if (d > 50)  onPrev();
        touchX.current = null;
      }}
    >
      <button type="button" onClick={onClose} aria-label="Cerrar"
        className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white md:right-6 md:top-6">
        ✕
      </button>

      {many && (
        <div className="absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] tracking-[0.22em] text-white/50">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center px-16">
        <div className="relative h-[80vh] w-full max-w-[1700px]">
          {/* key por índice para forzar remount */}
          <Image
            key={`lb-${index}`}
            src={images[index]}
            alt={`Imagen ${index + 1}`}
            fill priority sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>

      {many && (
        <>
          <button type="button" onClick={onPrev} aria-label="Anterior"
            className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white/70 transition hover:bg-white/15 hover:text-white md:left-6">‹</button>
          <button type="button" onClick={onNext} aria-label="Siguiente"
            className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white/70 transition hover:bg-white/15 hover:text-white md:right-6">›</button>
        </>
      )}

      {many && (
        <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 md:bottom-6">
          <div ref={thumbsRef}
            className="flex max-w-[90vw] gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/60 px-3 py-2.5 backdrop-blur-md"
            style={{ scrollbarWidth: "none" }}>
            {images.map((img, i) => (
              <button key={`lb-t-${i}`} type="button" data-thumb={i}
                onClick={() => onGoTo(i)} aria-label={`Imagen ${i + 1}`}
                className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition ${
                  i === index ? "border-white/75 opacity-100" : "border-white/10 opacity-40 hover:opacity-90"
                }`}>
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SHARED UI
// ─────────────────────────────────────────────

function TopBar({ project, right }: { project: Proyecto; right?: React.ReactNode }) {
  return (
    <div className="shrink-0 border-b border-white/8 bg-[#111]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 md:px-10">
        <div className="flex min-w-0 flex-col gap-0.5">
          <Link href="/#portafolio"
            className="inline-flex w-fit items-center gap-1.5 text-[10px] tracking-[0.22em] text-white/35 transition hover:text-white/80">
            ← VOLVER
          </Link>
          <div className="flex min-w-0 items-baseline gap-3">
            <h1 className="truncate text-xl font-semibold text-white md:text-2xl">{project.titulo}</h1>
            <span className="hidden shrink-0 text-[10px] uppercase tracking-[0.24em] text-white/35 md:block">
              {project.categoria} · {project.año}
            </span>
          </div>
        </div>
        {right && <div className="flex shrink-0 items-center gap-2">{right}</div>}
      </div>
    </div>
  );
}

function FooterBar() {
  return (
    <div className="shrink-0 border-t border-white/8 bg-[#0a0a0a] px-5 py-3 md:px-10">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
        <p className="text-sm font-medium tracking-tight text-white/50">{perfil.nombre}</p>
        <p className="text-[11px] tracking-[0.12em] text-white/30">{perfil.correo}</p>
      </div>
    </div>
  );
}

function SidebarInfo({ project }: { project: Proyecto }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 py-6 md:px-8" style={{ scrollbarWidth: "none" }}>
      {project.descripcionLarga && (
        <p className="text-sm leading-7 text-white/55 md:text-[15px]">{project.descripcionLarga}</p>
      )}
      <div className="mt-5 space-y-4 border-t border-white/8 pt-5">
        {project.descripcion && (
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/30">Resumen</p>
            <p className="mt-1.5 text-sm leading-6 text-white/60">{project.descripcion}</p>
          </div>
        )}
        <div className="flex gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/30">Categoría</p>
            <p className="mt-1 text-sm text-white/70">{project.categoria}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/30">Año</p>
            <p className="mt-1 text-sm text-white/70">{project.año}</p>
          </div>
        </div>
        {!!project.tags?.length && (
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/30">Tags</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.06em] text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {"pdf" in project && project.pdf && (
        <div className="mt-auto pt-6">
          <a href={project.pdf as string} download
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-5 py-2.5 text-[11px] font-semibold tracking-[0.18em] text-black transition hover:bg-white/90">
            ↓ DESCARGAR PDF
          </a>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// IMAGE CAROUSEL — visor con carrete inferior
// Usado para imágenes, carteles y libros
// ─────────────────────────────────────────────

function ImageCarousel({
  images,
  lightboxOpen,
  onOpenLightbox,
}: {
  images: string[];
  lightboxOpen: boolean;
  onOpenLightbox: (images: string[], index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  usePreload(images, index);
  useThumbScroll(thumbsRef, index);

  const many = images.length > 1;

  // Functional updates — sin stale closures
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const goNext = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const goTo   = useCallback((i: number) => setIndex(i), []);

  useKeyboard(!lightboxOpen, goPrev, goNext);

  return (
    <div className="flex min-h-0 flex-1 flex-col">

      {/* Imagen activa + flechas overlay */}
      <div className="relative min-h-0 flex-1 bg-[#0d0d0d]">

        {/* Ampliar — siempre visible en esquina */}
        <button
          type="button"
          onClick={() => onOpenLightbox(images, index)}
          className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-black/80"
        >
          AMPLIAR
        </button>

        {/* Contador — arriba a la izquierda, solo si hay múltiples */}
        {many && (
          <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] tabular-nums tracking-[0.2em] text-white/60 backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        )}

        {/* key por índice — evita glitch de caché al cambiar imagen */}
        <Image
          key={`img-${index}`}
          src={images[index]}
          alt={`Imagen ${index + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 70vw"
          className="object-contain p-4 md:p-8"
        />

        {/* Flechas izquierda/derecha — siempre visibles si hay varias */}
        {many && (
          <>
            <button type="button" onClick={goPrev} aria-label="Anterior"
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-2xl text-white/70 backdrop-blur-sm transition hover:bg-black/75 hover:text-white">
              ‹
            </button>
            <button type="button" onClick={goNext} aria-label="Siguiente"
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-2xl text-white/70 backdrop-blur-sm transition hover:bg-black/75 hover:text-white">
              ›
            </button>
          </>
        )}
      </div>

      {/* Carrete de miniaturas — solo si hay varias */}
      {many && (
        <div className="shrink-0 border-t border-white/8 bg-[#111] px-4 py-3 md:px-6">
          <div
            ref={thumbsRef}
            className="flex gap-2 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {images.map((img, i) => (
              <button
                key={`thumb-${i}`}
                type="button"
                data-thumb={i}
                onClick={() => goTo(i)}
                aria-label={`Imagen ${i + 1}`}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border transition md:h-16 md:w-24 ${
                  i === index
                    ? "border-white/70 opacity-100 ring-1 ring-white/25 ring-offset-1 ring-offset-black"
                    : "border-white/10 opacity-40 hover:opacity-80"
                }`}
              >
                <Image src={img} alt="" fill sizes="100px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// CONTENT VIEW — layout universal: sidebar + contenido
// Usado para imagen, libro y video
// ─────────────────────────────────────────────

function ContentView({
  project,
  children,
}: {
  project: Proyecto;
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-[calc(100vh-60px)] flex-col overflow-hidden bg-[#0d0d0d]">
      <TopBar project={project} />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Sidebar izquierda */}
        <div className="shrink-0 border-b border-white/8 bg-[#111] md:w-[290px] md:border-b-0 md:border-r lg:w-[320px]">
          <SidebarInfo project={project} />
        </div>

        {/* Contenido derecha */}
        <div className="flex min-h-0 flex-1 flex-col">
          {children}
        </div>
      </div>

      <FooterBar />
    </section>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────

export default function ProjectLayout({ project }: { project: Proyecto }) {
  const { state, open, close, next, prev, goTo } = useLightbox();

  const images = useMemo<string[]>(() => {
    let raw: string[] = [];

    if (project.tipo === "imagen") {
      // src + paginas + galeria, sin duplicados
      const p = project as unknown as Record<string, unknown>;
      raw = buildImageList(
        project.src,
        p.paginas as string[] | undefined,
        p.galeria as string[] | undefined,
      );
    } else if (project.tipo === "libro") {
      // portada + paginas, sin duplicados
      const p = project as unknown as Record<string, unknown>;
      raw = buildImageList(
        p.portada as string | undefined,
        p.paginas as string[] | undefined,
      );
    }

    return raw;
  }, [project]);

  return (
    <>
      <Navbar />
      <Lightbox state={state} onClose={close} onNext={next} onPrev={prev} onGoTo={goTo} />

      <main className="h-screen overflow-hidden pt-[60px]">

        {/* VIDEO */}
        {project.tipo === "video" && (
          <ContentView project={project}>
            <div className="flex min-h-0 flex-1 items-center justify-center bg-[#060606] p-6 md:p-10">
              <video
                src={project.videoUrl}
                controls
                playsInline
                className="max-h-full max-w-full rounded-2xl"
              />
            </div>
          </ContentView>
        )}

        {/* IMAGEN / LIBRO — sidebar + carrete */}
        {(project.tipo === "imagen" || project.tipo === "libro") && images.length > 0 && (
          <ContentView project={project}>
            <ImageCarousel
              images={images}
              lightboxOpen={!!state}
              onOpenLightbox={open}
            />
          </ContentView>
        )}

      </main>
    </>
  );
}