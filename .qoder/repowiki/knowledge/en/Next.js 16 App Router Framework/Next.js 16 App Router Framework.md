---
kind: external_dependency
name: Next.js 16 App Router Framework
slug: nextjs
category: external_dependency
category_hints:
    - vendor_identity
scope:
    - '**'
---

The project is a Next.js 16 application using the App Router (`app/` directory). It serves as the runtime and build system for the 3D animated portfolio, providing file-based routing (including `app/project/[slug]/page.js` for dynamic project detail pages) and static pre-rendering via `generateStaticParams`. Deployment target documented in README is Vercel.