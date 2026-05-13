# Roomit

A free, browser-based room layout planner. Design your perfect room with an intuitive shape-based editor — place furniture, customize dimensions, and visualize your space, all in your browser.

## Features

- **Shape-Based Design** — Furniture and rooms are represented as clear, labeled shapes
- **14+ Furniture Types** — Bed, sofa, table, chair, wardrobe, desk, bookshelf, and more
- **Custom Room Shapes** — Rectangular rooms, L-shaped spaces, or custom polygons
- **Precise Dimensions** — Set exact measurements in inches or centimeters
- **Drag & Drop** — Intuitively place and move furniture around your room
- **Grid & Snap** — Toggle grid display and snap-to-grid for precise alignment
- **Room Presets** — Pre-configured templates for bedrooms, living rooms, kitchens, offices, and more
- **No Sign Up Required** — Completely free, no accounts or subscriptions

## Tech Stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** — Utility-first styling
- **Zustand** — State management
- **TanStack React Query** — Async data fetching
- **React Router v7** — Client-side routing
- **React Aria Components** — Accessible UI primitives

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repo-url>
cd roomit
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── editor/          # Room editor UI components
│   │   ├── Toolbar.tsx
│   │   ├── RoomCanvas.tsx
│   │   ├── FurniturePalette.tsx
│   │   ├── PropertyPanel.tsx
│   │   └── RoomSettingsPanel.tsx
│   ├── landing/         # Landing page sections
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   └── Footer.tsx
│   └── ui/              # Shared UI components
├── hooks/
│   └── useApi.ts        # React Query hooks for API integration
├── pages/
│   ├── LandingPage.tsx
│   └── EditorPage.tsx
├── routes/
│   └── api.ts           # API route definitions
├── stores/
│   ├── roomStore.ts     # Room & furniture state (Zustand)
│   └── uiStore.ts       # UI state (Zustand)
├── types/
│   └── index.ts         # Type definitions & furniture templates
├── App.tsx
├── main.tsx
└── index.css
```

## API

Roomit is designed to work with a REST API for persistent room storage. API routes are defined in `src/routes/api.ts` and consumed via React Query hooks in `src/hooks/useApi.ts`. Endpoints include:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | List all rooms |
| POST | `/api/rooms` | Create a room |
| GET | `/api/rooms/:id` | Get a room |
| PUT | `/api/rooms/:id` | Update a room |
| DELETE | `/api/rooms/:id` | Delete a room |
| GET | `/api/rooms/:id/furniture` | List furniture in a room |
| POST | `/api/rooms/:id/furniture` | Add furniture |
| PUT | `/api/rooms/:id/furniture/:fid` | Update furniture |
| DELETE | `/api/rooms/:id/furniture/:fid` | Remove furniture |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |

## License

Private
