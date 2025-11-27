import React, { useState } from 'react';
import { LayerType, LayerConfig } from '../types';

interface EcologicalVisualizerProps {
  activeLayer: LayerType;
  onLayerSelect: (layer: LayerType) => void;
  layers: Record<LayerType, LayerConfig>;
  isLoading: boolean;
}

export const EcologicalVisualizer: React.FC<EcologicalVisualizerProps> = ({ 
  activeLayer, 
  onLayerSelect, 
  layers,
  isLoading
}) => {
  const [hoverLayer, setHoverLayer] = useState<LayerType | null>(null);

  // Helper to determine circle appearance based on state
  const getCircleStyles = (layerId: LayerType) => {
    const isActive = activeLayer === layerId;
    const isHovered = hoverLayer === layerId;
    const config = layers[layerId];
    
    // Scale and opacity logic
    let scale = 'scale-100';
    let opacity = 'opacity-100';
    let strokeWidth = 'stroke-[1.5px]'; 
    
    if (isActive) {
      strokeWidth = 'stroke-[4px]';
    } else if (isHovered) {
      strokeWidth = 'stroke-[3px]';
    }

    const cursor = 'cursor-pointer';

    return {
      className: `circle-transition ${config.color.replace('bg-', 'fill-')} ${config.ringColor.replace('ring-', 'stroke-')} ${scale} ${opacity} ${strokeWidth} ${cursor} origin-center transition-all duration-300 hover:brightness-110`,
    };
  };

  const CircleLabel = ({ id, y, text }: { id: LayerType, y: number, text: string }) => {
     const isActive = activeLayer === id;
     return (
        <text
            x="0"
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`pointer-events-none text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${isActive ? 'fill-white' : 'fill-slate-800/70'}`}
            style={{ textShadow: isActive ? '0px 2px 4px rgba(0,0,0,0.3)' : 'none' }}
        >
            {text}
        </text>
     )
  }

  return (
    <div className="w-full aspect-square relative flex items-center justify-center p-4">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-full">
           <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      <svg 
        viewBox="-220 -220 440 440" 
        className="w-full h-full max-w-[600px] drop-shadow-2xl"
      >
        <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* Societal Layer (Outer) */}
        <g 
            onClick={() => onLayerSelect(LayerType.SOCIETAL)}
            onMouseEnter={() => setHoverLayer(LayerType.SOCIETAL)}
            onMouseLeave={() => setHoverLayer(null)}
        >
            <circle cx="0" cy="0" r="210" {...getCircleStyles(LayerType.SOCIETAL)} />
            <CircleLabel id={LayerType.SOCIETAL} y={-180} text={layers[LayerType.SOCIETAL].label} />
        </g>

        {/* Community Layer */}
        <g 
            onClick={(e) => { e.stopPropagation(); onLayerSelect(LayerType.COMMUNITY); }}
            onMouseEnter={() => setHoverLayer(LayerType.COMMUNITY)}
            onMouseLeave={() => setHoverLayer(null)}
        >
            <circle cx="0" cy="0" r="155" {...getCircleStyles(LayerType.COMMUNITY)} />
            <CircleLabel id={LayerType.COMMUNITY} y={-130} text={layers[LayerType.COMMUNITY].label} />
        </g>

        {/* Relationship Layer */}
        <g 
            onClick={(e) => { e.stopPropagation(); onLayerSelect(LayerType.RELATIONSHIP); }}
            onMouseEnter={() => setHoverLayer(LayerType.RELATIONSHIP)}
            onMouseLeave={() => setHoverLayer(null)}
        >
            <circle cx="0" cy="0" r="100" {...getCircleStyles(LayerType.RELATIONSHIP)} />
            <CircleLabel id={LayerType.RELATIONSHIP} y={-75} text={layers[LayerType.RELATIONSHIP].label} />
        </g>

        {/* Individual Layer (Inner) */}
        <g 
            onClick={(e) => { e.stopPropagation(); onLayerSelect(LayerType.INDIVIDUAL); }}
            onMouseEnter={() => setHoverLayer(LayerType.INDIVIDUAL)}
            onMouseLeave={() => setHoverLayer(null)}
        >
            <circle cx="0" cy="0" r="45" {...getCircleStyles(LayerType.INDIVIDUAL)} />
             <text
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="middle"
                className={`pointer-events-none text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeLayer === LayerType.INDIVIDUAL ? 'fill-white' : 'fill-slate-800/80'}`}
            >
                {layers[LayerType.INDIVIDUAL].label}
            </text>
        </g>
      </svg>
    </div>
  );
};
