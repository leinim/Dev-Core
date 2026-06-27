import React from 'react';
import { SkillNode } from '../types';
import { motion } from 'motion/react';
import { Lock, HelpCircle, Check, Award } from 'lucide-react';

interface SkillNodeCardProps {
  node: SkillNode;
  prerequisiteNames: string[];
  onToggle: (nodeId: string) => void;
  onToggleSubtask?: (nodeId: string, subtaskId: string) => void;
}

export const SkillNodeCard: React.FC<SkillNodeCardProps> = ({
  node,
  prerequisiteNames,
  onToggle,
  onToggleSubtask
}) => {
  const isLocked = node.status === 'locked';
  const isCompleted = node.status === 'completed';
  const isAvailable = node.status === 'available';

  // Styles based on status
  let cardClass = '';
  let statusIcon = '';
  let statusText = '';
  let statusColorClass = '';

  if (isLocked) {
    cardClass = 'bg-[#1e293b]/50 border-4 border-[#334155] text-slate-500 opacity-60 cursor-not-allowed';
    statusIcon = '🔒';
    statusText = 'BLOQUEADO';
    statusColorClass = 'text-slate-400 bg-slate-900/50';
  } else if (isCompleted) {
    cardClass = 'bg-[#064e3b] border-4 border-emerald-400 text-emerald-100 retro-shadow-accent cursor-pointer';
    statusIcon = '💎';
    statusText = 'COMPLETADO';
    statusColorClass = 'text-emerald-300 bg-[#022c22]';
  } else {
    cardClass = 'bg-slate-900 border-4 border-cyan-400 text-white retro-shadow-sm hover:border-cyan-200 cursor-pointer';
    statusIcon = '🔹';
    statusText = 'DISPONIBLE';
    statusColorClass = 'text-cyan-400 bg-cyan-950/40 animate-pulse';
  }

  // Difficulty tag styling
  let diffBadge = '';
  if (node.difficulty === 'basic') {
    diffBadge = 'bg-blue-900/50 text-blue-300 border-blue-700';
  } else if (node.difficulty === 'intermediate') {
    diffBadge = 'bg-purple-900/50 text-purple-300 border-purple-700';
  } else {
    diffBadge = 'bg-rose-900/50 text-rose-300 border-rose-700 animate-pulse';
  }

  const difficultyNames: Record<string, string> = {
    basic: 'Básico',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  };

  return (
    <motion.div
      id={`skill-card-${node.id}`}
      layout
      whileHover={isLocked ? {} : { scale: 1.01, y: -2 }}
      whileTap={isLocked ? {} : { scale: 0.99 }}
      onClick={() => onToggle(node.id)}
      className={`p-5 rounded-none flex flex-col justify-between transition-all select-none ${cardClass}`}
    >
      <div>
        {/* Top Header inside Card */}
        <div className="flex items-center justify-between gap-3 mb-2">
          {/* Status Badge */}
          <span className={`px-2 py-0.5 border border-black/30 font-pixel text-[9px] flex items-center gap-1 ${statusColorClass}`}>
            <span>{statusIcon}</span>
            <span>{statusText}</span>
          </span>

          {/* Difficulty & XP Reward */}
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 border text-xs font-mono rounded-none ${diffBadge}`}>
              {difficultyNames[node.difficulty]}
            </span>
            <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 px-2 py-0.5 text-xs font-mono font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5 shrink-0 text-yellow-400" />
              <span>+{node.xp} XP</span>
            </span>
          </div>
        </div>

        {/* Skill Title */}
        <h4 className="font-pixel text-[12px] tracking-wide mb-2 mt-1 leading-tight text-yellow-300">
          {node.name}
        </h4>

        {/* Skill Description */}
        <p className="font-mono text-sm text-slate-300 leading-relaxed mb-4">
          {node.description}
        </p>

        {/* Granular Subtasks List */}
        {node.subtasks && node.subtasks.length > 0 && (
          <div 
            className="mt-3 mb-4 p-3 bg-black/60 border-2 border-slate-800 rounded-none space-y-2" 
            onClick={(e) => {
              // Prevent parent card from toggling completion on clicking checkboxes
              e.stopPropagation();
            }}
          >
            <div className="font-pixel text-[8px] text-yellow-400/90 mb-2 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-1.5 select-none">
              <span>📋 Subtareas de Aprendizaje</span>
              <span className="font-mono text-[9px] text-cyan-400 font-bold">
                {node.subtasks.filter(st => st.completed).length}/{node.subtasks.length}
              </span>
            </div>
            
            <div className="space-y-1.5">
              {node.subtasks.map((st) => (
                <label 
                  key={st.id} 
                  className={`flex items-start gap-2.5 text-xs font-mono cursor-pointer p-1 rounded-sm hover:bg-slate-900/50 transition-all ${
                    isLocked ? 'pointer-events-none opacity-50' : ''
                  } ${st.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}
                >
                  <input
                    type="checkbox"
                    disabled={isLocked}
                    checked={st.completed}
                    onChange={() => {
                      if (onToggleSubtask && !isLocked) {
                        onToggleSubtask(node.id, st.id);
                      }
                    }}
                    className="mt-0.5 w-4 h-4 rounded-none bg-slate-950 border-2 border-slate-700 checked:bg-cyan-500 checked:border-black cursor-pointer appearance-none flex items-center justify-center shrink-0 checked:after:content-['✓'] checked:after:text-black checked:after:text-[11px] checked:after:font-black focus:outline-none"
                  />
                  <span className="leading-tight select-text">{st.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prerequisites warning list if locked */}
      {isLocked && prerequisiteNames.length > 0 && (
        <div className="mt-auto pt-3 border-t-2 border-dashed border-[#334155] text-rose-400 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>REQUISITOS PREVIOS:</span>
          </div>
          <ul className="list-disc list-inside pl-1 text-slate-400 space-y-0.5">
            {prerequisiteNames.map((name, idx) => (
              <li key={idx} className="truncate">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Available to learn helper */}
      {isAvailable && (
        <div className="mt-auto pt-3 border-t-2 border-dashed border-cyan-900/60 text-cyan-400 font-mono text-[11px] flex items-center justify-between">
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Haz clic para aprender</span>
          </span>
          <span className="animate-blink font-pixel text-[9px]">ENTER_</span>
        </div>
      )}

      {/* Completed indicator */}
      {isCompleted && (
        <div className="mt-auto pt-3 border-t-2 border-dashed border-emerald-800 text-emerald-300 font-mono text-[11px] flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>¡Habilidad Dominada!</span>
          </span>
          <span className="text-[10px] hover:underline text-rose-300 cursor-pointer">
            Desaprender
          </span>
        </div>
      )}
    </motion.div>
  );
};
