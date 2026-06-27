import React from 'react';
import { Roadmap } from '../types';

interface RoadmapSelectorProps {
  roadmaps: Roadmap[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const RoadmapSelector: React.FC<RoadmapSelectorProps> = ({
  roadmaps,
  selectedId,
  onSelect
}) => {
  return (
    <div id="roadmap-selector" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 select-none">
      {roadmaps.map((r) => {
        const isSelected = r.id === selectedId;
        
        // Count total nodes and completed nodes for quick status
        const totalNodes = r.nodes.length;
        const completedNodes = r.nodes.filter(n => n.status === 'completed').length;
        const pctCompleted = Math.round((completedNodes / totalNodes) * 100);

        return (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            className={`flex flex-col justify-between p-2 cursor-pointer transition-all border-2 text-left h-full ${
              isSelected 
                ? 'bg-yellow-500 text-black border-black retro-shadow-gold translate-y-[-1px]' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white retro-shadow-sm active:translate-y-[1px]'
            }`}
          >
            <div className="flex items-start gap-1.5 min-w-0 w-full">
              <span className="text-base shrink-0 leading-none mt-0.5" role="img" aria-label={r.title}>
                {r.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-pixel text-[8px] sm:text-[9px] tracking-tight uppercase leading-tight line-clamp-2 break-words">
                  {r.title}
                </h3>
              </div>
            </div>
            
            <div className="w-full mt-1.5">
              <div className="flex items-center justify-between font-mono text-[8px] sm:text-[9px] opacity-90 leading-none">
                <span>{completedNodes}/{totalNodes} OK</span>
                <span className={isSelected ? 'text-black font-bold' : 'text-cyan-400'}>
                  {pctCompleted}%
                </span>
              </div>
              
              {/* Small progress line inside the tab */}
              <div className="w-full bg-slate-900/30 h-1 mt-1 border border-black/10 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    isSelected ? 'bg-black' : 'bg-cyan-500'
                  }`}
                  style={{ width: `${pctCompleted}%` }}
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
