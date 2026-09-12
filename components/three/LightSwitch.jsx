"use client";

import { useState } from "react";
import {
  RoundedBox,
  useCursor,
} from "@react-three/drei";

export default function LightSwitch({
  isNight,
  onToggle,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) {
  const [hovered, setHovered] =
    useState(false);

  useCursor(hovered);

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() =>
        setHovered(false)
      }
    >
      {/* WALL PLATE */}
      <RoundedBox
        args={[0.28, 0.38, 0.055]}
        radius={0.035}
        smoothness={4}
      >
        <meshStandardMaterial
          color={
            isNight
              ? "#CFB9F7"
              : "#FBBCEE"
          }
          roughness={0.65}
        />
      </RoundedBox>

      {/* SWITCH ROCKER */}
      <RoundedBox
        args={[0.13, 0.22, 0.075]}
        position={[
          0,
          isNight ? -0.025 : 0.025,
          0.055,
        ]}
        rotation={[
          isNight ? -0.2 : 0.2,
          0,
          0,
        ]}
        radius={0.025}
        smoothness={4}
      >
        <meshStandardMaterial
          color={
            isNight
              ? "#A480F2"
              : "#ffffff"
          }
          roughness={0.5}
          emissive={
            isNight
              ? "#C580ED"
              : "#000000"
          }
          emissiveIntensity={
            isNight ? 0.6 : 0
          }
        />
      </RoundedBox>

      {/* LITTLE STATUS LIGHT */}
      <mesh
        position={[
          0,
          -0.145,
          0.075,
        ]}
      >
        <sphereGeometry
          args={[0.018, 16, 16]}
        />

        <meshBasicMaterial
          color={
            isNight
              ? "#F78ECF"
              : "#D4B0F9"
          }
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}