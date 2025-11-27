import { GoogleGenAI, Type } from "@google/genai";
import { EcologicalData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    individual: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de factores o intervenciones a nivel individual (actitudes, comportamientos, conocimientos).",
    },
    relationship: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de factores o intervenciones a nivel relacional (familia, amigos, redes sociales).",
    },
    community: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de factores o intervenciones a nivel comunitario (escuelas, lugares de trabajo, vecindarios).",
    },
    societal: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de factores o intervenciones a nivel social (normas culturales, políticas públicas, leyes).",
    },
  },
  required: ["individual", "relationship", "community", "societal"],
};

export const generateEcologicalModel = async (topic: string): Promise<EcologicalData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Genera un modelo ecológico (social-ecological model) detallado sobre el siguiente tema: "${topic}".
      
      Debes identificar factores de riesgo, factores de protección o estrategias de intervención relevantes para cada uno de los 4 niveles:
      1. Individual
      2. Relacional (Relationship)
      3. Comunitario (Community)
      4. Social (Societal)
      
      Responde estrictamente en español.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No se recibió respuesta del modelo.");
    }

    const data = JSON.parse(text) as EcologicalData;
    return data;
  } catch (error) {
    console.error("Error generating ecological model:", error);
    throw error;
  }
};