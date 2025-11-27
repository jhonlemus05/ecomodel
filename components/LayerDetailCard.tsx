import React from 'react';
import { LayerConfig, LayerType } from '../types';

interface LayerDetailCardProps {
  selectedLayer: LayerType;
  data: string[] | undefined;
  config: LayerConfig;
  onClose?: () => void;
}

export const LayerDetailCard: React.FC<LayerDetailCardProps> = ({ data, config, onClose }) => {
  return (
    <div className={`h-full w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 transition-colors duration-500 relative`}>
      {/* Header */}
      <div className={`p-6 ${config.color} text-white relative`}>
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        <div className="flex items-center gap-3 mb-3 pr-8">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide leading-tight">
            {config.fullLabel || config.label}
          </h2>
        </div>
        <p className="opacity-90 text-sm leading-relaxed max-w-lg">{config.description}</p>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50 max-h-[60vh]">
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Detalles & Características</h3>
        {data && data.length > 0 ? (
          <ul className="space-y-3">
            {data.map((item, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full ${config.color} bg-opacity-10 flex items-center justify-center text-xs font-bold ${config.textColor} mt-0.5`}>
                  {index + 1}
                </span>
                <span className="text-gray-700 leading-relaxed text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <p>No hay información disponible.</p>
          </div>
        )}
      </div>
    </div>
  );
};