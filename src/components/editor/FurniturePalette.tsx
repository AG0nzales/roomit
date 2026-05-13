import { FURNITURE_TEMPLATES } from '@/types';
import type { FurnitureType } from '@/types';
import { useState } from 'react';

interface FurniturePaletteProps {
  onAddFurniture: (type: FurnitureType) => void;
}

const categories = [
  { label: 'Living Room', types: ['sofa', 'tv-stand', 'bookshelf', 'dining-table', 'table'] },
  { label: 'Bedroom', types: ['bed', 'nightstand', 'dresser', 'wardrobe', 'mirror'] },
  { label: 'Office', types: ['desk', 'chair', 'bookshelf', 'cabinet'] },
  { label: 'Storage', types: ['cabinet', 'mini-cabinet', 'wardrobe', 'bookshelf'] },
];

export default function FurniturePalette({ onAddFurniture }: FurniturePaletteProps) {
  const [search, setSearch] = useState('');
  const filtered = FURNITURE_TEMPLATES.filter(
    (t) => t.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 h-full">
      <div className="p-4 border-b border-gray-100 shrink-0">
        <h3 className="text-xs font-semibold text-rm-muted uppercase tracking-wider mb-3">Furniture</h3>
        <input
          placeholder="Search furniture..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-rm-surface-alt outline-none focus:border-rm-primary transition-colors placeholder:text-gray-400"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        {search ? (
          <div className="space-y-1">
            {filtered.map((t) => (
              <button
                key={t.type}
                onClick={() => onAddFurniture(t.type)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-rm-primary-light text-left transition-colors cursor-pointer"
              >
                <div
                  className="w-10 h-10 rounded-lg border-2 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: t.color, borderColor: t.borderColor }}
                >
                  <span className="text-sm">{t.icon}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-rm-dark">{t.label}</div>
                  <div className="text-xs text-rm-muted">{t.defaultWidth}&times;{t.defaultHeight}</div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.label}>
              <h4 className="text-[11px] font-semibold text-rm-muted uppercase tracking-wider mb-2 px-1">
                {cat.label}
              </h4>
              <div className="space-y-0.5">
                {cat.types.map((type) => {
                  const t = FURNITURE_TEMPLATES.find((f) => f.type === type);
                  if (!t) return null;
                  return (
                    <button
                      key={t.type}
                      onClick={() => onAddFurniture(t.type)}
                      className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-rm-primary-light text-left transition-colors cursor-pointer"
                    >
                      <div
                        className="w-9 h-9 rounded-md border-2 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: t.color, borderColor: t.borderColor }}
                      >
                        <span className="text-xs">{t.icon}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-rm-dark">{t.label}</div>
                        <div className="text-[11px] text-rm-muted">{t.defaultWidth}&times;{t.defaultHeight}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
