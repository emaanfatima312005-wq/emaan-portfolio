"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Box({ args, position, rotation, color, castShadow = true, receiveShadow = true }) {
  return (
    <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow={receiveShadow}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function HangingPlant({ position }) {
  const leafRef = useRef();

  useFrame((state) => {
    if (leafRef.current) {
      leafRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Pot */}
      <Box args={[0.3, 0.26, 0.3]} position={[0, 0, 0]} color="#ff9770" castShadow />
      {/* String */}
      <Box args={[0.02, 1.2, 0.02]} position={[0, 0.6, 0]} color="#666" />
      {/* Leaves */}
      <group ref={leafRef} position={[0, -0.2, 0]}>
        <Box args={[0.08, 0.4, 0.08]} position={[0, -0.15, 0]} color="#a6c850" />
        <Box args={[0.08, 0.3, 0.08]} position={[-0.12, -0.1, 0.05]} rotation={[0, 0, 0.5]} color="#a6c850" />
        <Box args={[0.08, 0.3, 0.08]} position={[0.12, -0.1, -0.05]} rotation={[0, 0, -0.5]} color="#a6c850" />
      </group>
    </group>
  );
}

/* =====================================================
   NEUTRAL GREY WORKSTATION PC TOWER
===================================================== */

function PastelPCTower({ position = [3.4, -0.56, 0.3] }) {
  const fanRef1 = useRef();
  const fanRef2 = useRef();

  useFrame((state) => {
    const angle = state.clock.elapsedTime * 3;
    if (fanRef1.current) fanRef1.current.rotation.z = angle;
    if (fanRef2.current) fanRef2.current.rotation.z = -angle;
  });

  return (
    <group position={position}>
      {/* Main PC Case - Clean Neutral Grey */}
      <Box args={[0.54, 0.88, 0.88]} position={[0, 0, 0]} color="#505663" />

      {/* Front Panel - Light Neutral Grey */}
      <Box args={[0.52, 0.84, 0.04]} position={[0, 0, 0.45]} color="#d6dae2" />
      {/* Front Grille Inset - Charcoal */}
      <Box args={[0.42, 0.74, 0.02]} position={[0, 0, 0.472]} color="#2d323b" />

      {/* Front Dual Fans - Clean Neutral with Soft Warm Glow */}
      {/* Upper Fan */}
      <group position={[0, 0.18, 0.485]}>
        <mesh>
          <ringGeometry args={[0.12, 0.15, 24]} />
          <meshStandardMaterial color="#f3f4f6" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
        <group ref={fanRef1}>
          <Box args={[0.22, 0.03, 0.01]} position={[0, 0, 0]} color="#9ca3af" />
          <Box args={[0.03, 0.22, 0.01]} position={[0, 0, 0]} color="#9ca3af" />
        </group>
      </group>

      {/* Lower Fan */}
      <group position={[0, -0.18, 0.485]}>
        <mesh>
          <ringGeometry args={[0.12, 0.15, 24]} />
          <meshStandardMaterial color="#f3f4f6" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
        <group ref={fanRef2}>
          <Box args={[0.22, 0.03, 0.01]} position={[0, 0, 0]} color="#9ca3af" />
          <Box args={[0.03, 0.22, 0.01]} position={[0, 0, 0]} color="#9ca3af" />
        </group>
      </group>

      {/* Tempered Glass Side Window */}
      <mesh position={[-0.272, 0, 0]}>
        <boxGeometry args={[0.01, 0.8, 0.78]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.22} roughness={0.1} />
      </mesh>

      {/* Internal Hardware - Neutral Hardware */}
      <Box args={[0.18, 0.04, 0.52]} position={[-0.05, -0.06, 0]} color="#232730" />
      <mesh position={[-0.05, -0.04, 0]}>
        <boxGeometry args={[0.16, 0.015, 0.48]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      {/* Subtle RAM glow */}
      <mesh position={[0.05, 0.16, -0.1]}>
        <boxGeometry args={[0.02, 0.12, 0.14]} />
        <meshStandardMaterial color="#f9fafb" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.08, 0.16, -0.1]}>
        <boxGeometry args={[0.02, 0.12, 0.14]} />
        <meshStandardMaterial color="#e5e7eb" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>

      {/* Neutral Cat Ears on PC Tower */}
      <group position={[0, 0.46, 0.18]}>
        {/* Left Ear */}
        <Box args={[0.1, 0.12, 0.08]} position={[-0.15, 0.06, 0]} rotation={[0, 0, 0.2]} color="#d6dae2" />
        <Box args={[0.06, 0.08, 0.02]} position={[-0.15, 0.06, 0.04]} rotation={[0, 0, 0.2]} color="#f0eae4" />
        {/* Right Ear */}
        <Box args={[0.1, 0.12, 0.08]} position={[0.15, 0.06, 0]} rotation={[0, 0, -0.2]} color="#d6dae2" />
        <Box args={[0.06, 0.08, 0.02]} position={[0.15, 0.06, 0.04]} rotation={[0, 0, -0.2]} color="#f0eae4" />
      </group>
    </group>
  );
}

/* =====================================================
   SOFT PASTEL CODE WALL SIGN
===================================================== */

function NeonCodeSign({ position = [-0.6, 3.4, -3.94] }) {
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Soft warm cream backplate */}
      <Box args={[1.7, 0.8, 0.02]} position={[0, 0, 0]} color="#fffcf8" />
      {/* Subtle warm frame rim */}
      <Box args={[1.72, 0.02, 0.025]} position={[0, 0.4, 0]} color="#ebdcd0" />
      <Box args={[1.72, 0.02, 0.025]} position={[0, -0.4, 0]} color="#ebdcd0" />
      <Box args={[0.02, 0.8, 0.025]} position={[-0.85, 0, 0]} color="#ebdcd0" />
      <Box args={[0.02, 0.8, 0.025]} position={[0.85, 0, 0]} color="#ebdcd0" />

      {/* Soft Pastel < / > prompt */}
      {/* Left bracket < (Soft Pastel Peach) */}
      <mesh position={[-0.48, 0.12, 0.025]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[0.05, 0.32, 0.03]} />
        <meshStandardMaterial color="#ffb5a7" emissive="#ffb5a7" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.48, -0.12, 0.025]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.05, 0.32, 0.03]} />
        <meshStandardMaterial color="#ffb5a7" emissive="#ffb5a7" emissiveIntensity={0.5} />
      </mesh>

      {/* Center Slash / (Soft Pastel Sky) */}
      <mesh position={[-0.08, 0, 0.025]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.05, 0.52, 0.03]} />
        <meshStandardMaterial color="#a0c4ff" emissive="#a0c4ff" emissiveIntensity={0.5} />
      </mesh>

      {/* Right bracket > (Soft Pastel Mint) */}
      <mesh position={[0.32, 0.12, 0.025]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.05, 0.32, 0.03]} />
        <meshStandardMaterial color="#b9fbc0" emissive="#b9fbc0" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.32, -0.12, 0.025]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[0.05, 0.32, 0.03]} />
        <meshStandardMaterial color="#b9fbc0" emissive="#b9fbc0" emissiveIntensity={0.5} />
      </mesh>

      {/* Soft Butter Yellow Heart Accent */}
      <mesh position={[0.62, 0.12, 0.025]} rotation={[0, 0, 0.785]}>
        <boxGeometry args={[0.08, 0.08, 0.03]} />
        <meshStandardMaterial color="#ffd670" emissive="#ffd670" emissiveIntensity={0.55} />
      </mesh>

      {/* Gentle Warm Pastel Ambient Glow Light */}
      <pointLight ref={glowRef} position={[0, 0, 0.25]} distance={3.2} color="#ffe8d6" />
    </group>
  );
}

/* =====================================================
   FLOATING HOLOGRAM WIDGET
===================================================== */

function HologramWidget({ position = [-2.4, 1.8, -1.8] }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.8) * 0.08;
      groupRef.current.rotation.y = -0.3 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Translucent Holographic Pane */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.85, 0.01]} />
        <meshStandardMaterial color="#70d6ff" transparent opacity={0.28} roughness={0.1} />
      </mesh>

      {/* Holographic Glowing Frame */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.22, 0.02, 0.02]} />
        <meshStandardMaterial color="#4cc9f0" emissive="#4cc9f0" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <boxGeometry args={[1.22, 0.02, 0.02]} />
        <meshStandardMaterial color="#4cc9f0" emissive="#4cc9f0" emissiveIntensity={0.8} />
      </mesh>

      {/* Floating Holographic Code Snippets */}
      <Box args={[0.3, 0.03, 0.015]} position={[-0.35, 0.26, 0.01]} color="#ff70a6" />
      <Box args={[0.42, 0.03, 0.015]} position={[0.08, 0.26, 0.01]} color="#ffd166" />
      <Box args={[0.65, 0.025, 0.015]} position={[-0.15, 0.16, 0.01]} color="#7ae582" />
      <Box args={[0.35, 0.03, 0.015]} position={[-0.3, 0.06, 0.01]} color="#4cc9f0" />
      <Box args={[0.2, 0.03, 0.015]} position={[0.05, 0.06, 0.01]} color="#ff70a6" />

      {/* Holographic Mini Graph / AI Neural Nodes */}
      {[-0.35, -0.1, 0.15, 0.4].map((x, i) => (
        <mesh key={i} position={[x, -0.2 + (i % 2) * 0.08, 0.01]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color="#ff70a6" emissive="#ff70a6" emissiveIntensity={0.8} />
        </mesh>
      ))}

      {/* Hologram Base Projector Disk on Floor */}
      <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.25, 24]} />
        <meshStandardMaterial color="#4cc9f0" emissive="#4cc9f0" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

/* =====================================================
   FAIRY TECH STRING LIGHTS
===================================================== */

function FairyLights() {
  const bulbs = [
    [-1.4, 3.45, 0.18, "#ff70a6"],
    [-0.9, 3.48, 0.18, "#ffd166"],
    [-0.4, 3.44, 0.18, "#4cc9f0"],
    [0.1, 3.47, 0.18, "#7ae582"],
    [0.6, 3.44, 0.18, "#ff70a6"],
    [1.1, 3.48, 0.18, "#ffd166"],
    [1.4, 3.45, 0.18, "#4cc9f0"],
  ];

  return (
    <group position={[3.2, 0, -3.95]}>
      {/* String wire across top of window */}
      <Box args={[3.1, 0.015, 0.02]} position={[0, 3.48, 0.16]} color="#888888" />

      {/* Glowing Fairy Bulbs */}
      {bulbs.map(([x, y, z, col], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.04, 10, 10]} />
          <meshStandardMaterial color={col} emissive={col} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* =====================================================
   ROOM COMPONENT
===================================================== */

export default function Room() {
  return (
    <group>
      {/* Floor - warm cream wood */}
      <mesh position={[0, -1.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#fff5e9" />
      </mesh>

      {/* Colorful patterned rug */}
      <mesh position={[0.8, -1, 0.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.6, 64]} />
        <meshStandardMaterial color="#ffd6e8" />
      </mesh>
      <mesh position={[0.8, -0.99, 0.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[1.8, 2.4, 64]} />
        <meshStandardMaterial color="#70d6ff" />
      </mesh>
      <mesh position={[0.8, -0.98, 0.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.4, 64]} />
        <meshStandardMaterial color="#fffdf8" />
      </mesh>

      {/* Back wall - soft peach */}
      <mesh position={[0, 3, -4]} receiveShadow>
        <planeGeometry args={[24, 10]} />
        <meshStandardMaterial color="#ffeadd" />
      </mesh>

      {/* Left wall - soft mint */}
      <mesh position={[-8, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 10]} />
        <meshStandardMaterial color="#e8f8f0" />
      </mesh>

      {/* Polka dots on back wall */}
      {[
        [-2, 4.4], [2.5, 4], [5, 5], [-4.5, 2], [6, 1.5], [-1, 1.2],
      ].map(([x, y], i) => (
        <Box key={i} args={[0.18, 0.18, 0.04]} position={[x, y, -3.97]} color="#ffd670" />
      ))}

      {/* Baseboards */}
      <Box args={[24, 0.22, 0.1]} position={[0, -0.9, -3.95]} color="#ffffff" />
      <Box args={[0.1, 0.22, 24]} position={[-7.95, -0.9, 0]} color="#ffffff" />

      {/* Window frame on back wall */}
      <group position={[3.2, 2.2, -3.95]}>
        <Box args={[3, 2.4, 0.12]} position={[0, 0, 0]} color="#ffffff" />
        <Box args={[2.6, 2, 0.06]} position={[0, 0, 0.05]} color="#c9eeff" />
        <Box args={[0.08, 2, 0.1]} position={[0, 0, 0.08]} color="#ffffff" />
        <Box args={[2.6, 0.08, 0.1]} position={[0, 0, 0.08]} color="#ffffff" />
        {/* Curtains */}
        <Box args={[0.5, 2.3, 0.1]} position={[-1.5, 0, 0.15]} color="#ff70a6" />
        <Box args={[0.5, 2.3, 0.1]} position={[1.5, 0, 0.15]} color="#ff70a6" />
        <Box args={[3.2, 0.15, 0.12]} position={[0, 1.25, 0.15]} color="#ffd670" />
      </group>

      {/* Whimsical Fairy String Lights across window */}
      <FairyLights />

      {/* Whimsical Neon Code Sign on Back Wall */}
      <NeonCodeSign position={[-0.6, 3.4, -3.94]} />

      {/* Wall Art 1: Framed Floral Circuit Board Art */}
      <group position={[-4, 2.8, -3.93]}>
        {/* Frame */}
        <Box args={[1.4, 1.8, 0.05]} position={[0, 0, 0]} color="#2c2842" />
        {/* Canvas */}
        <Box args={[1.25, 1.65, 0.055]} position={[0, 0, 0.005]} color="#faf7ff" />
        {/* Circuit Branches */}
        <Box args={[0.04, 0.7, 0.06]} position={[0, -0.2, 0.01]} color="#8f75e8" />
        <Box args={[0.5, 0.04, 0.06]} position={[0, 0.15, 0.01]} color="#8f75e8" />
        <Box args={[0.04, 0.3, 0.06]} position={[-0.25, 0.3, 0.01]} color="#4cc9f0" />
        <Box args={[0.04, 0.3, 0.06]} position={[0.25, 0.3, 0.01]} color="#4cc9f0" />
        {/* Flower Center Pixel */}
        <Box args={[0.18, 0.18, 0.07]} position={[0, 0.15, 0.015]} color="#ff70a6" />
        {/* Glowing Circuit Nodes */}
        <Box args={[0.08, 0.08, 0.07]} position={[-0.25, 0.45, 0.015]} color="#ffd166" />
        <Box args={[0.08, 0.08, 0.07]} position={[0.25, 0.45, 0.015]} color="#ffd166" />
        <Box args={[0.08, 0.08, 0.07]} position={[0, -0.55, 0.015]} color="#7ae582" />
      </group>

      {/* Wall Art 2: AI Neural / Data Pixel Art Poster */}
      <group position={[-6.5, 2.2, -3.93]}>
        {/* Frame */}
        <Box args={[1.1, 1.4, 0.05]} position={[0, 0, 0]} color="#ffd166" />
        {/* Canvas - Dark */}
        <Box args={[0.96, 1.25, 0.055]} position={[0, 0, 0.005]} color="#1b1829" />
        {/* Colorful Data Bars */}
        <Box args={[0.12, 0.45, 0.07]} position={[-0.24, -0.1, 0.015]} color="#ff70a6" />
        <Box args={[0.12, 0.7, 0.07]} position={[-0.08, 0.02, 0.015]} color="#4cc9f0" />
        <Box args={[0.12, 0.9, 0.07]} position={[0.08, 0.12, 0.015]} color="#7ae582" />
        <Box args={[0.12, 0.6, 0.07]} position={[0.24, -0.03, 0.015]} color="#ffd166" />
      </group>

      {/* Bookshelf on left wall */}
      <group position={[-7.85, 2.2, -1]}>
        {/* Shelf structure */}
        <Box args={[2.6, 0.1, 0.5]} position={[0, 0.7, 0]} color="#8b6f47" />
        <Box args={[2.6, 0.1, 0.5]} position={[0, 0, 0]} color="#8b6f47" />
        <Box args={[2.6, 0.1, 0.5]} position={[0, -0.7, 0]} color="#8b6f47" />
        <Box args={[0.1, 1.5, 0.5]} position={[-1.25, 0, 0]} color="#8b6f47" />
        <Box args={[0.1, 1.5, 0.5]} position={[1.25, 0, 0]} color="#8b6f47" />

        {/* Tech Books (Top Shelf) */}
        {/* Python Book */}
        <Box args={[0.12, 0.58, 0.36]} position={[-0.9, 0.29, 0]} color="#306998" />
        <Box args={[0.125, 0.04, 0.02]} position={[-0.9, 0.42, 0.19]} color="#ffd43b" />

        {/* AI / Machine Learning Book */}
        <Box args={[0.14, 0.62, 0.36]} position={[-0.74, 0.31, 0]} color="#7928ca" />
        <Box args={[0.145, 0.04, 0.02]} position={[-0.74, 0.46, 0.19]} color="#ff0080" />

        {/* Three.js / WebGL Book */}
        <Box args={[0.12, 0.52, 0.36]} position={[-0.58, 0.26, 0]} color="#000000" />
        <Box args={[0.125, 0.04, 0.02]} position={[-0.58, 0.38, 0.19]} color="#4cc9f0" />

        {/* Next.js / React Book */}
        <Box args={[0.12, 0.56, 0.36]} position={[-0.43, 0.28, 0]} color="#61dafb" />

        {/* Pastel Handheld Retro Console (GameBoy style) on Middle Shelf */}
        <group position={[0.7, 0.2, 0]}>
          <Box args={[0.18, 0.3, 0.08]} position={[0, 0, 0]} color="#ff70a6" />
          {/* Screen */}
          <Box args={[0.14, 0.12, 0.01]} position={[0, 0.06, 0.042]} color="#7ae582" />
          {/* D-Pad */}
          <Box args={[0.04, 0.04, 0.01]} position={[-0.03, -0.06, 0.042]} color="#4cc9f0" />
          {/* Action Buttons */}
          <Box args={[0.025, 0.025, 0.01]} position={[0.04, -0.05, 0.042]} color="#ffd166" />
          <Box args={[0.025, 0.025, 0.01]} position={[0.02, -0.08, 0.042]} color="#ffd166" />
        </group>

        {/* Lower Shelf Books */}
        <Box args={[0.12, 0.55, 0.35]} position={[0.3, -0.42, 0]} color="#70d6ff" />
        <Box args={[0.12, 0.5, 0.35]} position={[0.45, -0.45, 0]} color="#ff70a6" />
        <Box args={[0.12, 0.6, 0.35]} position={[0.6, -0.4, 0]} color="#ffd670" />

        {/* Small plant on shelf */}
        <Box args={[0.24, 0.22, 0.24]} position={[-0.8, -0.56, 0]} color="#ff9770" />
        <Box args={[0.08, 0.28, 0.08]} position={[-0.8, -0.28, 0]} color="#a6c850" />
        <Box args={[0.08, 0.22, 0.08]} position={[-0.95, -0.3, 0]} rotation={[0, 0, 0.5]} color="#a6c850" />
        <Box args={[0.08, 0.22, 0.08]} position={[-0.65, -0.3, 0]} rotation={[0, 0, -0.5]} color="#a6c850" />
      </group>

      {/* Floating Hologram Code / Neural Widget */}
      <HologramWidget position={[-2.4, 1.8, -1.8]} />

      {/* Pastel RGB PC Battlestation Tower beside the Desk */}
      <PastelPCTower position={[3.45, -0.56, 0.3]} />

      {/* Hanging plant near window */}
      <HangingPlant position={[4.5, 4.5, -2]} />

      {/* Floor plant near desk */}
      <group position={[4.2, -1, 2.2]}>
        <Box args={[0.36, 0.32, 0.36]} position={[0, 0.16, 0]} color="#ff9770" />
        <Box args={[0.1, 0.9, 0.1]} position={[0, 0.7, 0]} color="#95a83f" />
        <Box args={[0.1, 0.6, 0.1]} position={[-0.2, 0.65, 0.1]} rotation={[0, 0, 0.5]} color="#a6c850" />
        <Box args={[0.1, 0.6, 0.1]} position={[0.2, 0.65, -0.1]} rotation={[0, 0, -0.5]} color="#a6c850" />
        <Box args={[0.1, 0.5, 0.1]} position={[0.1, 0.7, 0.2]} rotation={[0.5, 0, 0]} color="#a6c850" />
      </group>
    </group>
  );
}
