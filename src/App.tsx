import { useState, useEffect } from 'react';
import { GameState, Roadmap, SkillNode } from './types';
import { 
  getInitialState, 
  toggleNode, 
  toggleSubtask,
  resetGameState, 
  calculateTotalXp 
} from './utils/gameEngine';
import { UserProfilePanel } from './components/UserProfilePanel';
import { RoadmapSelector } from './components/RoadmapSelector';
import { SkillNodeCard } from './components/SkillNodeCard';
import { LevelUpModal } from './components/LevelUpModal';
import { MissionCompleteToast } from './components/MissionCompleteToast';
import { playQuestCompleteSfx, playLevelUpSfx, playLockedSfx } from './utils/audio';
import { 
  Terminal, 
  Database, 
  Code, 
  BookOpen, 
  Award, 
  Layers, 
  ExternalLink, 
  CheckSquare, 
  Trophy, 
  Activity,
  Sparkles
} from 'lucide-react';

type TabType = 'skills' | 'stats' | 'resources';

interface FreeResource {
  name: string;
  category: string;
  description: string;
  url: string;
  badge: string;
}

export default function App() {
  // Game state
  const [gameState, setGameState] = useState<GameState>(() => getInitialState());
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>('html-css-core');
  const [activeTab, setActiveTab] = useState<TabType>('skills');
  
  // Feedback states
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState<{ isOpen: boolean; skillName: string; xpGained: number }>({
    isOpen: false,
    skillName: '',
    xpGained: 0
  });

  // Selected Roadmap object
  const selectedRoadmap = gameState.activeRoadmaps.find(r => r.id === selectedRoadmapId) || gameState.activeRoadmaps[0];

  // Total XP gained by completing nodes
  const totalXp = calculateTotalXp(gameState.activeRoadmaps);

  // Toggle node completion
  const handleToggleNode = (nodeId: string) => {
    const result = toggleNode(gameState, selectedRoadmap.id, nodeId);
    
    if (result.error) {
      // Locked node clicked
      playLockedSfx();
      alert(result.error);
      return;
    }

    setGameState(result.newState);

    if (result.leveledUp) {
      // Celebrate level up
      playLevelUpSfx();
      setIsLevelUpOpen(true);
    } else if (result.isCompletedNow) {
      // Celebrate normal skill complete
      const completedNode = selectedRoadmap.nodes.find(n => n.id === nodeId);
      if (completedNode) {
        playQuestCompleteSfx();
        setToastConfig({
          isOpen: true,
          skillName: completedNode.name,
          xpGained: completedNode.xp
        });
      }
    } else {
      // Uncompleted node
      playQuestCompleteSfx(); // Simple feedback beep
    }
  };

  // Toggle single subtask progress
  const handleToggleSubtask = (nodeId: string, subtaskId: string) => {
    const result = toggleSubtask(gameState, selectedRoadmap.id, nodeId, subtaskId);
    
    if (result.error) {
      playLockedSfx();
      alert(result.error);
      return;
    }

    setGameState(result.newState);

    if (result.leveledUp) {
      playLevelUpSfx();
      setIsLevelUpOpen(true);
    } else if (result.isCompletedNow) {
      const completedNode = selectedRoadmap.nodes.find(n => n.id === nodeId);
      if (completedNode) {
        playQuestCompleteSfx();
        setToastConfig({
          isOpen: true,
          skillName: completedNode.name,
          xpGained: completedNode.xp
        });
      }
    } else {
      playQuestCompleteSfx(); // Simple feedback beep
    }
  };

  // Reset entire state
  const handleReset = () => {
    const resetState = resetGameState();
    setGameState(resetState);
    setSelectedRoadmapId('html-css-core');
    playLockedSfx(); // Simple feedback
  };

  // Import state from JSON
  const handleImportState = (importedState: GameState) => {
    setGameState(importedState);
    playLevelUpSfx(); // Celebrate reload
  };

  // Helper to find the names of prerequisite nodes for display
  const getPrerequisiteNames = (prereqIds: string[]) => {
    return selectedRoadmap.nodes
      .filter(n => prereqIds.includes(n.id))
      .map(n => n.name);
  };

  // Curated list of 100% free high-quality developer resources
  const freeResources: FreeResource[] = [
    {
      name: 'roadmap.sh',
      category: 'Roadmaps & Guías',
      description: 'La guía interactiva de referencia comunitaria por excelencia para todo tipo de tecnologías, lenguajes y roles en IT.',
      url: 'https://roadmap.sh',
      badge: 'Esencial'
    },
    {
      name: 'midu.dev (Miguel Ángel Durán)',
      category: 'Recurso en Español',
      description: 'Plataforma excelente de programación web en español. Cursos interactivos, artículos, directos y material sumamente didáctico sobre React, Node.js, JS y CSS.',
      url: 'https://midu.dev',
      badge: '¡Recomendado!'
    },
    {
      name: 'MoureDev (Brais Moure)',
      category: 'Recurso en Español',
      description: 'Cursos completos gratuitos desde cero sobre lenguajes populares (Python, Kotlin, Swift), control de versiones con Git y retos mensuales de lógica.',
      url: 'https://mouredev.com',
      badge: 'Comunidad'
    },
    {
      name: 'Jon Mircha - Programación Web',
      category: 'Recurso en Español',
      description: 'Los videotutoriales en español más exhaustivos y minuciosos sobre maquetación HTML/CSS, fundamentos de JS, React, Node.js y responsive design.',
      url: 'https://jonmircha.com',
      badge: 'Exhaustivo'
    },
    {
      name: 'freeCodeCamp (Español)',
      category: 'Cursos & Práctica',
      description: 'Plataforma interactiva 100% gratuita adaptada al español para aprender desarrollo de software, algoritmos, bases de datos y seguridad.',
      url: 'https://www.freecodecamp.org/espanol/',
      badge: 'Interactivo'
    },
    {
      name: 'MDN Web Docs (Español)',
      category: 'Documentación Oficial',
      description: 'La documentación oficial de Mozilla traducida al español. El estándar absoluto de consulta rápida para programadores HTML, CSS y JS.',
      url: 'https://developer.mozilla.org/es/',
      badge: 'Consulta'
    },
    {
      name: 'Cursos Gratis de Platzi',
      category: 'Recurso en Español',
      description: 'Acceso a la selección gratuita de cursos introductorios de alta calidad sobre Programación Básica, Git/GitHub y Frontend en español.',
      url: 'https://platzi.com/clases/programacion-basica/',
      badge: 'Cursos Gratis'
    },
    {
      name: 'PortSwigger Web Security Academy',
      category: 'Ciberseguridad',
      description: 'La academia gratuita líder en el mundo para aprender seguridad web y hacking ético práctico (XSS, SQLi, CSRF) de forma legal.',
      url: 'https://portswigger.net/web-security',
      badge: 'Hacking Ético'
    },
    {
      name: 'Exercism',
      category: 'Práctica de Código',
      description: 'Aprende Java, TypeScript, JavaScript, Go y decenas de lenguajes mediante desafíos de código reales con mentorías gratuitas de voluntarios.',
      url: 'https://exercism.org',
      badge: 'Retos'
    },
    {
      name: 'React Official Docs',
      category: 'Librerías',
      description: 'La nueva y rediseñada documentación interactiva de React con explicaciones visuales de renderizado e interactividad.',
      url: 'https://react.dev',
      badge: 'Oficial'
    },
    {
      name: 'TypeScript Deep Dive',
      category: 'Libro / Guía',
      description: 'Un libro en línea y de acceso libre excelente que profundiza en los mecanismos complejos del compilador y el tipado de TypeScript.',
      url: 'https://basarat.gitbook.io/typescript/',
      badge: 'Libro Gratis'
    },
    {
      name: 'Spring Academy (VMware)',
      category: 'Java',
      description: 'Cursos y guías prácticas gratuitas proporcionadas por los creadores de Spring para dominar Spring Boot y microservicios Java.',
      url: 'https://spring.academy',
      badge: 'Spring'
    }
  ];

  // Statistics calculations for the summary panel
  const totalNodesCount = gameState.activeRoadmaps.reduce((acc, r) => acc + r.nodes.length, 0);
  const completedNodesCount = gameState.activeRoadmaps.reduce(
    (acc, r) => acc + r.nodes.filter(n => n.status === 'completed').length,
    0
  );
  const totalBasicNodes = gameState.activeRoadmaps.reduce(
    (acc, r) => acc + r.nodes.filter(n => n.difficulty === 'basic').length,
    0
  );
  const completedBasicNodes = gameState.activeRoadmaps.reduce(
    (acc, r) => acc + r.nodes.filter(n => n.difficulty === 'basic' && n.status === 'completed').length,
    0
  );
  const totalIntermediateNodes = gameState.activeRoadmaps.reduce(
    (acc, r) => acc + r.nodes.filter(n => n.difficulty === 'intermediate').length,
    0
  );
  const completedIntermediateNodes = gameState.activeRoadmaps.reduce(
    (acc, r) => acc + r.nodes.filter(n => n.difficulty === 'intermediate' && n.status === 'completed').length,
    0
  );
  const totalAdvancedNodes = gameState.activeRoadmaps.reduce(
    (acc, r) => acc + r.nodes.filter(n => n.difficulty === 'advanced').length,
    0
  );
  const completedAdvancedNodes = gameState.activeRoadmaps.reduce(
    (acc, r) => acc + r.nodes.filter(n => n.difficulty === 'advanced' && n.status === 'completed').length,
    0
  );

  const completionPercentage = totalNodesCount > 0 ? Math.round((completedNodesCount / totalNodesCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 pixel-grid-dark font-mono pb-20 selection:bg-yellow-500 selection:text-black">
      
      {/* HEADER SECTION (Retro Terminal Brand Header) */}
      <header className="bg-black border-b-4 border-slate-800 p-4 sticky top-0 z-30 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 text-black font-pixel text-xl flex items-center justify-center retro-border border-black animate-pulse shrink-0">
              ⚔️
            </div>
            <div>
              <h1 className="font-pixel text-[13px] tracking-wide text-yellow-500 flex items-center gap-1.5 leading-none">
                <span>SKILL TREE RPG</span>
                <span className="text-[9px] bg-red-600 text-white px-1 py-0.5 retro-border border-black">V1.0</span>
              </h1>
              <p className="font-mono text-[11px] text-slate-400 mt-1">
                Domina desarrollo de software, backend, bases de datos y ciberseguridad ganando XP.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-500 border border-black animate-ping" />
              <span>SISTEMA LOCAL ACTIVO</span>
            </div>
            <div className="hidden md:block text-slate-500">|</div>
            <div className="hidden md:flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-slate-300">Modo Híbrido Web / Escritorio</span>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 mt-6 space-y-6">
        
        {/* PLAYER STATS CORNER */}
        <UserProfilePanel 
          profile={gameState.profile} 
          totalXp={totalXp} 
          onReset={handleReset}
          onImportState={handleImportState}
          gameState={gameState}
        />

        {/* SECTION NAVIGATION TABS (Arcade Control Console Navbar) */}
        <div className="p-1.5 bg-[#0b0f19] border-4 border-slate-800 retro-border select-none">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setActiveTab('skills');
                playQuestCompleteSfx();
              }}
              className={`py-3.5 px-2 text-center font-pixel text-[11px] tracking-wider transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1.5 border-2 ${
                activeTab === 'skills'
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)] font-bold'
                  : 'bg-black/50 border-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === 'skills' ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`}></span>
              <span>{activeTab === 'skills' ? '▶ 🗺️ ÁRBOLES ◀' : '🗺️ ÁRBOLES'}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('stats');
                playQuestCompleteSfx();
              }}
              className={`py-3.5 px-2 text-center font-pixel text-[11px] tracking-wider transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1.5 border-2 ${
                activeTab === 'stats'
                  ? 'bg-yellow-950/80 border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.25)] font-bold'
                  : 'bg-black/50 border-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === 'stats' ? 'bg-yellow-400 animate-ping' : 'bg-slate-700'}`}></span>
              <span>{activeTab === 'stats' ? '▶ 📊 RESUMEN ◀' : '📊 RESUMEN'}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('resources');
                playQuestCompleteSfx();
              }}
              className={`py-3.5 px-2 text-center font-pixel text-[11px] tracking-wider transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1.5 border-2 ${
                activeTab === 'resources'
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.25)] font-bold'
                  : 'bg-black/50 border-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === 'resources' ? 'bg-emerald-400 animate-ping' : 'bg-slate-700'}`}></span>
              <span>{activeTab === 'resources' ? '▶ 📚 RECURSOS ◀' : '📚 RECURSOS'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE SKILL TREES AND NODES */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            
            {/* ROADMAP Selector inside Skills View */}
            <section className="space-y-2">
              <div className="flex items-center justify-between font-pixel text-[9px] text-gray-400 px-1 select-none">
                <span>SELECCIONAR ÁRBOL DE ESPECIALIDAD</span>
                <span>ELIGE UNA RUTA EN EL MENÚ</span>
              </div>
              <RoadmapSelector 
                roadmaps={gameState.activeRoadmaps} 
                selectedId={selectedRoadmapId} 
                onSelect={(id) => {
                  setSelectedRoadmapId(id);
                  playQuestCompleteSfx();
                }}
              />
            </section>

            {/* Active Tree Layout */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Sidebar: Active Roadmap Info & Real-Time JSON Contract */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Roadmap Card Info */}
                <div className="bg-[#1e293b] p-6 retro-border border-black rounded-none retro-shadow text-white select-none">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl bg-slate-800 p-2 border-2 border-black/30" role="img" aria-label="Roadmap Icon">
                      {selectedRoadmap.icon}
                    </span>
                    <div>
                      <h3 className="font-pixel text-[13px] text-yellow-400 uppercase tracking-tight">
                        {selectedRoadmap.title}
                      </h3>
                      <span className="font-mono text-xs text-emerald-400 block mt-1 font-bold">
                        [ CLASE SELECCIONADA ]
                      </span>
                    </div>
                  </div>

                  <p className="font-mono text-sm text-slate-300 leading-relaxed mb-6">
                    {selectedRoadmap.description}
                  </p>

                  <div className="p-3 bg-black/40 border border-slate-700 font-mono text-[11px] text-slate-400 leading-normal rounded-none">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1.5">
                      <Code className="w-4 h-4" />
                      <span>SISTEMA DE HABILIDADES:</span>
                    </div>
                    Toca las habilidades disponibles <span className="text-cyan-400 font-bold">[🔹]</span> para reclamar tu XP. El sistema validará los prerrequisitos en tiempo real y actualizará tu nivel de jugador de forma local.
                  </div>
                </div>

                {/* Real-time Data Contract */}
                <div className="bg-[#0f172a] border-4 border-black p-5 rounded-none retro-shadow text-white">
                  <div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-dashed border-slate-800">
                    <div className="flex items-center gap-2">
                      <Database className="w-4.5 h-4.5 text-yellow-500" />
                      <h3 className="font-pixel text-[9px] text-yellow-400">ESTADO DEL JUGADOR (JSON)</h3>
                    </div>
                    <span className="font-mono text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 retro-border border-emerald-900">
                      SYNC_OK
                    </span>
                  </div>

                  {/* Code block preview */}
                  <div className="bg-black/80 p-3 border-2 border-slate-800 text-cyan-400 font-mono text-[10px] leading-tight overflow-x-auto max-h-56 scrollbar-thin scrollbar-thumb-slate-800">
                    <pre>{JSON.stringify({
                      profile: gameState.profile,
                      activeRoadmaps: gameState.activeRoadmaps.map(r => ({
                        title: r.title,
                        nodes: r.nodes.map(n => ({
                          id: n.id,
                          name: n.name,
                          difficulty: n.difficulty,
                          status: n.status
                        }))
                      }))
                    }, null, 2)}</pre>
                  </div>
                </div>

              </div>

              {/* Right: Node List */}
              <div className="lg:col-span-2 space-y-6">
                
                <div className="flex items-center justify-between px-1 select-none">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span className="font-pixel text-[10px] text-slate-400">Habilidades del Árbol</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    {selectedRoadmap.nodes.filter(n => n.status === 'completed').length} / {selectedRoadmap.nodes.length} completadas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedRoadmap.nodes.map((node) => {
                    const prerequisiteNames = getPrerequisiteNames(node.prerequisites);
                    return (
                      <SkillNodeCard
                        key={node.id}
                        node={node}
                        prerequisiteNames={prerequisiteNames}
                        onToggle={handleToggleNode}
                        onToggleSubtask={handleToggleSubtask}
                      />
                    );
                  })}
                </div>

                {/* All complete block */}
                {selectedRoadmap.nodes.every(n => n.status === 'completed') && (
                  <div className="p-6 bg-emerald-950/40 border-4 border-emerald-400 text-center select-none animate-float">
                    <h3 className="font-pixel text-[12px] text-emerald-400 mb-2">🏆 ¡MISIONES COMPLETADAS CON ÉXITO! 🏆</h3>
                    <p className="font-mono text-xs text-emerald-300">
                      Has completado todos los nodos de este árbol de tecnología. ¡Prueba a dominar otra clase para acumular más XP y subir de nivel!
                    </p>
                  </div>
                )}

              </div>

            </section>

          </div>
        )}

        {/* TAB 2: DETAILED PROGRESS SUMMARY & DYNAMIC CONNECTED SCHEMATIC TREE */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            
            {/* STATS OVERVIEW BENTO GRID */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="bg-[#1e293b] p-5 retro-border border-black retro-shadow-sm flex flex-col justify-between">
                <span className="font-pixel text-[9px] text-yellow-400">TOTAL COMPLETADO</span>
                <div className="my-4">
                  <div className="font-pixel text-3xl font-bold text-white">{completedNodesCount} <span className="text-slate-500 text-sm">/ {totalNodesCount}</span></div>
                  <p className="font-mono text-xs text-slate-400 mt-1">Nodos dominados en todas las clases</p>
                </div>
                <div className="w-full bg-black h-3 retro-border border-black p-0.5">
                  <div className="h-full bg-yellow-400" style={{ width: `${completionPercentage}%` }} />
                </div>
              </div>

              <div className="bg-[#1e293b] p-5 retro-border border-black retro-shadow-sm">
                <span className="font-pixel text-[9px] text-blue-400">NIVEL BÁSICO</span>
                <div className="mt-4">
                  <div className="font-pixel text-2xl text-white">{completedBasicNodes} <span className="text-slate-500 text-sm">/ {totalBasicNodes}</span></div>
                  <p className="font-mono text-xs text-slate-400 mt-1">Misiones de iniciación (30XP cada una)</p>
                </div>
                <div className="font-mono text-[11px] text-blue-300 mt-3">
                  Progreso: {totalBasicNodes > 0 ? Math.round((completedBasicNodes / totalBasicNodes) * 100) : 0}%
                </div>
              </div>

              <div className="bg-[#1e293b] p-5 retro-border border-black retro-shadow-sm">
                <span className="font-pixel text-[9px] text-purple-400">NIVEL INTERMEDIO</span>
                <div className="mt-4">
                  <div className="font-pixel text-2xl text-white">{completedIntermediateNodes} <span className="text-slate-500 text-sm">/ {totalIntermediateNodes}</span></div>
                  <p className="font-mono text-xs text-slate-400 mt-1">Desafíos prácticos (100XP cada uno)</p>
                </div>
                <div className="font-mono text-[11px] text-purple-300 mt-3">
                  Progreso: {totalIntermediateNodes > 0 ? Math.round((completedIntermediateNodes / totalIntermediateNodes) * 100) : 0}%
                </div>
              </div>

              <div className="bg-[#1e293b] p-5 retro-border border-black retro-shadow-sm">
                <span className="font-pixel text-[9px] text-rose-400">NIVEL AVANZADO</span>
                <div className="mt-4">
                  <div className="font-pixel text-2xl text-white">{completedAdvancedNodes} <span className="text-slate-500 text-sm">/ {totalAdvancedNodes}</span></div>
                  <p className="font-mono text-xs text-slate-400 mt-1">Batallas contra jefes (250XP cada una)</p>
                </div>
                <div className="font-mono text-[11px] text-rose-300 mt-3">
                  Progreso: {totalAdvancedNodes > 0 ? Math.round((completedAdvancedNodes / totalAdvancedNodes) * 100) : 0}%
                </div>
              </div>

            </section>

            {/* DYNAMIC SCHEMATIC SKILL TREE DIAGRAM */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Dynamic Map Selection Side */}
              <div className="lg:col-span-1 bg-[#1e293b] p-6 retro-border border-black retro-shadow text-white space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-pixel text-[11px] text-yellow-400 uppercase">Ver Árbol Dinámico</h3>
                </div>
                <p className="font-mono text-sm text-slate-300 leading-relaxed">
                  Haz clic en las clases de abajo para renderizar su árbol jerárquico dinámico de prerrequisitos. Verás cómo cambian los estados interactivos en tiempo real.
                </p>

                <div className="space-y-2 pt-2">
                  {gameState.activeRoadmaps.map((r) => {
                    const isSelected = r.id === selectedRoadmapId;
                    const doneCount = r.nodes.filter(n => n.status === 'completed').length;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          setSelectedRoadmapId(r.id);
                          playQuestCompleteSfx();
                        }}
                        className={`w-full text-left p-3 font-mono text-xs retro-border border-black cursor-pointer flex justify-between items-center ${
                          isSelected ? 'bg-yellow-500 text-black font-bold' : 'bg-slate-900 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span>{r.icon} {r.title}</span>
                        <span className="font-pixel text-[9px]">{doneCount}/{r.nodes.length}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Tree Drawing View */}
              <div className="lg:col-span-2 bg-black border-4 border-slate-800 p-6 text-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500 animate-float" />
                    <h3 className="font-pixel text-[11px] text-yellow-400">ÁRBOL ESQUEMÁTICO DIRECTO</h3>
                  </div>
                  <span className="font-mono text-xs text-cyan-400">{selectedRoadmap.title}</span>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-none overflow-x-auto">
                  <div className="font-pixel text-[9px] text-slate-400 mb-6 flex items-center gap-1.5 select-none">
                    <Sparkles className="w-4 h-4 text-yellow-400 animate-float" />
                    <span>DIAGRAMA DE AVANCE GENERAL (VISTA DE LECTURA - MODIFICA EN LA PESTAÑA DE ÁRBOLES)</span>
                  </div>

                  <div className="space-y-4 font-mono text-xs leading-relaxed min-w-[320px] select-text">
                    <div className="text-yellow-400 font-bold mb-2">
                      [{selectedRoadmap.icon}] {selectedRoadmap.title}
                    </div>

                    {selectedRoadmap.nodes.map((node, index) => {
                      // Custom drawing helpers
                      const isFirst = index === 0;
                      let statusBadge = '';
                      let statusColor = '';

                      if (node.status === 'completed') {
                        statusBadge = '[💎 COMPLETO]';
                        statusColor = 'text-emerald-400 font-bold';
                      } else if (node.status === 'available') {
                        statusBadge = '[🔹 APRENDIBLE]';
                        statusColor = 'text-cyan-400 font-medium';
                      } else {
                        statusBadge = '[🔒 BLOQUEADO]';
                        statusColor = 'text-slate-500';
                      }

                      return (
                        <div key={node.id} className="flex flex-col">
                          {!isFirst && (
                            <div className="pl-6 text-slate-600 font-bold -my-1 select-none">
                              │ <span className="text-[10px] text-slate-700">prerreq: {node.prerequisites.join(', ')}</span>
                            </div>
                          )}
                          <div 
                            className={`pl-6 flex items-start gap-2 p-1 cursor-default transition-all ${statusColor}`}
                          >
                            <span className="text-slate-600 font-bold select-none">└──</span>
                            <span className="font-pixel text-[9px] shrink-0 select-none">{statusBadge}</span>
                            <span className="truncate">
                              {node.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap text-slate-500 font-mono text-[10px] pt-2">
                  <div className="flex items-center gap-1">
                    <span>💎</span> <span className="text-emerald-400 font-bold">Dominada</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🔹</span> <span className="text-cyan-400">Disponible</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🔒</span> <span className="text-slate-600">Bloqueada (Falta prerrequisito)</span>
                  </div>
                </div>

              </div>

            </section>

          </div>
        )}

        {/* TAB 3: CURATED LIST OF FREE TOOLS AND RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-6 select-none">
            
            <div className="p-6 bg-[#1e293b] retro-border border-black retro-shadow text-white">
              <h3 className="font-pixel text-[13px] text-emerald-400 mb-2 flex items-center gap-2">
                <span>📚 RECURSOS Y HERRAMIENTAS GRATUITAS</span>
              </h3>
              <p className="font-mono text-sm text-slate-300 leading-relaxed">
                El conocimiento es libre. Hemos seleccionado las plataformas oficiales más prestigiosas para estudiar programación, desarrollo web, backend, bases de datos y seguridad. Todas son de acceso 100% gratuito.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {freeResources.map((res, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-900 border-4 border-emerald-500/60 p-5 retro-border retro-shadow-sm hover:border-emerald-400 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-pixel text-[9px] px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {res.category}
                      </span>
                      <span className="font-mono text-[11px] text-yellow-400 font-bold">
                        {res.badge}
                      </span>
                    </div>

                    <h4 className="font-pixel text-[11px] text-white tracking-wide mt-2 mb-2">
                      {res.name}
                    </h4>

                    <p className="font-mono text-xs text-slate-300 leading-relaxed mb-4">
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <a
                      href={res.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
                    >
                      <span>Visitar sitio oficial</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t-4 border-slate-800 py-8 bg-black text-slate-500 font-mono text-center text-xs select-none">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>
            🕹️ <span className="font-pixel text-[9px] text-slate-400">Skill Tree RPG</span> — Sistema de Gamificación de Aprendizaje local.
          </p>
          <p className="text-slate-600 text-[11px]">
            Diseño minimalista de alto contraste y peso pluma. Preparado para distribución multiplataforma con Tauri o Electron.
          </p>
        </div>
      </footer>

      {/* OVERLAY MODALS & TOAST FEEDBACK */}
      <LevelUpModal
        isOpen={isLevelUpOpen}
        level={gameState.profile.level}
        onClose={() => setIsLevelUpOpen(false)}
      />

      <MissionCompleteToast
        isOpen={toastConfig.isOpen}
        skillName={toastConfig.skillName}
        xpGained={toastConfig.xpGained}
        onClose={() => setToastConfig(prev => ({ ...prev, isOpen: false }))}
      />

    </div>
  );
}
