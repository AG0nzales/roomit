import { useRoomStore } from '@/stores/roomStore';
import { Button, Label } from 'react-aria-components';
import type { FurnitureItem } from '@/types';

const inputClass = 'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-rm-primary focus:ring-1 focus:ring-rm-primary/20 transition-colors';
const labelClass = 'text-xs font-medium text-rm-muted block mb-1.5';

export default function PropertyPanel() {
  const { furniture, selectedFurnitureId, unit, updateFurniture, removeFurniture, rotateFurniture, duplicateFurniture, selectFurniture } = useRoomStore();

  const selected = furniture.find((f) => f.id === selectedFurnitureId);

  if (!selected) {
    return (
      <div className="w-72 bg-white border-l border-gray-200 flex flex-col shrink-0 h-full">
        <div className="p-4 border-b border-gray-100 shrink-0">
          <h3 className="text-sm font-semibold text-rm-dark">Properties</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <p className="text-sm text-rm-muted text-center">Select a furniture item to edit its properties</p>
        </div>
      </div>
    );
  }

  const update = (updates: Partial<FurnitureItem>) => updateFurniture(selected.id, updates);

  return (
    <div className="w-72 bg-white border-l border-gray-200 flex flex-col shrink-0 h-full">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <h3 className="text-sm font-semibold text-rm-dark">Properties</h3>
        <Button
          onPress={() => selectFurniture(null)}
          className="text-rm-muted hover:text-rm-text cursor-pointer p-1 rounded hover:bg-gray-100 outline-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg border-2 shrink-0"
            style={{
              backgroundColor: selected.filled ? selected.color : 'transparent',
              borderColor: selected.borderColor,
            }}
          />
          <div>
            <div className="text-sm font-semibold text-rm-dark">{selected.label}</div>
            <div className="text-xs text-rm-muted capitalize">{selected.type.replace(/-/g, ' ')}</div>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        <div>
          <h4 className={labelClass}>Position</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-[11px] text-rm-muted block mb-1">X ({unit})</Label>
              <input type="number" value={Math.round(selected.x)} onChange={(e) => update({ x: Number(e.target.value) })} className={inputClass} />
            </div>
            <div>
              <Label className="text-[11px] text-rm-muted block mb-1">Y ({unit})</Label>
              <input type="number" value={Math.round(selected.y)} onChange={(e) => update({ y: Number(e.target.value) })} className={inputClass} />
            </div>
          </div>
        </div>

        <div>
          <h4 className={labelClass}>Size</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-[11px] text-rm-muted block mb-1">Width ({unit})</Label>
              <input type="number" value={Math.round(selected.width)} min={4} onChange={(e) => update({ width: Math.max(4, Number(e.target.value)) })} className={inputClass} />
            </div>
            <div>
              <Label className="text-[11px] text-rm-muted block mb-1">Height ({unit})</Label>
              <input type="number" value={Math.round(selected.height)} min={4} onChange={(e) => update({ height: Math.max(4, Number(e.target.value)) })} className={inputClass} />
            </div>
          </div>
        </div>

        <div>
          <h4 className={labelClass}>Rotation &mdash; {selected.rotation}&deg;</h4>
          <input
            type="range"
            min={0}
            max={359}
            step={15}
            value={selected.rotation}
            onChange={(e) => update({ rotation: Number(e.target.value) })}
            className="w-full accent-rm-primary h-2"
          />
          <div className="flex justify-between text-[10px] text-rm-muted mt-1">
            <span>0&deg;</span>
            <span>90&deg;</span>
            <span>180&deg;</span>
            <span>270&deg;</span>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        <div>
          <Label className={labelClass}>Label</Label>
          <input type="text" value={selected.label} onChange={(e) => update({ label: e.target.value })} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className={labelClass}>Fill</Label>
            <input type="color" value={selected.color} onChange={(e) => update({ color: e.target.value })} className="w-full h-9 rounded-lg cursor-pointer border border-gray-200" />
          </div>
          <div>
            <Label className={labelClass}>Border</Label>
            <input type="color" value={selected.borderColor} onChange={(e) => update({ borderColor: e.target.value })} className="w-full h-9 rounded-lg cursor-pointer border border-gray-200" />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={selected.filled} onChange={(e) => update({ filled: e.target.checked })} className="w-4 h-4 accent-rm-primary rounded" />
          <span className="text-sm text-rm-dark">Filled shape</span>
        </label>

        <div className="h-px bg-gray-100" />

        <div className="grid grid-cols-2 gap-2">
          <Button
            onPress={() => rotateFurniture(selected.id, 90)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 text-rm-dark rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors cursor-pointer outline-none data-[pressed]:scale-[0.97]"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
            </svg>
            Rotate 90&deg;
          </Button>
          <Button
            onPress={() => duplicateFurniture(selected.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 text-rm-dark rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors cursor-pointer outline-none data-[pressed]:scale-[0.97]"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5" />
            </svg>
            Clone
          </Button>
        </div>

        <Button
          onPress={() => removeFurniture(selected.id)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-rm-danger rounded-lg text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer outline-none data-[pressed]:scale-[0.97]"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          Delete Item
        </Button>
      </div>
    </div>
  );
}
