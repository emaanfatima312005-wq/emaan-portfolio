# Performance Optimization

<cite>
**Referenced Files in This Document**
- [ThreeWorkspace.jsx](file://components/three/ThreeWorkspace.jsx)
- [WhimsyWorld.jsx](file://components/three/WhimsyWorld.jsx)
- [Avatar.jsx](file://components/three/Avatar.jsx)
- [Room.jsx](file://components/three/Room.jsx)
- [Cat.jsx](file://components/three/Cat.jsx)
- [Desk.jsx](file://components/three/Desk.jsx)
- [SmoothScroll.jsx](file://components/SmoothScroll.jsx)
- [ScrollStory.jsx](file://components/ScrollStory.jsx)
- [layout.js](file://app/layout.js)
- [page.js](file://app/page.js)
- [next.config.mjs](file://next.config.mjs)
- [package.json](file://package.json)
</cite>

## Table of Contents
1. Introduction
2. Project Structure
3. Core Components
4. Architecture Overview
5. Detailed Component Analysis
6. Dependency Analysis
7. Performance Considerations
8. Troubleshooting Guide
9. Conclusion
10. Appendices

## Introduction
This document explains the performance optimization strategies used throughout the portfolio application, focusing on 3D rendering with Three.js and React Three Fiber, animation performance with GSAP, memory management for 3D objects, bundle size considerations, and Next.js-specific optimizations such as code splitting, image optimization, and font loading. It also provides monitoring techniques, profiling tools, and best practices to maintain smooth performance across devices and browsers.

## Project Structure
The project is a Next.js application that renders a scroll-driven 3D scene using React Three Fiber and integrates GSAP animations for camera movement and UI transitions. Key areas impacting performance include:
- The 3D canvas configuration and scene composition
- Animation hooks and scroll-triggered updates
- Smooth scrolling integration
- Font loading via Next.js fonts
- Client-only components and lazy initialization patterns

```mermaid
graph TB
A["Next.js App<br/>app/layout.js"] --> B["Root Layout<br/>Font Loading"]
A --> C["Home Page<br/>app/page.js"]
C --> D["Scroll Story<br/>components/ScrollStory.jsx"]
D --> E["Smooth Scroll<br/>components/SmoothScroll.jsx"]
D --> F["3D Workspace<br/>components/three/ThreeWorkspace.jsx"]
F --> G["Scene & Lights<br/>ThreeWorkspace.jsx"]
F --> H["Room<br/>components/three/Room.jsx"]
F --> I["Avatar<br/>components/three/Avatar.jsx"]
F --> J["Whimsy World<br/>components/three/WhimsyWorld.jsx"]
F --> K["Desk / Chair / Cat<br/>components/three/*.jsx"]
```

**Diagram sources**
- [layout.js:1-55](file://app/layout.js#L1-L55)
- [page.js:1-60](file://app/page.js#L1-L60)
- [ScrollStory.jsx:1-70](file://components/ScrollStory.jsx#L1-L70)
- [SmoothScroll.jsx:1-47](file://components/SmoothScroll.jsx#L1-L47)
- [ThreeWorkspace.jsx:1-186](file://components/three/ThreeWorkspace.jsx#L1-L186)
- [Room.jsx:1-64](file://components/three/Room.jsx#L1-L64)
- [Avatar.jsx:1-164](file://components/three/Avatar.jsx#L1-L164)
- [WhimsyWorld.jsx:1-76](file://components/three/WhimsyWorld.jsx#L1-L76)
- [Desk.jsx:39-81](file://components/three/Desk.jsx#L39-L81)
- [Cat.jsx:1-40](file://components/three/Cat.jsx#L1-L40)

**Section sources**
- [layout.js:1-55](file://app/layout.js#L1-L55)
- [page.js:1-60](file://app/page.js#L1-L60)
- [ScrollStory.jsx:1-70](file://components/ScrollStory.jsx#L1-L70)
- [SmoothScroll.jsx:1-47](file://components/SmoothScroll.jsx#L1-L47)
- [ThreeWorkspace.jsx:1-186](file://components/three/ThreeWorkspace.jsx#L1-L186)

## Core Components
- Three.js Canvas and DPR: The canvas sets a capped device pixel ratio range to balance visual quality and GPU load.
- Selective Scene Updates: Animations are driven by GSAP ScrollTrigger and useFrame only when needed; some groups are hidden until visible.
- Efficient Geometry: Simple box and plane geometries are reused via small helper components to reduce overhead.
- Lightweight Materials: Standard materials with minimal properties; basic materials used where shading is unnecessary.
- Smooth Scrolling Integration: Lenis is initialized once and tied to GSAP ticker for consistent frame pacing.
- Font Loading: Google Fonts loaded via Next.js fonts with subsets to minimize payload.

**Section sources**
- [ThreeWorkspace.jsx:168-186](file://components/three/ThreeWorkspace.jsx#L168-L186)
- [WhimsyWorld.jsx:34-76](file://components/three/WhimsyWorld.jsx#L34-L76)
- [Room.jsx:1-64](file://components/three/Room.jsx#L1-L64)
- [Avatar.jsx:1-164](file://components/three/Avatar.jsx#L1-L164)
- [SmoothScroll.jsx:1-47](file://components/SmoothScroll.jsx#L1-L47)
- [layout.js:1-55](file://app/layout.js#L1-L55)

## Architecture Overview
The runtime flow combines scroll-driven UI animations with a 3D scene whose camera and objects move in sync. GSAP orchestrates both DOM and 3D transforms through ScrollTrigger, while React Three Fiber manages the render loop and scene graph.

```mermaid
sequenceDiagram
participant User as "User"
participant Scroll as "Lenis + GSAP ScrollTrigger"
participant UI as "DOM (ScrollStory)"
participant R3F as "React Three Fiber"
participant Scene as "Three.js Scene"
User->>Scroll : Scroll page
Scroll-->>UI : Update scroll progress
Scroll-->>R3F : Trigger GSAP timeline updates
R3F->>Scene : Move camera / animate objects per frame
Scene-->>R3F : Render updated frame
R3F-->>UI : Sync UI state changes (waving/sitting)
```

**Diagram sources**
- [ScrollStory.jsx:13-34](file://components/ScrollStory.jsx#L13-L34)
- [ThreeWorkspace.jsx:23-98](file://components/three/ThreeWorkspace.jsx#L23-L98)
- [SmoothScroll.jsx:13-43](file://components/SmoothScroll.jsx#L13-L43)

## Detailed Component Analysis

### 3D Rendering Optimizations
- Device Pixel Ratio (DPR): The canvas uses a capped DPR range to prevent excessive pixel density on high-DPI screens, reducing GPU workload while maintaining acceptable sharpness.
- Shadow Configuration: Shadows are enabled with a reasonable shadow map size and camera bounds to avoid over-rendering.
- Selective Visibility: The whimsical world group becomes visible only after a scroll threshold, preventing unnecessary draw calls early in the experience.
- Minimal Geometry: Scenes rely on simple primitives (boxes, planes, circles) which are cheap to render and easy to batch.
- Material Choices: Basic materials are used for non-shaded elements; standard materials are limited to necessary meshes.

```mermaid
flowchart TD
Start(["Canvas Init"]) --> SetDPR["Set DPR range"]
SetDPR --> SetupLights["Configure lights and shadows"]
SetupLights --> BuildScene["Build scene graph"]
BuildScene --> ConditionalVisibility{"Is whimsy world visible?"}
ConditionalVisibility --> |No| SkipDraw["Skip draw calls for hidden group"]
ConditionalVisibility --> |Yes| DrawGroup["Render whimsy world"]
SkipDraw --> RenderLoop["Per-frame render"]
DrawGroup --> RenderLoop
RenderLoop --> End(["Frame Complete"])
```

**Diagram sources**
- [ThreeWorkspace.jsx:168-186](file://components/three/ThreeWorkspace.jsx#L168-L186)
- [WhimsyWorld.jsx:34-76](file://components/three/WhimsyWorld.jsx#L34-L76)

**Section sources**
- [ThreeWorkspace.jsx:126-186](file://components/three/ThreeWorkspace.jsx#L126-L186)
- [WhimsyWorld.jsx:1-76](file://components/three/WhimsyWorld.jsx#L1-L76)
- [Room.jsx:1-64](file://components/three/Room.jsx#L1-L64)

### Animation Performance Tuning with GSAP
- Scroll-driven Timeline: Camera and avatar movements are bound to scroll progress using ScrollTrigger with scrubbing for smooth, frame-synced motion.
- State-driven Animations: Avatar states (waving, sitting) are toggled based on scroll progress, minimizing per-frame logic.
- Ticker Integration: Smooth scrolling uses GSAP’s ticker to drive Lenis, ensuring consistent timing and reduced jank.
- Reduced Motion Respect: Smooth scroll duration adapts to user preferences for reduced motion.

```mermaid
sequenceDiagram
participant ST as "GSAP ScrollTrigger"
participant TL as "Timeline"
participant Cam as "Camera"
participant Av as "Avatar"
participant UI as "UI State"
ST->>TL : On scroll update
TL->>Cam : Animate position and target
TL->>Av : Animate walking bounce and pose
TL->>UI : Toggle waving/sitting flags
Note over Cam,UI : All updates synchronized to scroll progress
```

**Diagram sources**
- [ThreeWorkspace.jsx:23-98](file://components/three/ThreeWorkspace.jsx#L23-L98)
- [ThreeWorkspace.jsx:110-124](file://components/three/ThreeWorkspace.jsx#L110-L124)
- [SmoothScroll.jsx:13-43](file://components/SmoothScroll.jsx#L13-L43)

**Section sources**
- [ThreeWorkspace.jsx:23-98](file://components/three/ThreeWorkspace.jsx#L23-L98)
- [ThreeWorkspace.jsx:110-124](file://components/three/ThreeWorkspace.jsx#L110-L124)
- [SmoothScroll.jsx:13-43](file://components/SmoothScroll.jsx#L13-L43)

### Memory Management for 3D Objects
- Reusable Helpers: Small Box helpers encapsulate geometry and material creation to keep component trees lean.
- Refs for Animated Parts: Only animated subparts hold refs, avoiding unnecessary re-renders of entire hierarchies.
- Conditional Rendering: Groups like WhimsyWorld are hidden until needed, freeing resources during early scroll phases.
- Cleanup: Smooth scroll initializes once and cleans up event listeners and tickers on unmount.

```mermaid
classDiagram
class ThreeWorkspace {
+Canvas
+Scene()
+ScrollCamera()
}
class Scene {
+lights
+Room()
+Avatar()
+Desk()
+Chair()
+Cat()
+WhimsyWorld()
}
class WhimsyWorld {
+visible
+FloatingOrb[]
}
ThreeWorkspace --> Scene : "renders"
Scene --> WhimsyWorld : "conditionally visible"
```

**Diagram sources**
- [ThreeWorkspace.jsx:104-186](file://components/three/ThreeWorkspace.jsx#L104-L186)
- [WhimsyWorld.jsx:34-76](file://components/three/WhimsyWorld.jsx#L34-L76)

**Section sources**
- [ThreeWorkspace.jsx:104-186](file://components/three/ThreeWorkspace.jsx#L104-L186)
- [WhimsyWorld.jsx:1-76](file://components/three/WhimsyWorld.jsx#L1-L76)
- [SmoothScroll.jsx:13-43](file://components/SmoothScroll.jsx#L13-L43)

### Bundle Size Optimization
- Client Components: 3D and animation-heavy components are marked as client components, enabling Next.js to split server and client bundles appropriately.
- Library Usage: Dependencies include GSAP, React Three Fiber, Drei, and Three.js; ensure only required features are imported to keep bundles lean.
- No heavy textures or models: The scene uses procedural geometry and colors, avoiding large asset downloads.

**Section sources**
- [ThreeWorkspace.jsx:1-186](file://components/three/ThreeWorkspace.jsx#L1-L186)
- [package.json:11-22](file://package.json#L11-L22)

### Next.js Specific Optimizations
- Code Splitting: Using “use client” directives ensures heavy interactive modules are split into client bundles.
- Image Optimization: While no images are currently used in the 3D scene, Next.js image optimization can be leveraged for any future assets via optimized imports.
- Font Loading Strategies: Google Fonts are loaded via Next.js fonts with subsets to reduce payload and improve first paint.

**Section sources**
- [layout.js:1-55](file://app/layout.js#L1-L55)
- [page.js:1-60](file://app/page.js#L1-L60)

## Dependency Analysis
Key runtime dependencies influencing performance:
- @react-three/fiber and three: Provide the 3D rendering pipeline and scene graph.
- gsap and @gsap/react: Drive scroll-based timelines and ticker integration.
- lenis: Provides smooth scrolling with efficient requestAnimationFrame usage.
- next: Framework-level code splitting and build-time optimizations.

```mermaid
graph LR
Next["Next.js"] --> R3F["@react-three/fiber"]
R3F --> Three["three"]
Next --> GSAP["gsap + @gsap/react"]
GSAP --> Lenis["lenis"]
Next --> Fonts["next/font/google"]
```

**Diagram sources**
- [package.json:11-22](file://package.json#L11-L22)
- [layout.js:1-55](file://app/layout.js#L1-L55)

**Section sources**
- [package.json:11-22](file://package.json#L11-L22)
- [layout.js:1-55](file://app/layout.js#L1-L55)

## Performance Considerations
- DPR Range: Keep DPR capped to avoid overdraw on high-DPI displays.
- Shadow Costs: Use moderate shadow map sizes and limit shadow-casting to essential objects.
- Visible-Only Rendering: Hide offscreen or not-yet-needed groups to reduce draw calls.
- Animation Efficiency: Prefer GSAP ScrollTrigger scrubbing for deterministic updates; avoid per-frame heavy math.
- Smooth Scroll: Respect prefers-reduced-motion and clean up tickers on unmount.
- Fonts: Load only needed subsets and variables to speed up initial paint.
- Assets: Prefer procedural geometry and small textures; defer heavy model loads until needed.
- Code Splitting: Mark heavy interactive sections as client components to isolate bundles.
- Monitoring: Use browser DevTools Performance panel and WebGL renderer stats to identify bottlenecks.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
- Stuttering on Scroll: Ensure GSAP ScrollTrigger is updating correctly and Lenis ticker is active; verify scrub values are appropriate.
- High GPU Usage: Reduce DPR upper bound, lower shadow resolution, or hide complex scenes earlier.
- Memory Leaks: Confirm cleanup of Lenis instance and GSAP tickers on component unmount.
- Slow Initial Load: Audit client bundles; remove unused GSAP plugins or Three.js addons if present.
- Font Flash: Ensure Next.js font variables are applied to html/body classes to prevent layout shifts.

**Section sources**
- [SmoothScroll.jsx:13-43](file://components/SmoothScroll.jsx#L13-L43)
- [ThreeWorkspace.jsx:168-186](file://components/three/ThreeWorkspace.jsx#L168-L186)

## Conclusion
The portfolio achieves smooth performance by combining conservative 3D settings (capped DPR, modest shadows), selective rendering (visibility toggles), efficient animations (GSAP ScrollTrigger), and Next.js optimizations (client components, font loading). These strategies collectively reduce GPU load, minimize bundle size, and deliver responsive interactions across devices.

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Recommended Monitoring and Profiling
- Browser Performance Panel: Record interactions to spot long tasks and layout thrashing.
- WebGL Renderer Stats: Add a stats overlay to monitor FPS, draw calls, and triangle counts.
- Lighthouse: Evaluate performance budgets and opportunities for further optimization.
- Network Tab: Verify font and asset payloads; ensure proper caching headers.

[No sources needed since this section provides general guidance]