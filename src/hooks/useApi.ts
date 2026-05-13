import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { routes } from '@/routes/api';
import type { Room, FurnitureItem } from '@/types';

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: () => apiFetch<Room[]>(routes.rooms.list()),
    enabled: false,
  });
}

export function useRoom(id: string) {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: () => apiFetch<Room>(routes.rooms.get(id)),
    enabled: !!id,
  });
}

export function useCreateRoom() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (room: Partial<Room>) =>
      apiFetch<Room>(routes.rooms.create(), { method: 'POST', body: JSON.stringify(room) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['rooms'] }),
  });
}

export function useUpdateRoom() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Room> }) =>
      apiFetch<Room>(routes.rooms.update(id), { method: 'PUT', body: JSON.stringify(data) }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['rooms'] });
      qc.invalidateQueries({ queryKey: ['rooms', id] });
    },
  });
}

export function useDeleteRoom() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<void>(routes.rooms.delete(id), { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['rooms'] }),
  });
}

export function useFurniture(roomId: string) {
  return useQuery({
    queryKey: ['rooms', roomId, 'furniture'],
    queryFn: () => apiFetch<FurnitureItem[]>(routes.furniture.list(roomId)),
    enabled: !!roomId,
  });
}

export function useAddFurniture() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ roomId, item }: { roomId: string; item: Partial<FurnitureItem> }) =>
      apiFetch<FurnitureItem>(routes.furniture.add(roomId), {
        method: 'POST',
        body: JSON.stringify(item),
      }),
    onSuccess: (_, { roomId }) => qc.invalidateQueries({ queryKey: ['rooms', roomId, 'furniture'] }),
  });
}

export function useUpdateFurniture() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ roomId, id, data }: { roomId: string; id: string; data: Partial<FurnitureItem> }) =>
      apiFetch<FurnitureItem>(routes.furniture.update(roomId, id), {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { roomId }) => qc.invalidateQueries({ queryKey: ['rooms', roomId, 'furniture'] }),
  });
}

export function useDeleteFurniture() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ roomId, id }: { roomId: string; id: string }) =>
      apiFetch<void>(routes.furniture.delete(roomId, id), { method: 'DELETE' }),
    onSuccess: (_, { roomId }) => qc.invalidateQueries({ queryKey: ['rooms', roomId, 'furniture'] }),
  });
}
