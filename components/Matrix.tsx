import React, { useMemo, useState } from 'react';
import * as d3 from 'd3';
import { BASE_MATRIX } from '../constants';
import { ActorProfile, MatrixColumn, Technique } from '../types';
import TechniqueCard from './TechniqueCard';

interface MatrixProps {
  actorProfile: ActorProfile | null;
}

const Matrix: React.FC<MatrixProps> = ({ actorProfile }) => {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);

  // Merge the BASE_MATRIX with the techniques returned by Gemini
  const matrixData = useMemo(() => {
    // Deep copy base matrix
    const columns: MatrixColumn[] = JSON.parse(JSON.stringify(BASE_MATRIX));
    
    if (!actorProfile) return columns;

    // Create a map of Used Techniques for O(1) lookup
    const usedTechniquesMap = new Map<string, Technique>();
    actorProfile.techniques.forEach(t => {
      // Normalize ID if needed, strict match for now
      usedTechniquesMap.set(t.id, t);
    });

    columns.forEach(col => {
        // 1. Mark existing techniques as used if found
        col.techniques.forEach(tech => {
            const found = usedTechniquesMap.get(tech.id);
            if (found) {
                tech.score = found.score || 80;
                tech.usage = found.usage;
                // Remove from map so we know what's left to append
                usedTechniquesMap.delete(tech.id);
            } else {
                tech.score = 0;
            }
        });

        // 2. Append techniques that Gemini found but weren't in our base skeleton
        // We filter the remaining usedTechniquesMap for those matching the current Tactic
        const extras: Technique[] = [];
        for (const [_, tech] of usedTechniquesMap) {
            // Fuzzy match tactic names
            if (tech.tactic.toLowerCase().replace(/\s/g,'') === col.tacticName.toLowerCase().replace(/\s/g,'')) {
                extras.push(tech);
            }
        }
        
        // Remove appended ones from map to avoid duplicates if Tactics overlap (rare but possible)
        extras.forEach(e => usedTechniquesMap.delete(e.id));
        col.techniques.push(...extras);
    });

    return columns;
  }, [actorProfile]);

  // D3 Color Scale for "Heat"
  const colorScale = d3.scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateReds);
    
  // Helper to determine cell style
  const getCellStyle = (tech: Technique) => {
    const isUsed = tech.score && tech.score > 0;
    
    if (!isUsed) {
        return { backgroundColor: '#1f2937', color: '#6b7280' }; // Gray bg, dim text
    }

    // Use D3 for the background color based on score, but ensure readability
    const bgColor = colorScale(tech.score || 50);
    return { 
        backgroundColor: bgColor, 
        color: '#fff',
        boxShadow: `0 0 8px ${bgColor}` 
    };
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col bg-gray-950 border border-gray-800 rounded-lg">
      <div className="overflow-x-auto overflow-y-hidden flex-1 custom-scrollbar">
        <div className="inline-flex min-w-max p-4 space-x-2">
            
          {matrixData.map((column) => (
            <div key={column.tacticId} className="w-48 flex flex-col space-y-2">
              {/* Header */}
              <div className="bg-gray-900 border-b-2 border-cyber-accent p-3 h-16 flex items-center justify-center text-center">
                <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                  {column.tacticName}
                </h3>
                <div className="text-[10px] text-gray-500 mt-1 absolute top-1 right-2">{column.techniques.filter(t => t.score && t.score > 0).length > 0 && column.techniques.filter(t => t.score && t.score > 0).length}</div>
              </div>

              {/* Cells */}
              <div className="space-y-1">
                {column.techniques.map((tech) => {
                    const style = getCellStyle(tech);
                    const isUsed = tech.score && tech.score > 0;
                    
                    return (
                        <div
                            key={tech.id}
                            onClick={() => setSelectedTechnique(tech)}
                            className={`
                                relative p-2 text-[10px] cursor-pointer transition-all duration-200 border border-transparent hover:border-white/50 hover:z-10
                                ${isUsed ? 'hover:scale-105' : 'hover:bg-gray-700 opacity-60 hover:opacity-100'}
                            `}
                            style={style}
                        >
                            <div className="font-mono opacity-70 mb-0.5 text-[9px]">{tech.id}</div>
                            <div className="leading-tight font-medium truncate">{tech.name}</div>
                        </div>
                    );
                })}
                {/* Empty placeholder for alignment if needed, or just let them stack naturally */}
              </div>
            </div>
          ))}

        </div>
      </div>

      <TechniqueCard 
        technique={selectedTechnique} 
        onClose={() => setSelectedTechnique(null)} 
      />
    </div>
  );
};

export default Matrix;