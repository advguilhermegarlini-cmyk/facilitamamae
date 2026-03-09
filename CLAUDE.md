# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000 (0.0.0.0)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Type-check with tsc --noEmit
npm run clean     # Remove dist/
```

## Environment

Copy `.env.example` to `.env` and set `VITE_GEMINI_API_KEY` (the app reads `import.meta.env.VITE_GEMINI_API_KEY` in `src/App.tsx`).

> Note: `.env.example` uses `GEMINI_API_KEY`, but the Vite client code uses `VITE_GEMINI_API_KEY`. The `vite.config.ts` also exposes `process.env.GEMINI_API_KEY` via `define` for legacy compatibility.

## Architecture

Single-page React 19 app built with Vite 6 + Tailwind CSS v4 + TypeScript. All application logic lives in one file: **`src/App.tsx`**.

**Two views** managed by `activeTab` state in the root `App` component:
- `home` → `HomeScreen` — marketing landing page with sections: Hero, `#eligibility`, `#values`, `#faq`
- `ia` → `IATab` — chat interface powered by Google Gemini (`gemini-1.5-flash`)

**`IATab`** creates a new `GoogleGenerativeAI` client on every message send (no singleton). Chat history is rebuilt each time by filtering the local `messages` state and mapping to Gemini's `{role, parts}` format.

**Styling** uses Tailwind v4 with custom design tokens defined in `src/index.css` under `@theme`:
- `brand-gold` / `brand-gold-dark` — primary accent color (`#d4af37`)
- `github-bg` / `github-surface` / `github-border` / `github-text` / `github-muted` — dark theme palette
- `whatsapp` — `#25D366`

The `@` alias in `vite.config.ts` resolves to the project root (not `src/`), so imports use `@/src/...` (e.g., `import whatsappIcon from '@/src/image/whats1.png'`).

Animations use **framer-motion** (`motion`, `AnimatePresence`) for page transitions and hover effects.
