import { GameState, Roadmap, SkillNode, PlayerProfile } from '../types';
import { mockRoadmaps } from '../data/mockRoadmaps';

const STORAGE_KEY = 'SKILL_TREE_RPG_STATE';

/**
 * Helper to check if a node has any of its children completed, transitively.
 * Used when un-completing a node to recursively un-complete any dependent nodes.
 */
function getDependentNodeIds(roadmap: Roadmap, parentNodeId: string): Set<string> {
  const dependents = new Set<string>();
  
  // Find nodes that have parentNodeId as a prerequisite
  const findDirectDependents = (id: string) => {
    return roadmap.nodes.filter(n => n.prerequisites.includes(id)).map(n => n.id);
  };

  const queue = [parentNodeId];
  while (queue.length > 0) {
    const current = queue.shift()!;
    const direct = findDirectDependents(current);
    for (const d of direct) {
      if (!dependents.has(d)) {
        dependents.add(d);
        queue.push(d);
      }
    }
  }

  return dependents;
}

/**
 * Calculates the current PlayerProfile (level, currentXp, nextLevelXp) based on total XP.
 * Curve:
 * Level 1: requires 100 XP
 * Level 2: requires 200 XP
 * Level 3: requires 300 XP
 * Level L: requires L * 100 XP
 */
export function calculateProfileFromXp(totalXp: number): PlayerProfile {
  let level = 1;
  let remainingXp = totalXp;
  let nextLevelXp = 100;

  while (remainingXp >= nextLevelXp) {
    remainingXp -= nextLevelXp;
    level += 1;
    nextLevelXp = level * 100;
  }

  return {
    level,
    currentXp: remainingXp,
    nextLevelXp
  };
}

/**
 * Calculates the total XP based on all completed nodes in the state
 */
export function calculateTotalXp(activeRoadmaps: Roadmap[]): number {
  let total = 0;
  for (const r of activeRoadmaps) {
    for (const n of r.nodes) {
      if (n.status === 'completed') {
        total += n.xp;
      }
    }
  }
  return total;
}

/**
 * Re-evaluates node statuses (locked, available, completed) based on which node IDs are completed.
 */
export function recalculateRoadmapStatuses(roadmaps: Roadmap[], completedNodeIds: Set<string>): Roadmap[] {
  return roadmaps.map((r) => {
    // Map nodes to their updated status
    const updatedNodes = r.nodes.map((node) => {
      let status: 'locked' | 'available' | 'completed' = 'locked';

      if (completedNodeIds.has(node.id)) {
        status = 'completed';
      } else {
        // If all prerequisites are in completedNodeIds, it's available.
        // Otherwise, it is locked.
        const allPrereqsMet = node.prerequisites.every((prereqId) => completedNodeIds.has(prereqId));
        if (allPrereqsMet) {
          status = 'available';
        } else {
          status = 'locked';
        }
      }

      return {
        ...node,
        status
      };
    });

    return {
      ...r,
      nodes: updatedNodes
    };
  });
}

/**
 * Get the initial GameState. Loads from LocalStorage if present,
 * and merges progress with the latest mockRoadmaps (adding new roadmaps and subtasks automatically).
 */
export function getInitialState(): GameState {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.activeRoadmaps) {
          // Identify completed nodes
          const completedIds = new Set<string>();
          const completedSubtaskIds = new Set<string>();

          parsed.activeRoadmaps.forEach((r: any) => {
            if (r && Array.isArray(r.nodes)) {
              r.nodes.forEach((n: any) => {
                if (n.status === 'completed') {
                  completedIds.add(n.id);
                }
                if (Array.isArray(n.subtasks)) {
                  n.subtasks.forEach((st: any) => {
                    if (st.completed) {
                      completedSubtaskIds.add(st.id);
                    }
                  });
                }
              });
            }
          });

          // Merge with fresh mockRoadmaps
          const mergedRoadmaps = mockRoadmaps.map((mRoadmap) => {
            const updatedNodes = mRoadmap.nodes.map((mNode) => {
              // Get fresh subtasks for this node
              const freshSubtasks = mNode.subtasks ? mNode.subtasks.map(st => {
                const isSubtaskCompleted = completedIds.has(mNode.id) || completedSubtaskIds.has(st.id);
                return { ...st, completed: isSubtaskCompleted };
              }) : undefined;

              // Check if node itself should be completed
              let isCompleted = completedIds.has(mNode.id);
              if (freshSubtasks && freshSubtasks.length > 0) {
                const allSubtasksCompleted = freshSubtasks.every(st => st.completed);
                if (allSubtasksCompleted) {
                  isCompleted = true;
                }
              }

              return {
                ...mNode,
                subtasks: freshSubtasks,
                status: isCompleted ? 'completed' as const : 'locked' as const
              };
            });

            return {
              ...mRoadmap,
              nodes: updatedNodes
            };
          });

          // Recalculate full chain status to unlock correctly
          const activeCompletedIds = new Set(
            mergedRoadmaps.flatMap(r => r.nodes.filter(n => n.status === 'completed').map(n => n.id))
          );
          const finalRoadmaps = recalculateRoadmapStatuses(mergedRoadmaps, activeCompletedIds);

          const totalXp = calculateTotalXp(finalRoadmaps);
          const profile = calculateProfileFromXp(totalXp);

          return {
            profile,
            activeRoadmaps: finalRoadmaps
          };
        }
      } catch (e) {
        console.error("Failed to parse saved Skill Tree RPG state:", e);
      }
    }
  }

  // Fallback default state initialization
  const completedIds = new Set<string>();
  const initializedRoadmaps = recalculateRoadmapStatuses(mockRoadmaps, completedIds);
  const profile = calculateProfileFromXp(0);

  return {
    profile,
    activeRoadmaps: initializedRoadmaps
  };
}

/**
 * Saves state to LocalStorage.
 */
export function saveState(state: GameState): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

/**
 * Reset all progress back to Level 1, 0 XP.
 */
export function resetGameState(): GameState {
  const completedIds = new Set<string>();
  const initializedRoadmaps = recalculateRoadmapStatuses(mockRoadmaps, completedIds);
  const profile = calculateProfileFromXp(0);

  const defaultState = {
    profile,
    activeRoadmaps: initializedRoadmaps
  };
  saveState(defaultState);
  return defaultState;
}

/**
 * Toggles a node's completion status.
 * Returns the new GameState, whether a level up happened, and whether the node was completed.
 */
export function toggleNode(
  state: GameState,
  roadmapId: string,
  nodeId: string
): { newState: GameState; leveledUp: boolean; isCompletedNow: boolean; error?: string } {
  // Find the roadmap and node
  const roadmapIndex = state.activeRoadmaps.findIndex(r => r.id === roadmapId);
  if (roadmapIndex === -1) return { newState: state, leveledUp: false, isCompletedNow: false, error: 'Roadmap no encontrado' };

  const roadmap = state.activeRoadmaps[roadmapIndex];
  const node = roadmap.nodes.find(n => n.id === nodeId);
  if (!node) return { newState: state, leveledUp: false, isCompletedNow: false, error: 'Habilidad no encontrada' };

  // If node is locked, we cannot do anything
  if (node.status === 'locked') {
    return { newState: state, leveledUp: false, isCompletedNow: false, error: 'Habilidad bloqueada: Completa los prerrequisitos primero' };
  }

  // Get current completed nodes
  const completedNodeIds = new Set<string>();
  state.activeRoadmaps.forEach(r => {
    r.nodes.forEach(n => {
      if (n.status === 'completed') {
        completedNodeIds.add(n.id);
      }
    });
  });

  const isCompletedNow = !completedNodeIds.has(nodeId);

  if (isCompletedNow) {
    // Add to completed set
    completedNodeIds.add(nodeId);
  } else {
    // Remove from completed set
    completedNodeIds.delete(nodeId);
    
    // Cascading un-completion: any node that transitively requires this one must also be removed
    const dependents = getDependentNodeIds(roadmap, nodeId);
    dependents.forEach(depId => completedNodeIds.delete(depId));
  }

  // Map subtasks to match parent node completion state
  const tempRoadmaps = state.activeRoadmaps.map((r) => {
    return {
      ...r,
      nodes: r.nodes.map((n) => {
        // For the specific node clicked, sync its subtasks
        if (n.id === nodeId && n.subtasks) {
          return {
            ...n,
            subtasks: n.subtasks.map(st => ({ ...st, completed: isCompletedNow }))
          };
        }
        return n;
      })
    };
  });

  // Rebuild the roadmaps with updated statuses
  const updatedRoadmaps = recalculateRoadmapStatuses(tempRoadmaps, completedNodeIds);

  // For any node that is now locked, reset its subtasks to false
  const finalRoadmaps = updatedRoadmaps.map((r) => {
    return {
      ...r,
      nodes: r.nodes.map((n) => {
        if (n.status === 'locked' && n.subtasks) {
          return {
            ...n,
            subtasks: n.subtasks.map(st => ({ ...st, completed: false }))
          };
        }
        return n;
      })
    };
  });

  // Recalculate profile
  const newTotalXp = calculateTotalXp(finalRoadmaps);
  const oldProfile = state.profile;
  const newProfile = calculateProfileFromXp(newTotalXp);

  const leveledUp = newProfile.level > oldProfile.level;

  const newState: GameState = {
    profile: newProfile,
    activeRoadmaps: finalRoadmaps
  };

  saveState(newState);

  return {
    newState,
    leveledUp,
    isCompletedNow
  };
}

/**
 * Toggles a single subtask within a node.
 * Automatically recalculates node completion:
 * - If all subtasks of a node are completed, the node is marked completed.
 * - If any subtask of a completed node is uncompleted, the node is uncompleted (with cascade).
 */
export function toggleSubtask(
  state: GameState,
  roadmapId: string,
  nodeId: string,
  subtaskId: string
): { newState: GameState; leveledUp: boolean; isCompletedNow: boolean; error?: string } {
  // Find the roadmap and node
  const roadmapIndex = state.activeRoadmaps.findIndex(r => r.id === roadmapId);
  if (roadmapIndex === -1) return { newState: state, leveledUp: false, isCompletedNow: false, error: 'Roadmap no encontrado' };

  const roadmap = state.activeRoadmaps[roadmapIndex];
  const node = roadmap.nodes.find(n => n.id === nodeId);
  if (!node) return { newState: state, leveledUp: false, isCompletedNow: false, error: 'Habilidad no encontrada' };

  // If node is locked, cannot toggle subtask
  if (node.status === 'locked') {
    return { newState: state, leveledUp: false, isCompletedNow: false, error: 'Habilidad bloqueada: Completa los prerrequisitos primero' };
  }

  // Update the target subtask
  if (!node.subtasks) {
    return { newState: state, leveledUp: false, isCompletedNow: false, error: 'Esta habilidad no contiene subtareas' };
  }

  const updatedSubtasks = node.subtasks.map(st => {
    if (st.id === subtaskId) {
      return { ...st, completed: !st.completed };
    }
    return st;
  });

  const allCompletedNow = updatedSubtasks.every(st => st.completed);

  // Get currently completed nodes
  const completedNodeIds = new Set<string>();
  state.activeRoadmaps.forEach(r => {
    r.nodes.forEach(n => {
      if (n.status === 'completed') {
        completedNodeIds.add(n.id);
      }
    });
  });

  const wasCompleted = completedNodeIds.has(nodeId);
  let isCompletedNow = wasCompleted;

  if (allCompletedNow && !wasCompleted) {
    completedNodeIds.add(nodeId);
    isCompletedNow = true;
  } else if (!allCompletedNow && wasCompleted) {
    completedNodeIds.delete(nodeId);
    isCompletedNow = false;
    
    // Cascade uncompletion of dependents
    const dependents = getDependentNodeIds(roadmap, nodeId);
    dependents.forEach(depId => completedNodeIds.delete(depId));
  }

  // Re-map the subtasks for the toggled node specifically in the state
  const tempRoadmaps = state.activeRoadmaps.map((r, rIdx) => {
    if (rIdx === roadmapIndex) {
      return {
        ...r,
        nodes: r.nodes.map(n => {
          if (n.id === nodeId) {
            return { ...n, subtasks: updatedSubtasks };
          }
          return n;
        })
      };
    }
    return r;
  });

  // Rebuild the roadmaps with updated statuses
  const updatedRoadmaps = recalculateRoadmapStatuses(tempRoadmaps, completedNodeIds);

  // For any node that is now locked, reset its subtasks to false
  const finalRoadmaps = updatedRoadmaps.map((r) => {
    return {
      ...r,
      nodes: r.nodes.map((n) => {
        if (n.status === 'locked' && n.subtasks) {
          return {
            ...n,
            subtasks: n.subtasks.map(st => ({ ...st, completed: false }))
          };
        }
        return n;
      })
    };
  });

  // Recalculate profile
  const newTotalXp = calculateTotalXp(finalRoadmaps);
  const oldProfile = state.profile;
  const newProfile = calculateProfileFromXp(newTotalXp);

  const leveledUp = newProfile.level > oldProfile.level;

  const newState: GameState = {
    profile: newProfile,
    activeRoadmaps: finalRoadmaps
  };

  saveState(newState);

  return {
    newState,
    leveledUp,
    isCompletedNow: !wasCompleted && isCompletedNow
  };
}
