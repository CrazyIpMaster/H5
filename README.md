
# 国潮非遗·寻找好彩头 H5

Based on React 18 + TypeScript + Vite + Tailwind CSS.

## Project Structure

- **Level 0: Preloader** (`src/components/Preloader.tsx`)
  - Global asset preloading, progress feedback.
- **Level 1: Intro** (`src/pages/Level1_Intro`)
  - Homepage, Card navigation.
- **Level 2: Hub** (`src/pages/Level2_Hub`)
  - 3D-like scene, Category selection, URL persistence.
- **Level 3: Exploration** (`src/pages/Level3_Exploration`)
  - Masonry grid, Batch download, Format conversion.
- **Level 4: Creation** (`src/pages/Level4_Creation`)
  - Online Editor (Layers, Text, History), Export to PNG.

## Features

- **Performance**: LCP < 2.5s, 60fps animations.
- **Editor**: Full-featured canvas editor with Undo/Redo (IndexedDB).
- **Batch Processing**: Convert and download multiple images efficiently.
- **Responsive**: Mobile-first design adapting to desktop.

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
# Run End-to-End tests
npx cypress open
```

## Build

```bash
npm run build
```
