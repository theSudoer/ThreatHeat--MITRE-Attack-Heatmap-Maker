import React from 'react';
import { Technique } from '../types';

interface TechniqueCardProps {
  technique: Technique | null;
  onClose: () => void;
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({ technique, onClose }) => {
  if (!technique) return null;

  const isUsed = technique.score && technique.score > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-gray-900 border border-cyber-500 rounded-lg shadow-2xl shadow-cyber-accent/20 max-w-lg w-full overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-1 w-full ${isUsed ? 'bg-cyber-danger' : 'bg-cyber-500'}`} />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <span className="text-cyber-accent opacity-70">{technique.id}</span>
                {technique.name}
              </h3>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest mt-1 block">
                {technique.tactic}
              </span>
            </div>
            {isUsed && (
               <span className="px-2 py-1 rounded text-xs font-bold bg-cyber-danger/20 text-cyber-danger border border-cyber-danger/50">
                 USED
               </span>
            )}
          </div>

          <div className="space-y-4">
            {technique.usage ? (
              <div className="bg-gray-800/50 p-3 rounded border-l-2 border-cyber-danger">
                <p className="text-xs text-cyber-danger font-bold mb-1 uppercase tracking-wide">Threat Actor Usage</p>
                <p className="text-sm text-gray-200 leading-relaxed">{technique.usage}</p>
              </div>
            ) : (
               <p className="text-sm text-gray-500 italic">No specific usage data available for this actor.</p>
            )}

            {technique.description && (
               <div>
                  <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wide">Standard Definition</p>
                  <p className="text-sm text-gray-400">{technique.description}</p>
               </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechniqueCard;