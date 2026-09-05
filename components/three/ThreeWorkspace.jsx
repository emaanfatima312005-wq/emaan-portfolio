"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/* =========================================
   LITTLE PLACEHOLDER EMAAN
========================================= */

function EmaanAvatar() {
  return (
    <group position={[-1.8, -0.05, 0]}>
      {/* legs */}

      <mesh position={[-0.18, -0.55, 0]}>
        <boxGeometry args={[0.25, 0.8, 0.28]} />
        <meshStandardMaterial color="#f2e6da" />
      </mesh>

      <mesh position={[0.18, -0.55, 0]}>
        <boxGeometry args={[0.25, 0.8, 0.28]} />
        <meshStandardMaterial color="#f2e6da" />
      </mesh>

      {/* body */}

      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.8, 0.9, 0.45]} />
        <meshStandardMaterial color="#70d6ff" />
      </mesh>

      {/* head */}

      <mesh position={[0, 1.02, 0]}>
        <boxGeometry args={[0.68, 0.68, 0.68]} />
        <meshStandardMaterial color="#f2bea0" />
      </mesh>

      {/* hair */}

      <mesh position={[0, 1.2, -0.08]}>
        <boxGeometry args={[0.78, 0.48, 0.75]} />
        <meshStandardMaterial color="#3c302d" />
      </mesh>

      {/* pink little detail */}

      <mesh position={[0, 0.2, 0.24]}>
        <boxGeometry args={[0.18, 0.18, 0.05]} />
        <meshStandardMaterial color="#ff70a6" />
      </mesh>
    </group>
  );
}

/* =========================================
   DESK
========================================= */

function Desk() {
  return (
    <group position={[1.5, -0.2, 0]}>
      {/* desk top */}

      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[3.1, 0.18, 1.25]} />
        <meshStandardMaterial color="#fffaf3" />
      </mesh>

      {/* left leg */}

      <mesh position={[-1.25, -0.55, 0]}>
        <boxGeometry args={[0.16, 1.45, 0.16]} />
        <meshStandardMaterial color="#ffd670" />
      </mesh>

      {/* right leg */}

      <mesh position={[1.25, -0.55, 0]}>
        <boxGeometry args={[0.16, 1.45, 0.16]} />
        <meshStandardMaterial color="#ffd670" />
      </mesh>

      <Monitor />
    </group>
  );
}

/* =========================================
   MONITOR
========================================= */

function Monitor() {
  return (
    <group position={[0, 1.15, 0]}>
      {/* frame */}

      <mesh>
        <boxGeometry args={[1.65, 1.05, 0.16]} />
        <meshStandardMaterial color="#202638" />
      </mesh>

      {/* screen */}

      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[1.42, 0.82, 0.03]} />
        <meshStandardMaterial
          color="#70d6ff"
          emissive="#70d6ff"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* neck */}

      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[0.13, 0.4, 0.13]} />
        <meshStandardMaterial color="#999fa8" />
      </mesh>

      {/* base */}

      <mesh position={[0, -0.92, 0]}>
        <boxGeometry args={[0.65, 0.08, 0.4]} />
        <meshStandardMaterial color="#999fa8" />
      </mesh>
    </group>
  );
}

/* =========================================
   CHAIR
========================================= */

function Chair() {
  return (
    <group position={[0.1, -0.45, 1]}>
      {/* back */}

      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.9, 1.1, 0.18]} />
        <meshStandardMaterial color="#ff70a6" />
      </mesh>

      {/* seat */}

      <mesh position={[0, 0, 0.2]}>
        <boxGeometry args={[0.95, 0.18, 0.9]} />
        <meshStandardMaterial color="#ff9770" />
      </mesh>

      {/* pole */}

      <mesh position={[0, -0.48, 0.15]}>
        <boxGeometry args={[0.12, 0.8, 0.12]} />
        <meshStandardMaterial color="#a8adb5" />
      </mesh>

      {/* base */}

      <mesh position={[0, -0.88, 0.15]}>
        <boxGeometry args={[0.9, 0.08, 0.18]} />
        <meshStandardMaterial color="#a8adb5" />
      </mesh>
    </group>
  );
}

/* =========================================
   FLOOR
========================================= */

function Floor() {
  return (
    <mesh
      position={[0, -1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[20, 20]} />

      <meshStandardMaterial color="#fffdf8" />
    </mesh>
  );
}

/* =========================================
   ENTIRE SCENE
========================================= */

function Scene() {
  return (
    <>
      {/* soft overall light */}

      <ambientLight intensity={1.4} />

      {/* main light */}

      <directionalLight
        position={[4, 7, 5]}
        intensity={2.5}
        castShadow
      />

      {/* warm accent */}

      <pointLight
        position={[-4, 3, 4]}
        intensity={12}
        color="#ffd670"
      />

      <Floor />

      <EmaanAvatar />

      <Desk />

      <Chair />

      {/* TEMPORARY camera controls */}

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        target={[0, 0, 0]}
      />
    </>
  );
}

/* =========================================
   CANVAS
========================================= */

export default function ThreeWorkspace() {
  return (
    <div className="three-workspace">
      <Canvas
        shadows
        camera={{
          position: [6, 4, 8],
          fov: 45,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}