const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

export const routes = {
  rooms: {
    list: () => `${API_BASE}/rooms` as const,
    get: (id: string) => `${API_BASE}/rooms/${id}` as const,
    create: () => `${API_BASE}/rooms` as const,
    update: (id: string) => `${API_BASE}/rooms/${id}` as const,
    delete: (id: string) => `${API_BASE}/rooms/${id}` as const,
  },
  furniture: {
    list: (roomId: string) => `${API_BASE}/rooms/${roomId}/furniture` as const,
    add: (roomId: string) => `${API_BASE}/rooms/${roomId}/furniture` as const,
    update: (roomId: string, id: string) => `${API_BASE}/rooms/${roomId}/furniture/${id}` as const,
    delete: (roomId: string, id: string) => `${API_BASE}/rooms/${roomId}/furniture/${id}` as const,
  },
  templates: {
    furniture: () => `${API_BASE}/templates/furniture` as const,
    rooms: () => `${API_BASE}/templates/rooms` as const,
  },
} as const;

export type Routes = typeof routes;
