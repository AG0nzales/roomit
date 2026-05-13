import { useRoomStore } from '@/stores/roomStore';
import { useUIStore } from '@/stores/uiStore';
import { ROOM_PRESETS } from '@/types';
import type { RoomShapeType } from '@/types';
import { Button, Switch, Label } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';

export default function Toolbar() {
  const { room, unit, furniture, setUnit, setRoomDimensions, setRoomShapeType, clearAll, setRoomVertices } = useRoomStore();
  const { activePanel, setActivePanel, showGrid, snapToGrid, toggleGrid, toggleSnapToGrid } = useUIStore();
  const navigate = useNavigate();

  const handleNewRoom = (presetIdx: number) => {
    const preset = ROOM_PRESETS[presetIdx];
    if (preset.type === 'polygon') {
      setRoomVertices([
        { x: 0, y: 0 },
        { x: 168, y: 0 },
        { x: 168, y: 144 },
        { x: 0, y: 144 },
      ]);
      setRoomShapeType('polygon');
    } else if (preset.type === 'l-shape') {
      setRoomShapeType('l-shape');
    } else {
      setRoomShapeType('rectangle');
      setRoomDimensions(preset.width, preset.height);
    }
  };

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 shrink-0">
      <Button
        onPress={() => navigate('/')}
        className="flex items-center gap-1.5 text-rm-muted hover:text-rm-text px-2 py-1.5 rounded-lg text-sm cursor-pointer hover:bg-gray-100 transition-colors data-[pressed]:scale-[0.97] outline-none"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <span className="hidden sm:inline text-xs">Back</span>
      </Button>

      <div className="w-px h-6 bg-gray-200" />

      <span className="text-sm font-semibold text-rm-dark">{room.name}</span>

      <div className="w-px h-6 bg-gray-200" />

      <div className="flex items-center gap-2">
        <span className="text-xs text-rm-muted">Room:</span>
        <select
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-rm-text cursor-pointer outline-none focus:border-rm-primary"
          value={room.shape.type}
          onChange={(e) => handleNewRoom(ROOM_PRESETS.findIndex((p) => p.type === (e.target.value as RoomShapeType)))}
        >
          {ROOM_PRESETS.map((p, i) => (
            <option key={i} value={p.type}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="text-xs text-rm-muted">Grid</Label>
            <Switch isSelected={showGrid} onChange={toggleGrid} className="group flex items-center gap-1.5 cursor-pointer">
              <div className="w-8 h-[18px] bg-gray-200 rounded-full relative transition-colors group-selected:bg-rm-primary">
                <div className="absolute top-[3px] left-[3px] w-3 h-3 bg-white rounded-full shadow-sm transition-transform group-selected:translate-x-[14px]" />
              </div>
            </Switch>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-xs text-rm-muted">Snap</Label>
            <Switch isSelected={snapToGrid} onChange={toggleSnapToGrid} className="group flex items-center gap-1.5 cursor-pointer">
              <div className="w-8 h-[18px] bg-gray-200 rounded-full relative transition-colors group-selected:bg-rm-primary">
                <div className="absolute top-[3px] left-[3px] w-3 h-3 bg-white rounded-full shadow-sm transition-transform group-selected:translate-x-[14px]" />
              </div>
            </Switch>
          </div>

          <div className="w-px h-6 bg-gray-200" />
        </div>

        <div className="flex items-center gap-1.5">
          {(['palette', 'room-settings', 'properties'] as const).map((panel) => (
            <Button
              key={panel}
              onPress={() => setActivePanel(activePanel === panel ? null : panel)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors outline-none data-[pressed]:scale-[0.97] ${
                activePanel === panel
                  ? 'bg-rm-primary text-white'
                  : 'bg-gray-100 text-rm-muted hover:bg-gray-200 hover:text-rm-text'
              }`}
            >
              {panel === 'palette' ? 'Palette' : panel === 'room-settings' ? 'Room' : 'Props'}
            </Button>
          ))}
        </div>

        <div className="w-px h-6 bg-gray-200" />

        <select
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-rm-text cursor-pointer outline-none focus:border-rm-primary"
          value={unit}
          onChange={(e) => setUnit(e.target.value as 'in' | 'cm')}
        >
          <option value="in">Inches</option>
          <option value="cm">Centimeters</option>
        </select>

        {furniture.length > 0 && (
          <Button
            onPress={clearAll}
            className="text-rm-danger text-xs hover:bg-red-50 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors outline-none data-[pressed]:scale-[0.97]"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
}
