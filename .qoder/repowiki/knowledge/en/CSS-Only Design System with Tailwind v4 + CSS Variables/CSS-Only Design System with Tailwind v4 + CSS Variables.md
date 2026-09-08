---
kind: frontend_style
name: CSS-Only Design System with Tailwind v4 + CSS Variables
category: frontend_style
scope:
    - '**'
source_files:
    - app/globals.css
    - postcss.config.mjs
    - package.json
---

## Approach

The portfolio uses a **pure CSS styling approach** built on top of **Tailwind CSS v4** (via `@tailwindcss/postcss` in `postcss.config.mjs`). There is no SCSS, Sass, styled-components, CSS-in-JS, or utility-first class composition beyond the single `@import "tailwindcss";` directive. All visual design lives in one large stylesheet: `app/globals.css` (~3000 lines).

## Design Tokens

A small set of CSS custom properties in `:root` defines the palette and typography:
- Accent colors: `--blue: #70d6ff`, `--pink: #ff70a6`, `--orange: #ff9770`, `--gold: #ffd670`, `--lime: #e9ff70`
- Base colors: `--cream: #fffdf8` (background), `--text: #222222` (foreground)
- Font stack: `var(--font-geist-sans), Arial, Helvetica, sans-serif` (the Geist font is provided by Next.js)

These variables are reused throughout the stylesheet for consistent theming (progress bar gradients, avatar body, chair seat, orb elements, etc.).

## Architecture & Conventions

- **Single global stylesheet**: All styles are declared in `app/globals.css`, imported at the top via `@import "tailwindcss"`. There are no component-scoped CSS files, no CSS modules, and no per-component style imports.
- **BEM-like naming without preprocessor**: Class names follow a flat, descriptive convention (e.g., `.loading-screen`, `.sun-wrapper`, `.sun`, `.sun-glow`, `.prototype-room`, `.workspace-desk-top`, `.mini-emaan`) rather than strict BEM. Components that share structure reuse similar suffixes (`-top`, `-leg`, `-left`, `-right`, `-one`, `-two`).
- **Sectioned layout**: The stylesheet is organized into clearly commented sections using `/* ======================================== ... ======================================== */` blocks — Loading Screen, Sun, Progress Bar, Sparkles, Sprout, Hero Placeholder, Animations, Scroll Story, Prototype Room, Whimsy World, Workspace Scene, Mini Emaan, Desk, Monitor, Keyboard, Plant, Chair, First 3D Experiment.
- **Responsive strategy**: A single breakpoint at `max-width: 900px` is used to adjust layout for mobile. It repositions story intro text, scales down the prototype room / desk / chair / mini-emaan via `transform: scale(...)`, and adjusts font sizes with `clamp()` for fluid typography.
- **Typography**: Uses `clamp()` extensively for responsive headings (e.g., `clamp(50px, 9vw, 110px)`, `clamp(65px, 8vw, 120px)`). Body text uses monospace for labels and hints at 11px with wide letter-spacing (`letter-spacing: 0.14em–0.2em`).
- **Visual style**: Pastel, playful aesthetic with radial-gradient backgrounds, soft shadows, rounded corners (`border-radius: 15px–45%`), and animated elements (floating sun, pulsing glow, blinking cursor, bouncing scroll arrows, growing sprout). Illustrative characters and furniture are drawn entirely with CSS shapes (borders, border-radius, box-shadows).
- **Animation system**: Custom `@keyframes` defined inline (`loadingProgress`, `sunFloat`, `pulseGlow`, `sparkle`, `blink`, `growStem`, `growLeaf`, `loadingExit`, `heroEnter`, `scrollBounce`, `workspaceArrow`, `terminalBlink`). No animation library is used for CSS animations; GSAP/Framer Motion are only referenced as JS dependencies for scroll-driven orchestration.
- **No Tailwind utility classes in markup**: Despite Tailwind v4 being configured, the codebase does not appear to use Tailwind utility classes in JSX — styling is exclusively done through the global CSS file. This means Tailwind's presence is effectively just the base import.

## Constraints & Enforced Rules

- **No scoped/component CSS**: Styles are global; there is no mechanism preventing class-name collisions.
- **Single breakpoint policy**: Only `@media (max-width: 900px)` is used for responsiveness — no tablet-specific breakpoints or container queries.
- **Palette discipline**: All brand colors go through the `--blue/--pink/--orange/--gold/--lime` variables; hard-coded color literals are avoided where the tokens exist.
- **Font usage**: Primary typeface is Geist (via Next.js `--font-geist-sans`); monospace is reserved for small labels, hints, and terminal-style content.