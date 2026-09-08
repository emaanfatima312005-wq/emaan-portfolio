"use client";

function Box({ args, position, rotation, color, castShadow = true, receiveShadow = true }) {
  return (
    <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow={receiveShadow}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Chair() {
  return (
    <group position={[0.2, -0.4, 1.1]}>
      {/* Backrest */}
      <Box args={[0.95, 1.1, 0.18]} position={[0, 0.55, 0]} color="#70d6ff" />
      {/* Seat */}
      <Box args={[1.05, 0.18, 0.95]} position={[0, 0, 0.25]} color="#ff9770" />
      {/* Pole */}
      <Box args={[0.12, 0.8, 0.12]} position={[0, -0.48, 0.2]} color="#aeb4bc" />
      {/* Base */}
      <Box args={[0.95, 0.08, 0.2]} position={[0, -0.88, 0.2]} color="#9da7ae" />

      {/* Crochet blanket draped over the back */}
      <group position={[0, 0.55, 0.12]}>
        <Box args={[0.9, 0.55, 0.04]} position={[0, 0, 0]} color="#ffd670" />
        {/* Crochet pattern: little squares */}
        {[
          [-0.3, 0.15], [0, 0.15], [0.3, 0.15],
          [-0.3, -0.1], [0, -0.1], [0.3, -0.1],
        ].map(([x, y], i) => (
          <Box key={i} args={[0.1, 0.1, 0.02]} position={[x, y, 0.03]} color="#ffffff" />
        ))}
      </group>

      {/* A small crochet heart on the seat */}
      <group position={[0.22, 0.1, 0.28]}>
        <Box args={[0.06, 0.06, 0.02]} position={[-0.03, 0.03, 0]} color="#ff70a6" />
        <Box args={[0.06, 0.06, 0.02]} position={[0.03, 0.03, 0]} color="#ff70a6" />
        <Box args={[0.06, 0.06, 0.02]} position={[-0.03, -0.03, 0]} color="#ff70a6" />
        <Box args={[0.06, 0.06, 0.02]} position={[0.03, -0.03, 0]} color="#ff70a6" />
        <Box args={[0.06, 0.06, 0.02]} position={[0, -0.06, 0]} color="#ff70a6" />
      </group>
    </group>
  );
}
