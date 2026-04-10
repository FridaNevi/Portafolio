"use client";

import { useState, useEffect } from "react";
import CarouselCard from "./CarouselCard";
import ProjectModal from "./ProjectModal";
import { todosLosProyectos, categorias, Proyecto, Categoria } from "@/lib/projects";
import { useWindowSize } from "@/hooks/useWindowSize";

function FilterBar({
  active,
  onChange,
}: {
  active: Categoria | "todos";
  onChange: (c: Categoria | "todos") => void;
}) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-2 px-6 md:px-16 pb-2 min-w-max">
        <button
          onClick={() => onChange("todos")}
          className={`
            text-sm font-semibold px-4 py-1.5 rounded-full border transition-all whitespace-nowrap
            ${active === "todos"
              ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
              : "bg-transparent text-[#525252] border-[#D4D4D4] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"}
          `}
        >
          Todos
          <span className="ml-1.5 text-xs opacity-60">{todosLosProyectos.length}</span>
        </button>

        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              text-sm font-semibold px-4 py-1.5 rounded-full border transition-all whitespace-nowrap
              ${active === cat.id
                ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                : "bg-transparent text-[#525252] border-[#D4D4D4] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"}
            `}
          >
            {cat.label}
            <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChevronLeft({ size = 24, sw = 2 }: { size?: number; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ChevronRight({ size = 24, sw = 2 }: { size?: number; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

function CarouselMobile({
  items,
  onCardClick,
}: {
  items: Proyecto[];
  onCardClick: (p: Proyecto) => void;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => { setIdx(0); }, [items]);

  if (items.length === 0) return <EmptyState />;

  const next = () => setIdx((p) => (p + 1) % items.length);
  const prev = () => setIdx((p) => (p - 1 + items.length) % items.length);

  return (
    <div className="relative w-full py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {items.map((item) => (
              <CarouselCard key={item.id} item={item} isMobile onClick={onCardClick} />
            ))}
          </div>
        </div>

        <button onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10 hover:scale-110"
          aria-label="Anterior">
          <ChevronLeft />
        </button>
        <button onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10 hover:scale-110"
          aria-label="Siguiente">
          <ChevronRight />
        </button>

        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-2.5 rounded-full transition-all ${i === idx ? "bg-black w-8" : "bg-gray-300 hover:bg-gray-400 w-2.5"}`}
              aria-label={`Ir al proyecto ${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselDesktop({
  items,
  onCardClick,
}: {
  items: Proyecto[];
  onCardClick: (p: Proyecto) => void;
}) {
  const [idx, setIdx] = useState(0);
  const PER_VIEW = 3;

  useEffect(() => { setIdx(0); }, [items]);

  if (items.length === 0) return <EmptyState />;

  const next = () =>
    setIdx((p) => (p + PER_VIEW >= items.length ? 0 : p + 1));
  const prev = () =>
    setIdx((p) => (p === 0 ? Math.max(0, items.length - PER_VIEW) : p - 1));
  const totalPages = Math.ceil(items.length / PER_VIEW);

  return (
    <div className="relative w-full py-32 px-16 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * (100 / PER_VIEW)}%)` }}
          >
            {items.map((item) => (
              <CarouselCard key={item.id} item={item} isMobile={false} onClick={onCardClick} />
            ))}
          </div>
        </div>

        <button onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all z-10 hover:scale-110"
          aria-label="Proyectos anteriores">
          <ChevronLeft size={28} sw={2.5} />
        </button>
        <button onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all z-10 hover:scale-110"
          aria-label="Siguientes proyectos">
          <ChevronRight size={28} sw={2.5} />
        </button>

        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setIdx(i * PER_VIEW)}
              className={`h-1 rounded-full transition-all ${Math.floor(idx / PER_VIEW) === i ? "bg-black w-12" : "bg-gray-300 hover:bg-gray-400 w-8"}`}
              aria-label={`Página ${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="w-full py-32 bg-gray-50 flex items-center justify-center">
      <p className="text-[#A3A3A3] text-sm font-medium">
        No hay proyectos en esta categoría aún.
      </p>
    </div>
  );
}

export default function FeatureCarousel() {
  const { width } = useWindowSize();
  const [activeCategory, setActiveCategory] = useState<Categoria | "todos">("todos");
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);

  const filteredItems =
    activeCategory === "todos"
      ? todosLosProyectos
      : todosLosProyectos.filter((p) => p.categoria === activeCategory);

  const handleCardClick = (project: Proyecto) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  return (
    <>
      <div className="pt-6 pb-2">
        <FilterBar active={activeCategory} onChange={setActiveCategory} />
      </div>

      {width < 1024 ? (
        <CarouselMobile items={filteredItems} onCardClick={handleCardClick} />
      ) : (
        <CarouselDesktop items={filteredItems} onCardClick={handleCardClick} />
      )}

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
}
