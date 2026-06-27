import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, X } from 'lucide-react';

interface LevelUpModalProps {
  isOpen: boolean;
  level: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  level,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
          {/* Main Backdrop click closer */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: 'spring', damping: 15 } }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-md w-full bg-[#1e293b] text-white p-8 border-8 border-yellow-500 retro-shadow-gold text-center z-10 rounded-none crt-scanlines"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-slate-800 p-1 border-2 border-black/30 retro-shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Trophy Ring */}
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 bg-yellow-500/20 rounded-none border-4 border-yellow-400 flex items-center justify-center animate-bounce">
                <Shield className="w-12 h-12 text-yellow-400" />
                <Sparkles className="absolute top-1 right-1 w-5 h-5 text-yellow-300 animate-pulse" />
                <Sparkles className="absolute bottom-1 left-1 w-5 h-5 text-yellow-300 animate-pulse" />
              </div>
            </div>

            {/* Congratulatory Text */}
            <h2 className="font-pixel text-lg text-yellow-400 tracking-wider mb-2 leading-snug">
              ¡SUBISTE DE NIVEL!
            </h2>
            
            <p className="font-mono text-slate-300 text-sm mb-6">
              Tus constantes horas de estudio, resolución de bugs y maquetación han dado sus frutos.
            </p>

            {/* Big Level Display */}
            <div className="bg-black/60 border-4 border-black p-4 mb-8 inline-block mx-auto">
              <div className="font-mono text-xs text-gray-400">NIVEL ACTUAL</div>
              <div className="font-pixel text-4xl text-yellow-400 mt-1 animate-pulse">
                {level}
              </div>
            </div>

            {/* Continue Button */}
            <div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-yellow-500 text-black font-pixel text-xs border-4 border-black retro-shadow-gold hover:bg-yellow-400 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                ¡CONTINUAR AVENTURA!
              </button>
            </div>

            {/* Retro Credit lines */}
            <div className="mt-6 font-mono text-[10px] text-slate-500">
              [ Presiona Esc o haz clic fuera para cerrar ]
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
