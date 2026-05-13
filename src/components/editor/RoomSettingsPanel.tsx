import { useRoomStore } from '@/stores/roomStore';
import { Button, Label } from 'react-aria-components';

const inputClass = 'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-rm-primary focus:ring-1 focus:ring-rm-primary/20 transition-colors';
const labelClass = 'text-xs font-medium text-rm-muted block mb-1.5';

export default function RoomSettingsPanel() {
  const { room, unit, setRoomDimensions, setRoomVertices, setRoomShapeType } = useRoomStore();

  return (
    <div className="w-72 bg-white border-l border-gray-200 flex flex-col shrink-0 h-full">
      <div className="p-4 border-b border-gray-100 shrink-0">
        <h3 className="text-sm font-semibold text-rm-dark">Room Settings</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div>
          <Label className={labelClass}>Room Name</Label>
          <input
            value={room.name}
            onChange={(e) => useRoomStore.getState().setRoom({ ...room, name: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="h-px bg-gray-100" />

        <div>
          <Label className={labelClass}>Room Shape</Label>
          <select
            className={`${inputClass} cursor-pointer`}
            value={room.shape.type}
            onChange={(e) => setRoomShapeType(e.target.value as typeof room.shape.type)}
          >
            <option value="rectangle">Rectangle</option>
            <option value="l-shape">L-Shape</option>
            <option value="polygon">Custom Polygon</option>
          </select>
        </div>

        {room.shape.type === 'rectangle' && (
          <div>
            <Label className={labelClass}>Dimensions ({unit})</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-[11px] text-rm-muted block mb-1">Width</Label>
                <input type="number" value={room.shape.width} min={24} max={600} onChange={(e) => setRoomDimensions(Number(e.target.value), room.shape.height)} className={inputClass} />
              </div>
              <div>
                <Label className="text-[11px] text-rm-muted block mb-1">Height</Label>
                <input type="number" value={room.shape.height} min={24} max={600} onChange={(e) => setRoomDimensions(room.shape.width, Number(e.target.value))} className={inputClass} />
              </div>
            </div>
          </div>
        )}

        {(room.shape.type === 'l-shape' || room.shape.type === 'polygon') && (
          <div>
            <Label className={labelClass}>
              Vertices ({unit}) &mdash; {room.shape.vertices?.length ?? 0} points
            </Label>
            <p className="text-xs text-rm-muted mb-3">Click on canvas to add vertices</p>
            {room.shape.vertices && (
              <div className="space-y-1.5 max-h-52 overflow-y-auto">
                {room.shape.vertices.map((v: { x: number; y: number }, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-rm-muted w-6 shrink-0">P{i + 1}</span>
                    <input
                      type="number"
                      value={v.x}
                      onChange={(e) => {
                        const verts = [...room.shape.vertices!];
                        verts[i] = { ...verts[i], x: Number(e.target.value) };
                        setRoomVertices(verts);
                      }}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs outline-none focus:border-rm-primary"
                    />
                    <input
                      type="number"
                      value={v.y}
                      onChange={(e) => {
                        const verts = [...room.shape.vertices!];
                        verts[i] = { ...verts[i], y: Number(e.target.value) };
                        setRoomVertices(verts);
                      }}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs outline-none focus:border-rm-primary"
                    />
                  </div>
                ))}
              </div>
            )}
            {room.shape.vertices && room.shape.vertices.length > 3 && (
              <Button
                onPress={() => setRoomVertices(room.shape.vertices!.slice(0, -1))}
                className="text-xs text-rm-danger hover:text-red-700 mt-3 cursor-pointer outline-none"
              >
                Remove last vertex
              </Button>
            )}
          </div>
        )}

        <div className="h-px bg-gray-100" />

        <div className="bg-rm-surface-alt rounded-lg p-3 space-y-1">
          <p className="text-xs text-rm-muted">Room: {room.shape.width} &times; {room.shape.height} {unit}</p>
          <p className="text-xs text-rm-muted">
            Area:{' '}
            {room.shape.type === 'rectangle'
              ? `${((room.shape.width * room.shape.height) / 144).toFixed(1)} sq ft`
              : 'Calculated from vertices'}
          </p>
        </div>
      </div>
    </div>
  );
}
