import Image from "next/image";
import { categorias, Proyecto } from "@/lib/projects";

interface CarouselCardProps {
  item: Proyecto;
  isMobile: boolean;
  onClick: (project: Proyecto) => void;
}

function getCardImage(item: Proyecto): string {
  if (item.tipo === "imagen") return item.src;
  if (item.tipo === "video") return item.thumbnail;
  return item.portada;
}

function getCategoryLabel(item: Proyecto): string {
  return categorias.find((categoria) => categoria.id === item.categoria)?.label ?? item.categoria;
}

export default function CarouselCard({ item, isMobile, onClick }: CarouselCardProps) {
  return (
    <div className={`flex-shrink-0 ${isMobile ? "w-full px-3" : "w-[420px] px-4"}`}>
      <button
        onClick={() => onClick(item)}
        className="group flex w-full cursor-pointer flex-col gap-5 overflow-hidden border border-[#0A0A0A]/10 bg-white/70 p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#0A0A0A]/25 hover:bg-white hover:shadow-2xl"
        aria-label={`Ver preview de ${item.titulo}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#E5E5E5]">
          <Image
            src={getCardImage(item)}
            alt={item.titulo}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes={isMobile ? "100vw" : "400px"}
          />

          {item.tipo === "video" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
              <div className="flex h-12 w-12 items-center justify-center bg-white/90 shadow-lg">
                <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {item.tipo === "libro" && item.totalPaginas > 0 && (
            <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-medium px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {item.totalPaginas} págs.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 px-1 pb-2">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-[#C83F3F]">
            {getCategoryLabel(item)}
          </p>
          <h5 className="text-2xl font-black tracking-normal text-black transition-colors group-hover:text-[#525252]">
            {item.titulo}
          </h5>
          <p className="text-base font-medium leading-relaxed text-black/55">{item.descripcion}</p>
        </div>
      </button>
    </div>
  );
}
