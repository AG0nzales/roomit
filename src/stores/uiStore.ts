import { create } from 'zustand';

interface UIState {
  activePanel: 'palette' | 'properties' | 'room-settings' | null;
  showGrid: boolean;
  snapToGrid: boolean;
  isEditingRoomShape: boolean;
  editingVertexIndex: number | null;

  setActivePanel: (panel: UIState['activePanel']) => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  setIsEditingRoomShape: (editing: boolean) => void;
  setEditingVertexIndex: (index: number | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activePanel: 'palette',
  showGrid: true,
  snapToGrid: true,
  isEditingRoomShape: false,
  editingVertexIndex: null,

  setActivePanel: (panel) => set({ activePanel: panel }),
  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
  toggleSnapToGrid: () => set((s) => ({ snapToGrid: !s.snapToGrid })),
  setIsEditingRoomShape: (editing) => set({ isEditingRoomShape: editing }),
  setEditingVertexIndex: (index) => set({ editingVertexIndex: index }),
}));
