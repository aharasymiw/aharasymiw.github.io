# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio/website for Andrew Harasymiw at aharasymiw.com. Built with React 19, TypeScript, and Vite+. Uses the "Organic Flow" design system with three mood zones (calm/sage, warm/terracotta, playful/violet), light/dark theming, and a playground layer for easter eggs. Deployed to GitHub Pages via CI/CD.

## Toolchain: Vite+

This project uses **Vite+** (`vp` CLI), a unified toolchain wrapping Vite, Rolldown, Vitest, Oxlint, and Oxfmt. Always use `vp` — never invoke pnpm, npm, vitest, oxlint, or oxfmt directly.

### Commands

| Task                      | Command                                      |
| ------------------------- | -------------------------------------------- |
| Install deps              | `vp install`                                 |
| Dev server                | `vp dev`                                     |
| Build                     | `vp build` (runs `tsc` first via npm script) |
| Preview build             | `vp preview`                                 |
| Lint + format + typecheck | `vp check`                                   |
| Lint only                 | `vp lint`                                    |
| Format only               | `vp fmt`                                     |
| Run tests                 | `vp test`                                    |
| Auto-fix                  | `vp check --fix`                             |
| Add a package             | `vp add <pkg>`                               |
| Run one-off binary        | `vp dlx <pkg>`                               |

### Important Vite+ rules

- Import from `vite-plus`, not from `vite` or `vitest` directly. Tests: `import { expect, test, vi } from 'vite-plus/test'`.
- Do not install vitest, oxlint, oxfmt, or tsdown as direct dependencies.
- Type-aware linting is enabled (`typeAware: true` in vite.config.ts).
- Pre-commit hook runs `vp staged` which applies `vp check --fix` to staged files.
- Test globals are disabled (`globals: false`). Every test file must explicitly import `describe`, `it`, `expect`, `vi`, etc. from `vite-plus/test`.

## Architecture

### Design System: Organic Flow

Three-layer component library with CSS custom properties (no CSS framework):

**Tokens** (`src/tokens/`)

- `tokens.css` — All CSS custom properties: colors (light/dark), typography, spacing (4px base), radii, transitions
- `reset.css` — Minimal CSS reset
- `global.css` — Base body styles, focus rings, selection, reduced-motion

**Foundation** (`src/foundation/`) — Layout primitives

- ThemeProvider (context + localStorage + system preference), Text, Heading, Stack, Container, VisuallyHidden, SkipLink

**Components** (`src/components/`) — UI building blocks

- Card, Section, Accordion, NavBar, HeroTagline, Button, Link, Footer

**Playground** (`src/playground/`) — Easter eggs (all respect `prefers-reduced-motion`)

- KonamiConfetti, SwipeKonami, FourCorners, SecretKnock, SpiralDraw, GravySnail, SpinningFavicon, PartyMode, FooterTaglines, LogoScramble, D20Tumble, SunsetTransition, GlyphBackground, RevealOnScroll, AchievementBanner
- Adding an egg: write a trigger hook in `src/hooks/` returning `[activated, reset]`, then a thin component that either reuses `AchievementBanner` (shared confetti + aria-live banner) or renders its own effect. Handle reduced motion via a CSS `@media (prefers-reduced-motion)` block or the `useReducedMotion` hook. Mount it in `App.tsx` and export from `src/index.ts`. (There is no base/wrapper component — each egg stands alone on the shared hooks.)

**Hooks** (`src/hooks/`) — useReducedMotion, useIdleTimer, useKonamiCode, useFourCorners, useSecretKnock, useSpiralDraw, useSwipeCode

### Routing

React Router v7 (`react-router-dom`). 5 pages: Home (`/`), Portfolio (`/portfolio`), Speaking (`/speaking`), Community (`/community`), Connect (`/connect`). 404 fallback.

### Entry point flow

`index.html` → `src/main.tsx` → imports tokens CSS → renders `<App>` → BrowserRouter → ThemeProvider → AppLayout (NavBar + Routes + Footer + easter eggs)

### File conventions

- Components: `.tsx` + `.module.css` + `.test.tsx` per component
- CSS: CSS Modules for components, CSS custom properties for tokens
- Barrel export: `src/index.ts`

## Design References

Screen designs live in a Google Stitch project (ID: `7194580884852749317`). Design system: "Aharasymiw Organic Flow" (asset `15838549104850180549`). 20 canonical screens cover 5 pages x 4 variants (desktop/mobile x light/dark).

## CI/CD

GitHub Actions workflow (`.github/workflows/deploy.yml`) on push to main: install → check → build → deploy to Pages.
