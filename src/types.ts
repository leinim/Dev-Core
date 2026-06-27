export type Difficulty = 'basic' | 'intermediate' | 'advanced';
export type NodeStatus = 'locked' | 'available' | 'completed';

export interface SubTask {
  id: string;
  name: string;
  completed: boolean;
}

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  xp: number;
  status: NodeStatus;
  prerequisites: string[]; // IDs of parent nodes that must be completed
  subtasks?: SubTask[];
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji representing the roadmap topic
  nodes: SkillNode[];
}

export interface PlayerProfile {
  level: number;
  currentXp: number;
  nextLevelXp: number;
}

export interface GameState {
  profile: PlayerProfile;
  activeRoadmaps: Roadmap[];
}
