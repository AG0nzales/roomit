import { useCallback } from 'react';
import { useRoomStore } from '@/stores/roomStore';
import { useUIStore } from '@/stores/uiStore';
import type { FurnitureType } from '@/types';
import Toolbar from '@/components/editor/Toolbar';
import RoomCanvas from '@/components/editor/RoomCanvas';
import FurniturePalette from '@/components/editor/FurniturePalette';
import PropertyPanel from '@/components/editor/PropertyPanel';
import RoomSettingsPanel from '@/components/editor/RoomSettingsPanel';

export default function EditorPage() {
  const { room, addFurniture } = useRoomStore();
  const { activePanel } = useUIStore();

  const handleAddFurniture = useCallback((type: FurnitureType) => {
    const cx = room.shape.width / 2 - 30;
    const cy = room.shape.height / 2 - 20;
    addFurniture(type, Math.round(cx), Math.round(cy));
  }, [room.shape.width, room.shape.height, addFurniture]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50">
      <Toolbar />
      <div className="flex flex-1 min-h-0">
        {activePanel === 'palette' && (
          <FurniturePalette onAddFurniture={handleAddFurniture} />
        )}
        <RoomCanvas />
        {activePanel === 'properties' && (
          <PropertyPanel />
        )}
        {activePanel === 'room-settings' && (
          <RoomSettingsPanel />
        )}
      </div>
    </div>
  );
}
