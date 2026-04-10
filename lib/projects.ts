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
    descripcion: "Cortometraje que utiliza el humo de un cigarrillo como transición visual para conectar el presente con el pasado. A través de fotografías, se construye una narrativa introspectiva basada en la memoria, apoyada en iluminación controlada, encuadres cerrados y ritmo pausado.",
    descripcionLarga: "Cortometraje de carácter introspectivo que emplea una transición visual basada en el humo de un cigarrillo como recurso narrativo para vincular dos tiempos: el presente y el pasado. La pieza inicia con un plano detalle del encendido del cigarro, enfatizando textura, iluminación y movimiento del humo. Este elemento se utiliza como puente de transición para dar paso a una secuencia centrada en fotografías, donde se construye la narrativa a través de la evocación visual de recuerdos. El lenguaje audiovisual se apoya en una puesta en escena minimalista, con iluminación controlada y encuadres cerrados que refuerzan la intimidad del personaje. El ritmo es pausado, priorizando la contemplación, mientras que el uso del montaje y las transiciones suaves permite una conexión orgánica entre memoria e imagen. El cortometraje explora la relación entre objeto, recuerdo y emoción, utilizando recursos visuales simples para generar una narrativa simbólica.",
    año: 2023,
    tags: ["Producción", "Fotografía"],
    thumbnail: "/assets/audiovisual/thumb-Recuerdos de Humo.jpg",
    videoUrl: "/assets/audiovisual/Recuerdos de Humo.mp4",
    duracion: "0:50",
  },
  {
  "id": "av-05",
  "tipo": "video",
  "categoria": "audiovisual",
  "titulo": "Sombras de amistad",
  "descripcion": "Cortometraje de estructura cíclica que contrapone presente y pasado mediante la transición entre dos amigas sentadas y su recuerdo jugando en el parque.",
  "descripcionLarga": "Cortometraje que explora la relación entre memoria, tiempo y vínculo emocional a través de una estructura narrativa cíclica. La pieza inicia con dos amigas sentadas en un entorno cotidiano, utilizando encuadres estáticos y composición equilibrada para transmitir quietud e intimidad. A partir de este punto, se introduce una transición hacia una secuencia en el parque, donde las mismas protagonistas aparecen jugando, representando un momento del pasado. El contraste entre ambas escenas se construye mediante variaciones en ritmo, movimiento y energía visual: el presente se mantiene contenido y contemplativo, mientras que el recuerdo se desarrolla con mayor dinamismo. Finalmente, la narrativa regresa a la escena inicial, reforzando la circularidad y subrayando la permanencia del vínculo. El uso de paralelismos visuales y gestos mínimos, como el movimiento de los pies, aporta realismo y sensibilidad al cierre.",
  "año": 2023,
  "tags": ["Producción", "Fotografía"],
  "thumbnail": "/assets/audiovisual/thumb-Sombras de Amistad.jpg",
  "videoUrl": "/assets/audiovisual/Sombras de Amistad.mp4",
  "duracion": "0:30"
},
  {
  "id": "av-06",
  "tipo": "video",
  "categoria": "audiovisual",
  "titulo": "Trayectorias efímeras",
  "descripcion": "Cortometraje que retrata encuentros fugaces entre personas y las huellas invisibles que dejan en instantes breves.",
  "descripcionLarga": "Cortometraje que explora la naturaleza transitoria de los encuentros humanos a través de una narrativa contemplativa y fragmentada. La pieza presenta una serie de momentos en los que distintas trayectorias individuales se cruzan de manera breve, utilizando encuadres cuidados y ritmo pausado para enfatizar la sutileza de cada interacción. A través de miradas, silencios y acciones mínimas, se construye una atmósfera introspectiva que resalta la carga emocional de lo efímero. La estructura se apoya en la repetición y el paralelismo visual para reforzar la idea de ciclos y coincidencias, sugiriendo que, aunque los encuentros sean pasajeros, dejan una marca significativa en la percepción y la memoria de los personajes. El cortometraje propone una reflexión sobre el tiempo, la conexión humana y la importancia de los instantes aparentemente insignificantes.",
  "año": 2023,
  "tags": ["Producción", "Dirección", "Fotografía"],
  "thumbnail": "/assets/audiovisual/thumb-Trayectorias Efimeras.jpg",
  "videoUrl": "/assets/audiovisual/Trayectorias Efimeras.mp4",
  "duracion": "0:38"
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
    titulo: "It’s Okay",
    descripcion: "Cartel conceptual que explora la dualidad emocional y la normalización del dolor bajo una estética urbana y experimental.",
    descripcionLarga:
      "Cartel de enfoque conceptual que aborda la contradicción entre la aparente aceptación emocional y el caos interno. La composición se centra en un rostro intervenido con elementos gráficos agresivos: ojos en tonos neón, goteos y distorsiones que simbolizan desgaste psicológico y saturación emocional. La tipografía, en estilo distorsionado y de alto contraste, refuerza el mensaje irónico del título 'It’s Okay'. Se emplea una estética grunge con texturas desgastadas, ruido visual y superposición de capas para generar una sensación de deterioro y crudeza. El uso de colores vibrantes sobre fondo oscuro potencia el impacto visual y dirige la atención al conflicto central de la pieza. Inspirado en lenguajes visuales contemporáneos como el glitch, el arte urbano y la gráfica musical alternativa.",
    año: 2024,
    tags: ["Tipografía", "Arte conceptual", "Grunge", "Diseño experimental"],
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
    descripcion: "Estudio natural centrado en la delicadeza orgánica y el contraste cromático.",
    descripcionLarga:
      "Serie fotográfica enfocada en la observación de la naturaleza desde una perspectiva íntima. La composición prioriza el punto de atención en las flores mediante profundidad de campo y contraste con el fondo oscuro. Se trabaja el color como elemento expresivo, resaltando tonos rosados frente a verdes profundos para generar equilibrio visual y sensibilidad.",
    año: 2024,
    tags: ["Naturaleza", "Color", "Detalle"],
    src: "/assets/fotografia/Floreces callada.jpeg",
    galeria: [
      "/assets/fotografia/Floreces callada.jpeg"
    ],
  },
  {
    id: "foto-02",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Geometría suspendida",
    descripcion: "Exploración de líneas, ángulos y espacio negativo en arquitectura.",
    descripcionLarga:
      "Fotografía urbana que utiliza la arquitectura como lenguaje visual para construir una composición basada en geometría y minimalismo. El encuadre enfatiza líneas diagonales y contraste entre luz y sombra, generando tensión visual. El uso del espacio negativo refuerza la sensación de aislamiento y orden estructural.",
    año: 2024,
    tags: ["Urbana", "Minimalismo", "Arquitectura"],
    src: "/assets/fotografia/Geometría suspendida.jpeg",
    galeria: [
      "/assets/fotografia/Geometría suspendida.jpeg"
    ],
  },
  {
    id: "foto-03",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Memorias y silencio",
    descripcion: "Registro visual de la memoria y el paso del tiempo en espacios funerarios.",
    descripcionLarga:
      "Serie documental que explora el simbolismo de la muerte y la memoria a través de elementos arquitectónicos funerarios. El uso de blanco y negro elimina distracciones cromáticas, enfocando la atención en formas, texturas y luz natural. La composición busca transmitir solemnidad, quietud y permanencia.",
    año: 2024,
    tags: ["Documental", "Blanco y negro", "Memoria"],
    src: "/assets/fotografia/Memorias y Silencio.jpeg",
    galeria: [
      "/assets/fotografia/Memorias y Silencio.jpeg",
      "/assets/fotografia/Tumbas olvidadas.jpeg",
      "/assets/fotografia/Trascendencia.jpeg"
    ],
  },
  {
    id: "foto-04",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Sombra del jinete",
    descripcion: "Figura monumental capturada en contraluz durante el atardecer.",
    descripcionLarga:
      "Fotografía que utiliza la silueta como recurso principal para enfatizar forma y narrativa. El contraluz crea una figura dominante frente a un cielo dinámico, donde la luz natural y las nubes aportan dramatismo. La composición dirige la mirada hacia el sujeto, generando una sensación épica y contemplativa.",
    año: 2023,
    tags: ["Contraluz", "Paisaje", "Figura"],
    src: "/assets/fotografia/Sombra del Jinete.jpeg",
    galeria: [
      "/assets/fotografia/Sombra del Jinete.jpeg"
    ],
  },
  {
    id: "foto-05",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Tradición ambulante",
    descripcion: "Escena cotidiana que retrata identidad cultural en movimiento.",
    descripcionLarga:
      "Fotografía documental que captura un instante de la vida cotidiana en un entorno urbano. La composición utiliza elementos arquitectónicos para enmarcar al sujeto, mientras el blanco y negro resalta la narrativa y elimina distracciones. Se busca destacar la relación entre espacio, cultura y actividad humana.",
    año: 2023,
    tags: ["Documental", "Cultura", "Blanco y negro"],
    src: "/assets/fotografia/Tradición Ambulante.jpeg",
    galeria: [
      "/assets/fotografia/Tradición Ambulante.jpeg"
    ],
  },
  {
    id: "foto-06",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Trascendencia",
    descripcion: "Símbolos religiosos como representación de permanencia y fe.",
    descripcionLarga:
      "Fotografía conceptual centrada en un símbolo religioso aislado sobre un fondo limpio. La composición minimalista permite enfatizar la forma y el significado del objeto, mientras el contraste entre figura y cielo genera una lectura clara y directa. La imagen busca transmitir permanencia, espiritualidad y elevación.",
    año: 2023,
    tags: ["Conceptual", "Minimalismo", "Simbolismo"],
    src: "/assets/fotografia/Trascendencia.jpeg",
    galeria: [
      "/assets/fotografia/Trascendencia.jpeg",
      "/assets/fotografia/Tumbas olvidadas.jpeg",
      "/assets/fotografia/Memorias y Silencio.jpeg"
    ],
  },
  {
    id: "foto-07",
    tipo: "imagen",
    categoria: "fotografia",
    titulo: "Tumbas olvidadas",
    descripcion: "Espacio intervenido por el tiempo que refleja abandono y memoria.",
    descripcionLarga:
      "Fotografía documental que explora el deterioro y la permanencia en espacios funerarios. La composición amplia permite observar el entorno completo, integrando arquitectura, naturaleza y luz. Se busca transmitir una sensación de abandono, pero también de continuidad en el paisaje.",
    año: 2023,
    tags: ["Documental", "Paisaje", "Memoria"],
    src: "/assets/fotografia/Tumbas olvidadas.jpeg",
    galeria: [
      "/assets/fotografia/Tumbas olvidadas.jpeg",
      "/assets/fotografia/Memorias y Silencio.jpeg",
      "/assets/fotografia/Trascendencia.jpeg"
    ],
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
    titulo: "Figaro Pho — Sombras internas",
    descripcion: "Ilustración de estilo oscuro con influencia expresionista, generada con IA y refinada mediante edición digital.",
    descripcionLarga:
      "Ilustración conceptual inspirada en una estética oscura y emocional, con referencias al estilo gótico y expresionista. La base visual fue generada mediante herramientas de inteligencia artificial, seguida de un proceso de edición digital enfocado en ajuste de contraste, textura y composición para reforzar la narrativa. La pieza explora la ansiedad y el miedo interno a través de la exageración de rasgos, el uso del blanco y negro y una atmósfera cargada de tensión visual. La tipografía y el entorno refuerzan el carácter introspectivo del personaje.",
    año: 2024,
    tags: ["IA + Edición", "Expresionista", "Blanco y negro"],
    src: "/assets/ilustraciones/ilustracion-01.jpeg",
    galeria: [
      "/assets/ilustraciones/ilustracion-01.jpeg"
    ],
  },
  {
    id: "ilus-02",
    tipo: "imagen",
    categoria: "ilustraciones",
    titulo: "El Conde — Salsa artesanal",
    descripcion: "Ilustración digital con enfoque gráfico y comercial orientado a identidad de producto.",
    descripcionLarga:
      "Ilustración digital desarrollada con enfoque en diseño gráfico comercial. La composición utiliza elementos icónicos como el chile y el fuego para comunicar intensidad y carácter del producto. Se emplea una paleta de alto contraste sobre fondo oscuro para maximizar impacto visual, junto con tipografía de estilo clásico que aporta identidad y recordación. La pieza busca equilibrar claridad comunicativa con estética atractiva, funcionando como propuesta de branding o cartel publicitario.",
    año: 2024,
    tags: ["Diseño gráfico", "Branding", "Ilustración digital"],
    src: "/assets/ilustraciones/ilustracion-02.jpeg",
    galeria: [
      "/assets/ilustraciones/ilustracion-02.jpeg"
    ],
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
  correo: "fridaninel@gmail.com",
  instagram: "@heyfrida___",
  linkedin: "linkedin.com/in/fridaninel",
  cv: "/assets/cv-frida-ninel.pdf",
  foto: "/assets/fotografia/principal.jpeg",
  ciudad: "Durango",
  disponible: true,
};