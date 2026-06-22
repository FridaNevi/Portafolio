"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { perfil, todosLosProyectos } from "@/lib/projects";

const heroLayerBack = "/assets/fotografia/capa1.jpg";
const heroLayerPerson = "/assets/fotografia/capa2.png";

export default function Hero() {
  const [scrollState, setScrollState] = useState({ y: 0, vh: 1 });

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrollState({
          y: window.scrollY,
          vh: Math.max(1, window.innerHeight),
        });
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const travel = scrollState.y / scrollState.vh;
  const fadeStart = scrollState.vh * 1.45;
  const fadeRange = scrollState.vh * 0.9;
  const followOpacity = Math.max(
    0,
    1 - Math.max(0, scrollState.y - fadeStart) / fadeRange,
  );

  return (
    <section
      id="sobre-mi"
      className="relative min-h-[calc(100vh-56px)] overflow-hidden bg-[#0A0A0A] pt-[56px] text-white"
    >
      <img
        src={heroLayerPerson}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-[56px] z-[5] h-[calc(100vh-56px)] min-h-[620px] w-[108vw] object-cover object-center grayscale contrast-125 drop-shadow-[0_34px_34px_rgba(0,0,0,0.5)] will-change-transform"
        style={{
          opacity: followOpacity,
          transform: `translate3d(-50%, ${scrollState.y * 0.42}px, 0) scale(${1.02 + Math.min(travel, 1.6) * 0.035})`,
        }}
      />

      <div className="relative h-[calc(100vh-56px)] min-h-[620px] overflow-hidden">
        <div
          className="absolute inset-[-4%] bg-cover bg-center grayscale contrast-125"
          style={{
            backgroundImage: `url("${heroLayerBack}")`,
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.88)_0%,rgba(10,10,10,0.48)_26%,rgba(10,10,10,0.18)_52%,rgba(10,10,10,0.62)_78%,rgba(10,10,10,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_34%,rgba(10,10,10,0.38)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-[34vh] min-h-56 w-[18vw] min-w-48 -translate-x-1/2 -translate-y-1/2 border border-white/65 mix-blend-screen" />
        <div className="pointer-events-none absolute left-1/2 top-[12%] z-30 h-[76%] w-px -translate-x-1/2 bg-white/35 mix-blend-screen" />
        <div className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 z-30 h-px bg-white/20 mix-blend-screen" />

        <div className="relative z-40 mx-auto grid h-full w-full max-w-[1520px] grid-cols-1 grid-rows-[auto_1fr_auto] px-6 py-8 md:grid-cols-[0.92fr_1.18fr_0.9fr] md:grid-rows-[auto_1fr_auto] md:px-12 lg:px-16">
          <div className="flex items-start justify-between gap-6 md:col-span-3">
            <p className="max-w-[340px] border-b border-white/45 pb-3 text-[0.68rem] font-black uppercase tracking-[0.34em] text-white">
              Diseñadora de la Comunicación Gráfica
            </p>
            <p className="hidden max-w-[220px] text-right text-xs font-bold uppercase tracking-[0.28em] text-white/70 md:block">
              {perfil.ciudad} / Portafolio 2026
            </p>
          </div>

          <div className="flex flex-col justify-center gap-6 self-center md:col-start-1 md:row-start-2 md:pr-8">
            <h1 className="max-w-[680px] text-6xl font-black leading-[0.85] tracking-normal text-white sm:text-7xl md:-mr-36 md:text-8xl lg:text-9xl">
              {perfil.nombre}
            </h1>
            <div className="hidden items-center gap-4 text-xs font-black uppercase tracking-[0.28em] text-[#E24C4C] md:flex">
              <span className="h-px w-20 bg-[#E24C4C]" />
              Portafolio visual
            </div>
          </div>

          <div className="hidden md:col-start-3 md:row-start-2 md:flex md:flex-col md:justify-center md:gap-7 md:pl-8">
            <div className="flex flex-wrap gap-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-white">
              <span className="border border-white/35 px-3 py-2">Identidad</span>
              <span className="border border-white/35 px-3 py-2">Editorial</span>
              <span className="border border-white/35 px-3 py-2">Audiovisual</span>
            </div>
            <p className="max-w-[420px] text-lg font-medium leading-relaxed text-white/78">
              {perfil.bio}
            </p>
            <div className="grid max-w-[420px] grid-cols-2 border-y border-white/25 py-4">
              <div>
                <p className="text-3xl font-black leading-none">{todosLosProyectos.length}</p>
                <p className="mt-2 text-[0.66rem] font-black uppercase tracking-[0.24em] text-white/55">
                  Proyectos
                </p>
              </div>
              <div>
                <p className="text-3xl font-black leading-none">03</p>
                <p className="mt-2 text-[0.66rem] font-black uppercase tracking-[0.24em] text-white/55">
                  Disciplinas
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#portafolio"
                className="inline-flex items-center bg-white px-6 py-3 text-sm font-black text-[#0A0A0A] transition-colors hover:bg-white/85"
              >
                Ver trabajos
              </Link>
              <Link
                href="/#contacto"
                className="inline-flex items-center border border-white/35 px-6 py-3 text-sm font-black text-white transition-colors hover:border-white"
              >
                Contacto
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5 border-t border-white/25 pt-5 md:col-span-3 md:grid md:grid-cols-[0.92fr_1.18fr_0.9fr] md:items-end md:gap-0">
            <p className="max-w-[420px] text-base font-medium leading-relaxed text-white/78 md:hidden">
              {perfil.bio}
            </p>
            <div className="flex gap-3 md:col-start-1 md:hidden">
              <Link
                href="/#portafolio"
                className="inline-flex items-center bg-white px-5 py-3 text-sm font-black text-[#0A0A0A]"
              >
                Ver trabajos
              </Link>
              <Link
                href="/#contacto"
                className="inline-flex items-center border border-white/35 px-5 py-3 text-sm font-black text-white"
              >
                Contacto
              </Link>
            </div>
            <div className="hidden justify-self-center text-center text-[0.68rem] font-black uppercase tracking-[0.3em] text-white/60 md:block">
              Diseño / Imagen / Narrativa
            </div>
            {perfil.cv && (
              <a
                href={perfil.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-black text-white underline underline-offset-4 md:col-start-3 md:justify-self-end"
              >
                Descargar CV
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-40 bg-gradient-to-b from-transparent via-[#0A0A0A]/88 to-[#0A0A0A]" />
      </div>
    </section>
  );
}
