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

function Monitor() {
  const cursorRef = useRef();

  useFrame((state) => {
    if (cursorRef.current) {
      cursorRef.current.material.opacity = Math.sin(state.clock.elapsedTime * 6) > 0 ? 1 : 0.2;
    }
  });

  return (
    <group position={[0, 1.35, 0]}>
      {/* Outer Bezel */}
      <Box args={[1.86, 1.18, 0.16]} position={[0, 0, 0]} color="#1e1f2b" />

      {/* Screen Display Area - Dark IDE Theme */}
      <mesh position={[0, 0, 0.088]}>
        <boxGeometry args={[1.68, 1.0, 0.02]} />
        <meshStandardMaterial color="#161722" />
      </mesh>

      {/* IDE Window Header Bar */}
      <Box args={[1.68, 0.08, 0.022]} position={[0, 0.46, 0.09]} color="#242638" />
      {/* Window Controls (Red, Yellow, Green dots) */}
      <Box args={[0.03, 0.03, 0.01]} position={[-0.78, 0.46, 0.102]} color="#ff5f56" />
      <Box args={[0.03, 0.03, 0.01]} position={[-0.73, 0.46, 0.102]} color="#ffbd2e" />
      <Box args={[0.03, 0.03, 0.01]} position={[-0.68, 0.46, 0.102]} color="#27c93f" />

      {/* Code Lines on Screen (Syntax Highlighted) */}
      {/* Line 1: import { whimsy } from "tech" */}
      <Box args={[0.16, 0.03, 0.01]} position={[-0.66, 0.36, 0.1]} color="#ff70a6" />
      <Box args={[0.26, 0.03, 0.01]} position={[-0.42, 0.36, 0.1]} color="#4cc9f0" />
      <Box args={[0.12, 0.03, 0.01]} position={[-0.20, 0.36, 0.1]} color="#ff70a6" />
      <Box args={[0.24, 0.03, 0.01]} position={[0.01, 0.36, 0.1]} color="#ffd166" />

      {/* Line 2: // Emaan Fatima // Software & AI */}
      <Box args={[0.62, 0.025, 0.01]} position={[-0.43, 0.28, 0.1]} color="#6272a4" />

      {/* Line 3: const dev = async () => { */}
      <Box args={[0.14, 0.03, 0.01]} position={[-0.67, 0.20, 0.1]} color="#ff70a6" />
      <Box args={[0.12, 0.03, 0.01]} position={[-0.51, 0.20, 0.1]} color="#7ae582" />
      <Box args={[0.22, 0.03, 0.01]} position={[-0.31, 0.20, 0.1]} color="#4cc9f0" />

      {/* Line 4:   await learn("AI & 3D Web"); */}
      <Box args={[0.14, 0.03, 0.01]} position={[-0.60, 0.12, 0.1]} color="#ff70a6" />
      <Box args={[0.16, 0.03, 0.01]} position={[-0.42, 0.12, 0.1]} color="#4cc9f0" />
      <Box args={[0.34, 0.03, 0.01]} position={[-0.14, 0.12, 0.1]} color="#ffd166" />

      {/* Line 5:   return createMagic(); */}
      <Box args={[0.16, 0.03, 0.01]} position={[-0.59, 0.04, 0.1]} color="#ff70a6" />
      <Box args={[0.28, 0.03, 0.01]} position={[-0.34, 0.04, 0.1]} color="#7ae582" />

      {/* Line 6: }; */}
      <Box args={[0.06, 0.03, 0.01]} position={[-0.71, -0.04, 0.1]} color="#4cc9f0" />

      {/* Mini Terminal Box at Bottom of Screen */}
      <Box args={[1.56, 0.28, 0.015]} position={[0, -0.26, 0.098]} color="#0c0d14" />
      {/* Terminal prompt: >_ */}
      <Box args={[0.04, 0.04, 0.008]} position={[-0.70, -0.22, 0.108]} color="#7ae582" />
      <Box args={[0.28, 0.025, 0.008]} position={[-0.52, -0.22, 0.108]} color="#4cc9f0" />
      {/* Blinking Terminal Cursor */}
      <mesh ref={cursorRef} position={[-0.35, -0.22, 0.108]}>
        <boxGeometry args={[0.03, 0.045, 0.008]} />
        <meshStandardMaterial color="#7ae582" emissive="#7ae582" emissiveIntensity={0.8} transparent />
      </mesh>

      {/* Cute Whimsical Stickers on Screen Bezel */}
      {/* Pink Heart Sticker */}
      <Box args={[0.06, 0.06, 0.01]} position={[0.82, 0.48, 0.088]} color="#ff70a6" />
      {/* Code Tag Sticker */}
      <Box args={[0.12, 0.04, 0.01]} position={[0.78, -0.48, 0.088]} color="#4cc9f0" />

      {/* Stand neck */}
      <Box args={[0.13, 0.42, 0.13]} position={[0, -0.75, 0]} color="#aaaeb7" />
      {/* Stand base */}
      <Box args={[0.72, 0.08, 0.42]} position={[0, -0.96, 0]} color="#aaaeb7" />
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[0, 0.12, 0.55]}>
      {/* Keyboard Case */}
      <Box args={[1.15, 0.06, 0.44]} position={[0, 0, 0]} color="#242638" />

      {/* RGB Underglow Plate */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[1.18, 0.02, 0.46]} />
        <meshStandardMaterial color="#4cc9f0" emissive="#4cc9f0" emissiveIntensity={0.4} />
      </mesh>

      {/* Pastel Pudding Keys */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => {
          const colors = ["#ff70a6", "#4cc9f0", "#7ae582", "#ffd166", "#c580ed"];
          const keyColor = colors[(row + col) % colors.length];
          return (
            <Box
              key={`${row}-${col}`}
              args={[0.075, 0.025, 0.075]}
              position={[-0.43 + col * 0.096, 0.042, -0.14 + row * 0.095]}
              color={keyColor}
            />
          );
        })
      )}
    </group>
  );
}

function Books() {
  return (
    <group position={[-1.05, 0.12, 0.42]}>
      <Box args={[0.55, 0.1, 0.7]} position={[0, 0, 0]} color="#70d6ff" />
      <Box args={[0.55, 0.1, 0.7]} position={[0, 0.1, 0]} color="#ff70a6" />
      <Box args={[0.55, 0.1, 0.7]} position={[0, 0.2, 0]} color="#ffd670" />
      {/* Spine labels */}
      <Box args={[0.45, 0.04, 0.02]} position={[0, 0, 0.36]} color="#ffffff" />
      <Box args={[0.45, 0.04, 0.02]} position={[0, 0.1, 0.36]} color="#ffffff" />
      <Box args={[0.45, 0.04, 0.02]} position={[0, 0.2, 0.36]} color="#ffffff" />
    </group>
  );
}

function Mug() {
  return (
    <group position={[1.05, 0.1, 0.4]}>
      <Box args={[0.18, 0.24, 0.18]} position={[0, 0.12, 0]} color="#ff9770" />
      <Box args={[0.08, 0.12, 0.04]} position={[0.12, 0.12, 0]} color="#ff9770" />
      {/* Steam particles */}
      <Steam />
    </group>
  );
}

function Steam() {
  const steamRef = useRef();

  useFrame((state) => {
    if (steamRef.current) {
      steamRef.current.position.y = 0.32 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      steamRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      steamRef.current.material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
  });

  return (
    <mesh ref={steamRef} position={[0, 0.32, 0]}>
      <boxGeometry args={[0.08, 0.08, 0.08]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
    </mesh>
  );
}

function DeskPlant() {
  return (
    <group position={[1.2, 0, -0.42]}>
      {/* Pot */}
      <Box args={[0.28, 0.26, 0.28]} position={[0, 0.13, 0]} color="#ff9770" />
      {/* Leaves */}
      <Box args={[0.08, 0.32, 0.08]} position={[0, 0.42, 0]} color="#a6c850" />
      <Box args={[0.08, 0.24, 0.08]} position={[-0.1, 0.38, 0.05]} rotation={[0, 0, 0.5]} color="#a6c850" />
      <Box args={[0.08, 0.24, 0.08]} position={[0.1, 0.38, -0.05]} rotation={[0, 0, -0.5]} color="#a6c850" />
      <Box args={[0.08, 0.22, 0.08]} position={[0.05, 0.4, 0.1]} rotation={[0.5, 0, 0]} color="#a6c850" />
    </group>
  );
}

function DeskRobot() {
  const headRef = useRef();

  useFrame((state) => {
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.25;
      headRef.current.position.y = 0.26 + Math.sin(state.clock.elapsedTime * 2.5) * 0.012;
    }
  });

  return (
    <group position={[0.7, 0.25, 0.38]}>
      {/* Robot Base / Body */}
      <Box args={[0.18, 0.16, 0.18]} position={[0, 0.08, 0]} color="#f0f3fa" />
      {/* Body Screen / Status LED */}
      <Box args={[0.12, 0.06, 0.01]} position={[0, 0.08, 0.092]} color="#1e1f2b" />
      <Box args={[0.08, 0.02, 0.008]} position={[0, 0.08, 0.098]} color="#7ae582" />

      {/* Animated Robot Head */}
      <group ref={headRef} position={[0, 0.26, 0]}>
        {/* Head Shell */}
        <Box args={[0.22, 0.18, 0.2]} position={[0, 0, 0]} color="#ffffff" />
        {/* Visor / Face Display */}
        <Box args={[0.18, 0.12, 0.01]} position={[0, 0, 0.102]} color="#1e1f2b" />
        {/* Glowing Pixel Eyes */}
        <mesh position={[-0.045, 0.01, 0.108]}>
          <boxGeometry args={[0.035, 0.035, 0.005]} />
          <meshStandardMaterial color="#4cc9f0" emissive="#4cc9f0" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.045, 0.01, 0.108]}>
          <boxGeometry args={[0.035, 0.035, 0.005]} />
          <meshStandardMaterial color="#4cc9f0" emissive="#4cc9f0" emissiveIntensity={0.8} />
        </mesh>
        {/* Antenna Stem */}
        <Box args={[0.015, 0.08, 0.015]} position={[0, 0.12, 0]} color="#aaaeb7" />
        {/* Antenna Glowing Orb */}
        <mesh position={[0, 0.17, 0]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color="#ff70a6" emissive="#ff70a6" emissiveIntensity={0.7} />
        </mesh>
      </group>
    </group>
  );
}

export default function Desk() {
  return (
    <group position={[1.5, -0.2, 0]}>
      {/* Desktop */}
      <Box args={[3.4, 0.18, 1.45]} position={[0, 0.25, 0]} color="#fffaf4" />
      {/* Legs */}
      <Box args={[0.18, 1.5, 0.18]} position={[-1.35, -0.55, 0.55]} color="#ffd670" />
      <Box args={[0.18, 1.5, 0.18]} position={[1.35, -0.55, 0.55]} color="#ffd670" />
      <Box args={[0.18, 1.5, 0.18]} position={[-1.35, -0.55, -0.55]} color="#ffd670" />
      <Box args={[0.18, 1.5, 0.18]} position={[1.35, -0.55, -0.55]} color="#ffd670" />

      {/* Desk Ambient LED Underglow */}
      <mesh position={[0, 0.15, 0.72]}>
        <boxGeometry args={[3.2, 0.02, 0.02]} />
        <meshStandardMaterial color="#4cc9f0" emissive="#4cc9f0" emissiveIntensity={0.5} />
      </mesh>

      <Monitor />
      <Keyboard />
      <Books />
      <Mug />
      <DeskPlant />
      <DeskRobot />
    </group>
  );
}
