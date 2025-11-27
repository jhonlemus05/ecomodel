import { LayerType, LayerConfig } from "./types";

export const LAYER_CONFIGS: Record<LayerType, LayerConfig> = {
  [LayerType.SOCIETAL]: {
    id: LayerType.SOCIETAL,
    label: "No Relaciono",
    fullLabel: "Personas con las que no me relaciono",
    description: "Círculo más grande (afuera). Personas que no aportan a mis metas actuales.",
    color: "bg-indigo-900", // Tailwind class for background
    ringColor: "ring-indigo-700", // Tailwind class for ring/stroke
    textColor: "text-indigo-900"
  },
  [LayerType.COMMUNITY]: {
    id: LayerType.COMMUNITY,
    label: "Representativas",
    fullLabel: "Personas más representativas",
    description: "Red educativa, profesional y social de apoyo.",
    color: "bg-blue-600",
    ringColor: "ring-blue-500",
    textColor: "text-blue-600"
  },
  [LayerType.RELATIONSHIP]: {
    id: LayerType.RELATIONSHIP,
    label: "Familia",
    fullLabel: "Familia",
    description: "Círculo familiar inmediato y apoyo emocional.",
    color: "bg-sky-400",
    ringColor: "ring-sky-300",
    textColor: "text-sky-500"
  },
  [LayerType.INDIVIDUAL]: {
    id: LayerType.INDIVIDUAL,
    label: "YO",
    fullLabel: "YO (Centro)",
    description: "Estudiante de Ingenieria en sistemas.",
    color: "bg-teal-200",
    ringColor: "ring-teal-100",
    textColor: "text-teal-700"
  }
};

// Updated Data based on user prompt
export const INITIAL_DATA = {
  individual: [
    "Motivación: Crecer profesionalmente en programación y tecnología",
    "Motivación: Tener estabilidad económica",
    "Motivación: Aprovechar las oportunidades educativas gratuitas que ofrece el gobierno"
  ],
  relationship: [
    "Mi mamá: apoyo total emocional, económico y logístico",
    "Vivimos juntos en otra ciudad a la que nos mudamos para facilitar mis estudios"
  ],
  community: [
    "Universidad en línea",
    "SENA virtual",
    "Compañeros y docentes del diplomado presencial MinTIC (gratuito)",
    "Amigos cercanos de los cursos"
  ],
  societal: [
    "Personas que no aportan a mis metas actuales",
    "Relaciones tóxicas o que generan distracción",
    "Algunas amistades del pasado que ya no comparten mis intereses educativos"
  ],
};
