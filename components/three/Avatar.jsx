"use client";

import { useRef, useImperativeHandle, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";

const COLORS = {
  skin: "#f4c5a5",
  skinShadow: "#e8b492",
  hair: "#3c302d",
  hairHighlight: "#4d3d39",
  shirt: "#ff70a6",
  shirtDark: "#e85a8f",
  jeans: "#5575bb",
  jeansDark: "#4663a3",
  shoes: "#ffffff",
  shoeAccent: "#70d6ff",
  heart: "#ffffff",
  eye: "#332927",
  blush: "#e89b9b",
  mouth: "#b26d6d",
};

function Box({ args, position, rotation, color, castShadow = true }) {
  return (
    <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function PixelHeart({ position }) {
  return (
    <group position={position}>
      <Box args={[0.04, 0.04, 0.02]} position={[-0.04, 0.04, 0]} color={COLORS.heart} />
      <Box args={[0.04, 0.04, 0.02]} position={[0.04, 0.04, 0]} color={COLORS.heart} />
      <Box args={[0.04, 0.04, 0.02]} position={[-0.04, 0, 0]} color={COLORS.heart} />
      <Box args={[0.04, 0.04, 0.02]} position={[0.04, 0, 0]} color={COLORS.heart} />
      <Box args={[0.04, 0.04, 0.02]} position={[0, -0.04, 0]} color={COLORS.heart} />
    </group>
  );
}

function Curl({ position, size, color }) {
  return (
    <group position={position}>
      <Box args={size} position={[0, 0, 0]} color={color} />
      <Box
        args={[size[0] * 0.7, size[1] * 0.7, size[2] * 0.7]}
        position={[size[0] * 0.15, size[1] * 0.15, size[2] * 0.15]}
        color={COLORS.hairHighlight}
      />
    </group>
  );
}

function CurlyHair({ position }) {
  return (
    <group position={position}>
      {/* Main back volume */}
      <Box args={[1.08, 0.88, 0.98]} position={[0, 0.05, -0.12]} color={COLORS.hair} />
      <Box args={[0.95, 0.75, 0.85]} position={[0, 0.1, -0.08]} color={COLORS.hairHighlight} />

      {/* Top crown */}
      <Box args={[0.92, 0.35, 0.85]} position={[0, 0.52, 0.02]} color={COLORS.hair} />
      <Box args={[0.78, 0.25, 0.7]} position={[0, 0.62, 0.02]} color={COLORS.hair} />

      {/* Front bangs */}
      <Box args={[0.82, 0.22, 0.22]} position={[0, 0.28, 0.36]} color={COLORS.hair} />
      <Box args={[0.2, 0.3, 0.18]} position={[-0.28, 0.2, 0.34]} rotation={[0, 0, -0.3]} color={COLORS.hair} />
      <Box args={[0.2, 0.3, 0.18]} position={[0.28, 0.2, 0.34]} rotation={[0, 0, 0.3]} color={COLORS.hair} />

      {/* Side curls */}
      <Curl position={[-0.52, 0.05, 0.1]} size={[0.22, 0.55, 0.22]} color={COLORS.hair} />
      <Curl position={[0.52, 0.05, 0.1]} size={[0.22, 0.55, 0.22]} color={COLORS.hair} />

      {/* Lower side curls */}
      <Curl position={[-0.58, -0.45, -0.05]} size={[0.2, 0.45, 0.2]} color={COLORS.hair} />
      <Curl position={[0.58, -0.45, -0.05]} size={[0.2, 0.45, 0.2]} color={COLORS.hair} />

      {/* Back curls */}
      <Curl position={[-0.45, -0.25, -0.48]} size={[0.22, 0.35, 0.22]} color={COLORS.hair} />
      <Curl position={[0.45, -0.25, -0.48]} size={[0.22, 0.35, 0.22]} color={COLORS.hair} />
      <Curl position={[0, -0.35, -0.55]} size={[0.22, 0.35, 0.22]} color={COLORS.hair} />
      <Curl position={[-0.25, 0.55, -0.45]} size={[0.2, 0.25, 0.2]} color={COLORS.hair} />
      <Curl position={[0.25, 0.55, -0.45]} size={[0.2, 0.25, 0.2]} color={COLORS.hair} />

      {/* Top scattered curls */}
      <Curl position={[-0.35, 0.72, 0.15]} size={[0.18, 0.18, 0.18]} color={COLORS.hair} />
      <Curl position={[0.32, 0.7, 0.18]} size={[0.18, 0.18, 0.18]} color={COLORS.hair} />
      <Curl position={[0, 0.78, 0]} size={[0.16, 0.16, 0.16]} color={COLORS.hair} />
      <Curl position={[-0.5, 0.45, 0.25]} size={[0.16, 0.16, 0.16]} color={COLORS.hair} />
      <Curl position={[0.5, 0.45, 0.25]} size={[0.16, 0.16, 0.16]} color={COLORS.hair} />
    </group>
  );
}

const Avatar = forwardRef(function Avatar(
  { progress = 0, ...props },
  ref
) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const rightArmRef = useRef();
  const leftArmRef = useRef();
  const timeRef = useRef(0);

  useImperativeHandle(ref, () => groupRef.current);

  // Progress-driven states
  const waveAmount = Math.max(0, 1 - progress / 0.12);
  const sitAmount = Math.min(1, Math.max(0, (progress - 0.28) / 0.12));

  useFrame((state, delta) => {
    if (!rightArmRef.current) return;

    timeRef.current += delta * 5;

    // Wave while standing at start
    if (waveAmount > 0 && sitAmount < 0.5) {
      const waveAngle = Math.PI - 0.5 + Math.sin(timeRef.current) * 0.4;
      rightArmRef.current.rotation.z = waveAngle * waveAmount;
      rightArmRef.current.rotation.x = Math.sin(timeRef.current * 0.7) * 0.2 * waveAmount;
    }

    // Sitting arms forward on desk
    const targetRightZ = 0.15 * (1 - sitAmount) + 0.1 * sitAmount;
    const targetRightX = -1.1 * sitAmount;
    const targetLeftZ = -0.15 * (1 - sitAmount) - 0.1 * sitAmount;
    const targetLeftX = -1.1 * sitAmount;

    if (waveAmount <= 0) {
      rightArmRef.current.rotation.z = targetRightZ;
      rightArmRef.current.rotation.x = targetRightX;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = targetLeftZ;
      leftArmRef.current.rotation.x = targetLeftX;
    }

    // Gentle breathing only on body group
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.012;
    }
  });

  // Sitting pose
  const legRotation = [
    -Math.PI / 2 * sitAmount,
    0,
    0,
  ];
  const legPositionY = -0.92 + sitAmount * 0.35;
  const legPositionZ = sitAmount * 0.55;
  const bodyLowerY = sitAmount * -0.18;

  return (
    <group ref={groupRef} {...props}>
      <group ref={bodyRef} position={[0, bodyLowerY, 0]}>
        {/* LEGS */}
        <group position={[0, legPositionY, legPositionZ]} rotation={legRotation}>
          <Box args={[0.28, 0.9, 0.32]} position={[-0.19, 0, 0]} color={COLORS.jeans} />
          <Box args={[0.28, 0.9, 0.32]} position={[0.19, 0, 0]} color={COLORS.jeans} />
          <Box args={[0.22, 0.25, 0.02]} position={[-0.19, -0.2, 0.17]} color={COLORS.jeansDark} />
          <Box args={[0.22, 0.25, 0.02]} position={[0.19, -0.2, 0.17]} color={COLORS.jeansDark} />
        </group>

        {/* SHOES - hide when sitting */}
        <group position={[0, -1.38, 0.06]} visible={sitAmount < 0.5}>
          <Box args={[0.36, 0.16, 0.48]} position={[-0.19, 0, 0]} color={COLORS.shoes} />
          <Box args={[0.36, 0.16, 0.48]} position={[0.19, 0, 0]} color={COLORS.shoes} />
          <Box args={[0.36, 0.04, 0.06]} position={[-0.19, -0.07, 0.12]} color={COLORS.shoeAccent} />
          <Box args={[0.36, 0.04, 0.06]} position={[0.19, -0.07, 0.12]} color={COLORS.shoeAccent} />
          <Box args={[0.36, 0.04, 0.48]} position={[-0.19, -0.08, 0]} color="#eeeeee" />
          <Box args={[0.36, 0.04, 0.48]} position={[0.19, -0.08, 0]} color="#eeeeee" />
        </group>

        {/* BODY / SHIRT */}
        <Box args={[0.82, 0.95, 0.48]} position={[0, 0.24, 0]} color={COLORS.shirt} />
        <Box args={[0.84, 0.08, 0.5]} position={[0, -0.22, 0]} color={COLORS.shirtDark} />
        <PixelHeart position={[0, 0.36, 0.245]} />

        {/* ARMS */}
        <group ref={rightArmRef} position={[-0.48, 0.5, 0]}>
          <Box args={[0.26, 0.28, 0.26]} position={[0, 0.16, 0]} color={COLORS.shirt} />
          <Box args={[0.2, 0.82, 0.2]} position={[0, -0.32, 0]} color={COLORS.skin} />
          <Box args={[0.22, 0.2, 0.2]} position={[0, -0.86, 0]} color={COLORS.skinShadow} />
        </group>
        <group ref={leftArmRef} position={[0.48, 0.5, 0]}>
          <Box args={[0.26, 0.28, 0.26]} position={[0, 0.16, 0]} color={COLORS.shirt} />
          <Box args={[0.2, 0.82, 0.2]} position={[0, -0.32, 0]} color={COLORS.skin} />
          <Box args={[0.22, 0.2, 0.2]} position={[0, -0.86, 0]} color={COLORS.skinShadow} />
        </group>

        {/* HEAD */}
        <Box args={[0.72, 0.72, 0.7]} position={[0, 1.08, 0]} color={COLORS.skin} />
        <Box args={[0.5, 0.1, 0.02]} position={[0, 0.76, 0.36]} color={COLORS.skinShadow} />

        {/* FACE - bigger happy closed eyes */}
        <Box args={[0.11, 0.05, 0.03]} position={[-0.2, 1.12, 0.36]} rotation={[0, 0, -0.25]} color={COLORS.eye} />
        <Box args={[0.11, 0.05, 0.03]} position={[0.2, 1.12, 0.36]} rotation={[0, 0, 0.25]} color={COLORS.eye} />

        {/* Blush */}
        <Box args={[0.12, 0.07, 0.02]} position={[-0.3, 0.98, 0.36]} color={COLORS.blush} />
        <Box args={[0.12, 0.07, 0.02]} position={[0.3, 0.98, 0.36]} color={COLORS.blush} />

        {/* Smile */}
        <mesh position={[0, 0.9, 0.36]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.24, 0.05, 0.025]} />
          <meshStandardMaterial color={COLORS.mouth} />
        </mesh>
        <Box args={[0.05, 0.05, 0.02]} position={[-0.11, 0.92, 0.36]} rotation={[0, 0, -0.4]} color={COLORS.mouth} />
        <Box args={[0.05, 0.05, 0.02]} position={[0.11, 0.92, 0.36]} rotation={[0, 0, 0.4]} color={COLORS.mouth} />

        {/* HAIR */}
        <CurlyHair position={[0, 1.06, 0]} />
      </group>
    </group>
  );
});

export default Avatar;
