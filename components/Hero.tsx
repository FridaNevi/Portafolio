import Image from "next/image";
import Link from "next/link";
import { perfil } from "@/lib/projects";

export default function Hero() {
  return (
    <section id="sobre-mi" className="min-h-screen flex items-center pt-[56px]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16 py-16 md:py-24">
          {/* Left: text */}
          <div className="flex flex-col gap-6 md:gap-8 md:w-[45%] md:flex-shrink-0">
            <h1 className="font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-[#0A0A0A]">
              {perfil.nombre}
            </h1>
            <p className="text-[#737373] text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed max-w-[480px]">
              {perfil.bio}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contacto"
                className="inline-flex items-center self-start bg-[#0A0A0A] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#262626] transition-colors"
              >
                Contactame
              </Link>
              {perfil.cv && (
                <a
                  href={perfil.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 self-start border border-[#D4D4D4] text-[#0A0A0A] text-sm font-semibold px-6 py-3 rounded-full hover:border-[#0A0A0A] transition-colors"
                >
                  Descargar CV
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Right: photo */}
          <div className="md:w-[55%] md:flex-shrink-0">
            <div className="relative w-full aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden bg-[#E5E5E5]">
              <Image
                src={perfil.foto}
                alt={perfil.nombre}
                fill
                priority
                className="object-cover object-center grayscale"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
