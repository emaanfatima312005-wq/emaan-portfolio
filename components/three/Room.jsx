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
        [-2, 4], [2.5, 3.5], [5, 5], [-4.5, 2], [6, 1.5], [-1, 1.2],
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

      {/* Wall art / posters */}
      <group position={[-4, 2.8, -3.93]}>
        <Box args={[1.4, 1.8, 0.05]} position={[0, 0, 0]} color="#ffffff" />
        <Box args={[1.1, 0.8, 0.06]} position={[0, 0.35, 0.02]} color="#70d6ff" />
        <Box args={[0.9, 0.08, 0.07]} position={[0, -0.25, 0.02]} color="#ff70a6" />
        <Box args={[0.6, 0.08, 0.07]} position={[0, -0.42, 0.02]} color="#ffd670" />
      </group>

      <group position={[-6.5, 2.2, -3.93]}>
        <Box args={[1.1, 1.4, 0.05]} position={[0, 0, 0]} color="#ffd670" />
        <Box args={[0.7, 0.7, 0.06]} position={[0, 0.2, 0.02]} color="#ffffff" />
        <Box args={[0.12, 0.5, 0.07]} position={[-0.18, 0.2, 0.02]} color="#ff9770" />
        <Box args={[0.12, 0.5, 0.07]} position={[0, 0.2, 0.02]} color="#70d6ff" />
        <Box args={[0.12, 0.5, 0.07]} position={[0.18, 0.2, 0.02]} color="#ff70a6" />
      </group>

      {/* Bookshelf on left wall */}
      <group position={[-7.85, 2.2, -1]}>
        <Box args={[2.6, 0.1, 0.5]} position={[0, 0.7, 0]} color="#8b6f47" />
        <Box args={[2.6, 0.1, 0.5]} position={[0, 0, 0]} color="#8b6f47" />
        <Box args={[2.6, 0.1, 0.5]} position={[0, -0.7, 0]} color="#8b6f47" />
        <Box args={[0.1, 1.5, 0.5]} position={[-1.25, 0, 0]} color="#8b6f47" />
        <Box args={[0.1, 1.5, 0.5]} position={[1.25, 0, 0]} color="#8b6f47" />

        {/* Colorful books */}
        <Box args={[0.12, 0.55, 0.35]} position={[-0.9, 0.28, 0]} color="#ff70a6" />
        <Box args={[0.12, 0.6, 0.35]} position={[-0.75, 0.3, 0]} color="#70d6ff" />
        <Box args={[0.12, 0.5, 0.35]} position={[-0.6, 0.25, 0]} color="#ffd670" />
        <Box args={[0.12, 0.58, 0.35]} position={[-0.45, 0.29, 0]} color="#e9ff70" />
        <Box args={[0.12, 0.52, 0.35]} position={[-0.3, 0.26, 0]} color="#ff9770" />

        <Box args={[0.12, 0.55, 0.35]} position={[0.3, -0.42, 0]} color="#70d6ff" />
        <Box args={[0.12, 0.5, 0.35]} position={[0.45, -0.45, 0]} color="#ff70a6" />
        <Box args={[0.12, 0.6, 0.35]} position={[0.6, -0.4, 0]} color="#ffd670" />

        {/* Small plant on shelf */}
        <Box args={[0.24, 0.22, 0.24]} position={[0.9, 0.14, 0]} color="#ff9770" />
        <Box args={[0.08, 0.28, 0.08]} position={[0.9, 0.42, 0]} color="#a6c850" />
        <Box args={[0.08, 0.22, 0.08]} position={[0.75, 0.4, 0]} rotation={[0, 0, 0.5]} color="#a6c850" />
        <Box args={[0.08, 0.22, 0.08]} position={[1.05, 0.4, 0]} rotation={[0, 0, -0.5]} color="#a6c850" />
      </group>

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
