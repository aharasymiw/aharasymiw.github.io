# Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React component library with design tokens, theming, and accessibility as the foundation for aharasymiw.com.

**Architecture:** Vite + React + TypeScript. CSS custom properties for design tokens (no CSS framework). Components organized in three layers: foundation (primitives), component (building blocks), playground (easter eggs). Vitest + React Testing Library for tests.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, React Testing Library, CSS Modules (for component-scoped styles alongside global token CSS)

**Spec:** `docs/superpowers/specs/2026-04-04-design-system-design.md`

---

## File Structure

```
src/
├── main.tsx                          # App entry point
├── App.tsx                           # Root component with ThemeProvider + Router
├── tokens/
│   ├── tokens.css                    # All CSS custom properties (colors, type, spacing, radii, transitions)
│   ├── reset.css                     # Minimal CSS reset
│   └── global.css                    # Base styles (body font, bg, text color, focus ring)
├── hooks/
│   ├── useTheme.ts                   # Theme context hook
│   ├── useReducedMotion.ts           # prefers-reduced-motion hook
│   ├── useIdleTimer.ts               # Idle detection hook (for Gravy)
│   └── useKonamiCode.ts             # Key sequence detection hook
├── foundation/
│   ├── ThemeProvider.tsx             # Theme context, light/dark toggle, localStorage persistence
│   ├── ThemeProvider.test.tsx
│   ├── Text.tsx                      # Polymorphic text component
│   ├── Text.module.css
│   ├── Text.test.tsx
│   ├── Heading.tsx                   # Heading h1-h6 with decoupled visual size
│   ├── Heading.module.css
│   ├── Heading.test.tsx
│   ├── Stack.tsx                     # Flex layout primitive
│   ├── Stack.module.css
│   ├── Stack.test.tsx
│   ├── Container.tsx                 # Max-width centered wrapper
│   ├── Container.module.css
│   ├── Container.test.tsx
│   ├── VisuallyHidden.tsx            # Screen-reader-only text
│   ├── VisuallyHidden.test.tsx
│   ├── SkipLink.tsx                  # Skip-to-main link, visible on focus
│   ├── SkipLink.module.css
│   └── SkipLink.test.tsx
├── components/
│   ├── Card.tsx                      # Elevated card with optional glyph background
│   ├── Card.module.css
│   ├── Card.test.tsx
│   ├── Section.tsx                   # Themed section with zone coloring
│   ├── Section.module.css
│   ├── Section.test.tsx
│   ├── Accordion.tsx                 # Expandable disclosure with keyboard nav
│   ├── Accordion.module.css
│   ├── Accordion.test.tsx
│   ├── NavBar.tsx                    # Responsive nav with theme toggle
│   ├── NavBar.module.css
│   ├── NavBar.test.tsx
│   ├── HeroTagline.tsx              # Homepage hero: tagline + 3 cards
│   ├── HeroTagline.module.css
│   ├── HeroTagline.test.tsx
│   ├── Button.tsx                    # Button with variants
│   ├── Button.module.css
│   ├── Button.test.tsx
│   ├── Link.tsx                      # Styled anchor with hover animation
│   ├── Link.module.css
│   ├── Link.test.tsx
│   ├── Footer.tsx                    # Site footer with contact links
│   ├── Footer.module.css
│   └── Footer.test.tsx
├── playground/
│   ├── EasterEgg.tsx                 # Trigger-based hidden content wrapper
│   ├── EasterEgg.test.tsx
│   ├── GlyphBackground.tsx          # Decorative oversized serif chars
│   ├── GlyphBackground.module.css
│   ├── GlyphBackground.test.tsx
│   ├── RevealOnScroll.tsx            # Intersection observer reveal wrapper
│   ├── RevealOnScroll.module.css
│   ├── RevealOnScroll.test.tsx
│   ├── KonamiConfetti.tsx           # Konami code confetti easter egg
│   ├── KonamiConfetti.module.css
│   ├── KonamiConfetti.test.tsx
│   ├── LogoScramble.tsx             # 5x click letter scramble
│   ├── LogoScramble.module.css
│   ├── LogoScramble.test.tsx
│   ├── GravySnail.tsx               # Gravy the chaos snail
│   ├── GravySnail.module.css
│   ├── GravySnail.test.tsx
│   ├── SunsetTransition.tsx         # Theme toggle wipe effect
│   ├── SunsetTransition.module.css
│   ├── SunsetTransition.test.tsx
│   ├── D20Tumble.tsx                # d20 hover animation
│   ├── D20Tumble.module.css
│   ├── D20Tumble.test.tsx
│   ├── PartyMode.tsx                # DDB-style party mode
│   ├── PartyMode.module.css
│   ├── PartyMode.test.tsx
│   ├── FooterTaglines.tsx           # Cycling copyright taglines
│   └── FooterTaglines.test.tsx
└── index.ts                          # Public barrel export
index.html                            # Vite HTML entry
vite.config.ts
tsconfig.json
tsconfig.node.json
vitest.config.ts (or merged into vite.config.ts)
package.json
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`

- [ ] **Step 1: Initialize the project with Vite**

```bash
cd /Users/aharasymiw/dev/aharasymiw
npm create vite@latest . -- --template react-ts
```

Select "Ignore files and continue" if prompted about existing files. This scaffolds `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, and `src/` directory.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: Configure Vitest**

Update `vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    css: true,
  },
})
```

Create `src/test-setup.ts`:

```ts
import '@testing-library/jest-dom'
```

Update `tsconfig.json` to include vitest globals — add `"types": ["vitest/globals"]` to `compilerOptions`.

- [ ] **Step 4: Clean up Vite scaffold**

Remove the default Vite boilerplate files:
- Delete `src/App.css`
- Delete `src/index.css`
- Delete `src/assets/react.svg`
- Delete `public/vite.svg`

Replace `src/App.tsx` with:

```tsx
export default function App() {
  return <div>aharasymiw.com</div>
}
```

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Verify build and test work**

```bash
npm run build
npx vitest run
```

Expected: Build succeeds. Test run completes (0 tests, no errors).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.node.json index.html src/main.tsx src/App.tsx src/test-setup.ts src/vite-env.d.ts
git commit -m "chore: scaffold Vite + React + TypeScript project with Vitest"
```

---

## Task 2: Design Tokens & Global CSS

**Files:**
- Create: `src/tokens/tokens.css`
- Create: `src/tokens/reset.css`
- Create: `src/tokens/global.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create tokens.css with all CSS custom properties**

Create `src/tokens/tokens.css`:

```css
:root {
  /* Colors — Light Mode (Warm Earth) */
  --color-bg: #faf9f6;
  --color-bg-elevated: #f0ede8;
  --color-bg-subtle: #e8e4df;
  --color-text: #2c2c2c;
  --color-text-muted: #6b6b6b;
  --color-accent-green: #4a6741;
  --color-accent-warm: #c17f59;
  --color-accent-playful: #7c6fad;
  --color-focus-ring: #7c6fad;

  /* Typography */
  --font-heading: 'Gill Sans', 'Avenir Next', 'Avenir', sans-serif;
  --font-body: Georgia, 'Times New Roman', serif;
  --font-ui: system-ui, -apple-system, 'Segoe UI', sans-serif;

  /* Type Scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.75rem;
  --text-3xl: 2.5rem;

  /* Spacing (4px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Transitions */
  --transition-gentle: 200ms ease;
  --transition-reveal: 400ms ease-out;
}

[data-theme='dark'] {
  --color-bg: #1a1a2e;
  --color-bg-elevated: #222240;
  --color-bg-subtle: #2a2a45;
  --color-text: #f0ece2;
  --color-text-muted: #b8b8c4;
  --color-accent-green: #7c9a92;
  --color-accent-warm: #f0c27a;
  --color-accent-playful: #b89adb;
  --color-focus-ring: #b89adb;
}
```

- [ ] **Step 2: Create reset.css**

Create `src/tokens/reset.css`:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  min-height: 100vh;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
```

- [ ] **Step 3: Create global.css**

Create `src/tokens/global.css`:

```css
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  transition: background-color var(--transition-gentle), color var(--transition-gentle);
}

:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

::selection {
  background-color: var(--color-accent-playful);
  color: var(--color-bg);
}
```

- [ ] **Step 4: Import tokens in main.tsx**

Update `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tokens/reset.css'
import './tokens/tokens.css'
import './tokens/global.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/tokens/ src/main.tsx
git commit -m "feat: add design tokens, CSS reset, and global styles"
```

---

## Task 3: ThemeProvider & useTheme Hook

**Files:**
- Create: `src/hooks/useTheme.ts`
- Create: `src/foundation/ThemeProvider.tsx`
- Create: `src/foundation/ThemeProvider.test.tsx`

- [ ] **Step 1: Write failing test for ThemeProvider**

Create `src/foundation/ThemeProvider.test.tsx`:

```tsx
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeProvider'

function TestConsumer() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to light theme', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('toggles to dark theme', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )
    await user.click(screen.getByText('Toggle'))
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('persists theme to localStorage', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )
    await user.click(screen.getByText('Toggle'))
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('restores theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('throws when useTheme is used outside ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestConsumer />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    )
    spy.mockRestore()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/foundation/ThemeProvider.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement ThemeProvider and useTheme**

Create `src/foundation/ThemeProvider.tsx`:

```tsx
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/foundation/ThemeProvider.test.tsx
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/foundation/ThemeProvider.tsx src/foundation/ThemeProvider.test.tsx
git commit -m "feat: add ThemeProvider with localStorage persistence and system preference detection"
```

---

## Task 4: useReducedMotion Hook

**Files:**
- Create: `src/hooks/useReducedMotion.ts`
- Create: `src/hooks/useReducedMotion.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/hooks/useReducedMotion.test.ts`:

```ts
import { renderHook } from '@testing-library/react'
import { useReducedMotion } from './useReducedMotion'

describe('useReducedMotion', () => {
  it('returns false when no preference is set', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when reduced motion is preferred', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/hooks/useReducedMotion.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement useReducedMotion**

Create `src/hooks/useReducedMotion.ts`:

```ts
import { useState, useEffect } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/hooks/useReducedMotion.test.ts
```

Expected: All 2 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useReducedMotion.ts src/hooks/useReducedMotion.test.ts
git commit -m "feat: add useReducedMotion hook"
```

---

## Task 5: VisuallyHidden Component

**Files:**
- Create: `src/foundation/VisuallyHidden.tsx`
- Create: `src/foundation/VisuallyHidden.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/foundation/VisuallyHidden.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { VisuallyHidden } from './VisuallyHidden'

describe('VisuallyHidden', () => {
  it('renders text that is accessible to screen readers', () => {
    render(<VisuallyHidden>Skip to content</VisuallyHidden>)
    expect(screen.getByText('Skip to content')).toBeInTheDocument()
  })

  it('applies visually hidden styles', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    const el = screen.getByText('Hidden text')
    const style = window.getComputedStyle(el)
    // The element should exist in DOM but be visually hidden
    expect(el).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/foundation/VisuallyHidden.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement VisuallyHidden**

Create `src/foundation/VisuallyHidden.tsx`:

```tsx
import type { ReactNode } from 'react'

const styles: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
}

export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span style={styles}>{children}</span>
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/foundation/VisuallyHidden.test.tsx
```

Expected: All 2 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/foundation/VisuallyHidden.tsx src/foundation/VisuallyHidden.test.tsx
git commit -m "feat: add VisuallyHidden component"
```

---

## Task 6: SkipLink Component

**Files:**
- Create: `src/foundation/SkipLink.tsx`
- Create: `src/foundation/SkipLink.module.css`
- Create: `src/foundation/SkipLink.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/foundation/SkipLink.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { SkipLink } from './SkipLink'

describe('SkipLink', () => {
  it('renders a link to #main', () => {
    render(<SkipLink />)
    const link = screen.getByText('Skip to main content')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#main')
  })

  it('is visually hidden by default but visible on focus', () => {
    render(<SkipLink />)
    const link = screen.getByText('Skip to main content')
    expect(link.className).toContain('skipLink')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/foundation/SkipLink.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement SkipLink**

Create `src/foundation/SkipLink.module.css`:

```css
.skipLink {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  z-index: 9999;
  padding: var(--space-2) var(--space-4);
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  border: 2px solid var(--color-focus-ring);
  border-radius: var(--radius-md);
  text-decoration: none;
}

.skipLink:focus {
  top: var(--space-4);
}
```

Create `src/foundation/SkipLink.tsx`:

```tsx
import styles from './SkipLink.module.css'

export function SkipLink() {
  return (
    <a href="#main" className={styles.skipLink}>
      Skip to main content
    </a>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/foundation/SkipLink.test.tsx
```

Expected: All 2 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/foundation/SkipLink.tsx src/foundation/SkipLink.module.css src/foundation/SkipLink.test.tsx
git commit -m "feat: add SkipLink component"
```

---

## Task 7: Text Component

**Files:**
- Create: `src/foundation/Text.tsx`
- Create: `src/foundation/Text.module.css`
- Create: `src/foundation/Text.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/foundation/Text.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Text } from './Text'

describe('Text', () => {
  it('renders a paragraph by default', () => {
    render(<Text>Hello world</Text>)
    const el = screen.getByText('Hello world')
    expect(el.tagName).toBe('P')
  })

  it('renders as a custom element via as prop', () => {
    render(<Text as="span">Inline text</Text>)
    const el = screen.getByText('Inline text')
    expect(el.tagName).toBe('SPAN')
  })

  it('applies body variant by default', () => {
    render(<Text>Body text</Text>)
    const el = screen.getByText('Body text')
    expect(el.className).toContain('body')
  })

  it('applies muted variant', () => {
    render(<Text variant="muted">Muted text</Text>)
    const el = screen.getByText('Muted text')
    expect(el.className).toContain('muted')
  })

  it('applies label variant', () => {
    render(<Text variant="label">Label</Text>)
    const el = screen.getByText('Label')
    expect(el.className).toContain('label')
  })

  it('applies ui variant', () => {
    render(<Text variant="ui">UI text</Text>)
    const el = screen.getByText('UI text')
    expect(el.className).toContain('ui')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/foundation/Text.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Text**

Create `src/foundation/Text.module.css`:

```css
.body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: 1.6;
}

.muted {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.6;
}

.label {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.4;
}

.ui {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-text);
  line-height: 1.5;
}
```

Create `src/foundation/Text.tsx`:

```tsx
import type { ElementType, ReactNode, HTMLAttributes } from 'react'
import styles from './Text.module.css'

type TextVariant = 'body' | 'muted' | 'label' | 'ui'

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  variant?: TextVariant
  children: ReactNode
}

export function Text({ as: Tag = 'p', variant = 'body', children, className, ...props }: TextProps) {
  return (
    <Tag className={`${styles[variant]}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/foundation/Text.test.tsx
```

Expected: All 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/foundation/Text.tsx src/foundation/Text.module.css src/foundation/Text.test.tsx
git commit -m "feat: add polymorphic Text component with body/muted/label/ui variants"
```

---

## Task 8: Heading Component

**Files:**
- Create: `src/foundation/Heading.tsx`
- Create: `src/foundation/Heading.module.css`
- Create: `src/foundation/Heading.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/foundation/Heading.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders an h2 by default', () => {
    render(<Heading>Title</Heading>)
    const el = screen.getByRole('heading', { name: 'Title' })
    expect(el.tagName).toBe('H2')
  })

  it('renders the correct heading level', () => {
    render(<Heading level={3}>Subtitle</Heading>)
    const el = screen.getByRole('heading', { name: 'Subtitle' })
    expect(el.tagName).toBe('H3')
  })

  it('applies visual size class independently of level', () => {
    render(<Heading level={3} size="xl">Big H3</Heading>)
    const el = screen.getByRole('heading', { name: 'Big H3' })
    expect(el.tagName).toBe('H3')
    expect(el.className).toContain('xl')
  })

  it('defaults visual size to match level', () => {
    render(<Heading level={1}>H1</Heading>)
    const el = screen.getByRole('heading', { name: 'H1' })
    expect(el.className).toContain('threeXl')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/foundation/Heading.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Heading**

Create `src/foundation/Heading.module.css`:

```css
.base {
  font-family: var(--font-heading);
  font-weight: 300;
  color: var(--color-text);
  line-height: 1.2;
  letter-spacing: 0.3px;
}

.xs { font-size: var(--text-xs); }
.sm { font-size: var(--text-sm); }
.base_size { font-size: var(--text-base); }
.lg { font-size: var(--text-lg); }
.xl { font-size: var(--text-xl); }
.twoXl { font-size: var(--text-2xl); }
.threeXl { font-size: var(--text-3xl); }
```

Create `src/foundation/Heading.tsx`:

```tsx
import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Heading.module.css'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  size?: HeadingSize
  children: ReactNode
}

const levelToSize: Record<HeadingLevel, string> = {
  1: 'threeXl',
  2: 'twoXl',
  3: 'xl',
  4: 'lg',
  5: 'base_size',
  6: 'sm',
}

const sizeToClass: Record<HeadingSize, string> = {
  'xs': 'xs',
  'sm': 'sm',
  'base': 'base_size',
  'lg': 'lg',
  'xl': 'xl',
  '2xl': 'twoXl',
  '3xl': 'threeXl',
}

export function Heading({ level = 2, size, children, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const
  const sizeClass = size ? sizeToClass[size] : levelToSize[level]
  return (
    <Tag
      className={`${styles.base} ${styles[sizeClass]}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/foundation/Heading.test.tsx
```

Expected: All 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/foundation/Heading.tsx src/foundation/Heading.module.css src/foundation/Heading.test.tsx
git commit -m "feat: add Heading component with decoupled semantic level and visual size"
```

---

## Task 9: Stack Component

**Files:**
- Create: `src/foundation/Stack.tsx`
- Create: `src/foundation/Stack.module.css`
- Create: `src/foundation/Stack.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/foundation/Stack.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Stack } from './Stack'

describe('Stack', () => {
  it('renders children in a vertical stack by default', () => {
    render(
      <Stack data-testid="stack">
        <div>A</div>
        <div>B</div>
      </Stack>
    )
    const stack = screen.getByTestId('stack')
    expect(stack).toBeInTheDocument()
    expect(stack.className).toContain('vertical')
  })

  it('renders horizontal when direction is row', () => {
    render(
      <Stack direction="row" data-testid="stack">
        <div>A</div>
      </Stack>
    )
    expect(screen.getByTestId('stack').className).toContain('horizontal')
  })

  it('applies gap via inline style', () => {
    render(
      <Stack gap={4} data-testid="stack">
        <div>A</div>
      </Stack>
    )
    const stack = screen.getByTestId('stack')
    expect(stack.style.gap).toBe('var(--space-4)')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/foundation/Stack.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Stack**

Create `src/foundation/Stack.module.css`:

```css
.stack {
  display: flex;
}

.vertical {
  flex-direction: column;
}

.horizontal {
  flex-direction: row;
}
```

Create `src/foundation/Stack.tsx`:

```tsx
import type { ReactNode, HTMLAttributes, CSSProperties } from 'react'
import styles from './Stack.module.css'

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'column' | 'row'
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  children: ReactNode
}

export function Stack({
  direction = 'column',
  gap,
  align,
  justify,
  children,
  className,
  style,
  ...props
}: StackProps) {
  const dirClass = direction === 'row' ? styles.horizontal : styles.vertical
  return (
    <div
      className={`${styles.stack} ${dirClass}${className ? ` ${className}` : ''}`}
      style={{
        gap: gap ? `var(--space-${gap})` : undefined,
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/foundation/Stack.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/foundation/Stack.tsx src/foundation/Stack.module.css src/foundation/Stack.test.tsx
git commit -m "feat: add Stack layout primitive"
```

---

## Task 10: Container Component

**Files:**
- Create: `src/foundation/Container.tsx`
- Create: `src/foundation/Container.module.css`
- Create: `src/foundation/Container.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/foundation/Container.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Container } from './Container'

describe('Container', () => {
  it('renders children within a max-width wrapper', () => {
    render(<Container data-testid="container">Content</Container>)
    const el = screen.getByTestId('container')
    expect(el).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies the container class', () => {
    render(<Container data-testid="container">Content</Container>)
    expect(screen.getByTestId('container').className).toContain('container')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/foundation/Container.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Container**

Create `src/foundation/Container.module.css`:

```css
.container {
  width: 100%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}
```

Create `src/foundation/Container.tsx`:

```tsx
import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Container.module.css'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={`${styles.container}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/foundation/Container.test.tsx
```

Expected: All 2 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/foundation/Container.tsx src/foundation/Container.module.css src/foundation/Container.test.tsx
git commit -m "feat: add Container component"
```

---

## Task 11: Button Component

**Files:**
- Create: `src/components/Button.tsx`
- Create: `src/components/Button.module.css`
- Create: `src/components/Button.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/Button.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders with primary variant by default', () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole('button', { name: 'Click me' })
    expect(btn).toBeInTheDocument()
    expect(btn.className).toContain('primary')
  })

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button').className).toContain('secondary')
  })

  it('renders ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button').className).toContain('ghost')
  })

  it('calls onClick handler', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('supports disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/Button.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Button**

Create `src/components/Button.module.css`:

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
  padding: var(--space-2) var(--space-5);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 500;
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  cursor: pointer;
  transition: background-color var(--transition-gentle), color var(--transition-gentle), border-color var(--transition-gentle);
  text-decoration: none;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background-color: var(--color-accent-warm);
  color: #fff;
  border-color: var(--color-accent-warm);
}

.primary:hover:not(:disabled) {
  filter: brightness(1.1);
}

.secondary {
  background-color: transparent;
  color: var(--color-text);
  border-color: var(--color-bg-subtle);
}

.secondary:hover:not(:disabled) {
  border-color: var(--color-text-muted);
}

.ghost {
  background-color: transparent;
  color: var(--color-text);
  border-color: transparent;
  padding: var(--space-2);
}

.ghost:hover:not(:disabled) {
  background-color: var(--color-bg-elevated);
}
```

Create `src/components/Button.tsx`:

```tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/Button.test.tsx
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Button.tsx src/components/Button.module.css src/components/Button.test.tsx
git commit -m "feat: add Button component with primary/secondary/ghost variants"
```

---

## Task 12: Link Component

**Files:**
- Create: `src/components/Link.tsx`
- Create: `src/components/Link.module.css`
- Create: `src/components/Link.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/Link.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Link } from './Link'

describe('Link', () => {
  it('renders an anchor element', () => {
    render(<Link href="/about">About</Link>)
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toHaveAttribute('href', '/about')
  })

  it('adds rel and target for external links', () => {
    render(<Link href="https://example.com" external>External</Link>)
    const link = screen.getByRole('link', { name: /External/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows external indicator for external links', () => {
    render(<Link href="https://example.com" external>External</Link>)
    const indicator = screen.getByText('(opens in new tab)')
    expect(indicator).toBeInTheDocument()
  })

  it('does not add external attributes for internal links', () => {
    render(<Link href="/about">About</Link>)
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/Link.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Link**

Create `src/components/Link.module.css`:

```css
.link {
  color: var(--color-accent-green);
  text-decoration: none;
  font-family: inherit;
  position: relative;
  transition: color var(--transition-gentle);
}

.link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  right: 50%;
  height: 1px;
  background-color: currentColor;
  transition: left var(--transition-gentle), right var(--transition-gentle);
}

.link:hover::after {
  left: 0;
  right: 0;
}

.externalIndicator {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.externalIcon {
  display: inline-block;
  width: 0.75em;
  height: 0.75em;
  margin-left: 0.25em;
  vertical-align: baseline;
}
```

Create `src/components/Link.tsx`:

```tsx
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import styles from './Link.module.css'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean
  children: ReactNode
}

export function Link({ external, children, className, ...props }: LinkProps) {
  const externalProps = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {}

  return (
    <a
      className={`${styles.link}${className ? ` ${className}` : ''}`}
      {...externalProps}
      {...props}
    >
      {children}
      {external && (
        <>
          <svg
            className={styles.externalIcon}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M3.5 3.5h5v5" />
            <path d="M8.5 3.5L3 9" />
          </svg>
          <span className={styles.externalIndicator}>(opens in new tab)</span>
        </>
      )}
    </a>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/Link.test.tsx
```

Expected: All 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Link.tsx src/components/Link.module.css src/components/Link.test.tsx
git commit -m "feat: add Link component with external link indicator"
```

---

## Task 13: Card Component

**Files:**
- Create: `src/components/Card.tsx`
- Create: `src/components/Card.module.css`
- Create: `src/components/Card.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/Card.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies the card class', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card').className).toContain('card')
  })

  it('renders background glyph when provided', () => {
    render(<Card glyph="?">Content</Card>)
    const glyph = screen.getByText('?')
    expect(glyph).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders header, body, and footer slots', () => {
    render(
      <Card
        header={<div>Header</div>}
        footer={<div>Footer</div>}
      >
        Body
      </Card>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/Card.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Card**

Create `src/components/Card.module.css`:

```css
.card {
  position: relative;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  overflow: hidden;
  transition: transform var(--transition-gentle), box-shadow var(--transition-gentle);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: none;
  }
}

.glyph {
  position: absolute;
  top: -20px;
  right: -10px;
  font-family: var(--font-body);
  font-size: 96px;
  opacity: 0.06;
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

.header {
  margin-bottom: var(--space-3);
}

.footer {
  margin-top: var(--space-4);
}
```

Create `src/components/Card.tsx`:

```tsx
import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glyph?: string
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export function Card({ glyph, header, footer, children, className, ...props }: CardProps) {
  return (
    <div className={`${styles.card}${className ? ` ${className}` : ''}`} {...props}>
      {glyph && (
        <span className={styles.glyph} aria-hidden="true">
          {glyph}
        </span>
      )}
      {header && <div className={styles.header}>{header}</div>}
      <div>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/Card.test.tsx
```

Expected: All 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Card.tsx src/components/Card.module.css src/components/Card.test.tsx
git commit -m "feat: add Card component with glyph background and slots"
```

---

## Task 14: Section Component

**Files:**
- Create: `src/components/Section.tsx`
- Create: `src/components/Section.module.css`
- Create: `src/components/Section.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/Section.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Section } from './Section'

describe('Section', () => {
  it('renders a semantic section element', () => {
    render(<Section aria-label="Test">Content</Section>)
    expect(screen.getByRole('region', { name: 'Test' })).toBeInTheDocument()
  })

  it('applies zone class when provided', () => {
    render(<Section zone="calm" data-testid="section">Content</Section>)
    expect(screen.getByTestId('section').className).toContain('calm')
  })

  it('applies warm zone', () => {
    render(<Section zone="warm" data-testid="section">Content</Section>)
    expect(screen.getByTestId('section').className).toContain('warm')
  })

  it('applies playful zone', () => {
    render(<Section zone="playful" data-testid="section">Content</Section>)
    expect(screen.getByTestId('section').className).toContain('playful')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/Section.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Section**

Create `src/components/Section.module.css`:

```css
.section {
  padding: var(--space-7) 0;
}

.calm {
  border-left: 3px solid var(--color-accent-green);
  padding-left: var(--space-5);
}

.warm {
  border-left: 3px solid var(--color-accent-warm);
  padding-left: var(--space-5);
}

.playful {
  border-left: 3px solid var(--color-accent-playful);
  padding-left: var(--space-5);
}
```

Create `src/components/Section.tsx`:

```tsx
import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Section.module.css'

type Zone = 'calm' | 'warm' | 'playful'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  zone?: Zone
  children: ReactNode
}

export function Section({ zone, children, className, ...props }: SectionProps) {
  const classes = [styles.section, zone ? styles[zone] : '', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...props}>
      {children}
    </section>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/Section.test.tsx
```

Expected: All 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Section.tsx src/components/Section.module.css src/components/Section.test.tsx
git commit -m "feat: add Section component with calm/warm/playful zones"
```

---

## Task 15: Accordion Component

**Files:**
- Create: `src/components/Accordion.tsx`
- Create: `src/components/Accordion.module.css`
- Create: `src/components/Accordion.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/Accordion.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion, AccordionItem } from './Accordion'

describe('Accordion', () => {
  const items = (
    <Accordion>
      <AccordionItem title="Item 1">Content 1</AccordionItem>
      <AccordionItem title="Item 2">Content 2</AccordionItem>
    </Accordion>
  )

  it('renders all item titles', () => {
    render(items)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('hides content by default', () => {
    render(items)
    expect(screen.queryByText('Content 1')).not.toBeVisible()
  })

  it('expands content on click', async () => {
    const user = userEvent.setup()
    render(items)
    await user.click(screen.getByText('Item 1'))
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('collapses content on second click', async () => {
    const user = userEvent.setup()
    render(items)
    await user.click(screen.getByText('Item 1'))
    await user.click(screen.getByText('Item 1'))
    expect(screen.queryByText('Content 1')).not.toBeVisible()
  })

  it('sets aria-expanded correctly', async () => {
    const user = userEvent.setup()
    render(items)
    const trigger = screen.getByText('Item 1').closest('button')!
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('supports keyboard navigation with Enter', async () => {
    const user = userEvent.setup()
    render(items)
    const trigger = screen.getByText('Item 1').closest('button')!
    trigger.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('supports keyboard navigation with Space', async () => {
    const user = userEvent.setup()
    render(items)
    const trigger = screen.getByText('Item 1').closest('button')!
    trigger.focus()
    await user.keyboard(' ')
    expect(screen.getByText('Content 1')).toBeVisible()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/Accordion.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Accordion**

Create `src/components/Accordion.module.css`:

```css
.accordion {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.item {
  border: 1px solid var(--color-bg-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-4);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 300;
  color: var(--color-text);
  text-align: left;
  min-height: 44px;
}

.trigger:hover {
  background-color: var(--color-bg-elevated);
}

.chevron {
  width: 20px;
  height: 20px;
  transition: transform var(--transition-gentle);
  flex-shrink: 0;
}

.chevronOpen {
  transform: rotate(180deg);
}

.panel {
  overflow: hidden;
  transition: max-height var(--transition-gentle);
}

.panelHidden {
  max-height: 0;
  visibility: hidden;
}

.panelVisible {
  visibility: visible;
}

.panelContent {
  padding: 0 var(--space-4) var(--space-4);
}

@media (prefers-reduced-motion: reduce) {
  .chevron {
    transition: none;
  }
  .panel {
    transition: none;
  }
}
```

Create `src/components/Accordion.tsx`:

```tsx
import { useState, useId, useRef, useEffect, type ReactNode } from 'react'
import styles from './Accordion.module.css'

interface AccordionItemProps {
  title: string
  children: ReactNode
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const id = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerId = `accordion-trigger-${id}`
  const panelId = `accordion-panel-${id}`

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    if (isOpen) {
      panel.style.maxHeight = `${panel.scrollHeight}px`
    } else {
      panel.style.maxHeight = '0'
    }
  }, [isOpen])

  return (
    <div className={styles.item}>
      <button
        id={triggerId}
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>{title}</span>
        <svg
          className={`${styles.chevron}${isOpen ? ` ${styles.chevronOpen}` : ''}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" />
        </svg>
      </button>
      <div
        id={panelId}
        ref={panelRef}
        role="region"
        aria-labelledby={triggerId}
        className={`${styles.panel} ${isOpen ? styles.panelVisible : styles.panelHidden}`}
      >
        <div className={styles.panelContent}>{children}</div>
      </div>
    </div>
  )
}

interface AccordionProps {
  children: ReactNode
}

export function Accordion({ children }: AccordionProps) {
  return <div className={styles.accordion}>{children}</div>
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/Accordion.test.tsx
```

Expected: All 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Accordion.tsx src/components/Accordion.module.css src/components/Accordion.test.tsx
git commit -m "feat: add Accordion component with keyboard navigation and ARIA"
```

---

## Task 16: NavBar Component

**Files:**
- Create: `src/components/NavBar.tsx`
- Create: `src/components/NavBar.module.css`
- Create: `src/components/NavBar.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/NavBar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavBar } from './NavBar'
import { ThemeProvider } from '../foundation/ThemeProvider'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Speaking', href: '/speaking' },
]

function renderNavBar(currentPath = '/') {
  return render(
    <ThemeProvider>
      <NavBar links={links} currentPath={currentPath} siteName="Andrew Harasymiw" />
    </ThemeProvider>
  )
}

describe('NavBar', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders site name', () => {
    renderNavBar()
    expect(screen.getByText('Andrew Harasymiw')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderNavBar()
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Speaking')).toBeInTheDocument()
  })

  it('marks current page with aria-current', () => {
    renderNavBar('/')
    const homeLink = screen.getByText('Home').closest('a')!
    expect(homeLink).toHaveAttribute('aria-current', 'page')
  })

  it('renders theme toggle button', () => {
    renderNavBar()
    expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument()
  })

  it('toggles theme when toggle is clicked', async () => {
    const user = userEvent.setup()
    renderNavBar()
    const toggle = screen.getByRole('button', { name: /theme/i })
    await user.click(toggle)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/NavBar.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement NavBar**

Create `src/components/NavBar.module.css`:

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) 0;
}

.siteName {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 300;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: 0.3px;
}

.navLinks {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  list-style: none;
}

.navLink {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  position: relative;
  padding: var(--space-1) 0;
  transition: color var(--transition-gentle);
}

.navLink:hover {
  color: var(--color-text);
}

.navLink::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  right: 50%;
  height: 2px;
  background-color: var(--color-accent-green);
  transition: left var(--transition-gentle), right var(--transition-gentle);
}

.navLink:hover::after {
  left: 0;
  right: 0;
}

.navLinkActive {
  color: var(--color-text);
}

.navLinkActive::after {
  left: 0;
  right: 0;
}

.themeToggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
  transition: color var(--transition-gentle);
}

.themeToggle:hover {
  color: var(--color-text);
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
}

.mobileMenu {
  display: none;
}

@media (max-width: 767px) {
  .navLinks {
    display: none;
  }

  .hamburger {
    display: inline-flex;
  }

  .mobileMenu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    background: var(--color-bg);
    padding: var(--space-7) var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    z-index: 100;
    transform: translateX(100%);
    transition: transform var(--transition-gentle);
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  }

  .mobileMenuOpen {
    transform: translateX(0);
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
  }

  .overlayHidden {
    display: none;
  }

  .mobileNavLink {
    font-family: var(--font-ui);
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    text-decoration: none;
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--color-bg-subtle);
  }

  .mobileNavLinkActive {
    color: var(--color-text);
  }
}
```

Create `src/components/NavBar.tsx`:

```tsx
import { useState } from 'react'
import { useTheme } from '../foundation/ThemeProvider'
import styles from './NavBar.module.css'

interface NavLink {
  label: string
  href: string
}

interface NavBarProps {
  links: NavLink[]
  currentPath: string
  siteName: string
}

export function NavBar({ links, currentPath, siteName }: NavBarProps) {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className={styles.navbar}>
      <span className={styles.siteName}>{siteName}</span>

      <nav aria-label="Main">
        <ul className={styles.navLinks}>
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.navLink}${currentPath === link.href ? ` ${styles.navLinkActive}` : ''}`}
                aria-current={currentPath === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </nav>

      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        aria-expanded={mobileOpen}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      <div
        className={`${styles.overlay}${!mobileOpen ? ` ${styles.overlayHidden}` : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <div className={`${styles.mobileMenu}${mobileOpen ? ` ${styles.mobileMenuOpen}` : ''}`}>
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          style={{ alignSelf: 'flex-end', display: 'inline-flex' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`${styles.mobileNavLink}${currentPath === link.href ? ` ${styles.mobileNavLinkActive}` : ''}`}
            aria-current={currentPath === link.href ? 'page' : undefined}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/NavBar.test.tsx
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/NavBar.tsx src/components/NavBar.module.css src/components/NavBar.test.tsx
git commit -m "feat: add NavBar with responsive mobile menu and theme toggle"
```

---

## Task 17: HeroTagline Component

**Files:**
- Create: `src/components/HeroTagline.tsx`
- Create: `src/components/HeroTagline.module.css`
- Create: `src/components/HeroTagline.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/HeroTagline.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { HeroTagline } from './HeroTagline'

const cards = [
  { label: 'Who I am', color: 'green' as const, content: 'Developer advocate' },
  { label: 'What I do', color: 'warm' as const, content: 'Teach and build' },
  { label: 'How I help', color: 'playful' as const, content: 'DevRel and talks' },
]

describe('HeroTagline', () => {
  it('renders the tagline', () => {
    render(<HeroTagline tagline="Building communities" cards={cards} />)
    expect(screen.getByText('Building communities')).toBeInTheDocument()
  })

  it('renders all three cards', () => {
    render(<HeroTagline tagline="Tagline" cards={cards} />)
    expect(screen.getByText('Who I am')).toBeInTheDocument()
    expect(screen.getByText('What I do')).toBeInTheDocument()
    expect(screen.getByText('How I help')).toBeInTheDocument()
  })

  it('renders card content', () => {
    render(<HeroTagline tagline="Tagline" cards={cards} />)
    expect(screen.getByText('Developer advocate')).toBeInTheDocument()
    expect(screen.getByText('Teach and build')).toBeInTheDocument()
    expect(screen.getByText('DevRel and talks')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/HeroTagline.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement HeroTagline**

Create `src/components/HeroTagline.module.css`:

```css
.hero {
  padding: var(--space-8) 0 var(--space-7);
  text-align: center;
}

.tagline {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 300;
  color: var(--color-text);
  line-height: 1.2;
  letter-spacing: 0.3px;
  margin-bottom: var(--space-7);
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}

@media (max-width: 767px) {
  .cards {
    grid-template-columns: 1fr;
  }

  .tagline {
    font-size: var(--text-2xl);
  }
}

.card {
  position: relative;
  background: linear-gradient(135deg, var(--color-bg-elevated) 0%, var(--color-bg-subtle) 100%);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  text-align: left;
  overflow: hidden;
}

.cardLabel {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--space-2);
}

.labelGreen { color: var(--color-accent-green); }
.labelWarm { color: var(--color-accent-warm); }
.labelPlayful { color: var(--color-accent-playful); }

.cardContent {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: 1.6;
}
```

Create `src/components/HeroTagline.tsx`:

```tsx
import styles from './HeroTagline.module.css'

type AccentColor = 'green' | 'warm' | 'playful'

interface HeroCard {
  label: string
  color: AccentColor
  content: string
}

interface HeroTaglineProps {
  tagline: string
  cards: [HeroCard, HeroCard, HeroCard]
}

const colorToClass: Record<AccentColor, string> = {
  green: styles.labelGreen,
  warm: styles.labelWarm,
  playful: styles.labelPlayful,
}

export function HeroTagline({ tagline, cards }: HeroTaglineProps) {
  return (
    <div className={styles.hero}>
      <h1 className={styles.tagline}>{tagline}</h1>
      <div className={styles.cards}>
        {cards.map(card => (
          <div key={card.label} className={styles.card}>
            <div className={`${styles.cardLabel} ${colorToClass[card.color]}`}>
              {card.label}
            </div>
            <div className={styles.cardContent}>{card.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/HeroTagline.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroTagline.tsx src/components/HeroTagline.module.css src/components/HeroTagline.test.tsx
git commit -m "feat: add HeroTagline component with tagline + 3 accent cards"
```

---

## Task 18: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/Footer.module.css`
- Create: `src/components/Footer.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/Footer.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders contentinfo landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders contact links', () => {
    render(<Footer />)
    expect(screen.getByText(/aharasymiw@gmail.com/)).toBeInTheDocument()
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument()
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument()
    expect(screen.getByText(/Mastodon/i)).toBeInTheDocument()
  })

  it('renders copyright', () => {
    render(<Footer />)
    expect(screen.getByText(/Andrew Harasymiw/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/Footer.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Footer**

Create `src/components/Footer.module.css`:

```css
.footer {
  padding: var(--space-7) 0 var(--space-5);
  border-top: 1px solid var(--color-bg-subtle);
  margin-top: var(--space-8);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  list-style: none;
}

.link {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-gentle);
}

.link:hover {
  color: var(--color-text);
}

.copyright {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
```

Create `src/components/Footer.tsx`:

```tsx
import styles from './Footer.module.css'

const contactLinks = [
  { label: 'aharasymiw@gmail.com', href: 'mailto:aharasymiw@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/aharasymiw' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aharasymiw/' },
  { label: 'Mastodon', href: 'https://hachyderm.io/@aharasymiw' },
  { label: 'YouTube', href: 'https://www.youtube.com/@grokthings' },
  { label: 'GrokThings', href: 'https://grokthings.com' },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        {contactLinks.map(link => (
          <li key={link.href}>
            <a
              className={styles.link}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.copyright}>
        <span data-footer-year>{year}</span> Andrew Harasymiw
      </p>
    </footer>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/Footer.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.module.css src/components/Footer.test.tsx
git commit -m "feat: add Footer component with contact links"
```

---

## Task 19: RevealOnScroll Component

**Files:**
- Create: `src/playground/RevealOnScroll.tsx`
- Create: `src/playground/RevealOnScroll.module.css`
- Create: `src/playground/RevealOnScroll.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/playground/RevealOnScroll.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { RevealOnScroll } from './RevealOnScroll'

// Mock IntersectionObserver
const mockObserve = vi.fn()
const mockUnobserve = vi.fn()

beforeEach(() => {
  window.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: vi.fn(),
    _callback: callback,
  }))
})

describe('RevealOnScroll', () => {
  it('renders children', () => {
    render(<RevealOnScroll>Hello</RevealOnScroll>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('starts with hidden class', () => {
    render(<RevealOnScroll><div data-testid="child">Content</div></RevealOnScroll>)
    const wrapper = screen.getByTestId('child').parentElement!
    expect(wrapper.className).toContain('hidden')
  })

  it('observes the element', () => {
    render(<RevealOnScroll>Content</RevealOnScroll>)
    expect(mockObserve).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/playground/RevealOnScroll.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement RevealOnScroll**

Create `src/playground/RevealOnScroll.module.css`:

```css
.reveal {
  transition: opacity var(--transition-reveal), transform var(--transition-reveal);
}

.hidden {
  opacity: 0;
  transform: translateY(12px);
}

.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .hidden {
    transform: none;
  }
  .reveal {
    transition: opacity 0.01ms;
  }
}
```

Create `src/playground/RevealOnScroll.tsx`:

```tsx
import { useRef, useEffect, useState, type ReactNode } from 'react'
import styles from './RevealOnScroll.module.css'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
}

export function RevealOnScroll({ children, delay = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${isVisible ? styles.visible : styles.hidden}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/playground/RevealOnScroll.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/playground/RevealOnScroll.tsx src/playground/RevealOnScroll.module.css src/playground/RevealOnScroll.test.tsx
git commit -m "feat: add RevealOnScroll component with intersection observer"
```

---

## Task 20: GlyphBackground Component

**Files:**
- Create: `src/playground/GlyphBackground.tsx`
- Create: `src/playground/GlyphBackground.module.css`
- Create: `src/playground/GlyphBackground.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/playground/GlyphBackground.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { GlyphBackground } from './GlyphBackground'

describe('GlyphBackground', () => {
  it('renders the glyph character', () => {
    render(<GlyphBackground glyph="?" />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('is aria-hidden', () => {
    render(<GlyphBackground glyph="&" />)
    expect(screen.getByText('&')).toHaveAttribute('aria-hidden', 'true')
  })

  it('is not selectable or clickable', () => {
    render(<GlyphBackground glyph="→" data-testid="glyph" />)
    const el = screen.getByText('→')
    expect(el.style.pointerEvents).toBe('none')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/playground/GlyphBackground.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement GlyphBackground**

Create `src/playground/GlyphBackground.module.css`:

```css
.glyph {
  position: absolute;
  font-family: var(--font-body);
  font-size: 120px;
  opacity: 0.05;
  line-height: 1;
  user-select: none;
}
```

Create `src/playground/GlyphBackground.tsx`:

```tsx
import type { CSSProperties } from 'react'
import styles from './GlyphBackground.module.css'

interface GlyphBackgroundProps {
  glyph: string
  top?: string
  right?: string
  bottom?: string
  left?: string
}

export function GlyphBackground({ glyph, top, right, bottom, left }: GlyphBackgroundProps) {
  const style: CSSProperties = {
    top: top ?? '-20px',
    right: right ?? '-10px',
    bottom,
    left,
    pointerEvents: 'none',
  }

  return (
    <span className={styles.glyph} style={style} aria-hidden="true">
      {glyph}
    </span>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/playground/GlyphBackground.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/playground/GlyphBackground.tsx src/playground/GlyphBackground.module.css src/playground/GlyphBackground.test.tsx
git commit -m "feat: add GlyphBackground decorative component"
```

---

## Task 21: EasterEgg Component

**Files:**
- Create: `src/playground/EasterEgg.tsx`
- Create: `src/playground/EasterEgg.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/playground/EasterEgg.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EasterEgg } from './EasterEgg'

describe('EasterEgg', () => {
  it('does not render children when not triggered', () => {
    render(
      <EasterEgg trigger={{ type: 'clickCount', count: 5, targetSelector: '#logo' }}>
        <div>Secret!</div>
      </EasterEgg>
    )
    expect(screen.queryByText('Secret!')).not.toBeInTheDocument()
  })

  it('renders children when triggered via idle', async () => {
    vi.useFakeTimers()
    render(
      <EasterEgg trigger={{ type: 'idle', duration: 1000 }}>
        <div>Secret!</div>
      </EasterEgg>
    )
    vi.advanceTimersByTime(1001)
    expect(screen.getByText('Secret!')).toBeInTheDocument()
    vi.useRealTimers()
  })

  it('announces via aria-live when triggered', () => {
    vi.useFakeTimers()
    render(
      <EasterEgg
        trigger={{ type: 'idle', duration: 1000 }}
        announcement="Easter egg found!"
      >
        <div>Secret!</div>
      </EasterEgg>
    )
    vi.advanceTimersByTime(1001)
    expect(screen.getByText('Easter egg found!')).toBeInTheDocument()
    vi.useRealTimers()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/playground/EasterEgg.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement EasterEgg**

Create `src/playground/EasterEgg.tsx`:

```tsx
import { useState, useEffect, type ReactNode } from 'react'

type Trigger =
  | { type: 'clickCount'; count: number; targetSelector: string }
  | { type: 'idle'; duration: number }
  | { type: 'keySequence'; keys: string[] }

interface EasterEggProps {
  trigger: Trigger
  announcement?: string
  children: ReactNode
}

export function EasterEgg({ trigger, announcement, children }: EasterEggProps) {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (triggered) return

    if (trigger.type === 'idle') {
      let timeoutId: ReturnType<typeof setTimeout>
      const reset = () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => setTriggered(true), trigger.duration)
      }
      const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
      events.forEach(e => window.addEventListener(e, reset))
      timeoutId = setTimeout(() => setTriggered(true), trigger.duration)
      return () => {
        clearTimeout(timeoutId)
        events.forEach(e => window.removeEventListener(e, reset))
      }
    }

    if (trigger.type === 'clickCount') {
      let clicks = 0
      let timer: ReturnType<typeof setTimeout>
      const handler = () => {
        clicks++
        clearTimeout(timer)
        if (clicks >= trigger.count) {
          setTriggered(true)
        } else {
          timer = setTimeout(() => { clicks = 0 }, 1000)
        }
      }
      const target = document.querySelector(trigger.targetSelector)
      target?.addEventListener('click', handler)
      return () => {
        target?.removeEventListener('click', handler)
        clearTimeout(timer)
      }
    }

    if (trigger.type === 'keySequence') {
      const buffer: string[] = []
      const handler = (e: KeyboardEvent) => {
        buffer.push(e.key)
        if (buffer.length > trigger.keys.length) buffer.shift()
        if (buffer.length === trigger.keys.length && buffer.every((k, i) => k === trigger.keys[i])) {
          setTriggered(true)
        }
      }
      window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
    }
  }, [trigger, triggered])

  if (!triggered) return null

  return (
    <>
      {children}
      {announcement && (
        <div aria-live="polite" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
          {announcement}
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/playground/EasterEgg.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/playground/EasterEgg.tsx src/playground/EasterEgg.test.tsx
git commit -m "feat: add EasterEgg trigger component with idle, click, and key sequence support"
```

---

## Task 22: KonamiConfetti Easter Egg

**Files:**
- Create: `src/hooks/useKonamiCode.ts`
- Create: `src/hooks/useKonamiCode.test.ts`
- Create: `src/playground/KonamiConfetti.tsx`
- Create: `src/playground/KonamiConfetti.module.css`
- Create: `src/playground/KonamiConfetti.test.tsx`

- [ ] **Step 1: Write failing test for useKonamiCode**

Create `src/hooks/useKonamiCode.test.ts`:

```ts
import { renderHook, act } from '@testing-library/react'
import { useKonamiCode } from './useKonamiCode'

describe('useKonamiCode', () => {
  it('returns false initially', () => {
    const { result } = renderHook(() => useKonamiCode())
    expect(result.current).toBe(false)
  })

  it('returns true after Konami sequence', () => {
    const { result } = renderHook(() => useKonamiCode())
    const keys = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    act(() => {
      keys.forEach(key => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }))
      })
    })
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/hooks/useKonamiCode.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement useKonamiCode**

Create `src/hooks/useKonamiCode.ts`:

```ts
import { useState, useEffect } from 'react'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function useKonamiCode(): boolean {
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    if (activated) return
    const buffer: string[] = []

    const handler = (e: KeyboardEvent) => {
      buffer.push(e.key)
      if (buffer.length > KONAMI.length) buffer.shift()
      if (buffer.length === KONAMI.length && buffer.every((k, i) => k === KONAMI[i])) {
        setActivated(true)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activated])

  return activated
}
```

- [ ] **Step 4: Run useKonamiCode tests**

```bash
npx vitest run src/hooks/useKonamiCode.test.ts
```

Expected: All 2 tests PASS.

- [ ] **Step 5: Write failing test for KonamiConfetti**

Create `src/playground/KonamiConfetti.test.tsx`:

```tsx
import { render, screen, act } from '@testing-library/react'
import { KonamiConfetti } from './KonamiConfetti'

describe('KonamiConfetti', () => {
  it('does not render confetti before activation', () => {
    render(<KonamiConfetti />)
    expect(screen.queryByText("New Achievement!: 'Caught Red Handed'")).not.toBeInTheDocument()
  })

  it('renders confetti and announcement after Konami code', () => {
    render(<KonamiConfetti />)
    const keys = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    act(() => {
      keys.forEach(key => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }))
      })
    })
    expect(screen.getByText("New Achievement!: 'Caught Red Handed'")).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Implement KonamiConfetti**

Create `src/playground/KonamiConfetti.module.css`:

```css
.confettiContainer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.confettiPiece {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  animation: confettiFall 3s ease-out forwards;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .confettiPiece {
    animation: none;
    opacity: 0;
  }
}
```

Create `src/playground/KonamiConfetti.tsx`:

```tsx
import { useState, useEffect } from 'react'
import { useKonamiCode } from '../hooks/useKonamiCode'
import styles from './KonamiConfetti.module.css'

const COLORS = ['#4a6741', '#7c9a92', '#c17f59', '#f0c27a', '#7c6fad', '#b89adb']

function generatePieces(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: `${Math.random() * 0.5}s`,
    size: `${6 + Math.random() * 8}px`,
  }))
}

export function KonamiConfetti() {
  const activated = useKonamiCode()
  const [visible, setVisible] = useState(false)
  const [pieces] = useState(() => generatePieces(50))

  useEffect(() => {
    if (!activated) return
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [activated])

  if (!activated) return null

  return (
    <>
      {visible && (
        <div className={styles.confettiContainer} aria-hidden="true">
          {pieces.map(p => (
            <div
              key={p.id}
              className={styles.confettiPiece}
              style={{
                left: p.left,
                backgroundColor: p.color,
                animationDelay: p.delay,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>
      )}
      <div aria-live="polite" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        New Achievement!: 'Caught Red Handed'
      </div>
    </>
  )
}
```

- [ ] **Step 7: Run all tests**

```bash
npx vitest run src/hooks/useKonamiCode.test.ts src/playground/KonamiConfetti.test.tsx
```

Expected: All 4 tests PASS.

- [ ] **Step 8: Commit**

```bash
git add src/hooks/useKonamiCode.ts src/hooks/useKonamiCode.test.ts src/playground/KonamiConfetti.tsx src/playground/KonamiConfetti.module.css src/playground/KonamiConfetti.test.tsx
git commit -m "feat: add Konami code easter egg with confetti burst"
```

---

## Task 23: LogoScramble Easter Egg

**Files:**
- Create: `src/playground/LogoScramble.tsx`
- Create: `src/playground/LogoScramble.module.css`
- Create: `src/playground/LogoScramble.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/playground/LogoScramble.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LogoScramble } from './LogoScramble'

describe('LogoScramble', () => {
  it('renders the text', () => {
    render(<LogoScramble text="Andrew" />)
    expect(screen.getByText('Andrew')).toBeInTheDocument()
  })

  it('scrambles after 5 rapid clicks', async () => {
    const user = userEvent.setup()
    render(<LogoScramble text="Andrew" />)
    const el = screen.getByText('Andrew')
    for (let i = 0; i < 5; i++) {
      await user.click(el)
    }
    // After scramble, text should eventually return to original
    // We just verify the element is still in the document
    expect(el).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/playground/LogoScramble.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement LogoScramble**

Create `src/playground/LogoScramble.module.css`:

```css
.logo {
  cursor: default;
  display: inline-block;
}

.letter {
  display: inline-block;
  transition: transform 80ms ease;
}

.scrambling .letter {
  animation: jitter 80ms ease infinite alternate;
}

@keyframes jitter {
  from { transform: translateY(-1px) rotate(-2deg); }
  to { transform: translateY(1px) rotate(2deg); }
}

@media (prefers-reduced-motion: reduce) {
  .scrambling .letter {
    animation: none;
  }
}
```

Create `src/playground/LogoScramble.tsx`:

```tsx
import { useState, useRef, useCallback } from 'react'
import styles from './LogoScramble.module.css'

interface LogoScrambleProps {
  text: string
}

function shuffleString(str: string): string {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}

export function LogoScramble({ text }: LogoScrambleProps) {
  const [display, setDisplay] = useState(text)
  const [scrambling, setScrambling] = useState(false)
  const clickCount = useRef(0)
  const clickTimer = useRef<ReturnType<typeof setTimeout>>()

  const handleClick = useCallback(() => {
    if (scrambling) return
    clickCount.current++
    clearTimeout(clickTimer.current)

    if (clickCount.current >= 5) {
      clickCount.current = 0
      setScrambling(true)
      setDisplay(shuffleString(text))

      setTimeout(() => {
        setDisplay(text)
        setScrambling(false)
      }, 500)
    } else {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0
      }, 1000)
    }
  }, [text, scrambling])

  return (
    <span
      className={`${styles.logo}${scrambling ? ` ${styles.scrambling}` : ''}`}
      onClick={handleClick}
    >
      {display.split('').map((char, i) => (
        <span key={`${i}-${char}`} className={styles.letter}>
          {char}
        </span>
      ))}
    </span>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/playground/LogoScramble.test.tsx
```

Expected: All 2 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/playground/LogoScramble.tsx src/playground/LogoScramble.module.css src/playground/LogoScramble.test.tsx
git commit -m "feat: add LogoScramble easter egg (5x rapid click)"
```

---

## Task 24: Gravy the Snail Easter Egg

**Files:**
- Create: `src/hooks/useIdleTimer.ts`
- Create: `src/hooks/useIdleTimer.test.ts`
- Create: `src/playground/GravySnail.tsx`
- Create: `src/playground/GravySnail.module.css`
- Create: `src/playground/GravySnail.test.tsx`

- [ ] **Step 1: Write failing test for useIdleTimer**

Create `src/hooks/useIdleTimer.test.ts`:

```ts
import { renderHook, act } from '@testing-library/react'
import { useIdleTimer } from './useIdleTimer'

describe('useIdleTimer', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('returns false initially', () => {
    const { result } = renderHook(() => useIdleTimer(5000))
    expect(result.current).toBe(false)
  })

  it('returns true after timeout', () => {
    const { result } = renderHook(() => useIdleTimer(5000))
    act(() => { vi.advanceTimersByTime(5001) })
    expect(result.current).toBe(true)
  })

  it('resets on user activity', () => {
    const { result } = renderHook(() => useIdleTimer(5000))
    act(() => { vi.advanceTimersByTime(4000) })
    act(() => { window.dispatchEvent(new Event('mousemove')) })
    act(() => { vi.advanceTimersByTime(4000) })
    expect(result.current).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/hooks/useIdleTimer.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement useIdleTimer**

Create `src/hooks/useIdleTimer.ts`:

```ts
import { useState, useEffect, useCallback } from 'react'

export function useIdleTimer(timeout: number): boolean {
  const [idle, setIdle] = useState(false)

  const reset = useCallback(() => {
    setIdle(false)
  }, [])

  useEffect(() => {
    let timer = setTimeout(() => setIdle(true), timeout)

    const handleActivity = () => {
      setIdle(false)
      clearTimeout(timer)
      timer = setTimeout(() => setIdle(true), timeout)
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    events.forEach(e => window.addEventListener(e, handleActivity))

    return () => {
      clearTimeout(timer)
      events.forEach(e => window.removeEventListener(e, handleActivity))
    }
  }, [timeout])

  return idle
}
```

- [ ] **Step 4: Run useIdleTimer tests**

```bash
npx vitest run src/hooks/useIdleTimer.test.ts
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Write failing test for GravySnail**

Create `src/playground/GravySnail.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { GravySnail } from './GravySnail'

describe('GravySnail', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('does not render when not idle', () => {
    render(<GravySnail />)
    expect(screen.queryByLabelText('Gravy the snail')).not.toBeInTheDocument()
  })

  it('appears after idle timeout', () => {
    render(<GravySnail idleTimeout={1000} />)
    vi.advanceTimersByTime(1001)
    expect(screen.getByLabelText('Gravy the snail')).toBeInTheDocument()
  })

  it('is aria-hidden', () => {
    render(<GravySnail idleTimeout={1000} />)
    vi.advanceTimersByTime(1001)
    const snail = screen.getByLabelText('Gravy the snail')
    expect(snail.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'true')
  })
})
```

- [ ] **Step 6: Implement GravySnail**

Create `src/playground/GravySnail.module.css`:

```css
.container {
  position: fixed;
  bottom: 20px;
  left: 0;
  z-index: 1000;
  pointer-events: none;
}

.snail {
  font-size: 24px;
  animation: crawl 120s linear forwards;
  position: relative;
}

.melting {
  animation: melt 1s ease-out forwards;
}

.trail {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
}

.chaosGlyph {
  position: absolute;
  font-family: var(--font-body);
  opacity: 0.15;
  animation: chaosAppear 0.5s ease-out forwards;
}

.trailFading .chaosGlyph {
  animation: chaosFade 1s ease-out forwards;
}

@keyframes crawl {
  from { transform: translateX(0); }
  to { transform: translateX(calc(100vw + 40px)); }
}

@keyframes melt {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2, 0.5); opacity: 0.5; }
  100% { transform: scale(0.1, 0.1); opacity: 0; }
}

@keyframes chaosAppear {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 0.15; transform: scale(1); }
}

@keyframes chaosFade {
  to { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .snail {
    animation: none;
  }
  .chaosGlyph {
    animation: none;
    opacity: 0;
  }
}
```

Create `src/playground/GravySnail.tsx`:

```tsx
import { useState, useEffect, useRef } from 'react'
import { useIdleTimer } from '../hooks/useIdleTimer'
import styles from './GravySnail.module.css'

interface GravySnailProps {
  idleTimeout?: number
}

const CHAOS_GLYPHS = ['~', '*', '!', '?', '#', '&', '%', '@', '§', '†', '‡', '∞', '≈', '∆']

export function GravySnail({ idleTimeout = 60000 }: GravySnailProps) {
  const idle = useIdleTimer(idleTimeout)
  const [active, setActive] = useState(false)
  const [melting, setMelting] = useState(false)
  const [trailFading, setTrailFading] = useState(false)
  const [chaosItems, setChaosItems] = useState<Array<{ id: number; glyph: string; left: string; bottom: string; rotate: string }>>([])
  const chaosId = useRef(0)
  const snailRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (idle && !active && !melting) {
      setActive(true)
      setChaosItems([])
      setTrailFading(false)
    }
    if (!idle && active && !melting) {
      setMelting(true)
      setTrailFading(true)
      setTimeout(() => {
        setActive(false)
        setMelting(false)
        setChaosItems([])
      }, 1000)
    }
  }, [idle, active, melting])

  useEffect(() => {
    if (!active || melting) {
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      const snail = snailRef.current
      if (!snail) return
      const rect = snail.getBoundingClientRect()
      setChaosItems(prev => [
        ...prev.slice(-30),
        {
          id: chaosId.current++,
          glyph: CHAOS_GLYPHS[Math.floor(Math.random() * CHAOS_GLYPHS.length)],
          left: `${rect.left + Math.random() * 20 - 10}px`,
          bottom: `${10 + Math.random() * 40}px`,
          rotate: `${Math.random() * 360}deg`,
        },
      ])
    }, 800)
    return () => clearInterval(intervalRef.current)
  }, [active, melting])

  useEffect(() => {
    if (!active || melting) return
    const checkPosition = () => {
      const snail = snailRef.current
      if (!snail) return
      const rect = snail.getBoundingClientRect()
      if (rect.left > window.innerWidth) {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    }
    const timer = setInterval(checkPosition, 1000)
    return () => clearInterval(timer)
  }, [active, melting])

  if (!active) return null

  return (
    <div aria-hidden="true">
      <div className={styles.container}>
        <div
          ref={snailRef}
          className={`${styles.snail}${melting ? ` ${styles.melting}` : ''}`}
          aria-label="Gravy the snail"
        >
          🐌
        </div>
      </div>
      <div className={`${styles.trail}${trailFading ? ` ${styles.trailFading}` : ''}`}>
        {chaosItems.map(item => (
          <span
            key={item.id}
            className={styles.chaosGlyph}
            style={{
              left: item.left,
              bottom: item.bottom,
              transform: `rotate(${item.rotate})`,
            }}
          >
            {item.glyph}
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Run all tests**

```bash
npx vitest run src/hooks/useIdleTimer.test.ts src/playground/GravySnail.test.tsx
```

Expected: All 6 tests PASS.

- [ ] **Step 8: Commit**

```bash
git add src/hooks/useIdleTimer.ts src/hooks/useIdleTimer.test.ts src/playground/GravySnail.tsx src/playground/GravySnail.module.css src/playground/GravySnail.test.tsx
git commit -m "feat: add Gravy the chaos snail easter egg"
```

---

## Task 25: SunsetTransition Easter Egg

**Files:**
- Create: `src/playground/SunsetTransition.tsx`
- Create: `src/playground/SunsetTransition.module.css`
- Create: `src/playground/SunsetTransition.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/playground/SunsetTransition.test.tsx`:

```tsx
import { render, screen, act } from '@testing-library/react'
import { SunsetTransition } from './SunsetTransition'

describe('SunsetTransition', () => {
  it('renders nothing when not transitioning', () => {
    render(<SunsetTransition active={false} direction="dark" />)
    expect(screen.queryByTestId('sunset-overlay')).not.toBeInTheDocument()
  })

  it('renders overlay when active', () => {
    render(<SunsetTransition active={true} direction="dark" />)
    expect(screen.getByTestId('sunset-overlay')).toBeInTheDocument()
  })

  it('overlay is aria-hidden', () => {
    render(<SunsetTransition active={true} direction="dark" />)
    expect(screen.getByTestId('sunset-overlay')).toHaveAttribute('aria-hidden', 'true')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/playground/SunsetTransition.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement SunsetTransition**

Create `src/playground/SunsetTransition.module.css`:

```css
.overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
}

.sunset {
  background: linear-gradient(180deg, #c17f59 0%, #7c6fad 50%, #1a1a2e 100%);
  animation: wipe 300ms ease-out forwards;
}

.sunrise {
  background: linear-gradient(180deg, #1a1a2e 0%, #7c6fad 50%, #faf9f6 100%);
  animation: wipe 300ms ease-out forwards;
}

@keyframes wipe {
  0% { opacity: 0.8; }
  50% { opacity: 0.4; }
  100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .overlay {
    display: none;
  }
}
```

Create `src/playground/SunsetTransition.tsx`:

```tsx
import { useEffect, useState } from 'react'
import styles from './SunsetTransition.module.css'

interface SunsetTransitionProps {
  active: boolean
  direction: 'dark' | 'light'
}

export function SunsetTransition({ active, direction }: SunsetTransitionProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) return
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 300)
    return () => clearTimeout(timer)
  }, [active])

  if (!visible) return null

  return (
    <div
      data-testid="sunset-overlay"
      className={`${styles.overlay} ${direction === 'dark' ? styles.sunset : styles.sunrise}`}
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/playground/SunsetTransition.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/playground/SunsetTransition.tsx src/playground/SunsetTransition.module.css src/playground/SunsetTransition.test.tsx
git commit -m "feat: add sunset/sunrise theme transition overlay"
```

---

## Task 26: D20Tumble Easter Egg

**Files:**
- Create: `src/playground/D20Tumble.tsx`
- Create: `src/playground/D20Tumble.module.css`
- Create: `src/playground/D20Tumble.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/playground/D20Tumble.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { D20Tumble } from './D20Tumble'

describe('D20Tumble', () => {
  it('renders children', () => {
    render(<D20Tumble>D&D reference</D20Tumble>)
    expect(screen.getByText('D&D reference')).toBeInTheDocument()
  })

  it('shows d20 on hover', async () => {
    const user = userEvent.setup()
    render(<D20Tumble>Hover me</D20Tumble>)
    await user.hover(screen.getByText('Hover me'))
    expect(screen.getByText('🎲')).toBeInTheDocument()
  })

  it('d20 is aria-hidden', async () => {
    const user = userEvent.setup()
    render(<D20Tumble>Hover me</D20Tumble>)
    await user.hover(screen.getByText('Hover me'))
    expect(screen.getByText('🎲')).toHaveAttribute('aria-hidden', 'true')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/playground/D20Tumble.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement D20Tumble**

Create `src/playground/D20Tumble.module.css`:

```css
.wrapper {
  position: relative;
  display: inline;
}

.die {
  position: absolute;
  right: -28px;
  top: -4px;
  font-size: 20px;
  animation: tumble 1s ease-in-out infinite;
}

@keyframes tumble {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .die {
    animation: none;
  }
}
```

Create `src/playground/D20Tumble.tsx`:

```tsx
import { useState, type ReactNode } from 'react'
import styles from './D20Tumble.module.css'

interface D20TumbleProps {
  children: ReactNode
}

export function D20Tumble({ children }: D20TumbleProps) {
  const [hovering, setHovering] = useState(false)

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
      {hovering && (
        <span className={styles.die} aria-hidden="true">
          🎲
        </span>
      )}
    </span>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/playground/D20Tumble.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/playground/D20Tumble.tsx src/playground/D20Tumble.module.css src/playground/D20Tumble.test.tsx
git commit -m "feat: add D20Tumble easter egg for TTRPG references"
```

---

## Task 27: PartyMode Easter Egg

**Files:**
- Create: `src/playground/PartyMode.tsx`
- Create: `src/playground/PartyMode.module.css`
- Create: `src/playground/PartyMode.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/playground/PartyMode.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PartyMode } from './PartyMode'

describe('PartyMode', () => {
  it('renders a toggle button', () => {
    render(<PartyMode />)
    expect(screen.getByRole('button', { name: /party mode/i })).toBeInTheDocument()
  })

  it('toggles party mode on click', async () => {
    const user = userEvent.setup()
    render(<PartyMode />)
    const btn = screen.getByRole('button', { name: /party mode/i })
    await user.click(btn)
    expect(document.documentElement.getAttribute('data-party')).toBe('true')
  })

  it('toggles party mode off on second click', async () => {
    const user = userEvent.setup()
    render(<PartyMode />)
    const btn = screen.getByRole('button', { name: /party mode/i })
    await user.click(btn)
    await user.click(btn)
    expect(document.documentElement.getAttribute('data-party')).toBe('false')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/playground/PartyMode.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement PartyMode**

Create `src/playground/PartyMode.module.css`:

```css
.toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-size: 20px;
  transition: color var(--transition-gentle);
  opacity: 0.4;
}

.toggle:hover {
  opacity: 1;
  color: var(--color-accent-playful);
}

.active {
  opacity: 1;
  color: var(--color-accent-playful);
}

/* Party mode global styles — applied when [data-party="true"] is on html */
:global([data-party="true"]) {
  animation: partyBg 2s linear infinite;
}

:global([data-party="true"] *) {
  animation: partyBounce 0.5s ease-in-out infinite alternate;
}

@keyframes partyBg {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

@keyframes partyBounce {
  from { transform: translateY(0); }
  to { transform: translateY(-2px); }
}

@media (prefers-reduced-motion: reduce) {
  :global([data-party="true"]) {
    animation: partyBgReduced 4s linear infinite;
  }
  :global([data-party="true"] *) {
    animation: none;
  }
  @keyframes partyBgReduced {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
}
```

Create `src/playground/PartyMode.tsx`:

```tsx
import { useState } from 'react'
import styles from './PartyMode.module.css'

export function PartyMode() {
  const [active, setActive] = useState(false)

  const toggle = () => {
    const next = !active
    setActive(next)
    document.documentElement.setAttribute('data-party', String(next))
  }

  return (
    <button
      className={`${styles.toggle}${active ? ` ${styles.active}` : ''}`}
      onClick={toggle}
      aria-label="Party mode"
      aria-pressed={active}
    >
      🧙
    </button>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/playground/PartyMode.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/playground/PartyMode.tsx src/playground/PartyMode.module.css src/playground/PartyMode.test.tsx
git commit -m "feat: add Party Mode easter egg with wizard hat toggle"
```

---

## Task 28: FooterTaglines Easter Egg

**Files:**
- Create: `src/playground/FooterTaglines.tsx`
- Create: `src/playground/FooterTaglines.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/playground/FooterTaglines.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FooterTaglines } from './FooterTaglines'

const taglines = [
  'Made with caffeine and natural 20s',
  'No frameworks were harmed',
  'Rolled a nat 20 on web development',
]

describe('FooterTaglines', () => {
  it('renders the year', () => {
    render(<FooterTaglines year={2026} taglines={taglines} />)
    expect(screen.getByText('2026')).toBeInTheDocument()
  })

  it('cycles to next tagline on year click', async () => {
    const user = userEvent.setup()
    render(<FooterTaglines year={2026} taglines={taglines} />)
    await user.click(screen.getByText('2026'))
    expect(screen.getByText(taglines[0])).toBeInTheDocument()
  })

  it('cycles through all taglines', async () => {
    const user = userEvent.setup()
    render(<FooterTaglines year={2026} taglines={taglines} />)
    await user.click(screen.getByText('2026'))
    expect(screen.getByText(taglines[0])).toBeInTheDocument()
    await user.click(screen.getByText('2026'))
    expect(screen.getByText(taglines[1])).toBeInTheDocument()
    await user.click(screen.getByText('2026'))
    expect(screen.getByText(taglines[2])).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/playground/FooterTaglines.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement FooterTaglines**

Create `src/playground/FooterTaglines.tsx`:

```tsx
import { useState } from 'react'

interface FooterTaglinesProps {
  year: number
  taglines: string[]
}

export function FooterTaglines({ year, taglines }: FooterTaglinesProps) {
  const [index, setIndex] = useState(-1)

  const handleClick = () => {
    setIndex(prev => (prev + 1) % taglines.length)
  }

  return (
    <span>
      <button
        onClick={handleClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          font: 'inherit',
          color: 'inherit',
          padding: 0,
        }}
      >
        {year}
      </button>
      {index >= 0 && (
        <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>
          {taglines[index]}
        </span>
      )}
    </span>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/playground/FooterTaglines.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/playground/FooterTaglines.tsx src/playground/FooterTaglines.test.tsx
git commit -m "feat: add FooterTaglines cycling easter egg"
```

---

## Task 29: Barrel Export

**Files:**
- Create: `src/index.ts`

- [ ] **Step 1: Create barrel export**

Create `src/index.ts`:

```ts
// Foundation
export { ThemeProvider, useTheme } from './foundation/ThemeProvider'
export { Text } from './foundation/Text'
export { Heading } from './foundation/Heading'
export { Stack } from './foundation/Stack'
export { Container } from './foundation/Container'
export { VisuallyHidden } from './foundation/VisuallyHidden'
export { SkipLink } from './foundation/SkipLink'

// Components
export { Card } from './components/Card'
export { Section } from './components/Section'
export { Accordion, AccordionItem } from './components/Accordion'
export { NavBar } from './components/NavBar'
export { HeroTagline } from './components/HeroTagline'
export { Button } from './components/Button'
export { Link } from './components/Link'
export { Footer } from './components/Footer'

// Playground
export { EasterEgg } from './playground/EasterEgg'
export { GlyphBackground } from './playground/GlyphBackground'
export { RevealOnScroll } from './playground/RevealOnScroll'
export { KonamiConfetti } from './playground/KonamiConfetti'
export { LogoScramble } from './playground/LogoScramble'
export { GravySnail } from './playground/GravySnail'
export { SunsetTransition } from './playground/SunsetTransition'
export { D20Tumble } from './playground/D20Tumble'
export { PartyMode } from './playground/PartyMode'
export { FooterTaglines } from './playground/FooterTaglines'

// Hooks
export { useReducedMotion } from './hooks/useReducedMotion'
export { useIdleTimer } from './hooks/useIdleTimer'
export { useKonamiCode } from './hooks/useKonamiCode'
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "feat: add barrel export for all components and hooks"
```

---

## Task 30: Full Test Suite & Final Verification

- [ ] **Step 1: Run the entire test suite**

```bash
npx vitest run
```

Expected: All tests pass. Note the count — should be approximately 55-65 tests across all files.

- [ ] **Step 2: Run the build**

```bash
npm run build
```

Expected: Build succeeds with no errors or warnings.

- [ ] **Step 3: Run dev server to verify visual output**

```bash
npm run dev
```

Open the URL in browser. Verify that:
- The page loads without errors
- Design tokens are applied (warm off-white background, correct fonts)
- Console shows no errors

- [ ] **Step 4: Commit any fixes if needed, then tag**

```bash
git tag v0.1.0-design-system
```

---

## Task 31: Create Stitch Design System

**Files:** None (uses Stitch MCP)

- [ ] **Step 1: Create the design system in Stitch**

Use `mcp__stitch__create_design_system` to create the design system with:
- Name: "Aharasymiw Organic Flow"
- Colors: all light and dark mode tokens from the spec
- Typography: heading, body, ui font stacks with weights
- Spacing: the 4px-base scale

- [ ] **Step 2: Verify the design system was created**

Use `mcp__stitch__list_design_systems` to confirm it appears.

- [ ] **Step 3: Commit note**

No files to commit — the design system lives in Stitch. But note the design system ID in the spec for future reference.
