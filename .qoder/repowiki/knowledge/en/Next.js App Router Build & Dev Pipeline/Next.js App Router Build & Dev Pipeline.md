---
kind: build_system
name: Next.js App Router Build & Dev Pipeline
category: build_system
scope:
    - '**'
source_files:
    - package.json
    - next.config.mjs
    - eslint.config.mjs
    - postcss.config.mjs
    - jsconfig.json
---

This repository is a Next.js 16 portfolio site and uses the framework's built-in build system rather than a custom Makefile or CI pipeline. All build, dev, lint, and start commands are declared in `package.json` scripts and delegated to Next.js CLI tooling.

**Build tools and scripts**
- `npm run dev` → `next dev` (development server with HMR)
- `npm run build` → `next build` (production build producing `.next/` output)
- `npm run start` → `next start` (serves the production build)
- `npm run lint` → `eslint` (runs ESLint via `eslint.config.mjs`)

There are no custom shell scripts, Dockerfiles, Makefiles, or CI configuration files in the repository; artifact generation and serving are entirely handled by Next.js.

**Configuration files**
- `next.config.mjs` — Next.js config object currently exported as an empty default (`{}`), meaning the project runs with Next.js defaults (no custom webpack overrides, image domains, rewrites, etc.).
- `postcss.config.mjs` — registers `@tailwindcss/postcss` as the PostCSS plugin, so Tailwind CSS v4 processes styles during both dev and build.
- `eslint.config.mjs` — flat config that extends `eslint-config-next/core-web-vitals` and explicitly un-ignores `.next/**`, `out/**`, `build/**`, and `next-env.d.ts` so generated artifacts are linted alongside source.
- `jsconfig.json` — present for JS/TS path/project settings used by the editor and Next.js.

**Dependencies driving the build**
- Runtime: `next` 16.3.4, `react` 19.2.8, `react-dom` 19.2.8, plus GSAP, Framer Motion, Lenis, and React Three Fiber / Three.js for 3D scenes.
- Dev-time: `eslint` 9, `eslint-config-next` 16.3.4, `tailwindcss` 4, `@tailwindcss/postcss` 4.

**Output and conventions**
- Development output and cache live under `.next/` (also ignored from lint per the eslint config).
- Production builds go through `next build`; the resulting bundle is served by `next start`. No separate staging/prod environments or containerization are defined in this repo.
- Versioning is a simple static `0.1.0` in `package.json` with no release automation or changelog script.