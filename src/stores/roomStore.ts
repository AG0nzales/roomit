import { create } from 'zustand';
import type { Room, FurnitureItem, Unit, Point, RoomShapeType } from '@/types';
import { FURNITURE_TEMPLATES } from '@/types';

interface RoomState {
  room: Room;
  furniture: FurnitureItem[];
  selectedFurnitureId: string | null;
  unit: Unit;
  scale: number;
  gridSize: number;

  setRoom: (room: Room) => void;
  setRoomDimensions: (width: number, height: number) => void;
  setRoomShapeType: (type: RoomShapeType) => void;
  setRoomVertices: (vertices: Point[]) => void;
  setUnit: (unit: Unit) => void;
  setScale: (scale: number) => void;
  addFurniture: (type: FurnitureItem['type'], x: number, y: number) => void;
  updateFurniture: (id: string, updates: Partial<FurnitureItem>) => void;
  removeFurniture: (id: string) => void;
  selectFurniture: (id: string | null) => void;
  duplicateFurniture: (id: string) => void;
  clearAll: () => void;
  rotateFurniture: (id: string, angle: number) => void;
}

let idCounter = 0;
const genId = () => `item-${++idCounter}-${Date.now()}`;

export const useRoomStore = create<RoomState>((set, get) => ({
  room: {
    id: 'room-1',
    name: 'My Room',
    shape: {
      type: 'rectangle',
      width: 168,
      height: 144,
    },
  },
  furniture: [],
  selectedFurnitureId: null,
  unit: 'in',
  scale: 4,
  gridSize: 12,

  setRoom: (room) => set({ room }),

  setRoomDimensions: (width, height) =>
    set((state) => ({
      room: {
        ...state.room,
        shape: { ...state.room.shape, width, height },
      },
    })),

  setRoomShapeType: (type) =>
    set((state) => {
      const shape = { ...state.room.shape, type };
      if (type === 'l-shape') {
        shape.width = 192;
        shape.height = 168;
        shape.vertices = [
          { x: 0, y: 0 },
          { x: 192, y: 0 },
          { x: 192, y: 72 },
          { x: 96, y: 72 },
          { x: 96, y: 168 },
          { x: 0, y: 168 },
        ];
      } else if (type === 'polygon') {
        shape.vertices = [
          { x: 0, y: 0 },
          { x: 168, y: 0 },
          { x: 168, y: 144 },
          { x: 0, y: 144 },
        ];
      } else {
        shape.vertices = undefined;
      }
      return { room: { ...state.room, shape } };
    }),

  setRoomVertices: (vertices) =>
    set((state) => ({
      room: {
        ...state.room,
        shape: { ...state.room.shape, vertices, type: 'polygon' as const },
      },
    })),

  setUnit: (unit) => {
    const state = get();
    const conversion = unit === 'cm' ? 2.54 : 1 / 2.54;
    const room = {
      ...state.room,
      shape: {
        ...state.room.shape,
        width: Math.round(state.room.shape.width * conversion),
        height: Math.round(state.room.shape.height * conversion),
        vertices: state.room.shape.vertices?.map((v) => ({
          x: Math.round(v.x * conversion),
          y: Math.round(v.y * conversion),
        })),
      },
    };
    const furniture = state.furniture.map((f) => ({
      ...f,
      x: Math.round(f.x * conversion),
      y: Math.round(f.y * conversion),
      width: Math.round(f.width * conversion),
      height: Math.round(f.height * conversion),
    }));
    const scale = unit === 'cm' ? Math.round(4 * 2.54) : 4;
    set({ unit, room, furniture, scale, gridSize: unit === 'cm' ? 30 : 12 });
  },

  setScale: (scale) => set({ scale }),

  addFurniture: (type, x, y) => {
    const template = FURNITURE_TEMPLATES.find((t) => t.type === type);
    if (!template) return;
    const item: FurnitureItem = {
      id: genId(),
      type: template.type,
      x: Math.round(x),
      y: Math.round(y),
      width: template.defaultWidth,
      height: template.defaultHeight,
      rotation: 0,
      label: template.label,
      color: template.color,
      borderColor: template.borderColor,
      filled: template.filled,
    };
    set((state) => ({ furniture: [...state.furniture, item], selectedFurnitureId: item.id }));
  },

  updateFurniture: (id, updates) =>
    set((state) => ({
      furniture: state.furniture.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })),

  removeFurniture: (id) =>
    set((state) => ({
      furniture: state.furniture.filter((f) => f.id !== id),
      selectedFurnitureId: state.selectedFurnitureId === id ? null : state.selectedFurnitureId,
    })),

  selectFurniture: (id) => set({ selectedFurnitureId: id }),

  duplicateFurniture: (id) => {
    const state = get();
    const item = state.furniture.find((f) => f.id === id);
    if (!item) return;
    const newItem: FurnitureItem = {
      ...item,
      id: genId(),
      x: item.x + 12,
      y: item.y + 12,
    };
    set((s) => ({
      furniture: [...s.furniture, newItem],
      selectedFurnitureId: newItem.id,
    }));
  },

  clearAll: () => set({ furniture: [], selectedFurnitureId: null }),

  rotateFurniture: (id, angle) =>
    set((state) => ({
      furniture: state.furniture.map((f) =>
        f.id === id ? { ...f, rotation: (f.rotation + angle) % 360 } : f
      ),
    })),
}));
