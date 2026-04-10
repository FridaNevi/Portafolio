"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]">
      <nav className="flex items-center justify-between px-6 py-3 max-w-[1400px] mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white hover:opacity-80 transition-opacity"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M11 1v20M1 11h20M3.808 3.808l14.384 14.384M18.192 3.808 3.808 18.192"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-semibold text-sm tracking-tight leading-tight hidden sm:block">
            Frida Ninel
          </span>
          <span className="font-semibold text-sm tracking-tight leading-tight sm:hidden">
            Frida{"\n"}Ninel
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/#sobre-mi"
            className="text-white/80 text-sm font-medium hover:text-white transition-colors"
          >
            Sobre mí
          </Link>
          <Link
            href="/#portafolio"
            className="text-[#0A0A0A] bg-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-white/90 transition-colors"
          >
            Trabajos
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/#portafolio"
            className="text-[#0A0A0A] bg-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors"
          >
            Trabajos
          </Link>
        </div>
      </nav>
    </header>
  );
}
