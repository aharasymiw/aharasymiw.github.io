# Design System for aharasymiw.com

## Overview

A design system and React component library for Andrew Harasymiw's personal promotional site at aharasymiw.com. The site serves as a professional and personal profile with an advocate-first identity — "let's build together" energy.

**Core feelings (in priority order):** invitation, calm, safety, curiosity, minimalism, whimsy.

**Approach:** Organic Flow — flexible, composition-based design system with "zones" (calm, warm, playful) and a dedicated playground layer for easter eggs. Components are building blocks, not rigid templates.

**Tech stack:** React (Vite, no Next.js). CSS custom properties for design tokens. No CSS framework.

---

## Design Tokens

### Color — Light Mode (Warm Earth)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#faf9f6` | Page background (warm off-white) |
| `--color-bg-elevated` | `#f0ede8` | Cards, elevated surfaces |
| `--color-bg-subtle` | `#e8e4df` | Borders, dividers |
| `--color-text` | `#2c2c2c` | Primary text (warm near-black) |
| `--color-text-muted` | `#6b6b6b` | Secondary text |
| `--color-accent-green` | `#4a6741` | Sage — calm, safety zone |
| `--color-accent-warm` | `#c17f59` | Terracotta — invitation, warmth zone |
| `--color-accent-playful` | `#7c6fad` | Muted violet — curiosity, whimsy zone |
| `--color-focus-ring` | `#7c6fad` | Focus indicators |

### Color — Dark Mode (Deep Ocean)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#1a1a2e` | Page background (deep indigo-navy) |
| `--color-bg-elevated` | `#222240` | Cards, elevated surfaces |
| `--color-bg-subtle` | `#2a2a45` | Borders, dividers |
| `--color-text` | `#f0ece2` | Primary text (warm off-white) |
| `--color-text-muted` | `#b8b8c4` | Secondary text |
| `--color-accent-green` | `#7c9a92` | Muted teal — shifted for contrast |
| `--color-accent-warm` | `#f0c27a` | Warm gold — shifted for contrast |
| `--color-accent-playful` | `#b89adb` | Lighter violet — shifted for contrast |
| `--color-focus-ring` | `#b89adb` | Focus indicators |

All accent/background pairs are pre-validated for WCAG AA contrast. Body text targets AAA (7:1).

### Typography

| Token | Value |
|---|---|
| `--font-heading` | `'Gill Sans', 'Avenir Next', 'Avenir', sans-serif` |
| `--font-body` | `Georgia, 'Times New Roman', serif` |
| `--font-ui` | `system-ui, -apple-system, 'Segoe UI', sans-serif` |

Headings use weight 300 (light). The inverted pairing — light sans headings with serif body — creates an open, inviting feel with warmth in longer reading.

### Type Scale

| Token | Size |
|---|---|
| `--text-xs` | `0.75rem` |
| `--text-sm` | `0.875rem` |
| `--text-base` | `1rem` |
| `--text-lg` | `1.125rem` |
| `--text-xl` | `1.25rem` |
| `--text-2xl` | `1.75rem` |
| `--text-3xl` | `2.5rem` |

### Spacing

4px base unit. Scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` (px).

Tokens: `--space-1` through `--space-9`.

### Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--radius-lg` | `12px` |

### Transitions

| Token | Value |
|---|---|
| `--transition-gentle` | `200ms ease` |
| `--transition-reveal` | `400ms ease-out` |

---

## Component Library

### Foundation Layer (Primitives)

**1. ThemeProvider**
- Wraps the app, manages light/dark mode
- Respects `prefers-color-scheme` as default, persists user choice to localStorage
- Listens for real-time system changes
- Applies CSS custom properties to `:root`

**2. Text**
- Polymorphic component (`as` prop for semantic element)
- Variants: `body` (default, serif), `muted`, `label` (uppercase sans, small), `ui` (system font)

**3. Heading**
- Renders h1–h6 with heading font
- `level` prop for semantic level, `size` prop for visual size (decoupled)
- Weight 300

**4. Stack**
- Vertical/horizontal flex layout
- `gap` prop maps to spacing tokens
- `direction`, `align`, `justify` props

**5. Container**
- Max-width centered content wrapper
- Responsive padding at breakpoints

**6. VisuallyHidden**
- Screen-reader-only text, visually hidden

**7. SkipLink**
- Skip-to-main-content link, visible on focus

### Component Layer (Building Blocks)

**8. Card**
- Elevated background (`--color-bg-elevated`)
- Rounded corners (`--radius-lg`)
- Optional subtle gradient overlay
- Optional background glyph (oversized serif character, low opacity)
- Slots: header, body, footer

**9. Section**
- Content block with optional zone coloring (calm/warm/playful)
- Handles scroll-reveal animation via RevealOnScroll
- Maps to semantic `<section>` element

**10. Accordion**
- Progressive disclosure component
- Animated expand/collapse (200ms ease)
- Keyboard accessible: Enter/Space to toggle, arrow keys between items
- ARIA: `aria-expanded`, `aria-controls`, `role="region"`

**11. NavBar**
- Responsive: horizontal links at desktop, hamburger menu at mobile (slides in from right)
- Link text uses `--font-ui` (system sans) for clear navigation
- Current page indicated by colored underline (sage green)
- Theme toggle (sun/moon icon) at end of nav
- Hover: underline grows from center

**12. HeroTagline**
- Homepage hero component
- Tagline text + 3 Card components (Who / What / How)
- Cards have colored category labels (green, terracotta, violet)
- Responsive: 3-column at desktop, stacked at mobile

**13. Button**
- Variants: `primary` (terracotta fill in light, gold fill in dark), `secondary` (outline), `ghost` (text only)
- Focus ring uses playful violet
- Minimum touch target: 44x44px

**14. Link**
- Styled anchor with underline animation on hover (grows from center)
- External link indicator for off-site URLs
- Proper `rel="noopener noreferrer"` for external links

**15. Footer**
- Contact links, social links, copyright
- Compact layout

### Playground Layer (Whimsy & Easter Eggs)

**16. EasterEgg**
- Wrapper component that activates hidden content based on triggers
- Trigger types: click count, hover duration, key sequence, scroll position, idle time
- Invisible until triggered — no layout impact
- Announcements via `aria-live` region

**17. GlyphBackground**
- Decorative oversized serif characters behind content
- Low opacity, `aria-hidden="true"`
- Optional subtle parallax (disabled with `prefers-reduced-motion`)

**18. RevealOnScroll**
- Intersection observer wrapper
- Children fade up (12px translate + opacity) when scrolled into view
- Configurable direction and stagger delay (100ms default between siblings)
- Instant with `prefers-reduced-motion`

---

## Easter Eggs

All easter eggs are visual-only enhancements. None block functionality. All respect `prefers-reduced-motion`.

**1. Konami Code (↑↑↓↓←→←→BA)**
- Triggers a confetti burst in accent colors (sage, terracotta, violet)
- Disappears after 3 seconds
- `aria-live` announcement: "New Achievement!: 'Caught Red Handed'"

**2. Logo Click (5x rapid)**
- Name text in the nav briefly scrambles its letters and snaps back (like it got surprised)
- Quick animation, ~500ms total

**3. Gravy the Snail (Idle)**
- After 60 seconds of no interaction, a tiny animated snail named Gravy appears at one edge of the viewport
- Moves extremely slowly across the screen
- Leaves a trail of chaos in his wake: scattered glyphs, flipped text, color glitches
- If Gravy reaches the other side: redirects to `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- When idle resets (user moves/clicks/types): Gravy melts away and his chaos trail fades out gracefully
- Gravy and trail are `aria-hidden="true"`
- With `prefers-reduced-motion`: Gravy appears stationary, no trail, no movement

**4. Dark Mode Sunset/Sunrise**
- Theme toggle triggers a brief color wipe across the page (200–300ms)
- Sunset (warm → cool) when switching to dark, sunrise (cool → warm) for light
- Skipped with `prefers-reduced-motion`

**5. TTRPG d20**
- Hovering over D&D references in the Community page makes a d20 gently tumble in the margin
- CSS animation, `aria-hidden="true"`

**6. Party Mode**
- D&D Beyond-style party mode toggle
- Uses the D&D Beyond wizard hat icon
- Toggles disco colors, flashing accents, bouncing text
- Discoverable but not obvious — placed somewhere explorers will find it
- With `prefers-reduced-motion`: colors shift but nothing bounces or flashes

**7. Footer Taglines**
- Clicking the copyright year cycles through fun alternates:
  - "Made with caffeine and natural 20s"
  - "No frameworks were harmed"
  - (more to be written during implementation)

---

## Page Architecture

### Pages

| Page | Content | Source pages consolidated |
|---|---|---|
| **Homepage** | Hero tagline + 3 cards above fold. Below: expandable accordion sections for highlights. "Go deeper" links to spoke pages. | index.html |
| **Portfolio** | Timeline layout for work history + card grid for projects. The "proof" page. | work.html, projects.html |
| **Speaking & Education** | Talk list, teaching philosophy, bootcamp highlights. Advocacy identity. | talks.html, teaching.html |
| **Community** | Toastmasters, TTRPGs, community organizing. The personal side. Good easter egg territory. | toastmasters.html, ttrpgs.html |
| **Connect** | Contact info, social links, "what I'm looking for" statement. Also appears as footer on every page. | (new) |

### Navigation

- **Desktop:** Horizontal nav bar. 5 items: Home, Portfolio, Speaking, Community, Connect. UI font for link text. Theme toggle at end.
- **Mobile:** Hamburger menu, slides in from right. Same items.
- **Current page:** Indicated by sage green underline.
- **Hover:** Underline grows from center, 200ms.

### Progressive Disclosure Flow

1. Visitor lands → tagline + 3 cards visible without scrolling
2. Scroll → sections reveal with gentle fade-up
3. Each section has accordion → click to expand details
4. Bottom of each accordion → link to dedicated page for full content
5. Dedicated pages have full depth

---

## Accessibility

Accessibility is a first-class concern across the entire system.

### Color & Contrast
- All text meets WCAG AA minimum (4.5:1 body, 3:1 large text)
- Body text targets AAA (7:1)
- Every token pair pre-validated in both light and dark modes
- Color is never the sole indicator of meaning

### Focus Management
- Visible violet focus ring (`--color-focus-ring`) on all interactive elements
- Focus order follows DOM order
- SkipLink component for skip-to-main-content

### Keyboard Navigation
- All components fully keyboard operable
- Accordion: Enter/Space to toggle, arrow keys between items
- NavBar: Tab between items, Enter to follow links
- Easter eggs: Konami code is keyboard-native; party mode toggle is focusable

### Screen Readers
- Semantic HTML throughout (proper heading hierarchy, landmarks, lists)
- ARIA labels where visual context is insufficient (theme toggle, accordion states, nav landmarks)
- Easter egg announcements via `aria-live` regions
- Decorative content (`GlyphBackground`, Gravy's chaos trail) marked `aria-hidden="true"`

### Motion
- All animation respects `prefers-reduced-motion: reduce`
- Scroll reveals become instant opacity transitions (no transform)
- Gravy appears stationary with no trail
- Party mode shifts colors without animation
- Sunset/sunrise wipe skipped entirely

### Touch
- Minimum 44x44px touch targets on all interactive elements

### Theme
- Persists to localStorage
- Falls back to `prefers-color-scheme`
- Listens for real-time system preference changes

---

## Stitch MCP Integration

The design system will be created in Stitch as a reusable design system, then screens will be generated from it. The Stitch design system will define:

- Color tokens (light and dark modes)
- Typography styles (heading, body, ui)
- Spacing scale
- Component patterns

This serves as the source of truth that bridges design and implementation.
