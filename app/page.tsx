import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCarousel from "@/components/FeatureCarousel";
import { categorias, perfil, todosLosProyectos } from "@/lib/projects";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />

      <section id="portafolio" className="relative overflow-hidden scroll-mt-14 bg-[#0A0A0A] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center grayscale opacity-20"
          style={{ backgroundImage: 'url("/assets/fotografia/capa1.jpg")' }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.72)_35%,rgba(10,10,10,0.95)_100%)]" />

        <div className="relative z-10 mx-auto grid max-w-[1400px] gap-8 border-b border-white/15 px-6 pb-10 pt-8 md:grid-cols-[0.45fr_1fr] md:px-16 md:pb-14 md:pt-10">
          <div className="flex items-start gap-4">
            <span className="mt-2 h-px w-14 bg-[#C83F3F]" />
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#C83F3F]">
              Selección
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-[1fr_0.46fr] md:items-end">
            <div>
              <h2 className="text-5xl font-black leading-none tracking-normal text-white md:text-7xl">
                Portafolio
              </h2>
              <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-white/65">
                Proyectos visuales, editoriales y audiovisuales organizados como un índice de trabajo: piezas para recorrer, abrir y comparar.
              </p>
            </div>
            <div className="grid grid-cols-2 border-y border-white/20 py-4 md:grid-cols-1 md:border-l md:border-y-0 md:pl-6">
              <div>
                <p className="text-3xl font-black leading-none">{todosLosProyectos.length}</p>
                <p className="mt-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-white/50">
                  Proyectos
                </p>
              </div>
              <div className="md:mt-6">
                <p className="text-3xl font-black leading-none">{categorias.length}</p>
                <p className="mt-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-white/50">
                  Categorías
                </p>
              </div>
            </div>
          </div>
        </div>

        <FeatureCarousel />
      </section>

      <footer id="contacto" className="bg-[#0A0A0A] text-white px-6 md:px-16 py-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-bold text-3xl tracking-tight">{perfil.nombre}</p>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">{perfil.profesion}</p>
            {perfil.disponible && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Disponible para proyectos
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Contacto</p>
            {perfil.correo && (
              <a href={`mailto:${perfil.correo}`}
                className="text-white/70 text-sm hover:text-white transition-colors">
                {perfil.correo}
              </a>
            )}
            {perfil.instagram && (
              <span className="text-white/70 text-sm">Instagram — {perfil.instagram}</span>
            )}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto border-t border-white/10 mt-16 pt-8">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} {perfil.nombreCompleto}. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
