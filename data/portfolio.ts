export type Categoria =
  | "audiovisual"
  | "bocetos"
  | "branding"
  | "libro"
  | "carteles"
  | "fotografia"
  | "ilustraciones";

export interface ProyectoBase {
  id: string;
  titulo: string;
  descripcion: string;
  descripcionLarga: string;
  año: number;
  tags: string[];
  categoria: Categoria;
}

export interface ProyectoImagen extends ProyectoBase {
  tipo: "imagen";
  src: string;
  srcAlt?: string;
  galeria?: string[];
  pdf?: string;
}

export interface ProyectoVideo extends ProyectoBase {
  tipo: "video";
  thumbnail: string;
  videoUrl: string;
  duracion: string;
}

export interface ProyectoLibro extends ProyectoBase {
  tipo: "libro";
  portada: string;
  paginas: string[];
  pdf?: string;
  totalPaginas: number;
  formato: string;
}

export type Proyecto = ProyectoImagen | ProyectoVideo | ProyectoLibro;

// ─────────────────────────────────────────────────────────────────────────────
// AUDIOVISUAL
// ─────────────────────────────────────────────────────────────────────────────
export const audiovisual: ProyectoVideo[] = [
  {
    id: "av-01",
    tipo: "video",
    categoria: "audiovisual",
    titulo: "Calma",
    descripcion:
      "Es un cortometraje que explora la introspección y el silencio emocional a través de una narrativa visual contemplativa, mediante atmósferas pausadas y una estética sensible.",
    descripcionLarga:
      "Retrata un momento íntimo de conexión interna, donde la quietud se convierte en un espacio para sentir, pensar y simplemente existir.",
    año: 2024,
    tags: ["Dirección: frida ninel", "Guión: frida ninel", "Edición: frida ninel"],
    thumbnail: "/assets/audiovisual/thumb-Calma.jpg",
    videoUrl: "/assets/audiovisual/Calma.mp4",
    duracion: "0:34",
  },
  {
    id: "av-02",
    tipo: "video",
    categoria: "audiovisual",
    titulo: "Donde el silencio habla",
    descripcion:
      "Cortometraje narrado que reflexiona sobre la soledad y el mundo interior. A través de imágenes de la ciudad y la presencia de una joven, la historia construye un diálogo entre el entorno y los pensamientos.",
    descripcionLarga:
      "Quería expresar la voz profunda que tenemos, que a veces nos revela lo que sentimos y pensamos pero no hablamos, y cómo eso provoca el ruido de todos los días.",
    año: 2023,
    tags: ["Producción", "Fotografía"],
    thumbnail: "/assets/audiovisual/thumb-Donde el silencio habla.jpg",
    videoUrl: "/assets/audiovisual/Donde el silencio habla.mp4",
    duracion: "0:49",
  },
  {
    id: "av-03",
    tipo: "video",
    categoria: "audiovisual",
    titulo: "La mecánica del desencanto",
    descripcion:
      "Se muestran juegos mecánicos de feria mientras es narrado un poema, donde la ilusión expresa el proceso interno de perder una narrativa íntima y simbólica.",
    descripcionLarga:
      "En este cortometraje se muestran juegos mecánicos de feria mientras es narrado un poema donde la ilusión expresa el proceso interno de una narrativa íntima y simbólica. Todo esto a través de una narrativa íntima y simbólica, retrata cómo las emociones se transforman con el tiempo, mostrando el desencanto no como un final, sino como una etapa inevitable en la comprensión.",
    año: 2025,
    tags: ["Producción y Fotografía: frida ninel"],
    thumbnail: "/assets/audiovisual/thumb-La Mecánica del Desencanto.jpg",
    videoUrl: "/assets/audiovisual/La Mecánica del Desencanto.mp4",
    duracion: "4:46",
  },
  {
    id: "av-04",
    tipo: "video",
    categoria: "audiovisual",
    titulo: "Recuerdos de humo",
    descripcion: "ortometraje que utiliza el humo de un cigarrillo como transición visual para conectar el presente con el pasado. A través de fotografías, se construye una narrativa introspectiva basada en la memoria, apoyada en iluminación controlada, encuadres cerrados y ritmo pausado.",
    descripcionLarga: "Cortometraje de carácter introspectivo que emplea una transición visual basada en el humo de un cigarrillo como recurso narrativo para vincular dos tiempos: el presente y el pasado. La pieza inicia con un plano detalle del encendido del cigarro, enfatizando textura, iluminación y movimiento del humo. Este elemento se utiliza como puente de transición para dar paso a una secuencia centrada en fotografías, donde se construye la narrativa a través de la evocación visual de recuerdos. El lenguaje audiovisual se apoya en una puesta en escena minimalista, con iluminación controlada y encuadres cerrados que refuerzan la intimidad del personaje. El ritmo es pausado, priorizando la contemplación, mientras que el uso del montaje y las transiciones suaves permite una conexión orgánica entre memoria e imagen. El cortometraje explora la relación entre objeto, recuerdo y emoción, utilizando recursos visuales simples para generar una narrativa simbólica.",
    año: 2023,
    tags: ["Producción", "Fotografía"],
    thumbnail: "/assets/audiovisual/thumb-Recuerdos de Humo.jpg",
    videoUrl: "/assets/audiovisual/Recuerdos de Humo.mp4",
    duracion: "0:00",
  },
  {
    id: "av-05",
    tipo: "video",
    categoria: "audiovisual",
    titulo: "Sombras de amistad",
    descripcion: "Breve sinopsis del cortometraje.",
    descripcionLarga:
      "Descripción extendida. Contexto de producción, inspiraciones, proceso creativo y resultado final.",
    año: 2023,
    tags: ["Producción", "Fotografía"],
    thumbnail: "/assets/audiovisual/thumb-Sombras de Amistad.jpg",
    videoUrl: "/assets/audiovisual/Sombras de Amistad.mp4",
    duracion: "0:00",
  },
  {
    id: "av-06",
    tipo: "video",
    categoria: "audiovisual",
    titulo: "Trayectorias efímeras",
    descripcion: "Breve sinopsis del cortometraje.",
    descripcionLarga:
      "Descripción extendida. Contexto de producción, inspiraciones, proceso creativo y resultado final.",
    año: 2023,
    tags: ["Producción", "Fotografía"],
    thumbnail: "/assets/audiovisual/thumb-Trayectorias Efimeras.jpg",
    videoUrl: "/assets/audiovisual/Trayectorias Efimeras.mp4",
    duracion: "0:00",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BOCETOS
// ─────────────────────────────────────────────────────────────────────────────
export const bocetos: ProyectoImagen[] = [
  {
    id: "boc-01",
    tipo: "imagen",
    categoria: "bocetos",
    titulo: "Wireframe de Portafolio Personal",
    descripcion:
      "Boceto inicial de la estructura del portafolio digital, donde se definen las secciones principales y la organización del contenido.",
    descripcionLarga:
      "Este boceto corresponde a la etapa de planificación del portafolio web, donde se explora la estructura general de la página antes de su desarrollo. Se plantean secciones clave como presentación, contenido audiovisual, galería fotográfica, diseños, proyectos web y contacto.\n\nEl objetivo fue definir una jerarquía clara de información y una navegación intuitiva, priorizando una experiencia visual limpia y organizada. A través de trazos simples en libreta, se distribuyen los elementos principales como bloques tipo grid, carruseles y tarjetas de contenido.\n\nEste tipo de boceto forma parte del proceso creativo y de diseño UX/UI, permitiendo iterar ideas rápidamente antes de llevarlas a una implementación digital.",
    año: 2026,
    tags: ["Wireframe", "UX/UI", "Planeación", "Portafolio", "Proceso creativo"],
    src: "/assets/bocetos/boceto-01.png",
    galeria: ["/assets/bocetos/boceto-01.png"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BRANDING
// ─────────────────────────────────────────────────────────────────────────────
export const branding: ProyectoImagen[] = [
  {
    id: "brand-01",
    tipo: "imagen",
    categoria: "branding",
    titulo: "Manual de Identidad — Ninelicus",
    descripcion: "Sistema de identidad gráfica para Ninelicus. Manual completo de marca.",
    descripcionLarga:
      "Descripción completa del proyecto de branding: brief del cliente, investigación, conceptualización, construcción del logotipo, paleta cromática, tipografía, aplicaciones de marca y entregables finales. Habla de la estrategia detrás de las decisiones estéticas.",
    año: 2024,
    tags: ["Logotipo", "Sistema visual", "Identidad", "Manual de marca"],
    src: "/assets/branding/p01.jpg",   
    pdf: "/assets/branding/manual de identidad ninelicus.pdf",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LIBRO
// ─────────────────────────────────────────────────────────────────────────────
export const libro: ProyectoLibro[] = [
  {
    id: "libro-01",
    tipo: "libro",
    categoria: "libro",
    titulo: "El despertar de Orión",
    descripcion: "Diseño editorial de obra literaria.",
    descripcionLarga:
      "Descripción completa del proyecto editorial: concepto del libro, tipo de contenido, público objetivo, decisiones tipográficas, sistema de grillas, tratamiento de imágenes, jerarquía visual, paleta cromática y proceso de maquetación.",
    año: 2024,
    tags: ["Diseño editorial", "Tipografía", "Maquetación", "InDesign"],
    portada: "/assets/libro/El despertar de Orión.jpg",
    paginas: [],
    totalPaginas: 0,
    formato: "A4 horizontal — 000 páginas",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CARTELES
// ─────────────────────────────────────────────────────────────────────────────
export const carteles: ProyectoImagen[] = [
  {
    id: "cartel-01",
    tipo: "imagen",
    categoria: "carteles",
    titulo: "Título del Cartel 01",
    descripcion: "Propósito del cartel: evento, campaña, concurso, proyecto personal.",
    descripcionLarga:
      "Descripción del concepto del cartel: mensaje central, decisiones tipográficas, composición, uso del color y técnica. Contexto del encargo o proyecto.",
    año: 2024,
    tags: ["Tipografía", "Composición", "Cartel cultural"],
    src: "/assets/carteles/cartel-01.jpeg",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FOTOGRAFÍA
// ─────────────────────────────────────────────────────────────────────────────
export const fotografia: ProyectoImagen[] = [
  {
    id: "foto-01",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Floreces callada",
    descripcion: "Descripción breve: tema, locación, concepto estético.",
    descripcionLarga:
      "Descripción de la pieza fotográfica: concepto visual, proceso de búsqueda, decisiones de composición, iluminación, edición y lo que busca comunicar.",
    año: 2024,
    tags: ["Retrato", "Serie"],
    src: "/assets/fotografia/Floreces callada.jpeg",
    galeria: ["/assets/fotografia/Floreces callada.jpeg"],
  },
  {
    id: "foto-02",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Geometría suspendida",
    descripcion: "Descripción breve: tema, locación, concepto estético.",
    descripcionLarga: "Descripción extendida.",
    año: 2024,
    tags: ["Urbana", "Composición"],
    src: "/assets/fotografia/Geometría suspendida.jpeg",
    galeria: ["/assets/fotografia/Geometría suspendida.jpeg"],
  },
  {
    id: "foto-03",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Memorias y silencio",
    descripcion: "Descripción breve: tema, locación, concepto estético.",
    descripcionLarga: "Descripción extendida.",
    año: 2024,
    tags: ["Documental", "Memoria"],
    src: "/assets/fotografia/Memorias y Silencio.jpeg",
    galeria: ["/assets/fotografia/Memorias y Silencio.jpeg"],
  },
  {
    id: "foto-04",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Sombra del jinete",
    descripcion: "Descripción breve: tema, locación, concepto estético.",
    descripcionLarga: "Descripción extendida.",
    año: 2023,
    tags: ["Retrato", "Luz natural"],
    src: "/assets/fotografia/Sombra del Jinete.jpeg",
    galeria: ["/assets/fotografia/Sombra del Jinete.jpeg"],
  },
  {
    id: "foto-05",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Tradición ambulante",
    descripcion: "Descripción breve: tema, locación, concepto estético.",
    descripcionLarga: "Descripción extendida.",
    año: 2023,
    tags: ["Documental", "Cultura"],
    src: "/assets/fotografia/Tradición Ambulante.jpeg",
    galeria: ["/assets/fotografia/Tradición Ambulante.jpeg"],
  },
  {
    id: "foto-06",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Trascendencia",
    descripcion: "Descripción breve: tema, locación, concepto estético.",
    descripcionLarga: "Descripción extendida.",
    año: 2023,
    tags: ["Retrato", "Conceptual"],
    src: "/assets/fotografia/Trascendencia.jpeg",
    galeria: ["/assets/fotografia/Trascendencia.jpeg"],
  },
  {
    id: "foto-07",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Tumbas olvidadas",
    descripcion: "Descripción breve: tema, locación, concepto estético.",
    descripcionLarga: "Descripción extendida.",
    año: 2023,
    tags: ["Documental", "Memoria"],
    src: "/assets/fotografia/Tumbas olvidadas.jpeg",
    galeria: ["/assets/fotografia/Tumbas olvidadas.jpeg"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ILUSTRACIONES
// ─────────────────────────────────────────────────────────────────────────────
export const ilustraciones: ProyectoImagen[] = [
  {
    id: "ilus-01",
    tipo: "imagen",
    categoria: "ilustraciones",
    titulo: "Título de la Ilustración 01",
    descripcion: "Técnica y tema central de la ilustración.",
    descripcionLarga:
      "Descripción extendida de la ilustración: concepto, proceso, técnica, referentes visuales, significado simbólico y contexto del proyecto.",
    año: 2024,
    tags: ["Acuarela", "Ilustración editorial"],
    src: "/assets/ilustraciones/ilustracion-01.jpeg",
    galeria: ["/assets/ilustraciones/ilustracion-01.jpeg"],
  },
  {
    id: "ilus-02",
    tipo: "imagen",
    categoria: "ilustraciones",
    titulo: "Título de la Ilustración 02",
    descripcion: "Técnica y tema.",
    descripcionLarga:
      "Descripción del proceso creativo, técnica y decisiones estéticas.",
    año: 2024,
    tags: ["Digital", "Ilustración de personaje"],
    src: "/assets/ilustraciones/ilustracion-02.jpeg",
    galeria: ["/assets/ilustraciones/ilustracion-02.jpeg"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTACIÓN AGRUPADA
// ─────────────────────────────────────────────────────────────────────────────
export const todosLosProyectos: Proyecto[] = [
  ...audiovisual,
  ...bocetos,
  ...branding,
  ...libro,
  ...carteles,
  ...fotografia,
  ...ilustraciones,
];

export const categorias: { id: Categoria; label: string; count: number }[] = [
  { id: "audiovisual",   label: "Audiovisual",   count: audiovisual.length },
  { id: "bocetos",       label: "Bocetos",        count: bocetos.length },
  { id: "branding",      label: "Branding",       count: branding.length },
  { id: "libro",         label: "Libro",          count: libro.length },
  { id: "carteles",      label: "Carteles",       count: carteles.length },
  { id: "fotografia",    label: "Fotografía",     count: fotografia.length },
  { id: "ilustraciones", label: "Ilustraciones",  count: ilustraciones.length },
];

// ─────────────────────────────────────────────────────────────────────────────
// PERFIL
// ─────────────────────────────────────────────────────────────────────────────
export const perfil = {
  nombre: "Frida Ninel",
  apellidos: "Espituñal Villanueva",
  nombreCompleto: "Frida Ninel Espituñal Villanueva",
  profesion: "Diseñadora de la Comunicación Gráfica",
  tagline: "Diseño que cuenta historias.",
  bio: `Soy diseñadora de la comunicación gráfica con enfoque en identidad visual, diseño editorial y producción audiovisual. 
Creo desde el concepto hasta el resultado final, buscando que cada pieza comunique con intención y carácter.`,
  bioExtendida: `
Artista visual y escritora mexicana. Mi trabajo explora la intimidad, la memoria y el silencio a través del cine, la escritura y la imagen. Desarrollo proyectos audiovisuales y literarios con una mirada introspectiva, centrada en lo emocional, lo cotidiano y aquello que no siempre se dice, pero se siente.
  `,
  correo: "frida@email.com",
  instagram: "@frida.ninel",
  x: "behance.net/fridaninel",
  linkedin: "linkedin.com/in/fridaninel",
  cv: "/assets/cv-frida-ninel.pdf",
  foto: "/assets/fotografia/principal.jpeg",
  ciudad: "México",
  disponible: true,
};