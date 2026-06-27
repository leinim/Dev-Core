import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Award } from 'lucide-react';
import { getPracticalExerciseForNode } from '../utils/exercises';

interface MissionCompleteToastProps {
  isOpen: boolean;
  skillName: string;
  xpGained: number;
  skillId?: string;
  onClose: () => void;
}

export const MissionCompleteToast: React.FC<MissionCompleteToastProps> = ({
  isOpen,
  skillName,
  xpGained,
  skillId,
  onClose
}) => {
  // Auto-close after 7 seconds if has skillId, else 3.5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, skillId ? 7500 : 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, skillId]);

  const exercise = skillId ? getPracticalExerciseForNode(skillId, skillName) : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full p-1 select-none">
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="bg-[#0f172a] text-white border-4 border-emerald-400 p-4 retro-shadow-accent relative flex items-start gap-3.5 rounded-none crt-scanlines"
          >
            {/* Retro icon */}
            <div className="w-10 h-10 bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-float" />
            </div>

            {/* Content text */}
            <div className="flex-1 min-w-0 pr-4">
              <h4 className="font-pixel text-[10px] text-emerald-400 tracking-wider">
                ¡MISIÓN CUMPLIDA!
              </h4>
              <p className="font-mono text-xs font-bold text-slate-100 truncate mt-1">
                {skillName}
              </p>
              <p className="font-mono text-[11px] text-slate-400 mt-0.5">
                Has ganado <strong className="text-yellow-400">+{xpGained} XP</strong>
              </p>

              {exercise && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 text-left">
                  <div className="flex items-center gap-1 font-pixel text-[8px] text-yellow-400 uppercase tracking-wider mb-1">
                    <Award className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
                    <span>Práctica Recomendada</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-slate-100 leading-tight">
                    {exercise.title}
                  </div>
                  <div className="font-mono text-[10px] text-slate-300 mt-1 leading-snug">
                    {exercise.description}
                  </div>
                  <div className="mt-2 p-2 bg-emerald-950/50 border border-emerald-800 text-[10px] font-mono text-emerald-300 leading-normal">
                    <span className="font-pixel text-[7px] text-yellow-300 block mb-0.5">EL DESAFÍO:</span>
                    {exercise.challenge}
                  </div>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
