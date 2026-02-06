
# Changelog

All notable changes to the "Guochao H5" project will be documented in this file.

## [Unreleased] - 2026-01-31

### Added
- **Level 0 (Preloader)**: 
  - Implemented global asset preloader with progress tracking (0-100%).
  - Added visual loading screen with "Fortune" animation.
  - Integrated `preloadAssets` utility to cache critical images.
- **Level 3 (Exploration)**: 
  - Added "Batch Mode" for multi-selecting patterns.
  - Implemented `batchDownload` utility with concurrency control.
  - Added format conversion support (PNG/JPG/WebP) using Canvas API.
- **Level 4 (Creation)**: 
  - **Online Editor**: New comprehensive editor replacing simple selection flow.
    - Layer management (move, resize, rotate, visibility, lock).
    - Property panel (opacity, blend modes, text editing).
    - History system (Undo/Redo) with IndexedDB persistence.
  - **Export**: Enhanced export to high-resolution PNG using `html2canvas`.
- **Analytics**:
  - Added `Analytics` utility for tracking user events (page views, conversions).
  - Integrated tracking in HubPage (conversion rate monitoring).

### Changed
- **Architecture**: 
  - Refactored `App.tsx` to strictly follow 5-level architecture (Preloader -> Intro -> Hub -> Exploration -> Creation).
  - Centralized state management in `useAppStore` and `useEditorStore`.
- **Level 2 (Hub)**:
  - Improved URL parameter persistence logic for category selection (`?category=sky`).
  - Separated UI controls from `HubScene` visual component.
- **UI/UX**:
  - Aligned designs with Attachments 1-5 (Grid layouts, Color schemes, Typography).
  - Added Framer Motion transitions between all phases.

### Fixed
- Fixed TypeScript errors in `ScrollRoute`, `PatternSelector`, and `PosterResult`.
- Resolved import path issues for UI components.
- Fixed `Math.random()` hydration mismatch in `SplashScreen` (now `Preloader`).
- Corrected logic for URL parameter handling in `HubPage`.

### Performance
- Optimized image loading with lazy loading in Masonry grid.
- Implemented batch processing for image conversion to avoid main thread blocking (<200ms/image target).
- Used `requestAnimationFrame` for smooth animations in Editor.
