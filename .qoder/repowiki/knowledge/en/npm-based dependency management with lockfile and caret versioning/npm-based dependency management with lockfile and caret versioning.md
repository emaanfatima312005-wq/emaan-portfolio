---
kind: dependency_management
name: npm-based dependency management with lockfile and caret versioning
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - package-lock.json
---

## What system/approach is used

This Next.js portfolio project uses **npm** as its package manager, declared via a `package.json` manifest at the repository root. Dependency resolution and reproducibility are handled by a `package-lock.json` lockfile (lockfileVersion 3), which pins every transitive dependency to an exact resolved version and integrity hash from the public npm registry (`https://registry.npmjs.org/`). There is no vendored `node_modules` directory committed to the repo; dependencies are installed on demand.

## Key files and packages

- `package.json` — declares runtime dependencies (`next`, `react`, `react-dom`, `gsap`, `@gsap/react`, `framer-motion`, `lenis`, `three`, `@react-three/fiber`, `@react-three/drei`) and dev dependencies (`eslint`, `eslint-config-next`, `tailwindcss`, `@tailwindcss/postcss`). Scripts provide `dev`, `build`, `start`, and `lint` commands that wrap these tools.
- `package-lock.json` — the authoritative lockfile that records exact versions, resolutions, and SHA integrity digests for all direct and transitive dependencies, ensuring deterministic installs across environments.
- `.gitignore` — implicitly excludes `node_modules/` (standard npm convention), so the lockfile alone governs reproducible builds.

## Architecture and conventions

- **Public npm registry only**: All dependencies resolve against the default npm registry; there is no private registry, proxy, or scoped registry configured in this project.
- **Caret (`^`) version ranges for most libraries**: Third-party libraries use caret ranges (e.g., `gsap ^3.15.0`, `three ^0.185.1`, `framer-motion ^13.2.0`), allowing patch and minor updates while blocking breaking major bumps. This balances stability with access to new features.
- **Exact versions for framework-aligned packages**: Core framework packages pin exact versions — `next` at `16.3.4`, `react` at `19.2.8`, `react-dom` at `19.2.8`, and `eslint-config-next` at `16.3.4` — to keep the React/Next.js toolchain tightly coupled and avoid peer-dependency mismatches.
- **Dev vs runtime separation**: Build-time tooling (`eslint`, `tailwindcss`, `@tailwindcss/postcss`) is isolated under `devDependencies`, keeping production bundles free of development-only code.
- **No custom npm configuration**: No `.npmrc`, `.yarnrc`, or other registry/auth configuration files are present; installation relies on the user's global npm settings.

## Conventions and constraints

- The lockfile (`package-lock.json`) is the source of truth for installed versions; any change to `package.json` should be followed by regenerating the lockfile to keep CI and local installs deterministic.
- Version bumps follow semantic versioning through caret ranges for third-party libraries, while core framework packages are pinned exactly to prevent unexpected incompatibilities between Next.js, React, and ESLint config.
- Dependencies are not vendored into the repository; `node_modules` is excluded via `.gitignore`, so reproducible builds depend on the lockfile being committed alongside `package.json`.