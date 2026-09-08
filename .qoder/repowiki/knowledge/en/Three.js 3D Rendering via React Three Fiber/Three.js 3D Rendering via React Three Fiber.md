---
kind: external_dependency
name: Three.js 3D Rendering via React Three Fiber
slug: threejs-react-three-fiber
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
---

All 3D content (room, desk, chair, avatar, cat, whimsical world) is built with Three.js through React Three Fiber (`@react-three/fiber`) and Drei helpers under `components/three/`. The scene is mounted inside a Next.js page and driven by scroll position. Blockbench `.bbmodel` files are NOT loaded directly — the avatar is procedural; swapping in an exported `.glb` would use `useGLTF` from Drei.