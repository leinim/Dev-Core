import React, { useRef } from 'react';
import { PlayerProfile, GameState } from '../types';
import { Shield, Trash2, Download, Upload, Award } from 'lucide-react';

interface UserProfilePanelProps {
  profile: PlayerProfile;
  totalXp: number;
  onReset: () => void;
  onImportState: (importedState: GameState) => void;
  gameState: GameState;
}

export const UserProfilePanel: React.FC<UserProfilePanelProps> = ({
  profile,
  totalXp,
  onReset,
  onImportState,
  gameState
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Export current GameState as a formatted JSON file
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `skill_tree_rpg_level_${profile.level}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import GameState from a uploaded JSON file
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.profile && parsed.activeRoadmaps) {
          onImportState(parsed as GameState);
        } else {
          alert('El archivo JSON no tiene la estructura correcta de Skill Tree RPG.');
        }
      } catch (err) {
        alert('Error al leer el archivo. Asegúrate de cargar un JSON válido.');
      }
    };
    reader.readAsText(file);
  };

  // Calculate percentage for progress bar
  const xpPercentage = Math.min(100, (profile.currentXp / profile.nextLevelXp) * 100);
  
  // Create blocks for retro progress bar (10 segments)
  const segmentsCount = 10;
  const activeSegments = Math.round((xpPercentage / 100) * segmentsCount);

  return (
    <div id="profile-panel" className="bg-[#1e293b] text-white p-6 retro-border retro-shadow border-[#020617] rounded-none select-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Profile Avatar / Crest */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 bg-[#334155] retro-border border-black flex items-center justify-center shrink-0">
            <Shield className="w-8 h-8 text-yellow-400 animate-float z-10" />
            <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black font-pixel text-[9px] px-1.5 py-0.5 retro-border border-black z-20 retro-shadow-sm font-bold">
              Lvl {profile.level}
            </div>
          </div>
          <div>
            <h2 className="font-pixel text-sm tracking-wide text-yellow-400">PERFIL DEL JUGADOR</h2>
            <div className="font-mono text-sm text-gray-400 mt-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Experiencia Total Ganada: <strong>{totalXp} XP</strong></span>
            </div>
          </div>
        </div>

        {/* XP Status Bar */}
        <div className="flex-1 max-w-md">
          <div className="flex justify-between font-pixel text-[10px] text-gray-300 mb-2">
            <span>BARRA DE EXPERIENCIA (XP)</span>
            <span className="text-emerald-400">{profile.currentXp} / {profile.nextLevelXp} XP</span>
          </div>
          
          {/* Retro Segmented Bar */}
          <div className="h-6 bg-black p-0.5 retro-border border-black flex items-center gap-0.5">
            {Array.from({ length: segmentsCount }).map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 transition-all duration-300 ${
                  i < activeSegments 
                    ? 'bg-emerald-400 border-r-2 border-emerald-600' 
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
          
          <div className="mt-1 flex justify-between text-[11px] font-mono text-gray-400">
            <span>Nivel {profile.level}</span>
            <span>Próximo Nivel: {profile.nextLevelXp - profile.currentXp} XP faltantes</span>
          </div>
        </div>

        {/* Desktop Controls (Reset, Export, Import) */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 bg-[#334155] text-white hover:bg-[#475569] active:translate-y-0.5 font-mono text-xs retro-border border-black retro-shadow-sm cursor-pointer"
            title="Exportar archivo de progreso JSON para escritorio"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORTAR JSON</span>
          </button>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-2 bg-[#334155] text-white hover:bg-[#475569] active:translate-y-0.5 font-mono text-xs retro-border border-black retro-shadow-sm cursor-pointer"
            title="Importar archivo de progreso JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>IMPORTAR JSON</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => {
              if (window.confirm('¿Estás seguro de que deseas reiniciar todo tu progreso? Se perderán todos tus niveles y habilidades aprendidas.')) {
                onReset();
              }
            }}
            className="flex items-center gap-2 px-3 py-2 bg-rose-900 text-rose-100 hover:bg-rose-800 active:translate-y-0.5 font-mono text-xs retro-border border-black retro-shadow-sm cursor-pointer ml-auto md:ml-0"
            title="Reiniciar partida actual"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>REINICIAR</span>
          </button>
        </div>

      </div>
    </div>
  );
};
