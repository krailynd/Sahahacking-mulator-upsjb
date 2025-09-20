export type ModuleSlug =
  | "proyectiles"
  | "oscilador-armonico"
  | "ondas"
  | "tiro-con-rozamiento"
  | "movimiento-circular"
  | "colisiones-2d"
  | "energia-trabajo"
  | "electroestatica"
  | "circuitos-dc"
  | "optica-geometrica"
  | "termodinamica"
  | "relatividad-basica";

export type ModuleLevel = "Básico" | "Intermedio" | "Avanzado";

export interface ModuleDefinition {
  slug: ModuleSlug;
  title: string;
  level: ModuleLevel;
  duration: string;
  summary: string;
  tags: [string, string, string];
  icon: string;
  featured?: boolean;
}

export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  {
    slug: "proyectiles",
    title: "Proyectiles",
    level: "Básico",
    duration: "45 min",
    summary:
      "Movimiento parabólico con resistencia del aire, viento y efectos gravitacionales",
    tags: ["Cinemática", "Trayectorias", "Resistencia del aire"],
    icon: "🚀",
    featured: true
  },
  {
    slug: "oscilador-armonico",
    title: "Oscilador Armónico",
    level: "Intermedio",
    duration: "55 min",
    summary:
      "Oscilaciones simples, amortiguadas y forzadas con análisis de resonancia",
    tags: ["Oscilaciones", "Resonancia", "Amortiguamiento"],
    icon: "📈",
    featured: true
  },
  {
    slug: "ondas",
    title: "Ondas",
    level: "Intermedio",
    duration: "70 min",
    summary: "Superposición, interferencia, batidos y mapas de calor 2D",
    tags: ["Ondas", "Interferencia", "Superposición"],
    icon: "🌊",
    featured: true
  },
  {
    slug: "tiro-con-rozamiento",
    title: "Tiro con Rozamiento",
    level: "Intermedio",
    duration: "60 min",
    summary:
      "Análisis avanzado de proyectiles con coeficientes de arrastre variables",
    tags: ["Dinámica", "Fluidos", "Coeficientes"],
    icon: "🎯"
  },
  {
    slug: "movimiento-circular",
    title: "Movimiento Circular",
    level: "Intermedio",
    duration: "50 min",
    summary:
      "Rotación, torque, momento de inercia y visualización de vectores",
    tags: ["Rotación", "Torque", "Vectores"],
    icon: "🌀"
  },
  {
    slug: "colisiones-2d",
    title: "Colisiones 2D",
    level: "Intermedio",
    duration: "65 min",
    summary:
      "Colisiones elásticas e inelásticas con conservación de momento y energía",
    tags: ["Conservación", "Momento", "Energía"],
    icon: "💥"
  },
  {
    slug: "energia-trabajo",
    title: "Energía y Trabajo",
    level: "Básico",
    duration: "40 min",
    summary:
      "Pozos de potencial, transformaciones energéticas y curvas de nivel",
    tags: ["Energía", "Trabajo", "Potencial"],
    icon: "⚡"
  },
  {
    slug: "electroestatica",
    title: "Electroestática",
    level: "Avanzado",
    duration: "80 min",
    summary:
      "Cargas puntuales, líneas de campo eléctrico y potencial interactivo",
    tags: ["Campos", "Potencial", "Cargas"],
    icon: "⚡"
  },
  {
    slug: "circuitos-dc",
    title: "Circuitos DC",
    level: "Intermedio",
    duration: "60 min",
    summary: "Análisis resistivo y transitorios RC con gráficas temporales",
    tags: ["Circuitos", "Resistencia", "Capacitancia"],
    icon: "🔌"
  },
  {
    slug: "optica-geometrica",
    title: "Óptica Geométrica",
    level: "Intermedio",
    duration: "55 min",
    summary: "Lentes, espejos y trazado de rayos interactivo en tiempo real",
    tags: ["Lentes", "Reflexión", "Refracción"],
    icon: "🔍"
  },
  {
    slug: "termodinamica",
    title: "Termodinámica",
    level: "Avanzado",
    duration: "75 min",
    summary: "Ciclos PV, máquinas térmicas y visualización de trabajo",
    tags: ["Ciclos", "Entropía", "Trabajo"],
    icon: "🌡️"
  },
  {
    slug: "relatividad-basica",
    title: "Relatividad Básica",
    level: "Avanzado",
    duration: "90 min",
    summary:
      "Dilatación temporal y contracción de longitud con visualizaciones",
    tags: ["Relatividad", "Tiempo", "Espacio"],
    icon: "🌌"
  }
];

export const FEATURED_MODULES = MODULE_DEFINITIONS.filter((module) => module.featured);
export const ALL_MODULES = MODULE_DEFINITIONS;

export function getModule(slug: ModuleSlug) {
  return MODULE_DEFINITIONS.find((module) => module.slug === slug);
}
