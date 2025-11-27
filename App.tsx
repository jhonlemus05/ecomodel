import React, { useState } from 'react';
import { EcologicalVisualizer } from './components/EcologicalVisualizer';
import { LayerDetailCard } from './components/LayerDetailCard';
import { generateEcologicalModel } from './services/geminiService';
import { EcologicalData, LayerType } from './types';
import { LAYER_CONFIGS, INITIAL_DATA } from './constants';

function App() {
  const [topic, setTopic] = useState('');
  const [activeLayer, setActiveLayer] = useState<LayerType>(LayerType.INDIVIDUAL);
  const [data, setData] = useState<EcologicalData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function logic kept for potential future use, but UI trigger removed
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const generatedData = await generateEcologicalModel(topic);
      setData(generatedData);
    } catch (err) {
      setError("Hubo un error al generar el modelo. Por favor verifica tu conexión o intenta con otro tema.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLayerSelect = (layer: LayerType) => {
    setActiveLayer(layer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Main Content */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center">
        
        {error && (
          <div className="w-full max-w-2xl mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="w-full flex justify-center">
           <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-slate-700 mb-2 self-start w-full border-b pb-2">Modelo Ecológico</h2>
              <p className="text-slate-500 text-sm mb-6 text-center">
                 Haz clic en los círculos para ver los detalles de cada nivel.
              </p>
              <EcologicalVisualizer 
                activeLayer={activeLayer}
                onLayerSelect={handleLayerSelect}
                layers={LAYER_CONFIGS}
                isLoading={isLoading}
              />
              
              {/* Legend */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-900"></span> 
                    <span>{LAYER_CONFIGS[LayerType.SOCIETAL].label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span> 
                    <span>{LAYER_CONFIGS[LayerType.COMMUNITY].label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-400"></span> 
                    <span>{LAYER_CONFIGS[LayerType.RELATIONSHIP].label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal-200 border border-teal-300"></span> 
                    <span>{LAYER_CONFIGS[LayerType.INDIVIDUAL].label}</span>
                  </div>
              </div>
           </div>
        </div>

        {/* Detail Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal}>
            <div 
              className="w-full max-w-lg animate-in fade-in zoom-in-95 duration-200" 
              onClick={(e) => e.stopPropagation()}
            >
              <LayerDetailCard 
                selectedLayer={activeLayer}
                config={LAYER_CONFIGS[activeLayer]}
                data={data[activeLayer]}
                onClose={closeModal}
              />
            </div>
          </div>
        )}

      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-500 text-sm">
          <p>Modelo Social-Ecológico</p>
        </div>
      </footer>
    </div>
  );
}

export default App;