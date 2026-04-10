import Image from "next/image";
import { Proyecto } from "@/lib/projects";

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

export default function CarouselCard({ item, isMobile, onClick }: CarouselCardProps) {
  return (
    <div className={`flex-shrink-0 ${isMobile ? "w-full px-4" : "w-[400px] px-4"}`}>
      <button
        onClick={() => onClick(item)}
        className="w-full flex flex-col gap-6 bg-white rounded-2xl overflow-hidden text-left transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group"
        aria-label={`Ver preview de ${item.titulo}`}
      >
        <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={getCardImage(item)}
            alt={item.titulo}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes={isMobile ? "100vw" : "400px"}
          />

          {item.tipo === "video" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
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

        <div className="flex flex-col gap-2 px-2 pb-4">
          <h5 className="font-semibold text-xl text-black tracking-tight group-hover:text-[#525252] transition-colors">
            {item.titulo}
          </h5>
          <p className="font-medium text-lg text-black/55">{item.descripcion}</p>
        </div>
      </button>
    </div>
  );
}
