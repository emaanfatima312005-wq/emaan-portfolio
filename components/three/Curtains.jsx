"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function CurtainPanel({
  side,
  groupRef,
  panelWidth,
  height,
}) {
  return (
    <group ref={groupRef}>
      {/* MAIN FABRIC */}
      <RoundedBox
        args={[
          panelWidth,
          height,
          0.1,
        ]}
        radius={0.055}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#CFB9F7"
          roughness={0.9}
        />
      </RoundedBox>

      {/* FABRIC FOLDS */}

      {[-0.3, -0.1, 0.1, 0.3].map(
        (offset) => (
          <RoundedBox
            key={offset}
            args={[
              0.035,
              height * 0.94,
              0.115,
            ]}
            position={[
              offset * panelWidth,
              0,
              0.025,
            ]}
            radius={0.015}
            smoothness={3}
          >
            <meshStandardMaterial
              color={
                side === "left"
                  ? "#D4B0F9"
                  : "#C580ED"
              }
              roughness={0.9}
            />
          </RoundedBox>
        )
      )}
    </group>
  );
}

export default function Curtains({
  isNight,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 2.4,
  height = 1.8,
}) {
  const leftRef = useRef();
  const rightRef = useRef();

  const panelWidth =
    width / 2 + 0.08;

  useFrame((_, delta) => {
    const smoothing =
      1 - Math.exp(-delta * 4.5);

    const closedX = width * 0.25;
    const openX = width * 0.49;

    const targetScale =
      isNight ? 1 : 0.38;

    if (leftRef.current) {
      leftRef.current.position.x =
        THREE.MathUtils.lerp(
          leftRef.current.position.x,
          isNight
            ? -closedX
            : -openX,
          smoothing
        );

      leftRef.current.scale.x =
        THREE.MathUtils.lerp(
          leftRef.current.scale.x,
          targetScale,
          smoothing
        );
    }

    if (rightRef.current) {
      rightRef.current.position.x =
        THREE.MathUtils.lerp(
          rightRef.current.position.x,
          isNight
            ? closedX
            : openX,
          smoothing
        );

      rightRef.current.scale.x =
        THREE.MathUtils.lerp(
          rightRef.current.scale.x,
          targetScale,
          smoothing
        );
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
    >
      {/* CURTAIN ROD */}

      <RoundedBox
        args={[
          width + 0.35,
          0.055,
          0.075,
        ]}
        position={[
          0,
          height / 2 + 0.12,
          0,
        ]}
        radius={0.025}
        smoothness={3}
      >
        <meshStandardMaterial
          color="#A480F2"
          roughness={0.5}
          metalness={0.15}
        />
      </RoundedBox>

      <CurtainPanel
        side="left"
        groupRef={leftRef}
        panelWidth={panelWidth}
        height={height}
      />

      <CurtainPanel
        side="right"
        groupRef={rightRef}
        panelWidth={panelWidth}
        height={height}
      />
    </group>
  );
}