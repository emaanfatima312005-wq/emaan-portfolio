"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Box({ args, position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} transparent opacity={0.85} />
    </mesh>
  );
}

function FloatingOrb({ position, color, size, speed }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.25;
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

export default function WhimsyWorld({ progress = 0 }) {
  const groupRef = useRef();
  const opacity = Math.max(0, Math.min(1, (progress - 0.55) / 0.15));

  return (
    <group
      ref={groupRef}
      visible={opacity > 0.01}
      position={[0, 0, -5]}
    >
      {/* Sunset gradient backdrop as a big plane */}
      <mesh position={[0, 2, -10]} rotation={[0, 0, 0]}>
        <planeGeometry args={[40, 25]} />
        <meshBasicMaterial color="#fff0e0" />
      </mesh>

      {/* Floating islands / platforms */}
      <Box args={[3, 0.3, 2]} position={[-4, -1, -2]} color="#e9ff70" />
      <Box args={[2.2, 0.3, 1.8]} position={[4.5, -0.5, -1]} color="#70d6ff" />
      <Box args={[2.8, 0.3, 2.2]} position={[0, -1.5, 2]} color="#ffd670" />

      {/* Floating orbs */}
      <FloatingOrb position={[-5, 1.5, -1]} color="#70d6ff" size={[0.8, 0.8, 0.8]} speed={1.2} />
      <FloatingOrb position={[5, 2, 0]} color="#ff70a6" size={[0.6, 0.6, 0.6]} speed={1.5} />
      <FloatingOrb position={[2, 3, -3]} color="#ffd670" size={[1, 0.4, 0.4]} speed={1} />
      <FloatingOrb position={[-2, 2.5, -4]} color="#e9ff70" size={[0.5, 0.8, 0.5]} speed={1.3} />
      <FloatingOrb position={[0, 4, -2]} color="#ff9770" size={[0.5, 0.5, 0.5]} speed={0.9} />

      {/* Tiny voxel trees/plants */}
      <group position={[-4, -0.8, -2]}>
        <Box args={[0.12, 0.5, 0.12]} position={[0, 0.25, 0]} color="#95a83f" />
        <Box args={[0.35, 0.2, 0.35]} position={[0, 0.55, 0]} color="#a6c850" />
        <Box args={[0.25, 0.18, 0.25]} position={[0, 0.75, 0]} color="#a6c850" />
      </group>

      <group position={[4.5, -0.3, -1]}>
        <Box args={[0.12, 0.45, 0.12]} position={[0, 0.22, 0]} color="#95a83f" />
        <Box args={[0.3, 0.18, 0.3]} position={[0, 0.5, 0]} color="#a6c850" />
      </group>
    </group>
  );
}
