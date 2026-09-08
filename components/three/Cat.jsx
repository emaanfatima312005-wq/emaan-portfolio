"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Box({ args, position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Cat({ position = [0, 0, 0] }) {
  const tailRef = useRef();
  const headRef = useRef();

  useFrame((state) => {
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* Body */}
      <Box args={[0.55, 0.42, 0.75]} position={[0, 0.24, 0]} color="#ffffff" />

      {/* Head */}
      <group ref={headRef} position={[0, 0.58, 0.42]}>
        <Box args={[0.42, 0.38, 0.4]} position={[0, 0, 0]} color="#ffffff" />
        {/* Ears */}
        <Box args={[0.1, 0.14, 0.08]} position={[-0.13, 0.22, 0]} color="#ffffff" />
        <Box args={[0.1, 0.14, 0.08]} position={[0.13, 0.22, 0]} color="#ffffff" />
        {/* Eyes */}
        <Box args={[0.04, 0.04, 0.02]} position={[-0.1, 0.04, 0.21]} color="#332927" />
        <Box args={[0.04, 0.04, 0.02]} position={[0.1, 0.04, 0.21]} color="#332927" />
        {/* Nose */}
        <Box args={[0.04, 0.03, 0.02]} position={[0, -0.04, 0.21]} color="#ff70a6" />
      </group>

      {/* Legs */}
      <Box args={[0.12, 0.22, 0.12]} position={[-0.18, 0.11, 0.25]} color="#ffffff" />
      <Box args={[0.12, 0.22, 0.12]} position={[0.18, 0.11, 0.25]} color="#ffffff" />
      <Box args={[0.12, 0.22, 0.12]} position={[-0.18, 0.11, -0.25]} color="#ffffff" />
      <Box args={[0.12, 0.22, 0.12]} position={[0.18, 0.11, -0.25]} color="#ffffff" />

      {/* Tail */}
      <group ref={tailRef} position={[0, 0.36, -0.4]}>
        <Box args={[0.1, 0.1, 0.42]} position={[0, 0, -0.18]} color="#ffffff" />
      </group>
    </group>
  );
}
