import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCarousel from "@/components/FeatureCarousel";
import { perfil, todosLosProyectos } from "@/lib/projects";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />

      <section id="portafolio" className="scroll-mt-14">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 pt-20 pb-2">
          <h2 className="font-bold text-[clamp(2rem,5vw,3rem)] tracking-tight text-[#0A0A0A]">
            Portafolio
          </h2>
          <p className="text-[#A3A3A3] text-sm mt-1">
            {todosLosProyectos.length} proyectos
          </p>
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
