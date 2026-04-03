# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start Vite dev server (localhost:5173)
npm run build            # TypeScript check + Vite production build
npm run preview          # Preview production build
npm run remotion:studio  # Open Remotion Studio for composition preview
```

No test runner is configured.

## Architecture

This is a scroll-driven resume portfolio site. A Remotion `<Player>` is embedded in a Vite/React app and treated as a frame-accurate animation engine — the browser never auto-plays; instead GSAP tweens the player's seek position in response to user input.

### Data layer

`src/data/resume.ts` is the single source of truth for all resume content and timing constants:

- `RESUME_CONSTANTS` — `TOTAL_FRAMES`, `FPS`, `COMPOSITION_WIDTH/HEIGHT`
- `SCENE_SNAPS[]` — one entry per scene, with a `frame` pointing to that scene's **global frame 0** (where the scene's local frame = 0 inside `TransitionSeries`)
- All typed resume data (`personal`, `education`, `experiences`, `skills`, `projects`)

### Remotion composition (`src/remotion/`)

`ResumeComposition.tsx` wraps all six scenes in `<TransitionSeries>` with 30-frame overlapping transitions. Scene durations: Hero 120, About/Education/Experience/Skills 90 each, Projects 120. Total = 450 frames.

**Critical timing rule:** `TransitionSeries` overlaps adjacent sequences by `TRANSITION_FRAMES = 30`. `SCENE_SNAPS[n].frame` points to the global frame where the incoming transition **ends** (scene fully visible). All non-Hero scene content animations are offset by +30 frames so they begin exactly at the snap point. Example: heading `interpolate(frame, [30, 50], ...)`, GlowLine `startFrame={40}`. This is intentional — do not reset offsets back to 0.

Individual scenes (`src/remotion/scenes/Scene*.tsx`) use `useCurrentFrame()` / `useVideoConfig()` for frame-driven animations — never `Date.now()` or CSS transitions.

Shared animation primitives live in `src/remotion/components/`: `AnimatedText`, `ProgressBar`, `GlowLine`, `TimelineCard`.

### App shell (`src/App.tsx`)

Manages all user interaction and navigation:
- Holds `currentScene` (React state) and `currentFrameRef` (tracks actual seek position without re-renders)
- `navigateTo(sceneIndex)` — GSAP tweens `currentFrameRef` → `SCENE_SNAPS[i].frame`, calling `playerRef.current.seekTo()` on each tick; `isNavigating` ref blocks overlapping navigations
- On mount, auto-plays Hero from frame 0 → 60 to show entrance animation
- Wheel, keyboard (Arrow/PageUp/Down), and touch events all call `navigateTo`

### Chapter nav (`src/components/SceneNav.tsx`)

Fixed left-side node navigation. The dot column is a fixed `12×12px` wrapper so the `1px` connecting line (absolutely positioned at `left: 5.5px`) always hits the dot center regardless of active/inactive dot size.

### Vite config notes

`remotion`/`@remotion/player`/`@remotion/transitions` are excluded from `optimizeDeps` and chunked separately. The dev server requires `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp` headers for Remotion's SharedArrayBuffer usage.
