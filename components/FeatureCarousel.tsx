"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import ProjectModal from "./ProjectModal";
import { categorias, Categoria, Proyecto, todosLosProyectos } from "@/lib/projects";

const heroLayerBack = "/assets/fotografia/capa1.jpg";
const heroLayerPerson = "/assets/fotografia/capa2.png";

function getCardImage(item: Proyecto): string {
  if (item.tipo === "imagen") return item.src;
  if (item.tipo === "video") return item.thumbnail;
  return item.portada;
}

function getCategoryLabel(item: Proyecto): string {
  return categorias.find((categoria) => categoria.id === item.categoria)?.label ?? item.categoria;
}

function getProjectScale(index: number) {
  const styles = [
    "md:col-span-6",
    "md:col-span-6",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-6",
    "md:col-span-6",
  ];

  return styles[index % styles.length];
}

function FilterBar({
  active,
  onChange,
}: {
  active: Categoria | "todos";
  onChange: (c: Categoria | "todos") => void;
}) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none">
      <div className="flex min-w-max items-center gap-2 pb-2">
        <button
          onClick={() => onChange("todos")}
          className={`
            whitespace-nowrap border px-4 py-2 text-xs font-black uppercase tracking-[0.16em] transition-all
            ${active === "todos"
              ? "border-white bg-white text-[#0A0A0A]"
              : "border-white/25 bg-white/5 text-white/70 hover:border-white hover:text-white"}
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
              whitespace-nowrap border px-4 py-2 text-xs font-black uppercase tracking-[0.16em] transition-all
              ${active === cat.id
                ? "border-white bg-white text-[#0A0A0A]"
                : "border-white/25 bg-white/5 text-white/70 hover:border-white hover:text-white"}
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

function EmptyState() {
  return (
    <div className="flex min-h-[320px] items-center justify-center border border-white/15 bg-white/5">
      <p className="text-sm font-semibold text-white/55">
        No hay proyectos en esta categoría aún.
      </p>
    </div>
  );
}

export default function FeatureCarousel() {
  const [activeCategory, setActiveCategory] = useState<Categoria | "todos">("todos");
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);
  const [activeProject, setActiveProject] = useState<Proyecto>(todosLosProyectos[0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const projectRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredItems = useMemo(
    () =>
      activeCategory === "todos"
        ? todosLosProyectos
        : todosLosProyectos.filter((p) => p.categoria === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    setActiveProject(filteredItems[0] ?? todosLosProyectos[0]);
    projectRefs.current = [];
  }, [filteredItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const index = Number((visible.target as HTMLElement).dataset.projectIndex);
        const nextProject = filteredItems[index];
        if (nextProject) setActiveProject(nextProject);
      },
      {
        rootMargin: "-25% 0px -35% 0px",
        threshold: [0.24, 0.42, 0.64],
      },
    );

    projectRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [filteredItems]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const section = document.getElementById("work-showcase");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  const handleCardClick = (project: Proyecto) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  return (
    <>
      <section id="work-showcase" className="relative overflow-hidden px-6 pb-24 pt-4 md:px-16 md:pb-32">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center grayscale opacity-[0.18] mix-blend-screen"
          style={{
            backgroundImage: `url("${heroLayerBack}")`,
            transform: `translate3d(0, ${scrollProgress * -180}px, 0) scale(1.12)`,
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0)_0%,rgba(10,10,10,0.52)_22%,rgba(10,10,10,0.82)_100%)]" />
        <img
          src={heroLayerPerson}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-42vh] z-40 hidden h-[128vh] w-[118vw] -translate-x-1/2 object-cover object-center grayscale opacity-[0.16] mix-blend-screen contrast-125 md:block"
          style={{
            transform: `translate3d(-50%, ${scrollProgress * 760}px, 0) scale(${1.02 + scrollProgress * 0.04})`,
          }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="sticky top-[72px] z-50 mb-8 bg-[#0A0A0A]/70 py-4 backdrop-blur-md">
            <FilterBar active={activeCategory} onChange={setActiveCategory} />
          </div>

          {filteredItems.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[0.32fr_1fr] lg:items-start">
              <aside className="sticky top-[150px] z-50 hidden min-h-[520px] border-l border-white/20 pl-6 lg:block">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#E24C4C]">
                  Proyecto activo
                </p>
                <div className="relative mt-8 aspect-[4/5] overflow-hidden border border-white/15 bg-white/5">
                  <Image
                    src={getCardImage(activeProject)}
                    alt={activeProject.titulo}
                    fill
                    className="object-cover grayscale transition-transform duration-700"
                    sizes="360px"
                  />
                </div>
                <p className="mt-6 text-sm font-black uppercase tracking-[0.22em] text-white/45">
                  {getCategoryLabel(activeProject)}
                </p>
                <h3 className="mt-3 text-4xl font-black leading-none text-white">
                  {activeProject.titulo}
                </h3>
                <p className="mt-5 text-sm font-medium leading-relaxed text-white/65">
                  {activeProject.descripcion}
                </p>
              </aside>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
                {filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    ref={(element) => {
                      projectRefs.current[index] = element;
                    }}
                    data-project-index={index}
                    onClick={() => handleCardClick(item)}
                    onFocus={() => setActiveProject(item)}
                    className={`group relative h-[360px] overflow-hidden border border-white/15 bg-white/5 text-left transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:border-white/50 hover:bg-white/10 md:h-[420px] ${getProjectScale(index)}`}
                    aria-label={`Ver preview de ${item.titulo}`}
                  >
                    <Image
                      src={getCardImage(item)}
                      alt={item.titulo}
                      fill
                      className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 720px"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.46)_62%,rgba(0,0,0,0.86)_100%)]" />
                    <div className="absolute left-4 top-4 z-50 border border-white/40 bg-black/35 px-3 py-2 text-xs font-black text-white backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 z-50 p-5">
                      <p className="text-[0.66rem] font-black uppercase tracking-[0.22em] text-[#F05A5A]">
                        {getCategoryLabel(item)}
                      </p>
                      <h4 className="mt-2 max-w-[520px] text-2xl font-black leading-tight text-white md:text-3xl">
                        {item.titulo}
                      </h4>
                      <p className="mt-3 line-clamp-2 max-w-[560px] text-sm font-medium leading-relaxed text-white/70">
                        {item.descripcion}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
}
