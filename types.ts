export interface EcologicalData {
  individual: string[];
  relationship: string[];
  community: string[];
  societal: string[];
}

export enum LayerType {
  INDIVIDUAL = 'individual',
  RELATIONSHIP = 'relationship',
  COMMUNITY = 'community',
  SOCIETAL = 'societal',
}

export interface LayerConfig {
  id: LayerType;
  label: string;
  fullLabel?: string;
  description: string;
  color: string;
  ringColor: string;
  textColor: string;
}
