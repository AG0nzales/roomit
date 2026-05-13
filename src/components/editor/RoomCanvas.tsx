import { useRef, useState, useCallback, useEffect } from 'react';
import { useRoomStore } from '@/stores/roomStore';
import { useUIStore } from '@/stores/uiStore';
import type { FurnitureItem, Point } from '@/types';

const HANDLE_SIZE = 8;
const MIN_SIZE = 4;

export default function RoomCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { room, furniture, selectedFurnitureId, unit, scale, gridSize, updateFurniture, selectFurniture, setRoomVertices } = useRoomStore();
  const { showGrid, snapToGrid, isEditingRoomShape } = useUIStore();

  const [dragging, setDragging] = useState<{
    type: 'move' | 'resize' | 'vertex';
    id?: string;
    handle?: string;
    vertexIdx?: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW?: number;
    origH?: number;
  } | null>(null);

  const roomW = room.shape.width * scale;
  const roomH = room.shape.height * scale;
  const padding = 50;

  const snap = useCallback((val: number) => {
    if (!snapToGrid) return val;
    return Math.round(val / (gridSize * scale)) * (gridSize * scale);
  }, [snapToGrid, gridSize, scale]);

  const toRoomCoords = useCallback((clientX: number, clientY: number): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: (clientX - rect.left - padding) / scale,
      y: (clientY - rect.top - padding) / scale,
    };
  }, [scale]);

  const handleMouseDown = useCallback((e: React.MouseEvent, furnitureItem: FurnitureItem, handle?: string) => {
    e.stopPropagation();
    e.preventDefault();
    const pt = toRoomCoords(e.clientX, e.clientY);
    setDragging({
      type: handle ? 'resize' : 'move',
      id: furnitureItem.id,
      handle,
      startX: pt.x,
      startY: pt.y,
      origX: furnitureItem.x,
      origY: furnitureItem.y,
      origW: furnitureItem.width,
      origH: furnitureItem.height,
    });
    selectFurniture(furnitureItem.id);
  }, [toRoomCoords, selectFurniture]);

  const handleVertexMouseDown = useCallback((e: React.MouseEvent, vertexIdx: number) => {
    e.stopPropagation();
    e.preventDefault();
    const pt = toRoomCoords(e.clientX, e.clientY);
    setDragging({
      type: 'vertex',
      vertexIdx,
      startX: pt.x,
      startY: pt.y,
      origX: pt.x,
      origY: pt.y,
    });
  }, [toRoomCoords]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (dragging) return;
    const target = e.target as SVGElement;
    if (target.closest('[data-furniture]') || target.closest('[data-vertex]') || target.closest('[data-handle]')) return;

    if (isEditingRoomShape && room.shape.vertices) {
      const pt = toRoomCoords(e.clientX, e.clientY);
      const snapped = snapToGrid
        ? { x: Math.round(pt.x / gridSize) * gridSize, y: Math.round(pt.y / gridSize) * gridSize }
        : { x: Math.round(pt.x), y: Math.round(pt.y) };
      setRoomVertices([...room.shape.vertices, snapped]);
    } else {
      selectFurniture(null);
    }
  }, [dragging, isEditingRoomShape, room.shape.vertices, snapToGrid, gridSize, toRoomCoords, setRoomVertices, selectFurniture]);

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const pt = toRoomCoords(e.clientX, e.clientY);
      const dx = pt.x - dragging.startX;
      const dy = pt.y - dragging.startY;

      if (dragging.type === 'move' && dragging.id) {
        const newX = snap(dragging.origX + dx);
        const newY = snap(dragging.origY + dy);
        updateFurniture(dragging.id, {
          x: Math.round(newX),
          y: Math.round(newY),
        });
      }

      if (dragging.type === 'resize' && dragging.id && dragging.origW !== undefined && dragging.origH !== undefined) {
        switch (dragging.handle) {
          case 'se': {
            const newW = snap(dragging.origW + dx);
            const newH = snap(dragging.origH + dy);
            updateFurniture(dragging.id, {
              width: Math.max(MIN_SIZE, Math.round(newW)),
              height: Math.max(MIN_SIZE, Math.round(newH)),
            });
            break;
          }
          case 'sw': {
            const newW = snap(dragging.origW - dx);
            const newH = snap(dragging.origH + dy);
            const newX = snap(dragging.origX + dx);
            if (newW >= MIN_SIZE) {
              updateFurniture(dragging.id, {
                x: Math.round(newX),
                width: Math.round(newW),
                height: Math.max(MIN_SIZE, Math.round(newH)),
              });
            }
            break;
          }
          case 'ne': {
            const newW = snap(dragging.origW + dx);
            const newH = snap(dragging.origH - dy);
            const newY = snap(dragging.origY + dy);
            if (newH >= MIN_SIZE) {
              updateFurniture(dragging.id, {
                y: Math.round(newY),
                width: Math.max(MIN_SIZE, Math.round(newW)),
                height: Math.round(newH),
              });
            }
            break;
          }
          case 'nw': {
            const newW = snap(dragging.origW - dx);
            const newH = snap(dragging.origH - dy);
            const newX = snap(dragging.origX + dx);
            const newY = snap(dragging.origY + dy);
            if (newW >= MIN_SIZE && newH >= MIN_SIZE) {
              updateFurniture(dragging.id, {
                x: Math.round(newX),
                y: Math.round(newY),
                width: Math.round(newW),
                height: Math.round(newH),
              });
            }
            break;
          }
        }
      }

      if (dragging.type === 'vertex' && dragging.vertexIdx !== undefined && room.shape.vertices) {
        const verts = [...room.shape.vertices];
        const snapped = snapToGrid
          ? { x: Math.round(pt.x / gridSize) * gridSize, y: Math.round(pt.y / gridSize) * gridSize }
          : { x: Math.round(pt.x), y: Math.round(pt.y) };
        verts[dragging.vertexIdx] = snapped;
        setRoomVertices(verts);
      }
    };

    const handleMouseUp = () => setDragging(null);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, toRoomCoords, snapToGrid, gridSize, snap, updateFurniture, setRoomVertices, room.shape.vertices]);

  const getRoomPath = (): string => {
    if (room.shape.type === 'rectangle') {
      return `M 0 0 L ${roomW} 0 L ${roomW} ${roomH} L 0 ${roomH} Z`;
    }
    if (room.shape.vertices && room.shape.vertices.length > 2) {
      return room.shape.vertices.map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x * scale} ${v.y * scale}`).join(' ') + ' Z';
    }
    return `M 0 0 L ${roomW} 0 L ${roomW} ${roomH} L 0 ${roomH} Z`;
  };

  const getFurnitureTransform = (item: FurnitureItem): string => {
    const cx = (item.x + item.width / 2) * scale;
    const cy = (item.y + item.height / 2) * scale;
    return `translate(${cx}, ${cy}) rotate(${item.rotation}) translate(${-cx}, ${-cy})`;
  };

  const svgW = roomW + padding * 2;
  const svgH = roomH + padding * 2;

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-auto bg-gray-50 relative"
      onClick={handleCanvasClick as unknown as React.MouseEventHandler}
    >
      <div className="min-h-full min-w-full flex items-center justify-center p-6">
        <svg
          ref={svgRef}
          className="bg-white shadow-md rounded-lg"
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ minWidth: svgW, minHeight: svgH }}
        >
          <g transform={`translate(${padding}, ${padding})`}>
            {showGrid && (
              <g opacity={0.12}>
                {Array.from({ length: Math.ceil(room.shape.width / gridSize) + 1 }, (_, i) => (
                  <line key={`gv-${i}`} x1={i * gridSize * scale} y1={0} x2={i * gridSize * scale} y2={roomH} stroke="#6B7280" strokeWidth={0.5} />
                ))}
                {Array.from({ length: Math.ceil(room.shape.height / gridSize) + 1 }, (_, i) => (
                  <line key={`gh-${i}`} x1={0} y1={i * gridSize * scale} x2={roomW} y2={i * gridSize * scale} stroke="#6B7280" strokeWidth={0.5} />
                ))}
              </g>
            )}

            <path
              d={getRoomPath()}
              fill="#FAFBFC"
              stroke="#374151"
              strokeWidth={2}
              onClick={(e) => { e.stopPropagation(); selectFurniture(null); }}
            />

            {showGrid && (
              <g>
                {Array.from({ length: Math.floor(room.shape.width / (gridSize * 4)) + 1 }, (_, i) => (
                  <text key={`lx-${i}`} x={i * gridSize * 4 * scale} y={-8} textAnchor="middle" fontSize={9} fill="#9CA3AF" className="select-none">
                    {i * gridSize * 4}
                  </text>
                ))}
                {Array.from({ length: Math.floor(room.shape.height / (gridSize * 4)) + 1 }, (_, i) => (
                  <text key={`ly-${i}`} x={-8} y={i * gridSize * 4 * scale + 4} textAnchor="end" fontSize={9} fill="#9CA3AF" className="select-none">
                    {i * gridSize * 4}
                  </text>
                ))}
              </g>
            )}

            {room.shape.vertices && (isEditingRoomShape || room.shape.type !== 'rectangle') && room.shape.vertices.map((v, i) => (
              <g key={`vertex-${i}`} data-vertex>
                <circle
                  cx={v.x * scale}
                  cy={v.y * scale}
                  r={7}
                  fill="#EF4444"
                  stroke="white"
                  strokeWidth={2.5}
                  className="cursor-pointer"
                  style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.15))' }}
                  onMouseDown={(e) => handleVertexMouseDown(e, i)}
                />
                <text x={v.x * scale + 12} y={v.y * scale - 8} fontSize={10} fill="#EF4444" fontWeight={600} className="select-none pointer-events-none">
                  P{i + 1}
                </text>
              </g>
            ))}

            {furniture.map((item) => (
              <g
                key={item.id}
                data-furniture
                transform={getFurnitureTransform(item)}
                onMouseDown={(e) => handleMouseDown(e, item)}
                className="cursor-move"
              >
                <rect
                  x={item.x * scale}
                  y={item.y * scale}
                  width={item.width * scale}
                  height={item.height * scale}
                  fill={item.filled ? item.color : 'transparent'}
                  stroke={selectedFurnitureId === item.id ? '#006AFF' : item.borderColor}
                  strokeWidth={selectedFurnitureId === item.id ? 2.5 : 1.5}
                  strokeDasharray={item.filled ? 'none' : '6 3'}
                  rx={3}
                />
                {item.width * scale > 40 && (
                  <text
                    x={(item.x + item.width / 2) * scale}
                    y={(item.y + item.height / 2) * scale - 4}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={11}
                    fontWeight={600}
                    className="pointer-events-none select-none"
                    fill={item.borderColor}
                  >
                    {item.label}
                  </text>
                )}
                {item.width * scale > 50 && item.height * scale > 25 && (
                  <text
                    x={(item.x + item.width / 2) * scale}
                    y={(item.y + item.height / 2) * scale + 10}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={8}
                    className="pointer-events-none select-none"
                    fill="#9CA3AF"
                  >
                    {Math.round(item.width)}&times;{Math.round(item.height)} {unit}
                  </text>
                )}

                {selectedFurnitureId === item.id && (
                  <>
                    {(['nw', 'ne', 'sw', 'se'] as const).map((h) => {
                      const hx = h.includes('e')
                        ? item.x * scale + item.width * scale - HANDLE_SIZE / 2
                        : item.x * scale - HANDLE_SIZE / 2;
                      const hy = h.includes('s')
                        ? item.y * scale + item.height * scale - HANDLE_SIZE / 2
                        : item.y * scale - HANDLE_SIZE / 2;
                      return (
                        <rect
                          key={h}
                          data-handle={h}
                          x={hx}
                          y={hy}
                          width={HANDLE_SIZE}
                          height={HANDLE_SIZE}
                          fill="white"
                          stroke="#006AFF"
                          strokeWidth={2}
                          rx={1.5}
                          className={`cursor-${h}-resize`}
                          onMouseDown={(e) => handleMouseDown(e, item, h)}
                        />
                      );
                    })}
                  </>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-rm-muted shadow-sm border border-gray-200">
        {room.shape.type !== 'rectangle' && isEditingRoomShape ? (
          <span>Click to add vertices &bull; Drag red dots to move</span>
        ) : (
          <span>{scale}px per {unit === 'in' ? 'in' : 'cm'} &bull; Grid: {gridSize}{unit === 'in' ? '"' : 'cm'}</span>
        )}
      </div>
    </div>
  );
}
