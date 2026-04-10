"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Proyecto } from "@/lib/projects";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function getModalImage(project: Proyecto): string {
  if (project.tipo === "imagen") return project.src;
  if (project.tipo === "video") return project.thumbnail;
  return project.portada;
}

function MediaBadge({ project }: { project: Proyecto }) {
  if (project.tipo === "video") {
    return (
      /* Play button overlay for video */
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-xl">
          <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        {project.duracion !== "0:00" && (
          <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-semibold px-2 py-0.5 rounded">
            {project.duracion}
          </span>
        )}
      </div>
    );
  }

  if (project.tipo === "libro" && project.pdf) {
    return (
      /* PDF badge for libro with PDF */
      <div className="absolute bottom-3 left-3">
        <span className="inline-flex items-center gap-1.5 bg-white/95 text-[#0A0A0A] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
            <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          PDF disponible
        </span>
      </div>
    );
  }

  if (project.tipo === "imagen" && project.pdf) {
    return (
      <div className="absolute bottom-3 left-3">
        <span className="inline-flex items-center gap-1.5 bg-white/95 text-[#0A0A0A] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          </svg>
          Incluye PDF
        </span>
      </div>
    );
  }

  if (project.tipo === "libro" && project.totalPaginas > 0) {
    return (
      <div className="absolute bottom-3 left-3">
        <span className="bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {project.totalPaginas} páginas
        </span>
      </div>
    );
  }

  return null;
}

/* ─────────────────────────────────────────────
   Modal
───────────────────────────────────────────── */
interface ProjectModalProps {
  project: Proyecto;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const categoryLabel =
    project.categoria.charAt(0).toUpperCase() + project.categoria.slice(1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.titulo}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="
          relative z-10 bg-white w-full sm:max-w-3xl
          rounded-t-3xl sm:rounded-2xl overflow-hidden
          flex flex-col sm:flex-row
          max-h-[92dvh] sm:max-h-[85vh]
          shadow-2xl
          animate-in slide-in-from-bottom-4 sm:fade-in duration-300
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Left: visual ── */}
        <div className="sm:w-[42%] flex-shrink-0 bg-[#0A0A0A] relative">
          <div className="relative w-full aspect-[4/5] sm:h-full sm:aspect-auto">
            <Image
              src={getModalImage(project)}
              alt={project.titulo}
              fill
              className={`object-cover ${project.tipo === "video" ? "opacity-75" : ""}`}
              sizes="500px"
            />
            <MediaBadge project={project} />
          </div>
        </div>

        {/* ── Right: content ── */}
        <div className="flex flex-col flex-1 overflow-y-auto min-h-0">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md transition-all hover:scale-110"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6 sm:p-8 flex flex-col gap-5 flex-1">
            {/* Meta */}
            <p className="text-[#A3A3A3] text-xs font-semibold uppercase tracking-widest">
              {categoryLabel} · {project.año}
            </p>

            {/* Title */}
            <h2 className="font-bold text-2xl sm:text-[1.6rem] text-[#0A0A0A] leading-tight tracking-tight">
              {project.titulo}
            </h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag}
                  className="text-xs font-medium text-[#525252] bg-[#F5F5F5] border border-[#E5E5E5] px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Type-specific meta line */}
            {project.tipo === "video" && project.duracion !== "0:00" && (
              <p className="text-[#A3A3A3] text-xs font-medium -mt-2">
                Duración: {project.duracion}
              </p>
            )}
            {project.tipo === "libro" && project.formato && (
              <p className="text-[#A3A3A3] text-xs font-medium -mt-2">
                {project.formato}
                {project.totalPaginas > 0 ? ` · ${project.totalPaginas} páginas` : ""}
              </p>
            )}

            <div className="border-t border-[#F0F0F0]" />

            {/* Description */}
            <p className="text-[#525252] text-sm leading-relaxed flex-1">
              {project.descripcionLarga}
            </p>

            {/* CTA */}
            <Link
              href={`/${project.id}`}
              className="
                inline-flex items-center justify-center gap-2
                bg-[#0A0A0A] text-white text-sm font-semibold
                px-6 py-3.5 rounded-full
                hover:bg-[#262626] active:scale-[0.98]
                transition-all duration-200 w-full sm:w-auto
              "
            >
              {project.tipo === "video" ? "Ver película" :
               project.tipo === "libro" ? (project.pdf ? "Leer libro" : "Ver proyecto") :
               "Ver proyecto completo"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
