import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';

interface MissionCompleteToastProps {
  isOpen: boolean;
  skillName: string;
  xpGained: number;
  onClose: () => void;
}

export const MissionCompleteToast: React.FC<MissionCompleteToastProps> = ({
  isOpen,
  skillName,
  xpGained,
  onClose
}) => {
  // Auto-close after 3.5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

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
