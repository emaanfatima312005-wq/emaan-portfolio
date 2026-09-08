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
  return (
    <group position={[0, 1.35, 0]}>
      {/* Bezel */}
      <Box args={[1.8, 1.15, 0.16]} position={[0, 0, 0]} color="#252834" />
      {/* Screen */}
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[1.55, 0.88, 0.03]} />
        <meshStandardMaterial color="#70d6ff" emissive="#70d6ff" emissiveIntensity={0.32} />
      </mesh>
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
      <Box args={[1.1, 0.06, 0.42]} position={[0, 0, 0]} color="#e8ecef" />
      {/* Tiny keys */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <Box
            key={`${row}-${col}`}
            args={[0.07, 0.02, 0.07]}
            position={[-0.42 + col * 0.095, 0.04, -0.14 + row * 0.095]}
            color="#ffffff"
          />
        ))
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

      <Monitor />
      <Keyboard />
      <Books />
      <Mug />
      <DeskPlant />
    </group>
  );
}
