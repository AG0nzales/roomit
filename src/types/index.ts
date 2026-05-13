export type Unit = 'in' | 'cm';

export interface Point {
  x: number;
  y: number;
}

export type RoomShapeType = 'rectangle' | 'l-shape' | 'polygon';

export interface RoomShape {
  type: RoomShapeType;
  width: number;
  height: number;
  vertices?: Point[];
}

export interface Room {
  id: string;
  name: string;
  shape: RoomShape;
}

export type FurnitureType =
  | 'bed'
  | 'sofa'
  | 'table'
  | 'chair'
  | 'cabinet'
  | 'mini-cabinet'
  | 'mirror'
  | 'wardrobe'
  | 'desk'
  | 'nightstand'
  | 'bookshelf'
  | 'tv-stand'
  | 'dresser'
  | 'dining-table';

export interface FurnitureItem {
  id: string;
  type: FurnitureType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  label: string;
  color: string;
  filled: boolean;
  borderColor: string;
}

export interface FurnitureTemplate {
  type: FurnitureType;
  label: string;
  defaultWidth: number;
  defaultHeight: number;
  color: string;
  borderColor: string;
  filled: boolean;
  icon: string;
}

export const FURNITURE_TEMPLATES: FurnitureTemplate[] = [
  { type: 'bed', label: 'Bed', defaultWidth: 60, defaultHeight: 80, color: '#DBEAFE', borderColor: '#3B82F6', filled: true, icon: '🛏' },
  { type: 'sofa', label: 'Sofa', defaultWidth: 72, defaultHeight: 30, color: '#FDE68A', borderColor: '#F59E0B', filled: true, icon: '🛋' },
  { type: 'table', label: 'Table', defaultWidth: 36, defaultHeight: 36, color: '#D1FAE5', borderColor: '#10B981', filled: true, icon: '🪑' },
  { type: 'chair', label: 'Chair', defaultWidth: 18, defaultHeight: 18, color: '#E5E7EB', borderColor: '#6B7280', filled: true, icon: '🪑' },
  { type: 'cabinet', label: 'Cabinet', defaultWidth: 36, defaultHeight: 18, color: '#FED7AA', borderColor: '#F97316', filled: true, icon: '🗄' },
  { type: 'mini-cabinet', label: 'Mini Cabinet', defaultWidth: 18, defaultHeight: 18, color: '#FED7AA', borderColor: '#F97316', filled: true, icon: '🗄' },
  { type: 'mirror', label: 'Mirror', defaultWidth: 24, defaultHeight: 36, color: '#E0E7FF', borderColor: '#6366F1', filled: false, icon: '🪞' },
  { type: 'wardrobe', label: 'Wardrobe', defaultWidth: 60, defaultHeight: 24, color: '#FECACA', borderColor: '#EF4444', filled: true, icon: '归' },
  { type: 'desk', label: 'Desk', defaultWidth: 48, defaultHeight: 24, color: '#FEF3C7', borderColor: '#D97706', filled: true, icon: '🖥' },
  { type: 'nightstand', label: 'Nightstand', defaultWidth: 18, defaultHeight: 18, color: '#F3E8FF', borderColor: '#A855F7', filled: true, icon: '🗄' },
  { type: 'bookshelf', label: 'Bookshelf', defaultWidth: 36, defaultHeight: 12, color: '#ECFDF5', borderColor: '#059669', filled: true, icon: '📚' },
  { type: 'tv-stand', label: 'TV Stand', defaultWidth: 48, defaultHeight: 16, color: '#F1F5F9', borderColor: '#475569', filled: true, icon: '📺' },
  { type: 'dresser', label: 'Dresser', defaultWidth: 42, defaultHeight: 20, color: '#FCE7F3', borderColor: '#EC4899', filled: true, icon: '🗄' },
  { type: 'dining-table', label: 'Dining Table', defaultWidth: 42, defaultHeight: 60, color: '#D1FAE5', borderColor: '#10B981', filled: true, icon: '🍽' },
];

export const ROOM_PRESETS: { label: string; width: number; height: number; type: RoomShapeType }[] = [
  { label: 'Small Bedroom', width: 120, height: 120, type: 'rectangle' },
  { label: 'Master Bedroom', width: 180, height: 160, type: 'rectangle' },
  { label: 'Living Room', width: 192, height: 168, type: 'rectangle' },
  { label: 'Kitchen', width: 144, height: 120, type: 'rectangle' },
  { label: 'Bathroom', width: 96, height: 96, type: 'rectangle' },
  { label: 'Office', width: 120, height: 120, type: 'rectangle' },
  { label: 'L-Shape Room', width: 192, height: 168, type: 'l-shape' },
  { label: 'Custom', width: 0, height: 0, type: 'polygon' },
];
