"use client";

import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* =====================================================
   COLORS
===================================================== */

const COLORS = {
  skin: "#f4c5a5",
  skinShadow: "#e8b492",

  hair: "#3c302d",
  hairHighlight: "#4d3d39",

  kurta: "#9fd8f5",
  kurtaLight: "#b9e5fa",
  kurtaDark: "#70bce4",

  pants: "#5575bb",
  pantsDark: "#4663a3",

  dupatta: "#aadff7",
  dupattaShadow: "#84ccea",

  pink: "#ff70a6",
  cream: "#fff4e8",

  shoes: "#ffffff",
  shoeAccent: "#70d6ff",

  eye: "#332927",
  brow: "#4a342f",
  blush: "#eea3ad",

  mouth: "#a65b68",
  mouthInner: "#ffb0c5",

  earringMetal: "#f4f2ef",
  earringBlue: "#70d6ff",
};

/* =====================================================
   BASIC BOX
===================================================== */

function Box({
  args,
  position,
  rotation = [0, 0, 0],
  color,
  castShadow = true,
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      castShadow={castShadow}
      receiveShadow
    >
      <boxGeometry args={args} />

      <meshStandardMaterial
        color={color}
        roughness={0.8}
      />
    </mesh>
  );
}

/* =====================================================
   ROUNDED VOXEL PART
===================================================== */

function SoftBox({
  args,
  position,
  rotation = [0, 0, 0],
  color,
  radius = 0.035,
}) {
  return (
    <RoundedBox
      args={args}
      position={position}
      rotation={rotation}
      radius={radius}
      smoothness={4}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        roughness={0.82}
      />
    </RoundedBox>
  );
}

/* =====================================================
   CURVED LINE

   Used for eyes, smile, brows.
===================================================== */

function Curve({
  points,
  radius,
  color,
}) {
  const key = points.flat().join("-");

  const geometry = useMemo(() => {
    const vectors = points.map(
      ([x, y, z]) =>
        new THREE.Vector3(x, y, z)
    );

    const path =
      new THREE.CatmullRomCurve3(
        vectors
      );

    return new THREE.TubeGeometry(
      path,
      18,
      radius,
      6,
      false
    );
  }, [key, radius]);

  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.8}
      />
    </mesh>
  );
}

/* =====================================================
   FLOWER DETAIL
===================================================== */

function TinyFlower({
  position,
  color = COLORS.pink,
  scale = 1,
}) {
  const petal = [
    0.034 * scale,
    0.034 * scale,
    0.018,
  ];

  return (
    <group position={position}>
      <Box
        args={petal}
        position={[
          0,
          0.032 * scale,
          0,
        ]}
        color={color}
      />

      <Box
        args={petal}
        position={[
          0,
          -0.032 * scale,
          0,
        ]}
        color={color}
      />

      <Box
        args={petal}
        position={[
          -0.032 * scale,
          0,
          0,
        ]}
        color={color}
      />

      <Box
        args={petal}
        position={[
          0.032 * scale,
          0,
          0,
        ]}
        color={color}
      />

      <Box
        args={[
          0.025 * scale,
          0.025 * scale,
          0.022,
        ]}
        position={[0, 0, 0.006]}
        color={COLORS.cream}
      />
    </group>
  );
}

/* =====================================================
   LONG BLOCKY CURL

   This makes the deep chunky curls from the
   visual instead of a giant helmet.
===================================================== */

function CurlStrand({
  position,
  side = "left",
  length = 8,
  phase = 0,
  back = false,
  tone = "dark",
}) {
  const dir =
    side === "left" ? -1 : 1;

  const main =
    tone === "dark"
      ? COLORS.hair
      : COLORS.hairHighlight;

  const highlight =
    tone === "dark"
      ? COLORS.hairHighlight
      : COLORS.hair;

  return (
    <group
      position={position}
      rotation={[
        0,
        back
          ? dir * 0.15
          : 0,
        0,
      ]}
    >
      {Array.from({
        length,
      }).map((_, index) => {
        const wave =
          Math.sin(
            index * 1.35 +
              phase
          );

        const x =
          wave *
          0.055 *
          dir;

        const y =
          -index * 0.135;

        const z =
          Math.cos(
            index * 1.2 +
              phase
          ) *
          0.018;

        const size =
          Math.max(
            0.105,
            0.155 -
              index * 0.004
          );

        return (
          <SoftBox
            key={index}
            args={[
              size,
              0.15,
              size,
            ]}
            position={[x, y, z]}
            rotation={[
              0,
              wave * 0.18,
              wave *
                0.2 *
                dir,
            ]}
            color={
              index % 2 === 0
                ? main
                : highlight
            }
            radius={0.03}
          />
        );
      })}
    </group>
  );
}

/* =====================================================
   HAIR

   Inspired by your real hair:
   center part
   high volume
   long curls
   two face-framing curls
===================================================== */
/* =====================================================
   LONG CURL STRAND
===================================================== */

function Ringlet({
  position,
  side = "left",
  pieces = 8,
  tone = "dark",
  back = false,
}) {
  const dir = side === "left" ? -1 : 1;

  const baseColor =
    tone === "light" ? COLORS.hairHighlight : COLORS.hair;

  const secondaryColor =
    tone === "light" ? COLORS.hair : COLORS.hairHighlight;

  const length = 0.78 + pieces * 0.09;
  const waveWidth = back ? 0.085 : 0.11;
  const depthBase = back ? -0.04 : 0.02;

  const buildCurlGeometry = (
    xOffset = 0,
    zOffset = 0,
    phaseShift = 0,
    lengthScale = 1,
    widthScale = 1
  ) => {
    const pts = [];
    const total = 30;

    for (let i = 0; i <= total; i++) {
      const t = i / total;

      // side-to-side curl/wave
      const swing =
        Math.sin(t * Math.PI * 2.5 + phaseShift) *
        waveWidth *
        widthScale *
        (1 - t * 0.1);

      // small inward fall so it frames the face
      const inward = dir * 0.02 * t;

      const x = dir * swing + inward + xOffset;
      const y = -t * length * lengthScale;

      // soft depth motion
      const z =
        Math.cos(t * Math.PI * 1.9 + phaseShift) * 0.028 +
        Math.sin(t * Math.PI * 0.9 + phaseShift) * 0.012 +
        depthBase +
        zOffset;

      pts.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 52, 0.04, 10, false);
  };

  const mainGeometry = useMemo(
    () => buildCurlGeometry(0, 0, 0, 1, 1),
    [dir, length, waveWidth, depthBase]
  );

  const innerGeometry = useMemo(
    () =>
      buildCurlGeometry(
        dir * 0.03,
        0.018,
        0.5,
        0.97,
        0.82
      ),
    [dir, length, waveWidth, depthBase]
  );

  const outerGeometry = useMemo(
    () =>
      buildCurlGeometry(
        -dir * 0.026,
        -0.014,
        -0.45,
        1.03,
        0.88
      ),
    [dir, length, waveWidth, depthBase]
  );

  return (
    <group
      position={position}
      rotation={back ? [0, dir * 0.2, 0] : [0, 0, 0]}
    >
      {/* main curl */}
      <mesh geometry={mainGeometry} castShadow receiveShadow>
        <meshStandardMaterial color={baseColor} roughness={0.84} />
      </mesh>

      {/* companion strand 1 */}
      <mesh geometry={innerGeometry} castShadow receiveShadow>
        <meshStandardMaterial color={secondaryColor} roughness={0.86} />
      </mesh>

      {/* companion strand 2 */}
      <mesh geometry={outerGeometry} castShadow receiveShadow>
        <meshStandardMaterial color={baseColor} roughness={0.84} />
      </mesh>
    </group>
  );
}
function Hair() {
  return (
    <group>
      {/* =================================================
          BACK HAIR BASE

          This stays BEHIND the face.
          No hair slab across the forehead.
      ================================================= */}

      <SoftBox
        args={[0.78, 0.48, 0.42]}
        position={[0, 1.27, -0.25]}
        color={COLORS.hair}
        radius={0.045}
      />

      <SoftBox
        args={[0.64, 0.28, 0.36]}
        position={[0, 1.48, -0.18]}
        color={COLORS.hairHighlight}
        radius={0.04}
      />

      {/* =================================================
          MIDDLE PART

          Two tiny crown sections.
          They DO NOT fall onto the forehead.
      ================================================= */}

      <SoftBox
        args={[0.29, 0.14, 0.28]}
        position={[-0.17, 1.48, -0.03]}
        rotation={[0, 0, -0.08]}
        color={COLORS.hair}
        radius={0.035}
      />

      <SoftBox
        args={[0.29, 0.14, 0.28]}
        position={[0.17, 1.48, -0.03]}
        rotation={[0, 0, 0.08]}
        color={COLORS.hairHighlight}
        radius={0.035}
      />

      {/* =================================================
          TEMPLE PIECES

          Start BESIDE the forehead.
          Nothing crosses the forehead.
      ================================================= */}

      <SoftBox
        args={[0.13, 0.3, 0.16]}
        position={[-0.37, 1.25, 0.12]}
        rotation={[0, 0, -0.12]}
        color={COLORS.hair}
        radius={0.03}
      />

      <SoftBox
        args={[0.13, 0.3, 0.16]}
        position={[0.37, 1.25, 0.12]}
        rotation={[0, 0, 0.12]}
        color={COLORS.hairHighlight}
        radius={0.03}
      />

      {/* =================================================
          LEFT SIDE

          Fewer strands.
          Longer.
          More separated.
      ================================================= */}

      <Ringlet
        position={[-0.42, 1.18, 0.14]}
        side="left"
        pieces={8}
        tone="dark"
      />

      <Ringlet
        position={[-0.52, 1.07, -0.02]}
        side="left"
        pieces={9}
        tone="light"
      />

      <Ringlet
        position={[-0.58, 0.91, -0.18]}
        side="left"
        pieces={8}
        tone="dark"
        back
      />

      {/* one front face-framing curl */}

      <Ringlet
        position={[-0.34, 1.12, 0.22]}
        side="left"
        pieces={6}
        tone="light"
      />

      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <Ringlet
        position={[0.42, 1.18, 0.14]}
        side="right"
        pieces={8}
        tone="light"
      />

      <Ringlet
        position={[0.52, 1.07, -0.02]}
        side="right"
        pieces={9}
        tone="dark"
      />

      <Ringlet
        position={[0.58, 0.91, -0.18]}
        side="right"
        pieces={8}
        tone="light"
        back
      />

      {/* one front face-framing curl */}

      <Ringlet
        position={[0.34, 1.12, 0.22]}
        side="right"
        pieces={6}
        tone="dark"
      />

      {/* =================================================
          BACK HAIR DEPTH

          Only three.
          Prevents giant block curtain.
      ================================================= */}

      <Ringlet
        position={[-0.25, 1.08, -0.38]}
        side="left"
        pieces={9}
        tone="dark"
        back
      />

      <Ringlet
        position={[0, 1.12, -0.43]}
        side="left"
        pieces={9}
        tone="light"
        back
      />

      <Ringlet
        position={[0.25, 1.08, -0.38]}
        side="right"
        pieces={9}
        tone="dark"
        back
      />
    </group>
  );
}

function Face() {
  return (
    <group>
      {/* ===============================================
          FACE

          Slightly smaller than the old block head,
          but wide enough to keep the expression visible.
      =============================================== */}

      <SoftBox
        args={[0.64, 0.62, 0.58]}
        position={[0, 1.07, 0]}
        color={COLORS.skin}
        radius={0.065}
      />

      {/* ===============================================
          THIN EYEBROWS
      =============================================== */}

      <SoftBox
        args={[0.095, 0.018, 0.018]}
        position={[-0.19, 1.19, 0.3]}
        rotation={[0, 0, -0.08]}
        color={COLORS.brow ?? COLORS.hair}
        radius={0.008}
      />

      <SoftBox
        args={[0.095, 0.018, 0.018]}
        position={[0.19, 1.19, 0.3]}
        rotation={[0, 0, 0.08]}
        color={COLORS.brow ?? COLORS.hair}
        radius={0.008}
      />

      {/* ===============================================
          HAPPY CLOSED EYES
      =============================================== */}

      <SoftBox
        args={[0.105, 0.025, 0.022]}
        position={[-0.19, 1.095, 0.3]}
        rotation={[0, 0, -0.24]}
        color={COLORS.eye}
        radius={0.009}
      />

      <SoftBox
        args={[0.105, 0.025, 0.022]}
        position={[0.19, 1.095, 0.3]}
        rotation={[0, 0, 0.24]}
        color={COLORS.eye}
        radius={0.009}
      />

      {/* tiny lashes */}

      <Box
        args={[0.025, 0.012, 0.015]}
        position={[-0.255, 1.105, 0.303]}
        rotation={[0, 0, -0.42]}
        color={COLORS.eye}
      />

      <Box
        args={[0.025, 0.012, 0.015]}
        position={[0.255, 1.105, 0.303]}
        rotation={[0, 0, 0.42]}
        color={COLORS.eye}
      />

      {/* ===============================================
          SMALL BLUSH
      =============================================== */}

      <SoftBox
        args={[0.085, 0.04, 0.018]}
        position={[-0.265, 0.995, 0.3]}
        color={COLORS.blush}
        radius={0.012}
      />

      <SoftBox
        args={[0.085, 0.04, 0.018]}
        position={[0.265, 0.995, 0.3]}
        color={COLORS.blush}
        radius={0.012}
      />

      {/* ===============================================
          BIG HAPPY SMILE

          Much closer to the personality in your photo.
      =============================================== */}

      <SoftBox
        args={[0.18, 0.075, 0.024]}
        position={[0, 0.91, 0.31]}
        color={COLORS.mouth}
        radius={0.026}
      />

      {/* light smile center */}

      <SoftBox
        args={[0.095, 0.022, 0.014]}
        position={[0, 0.89, 0.326]}
        color="#f8c0c7"
        radius={0.008}
      />

      {/* ===============================================
          YOUR BLUE DANGLING EARRINGS
      =============================================== */}

      <Box
        args={[0.018, 0.1, 0.018]}
        position={[-0.37, 0.99, 0.07]}
        color="#f5f1ea"
      />

      <Box
        args={[0.018, 0.1, 0.018]}
        position={[0.37, 0.99, 0.07]}
        color="#f5f1ea"
      />

      <SoftBox
        args={[0.075, 0.075, 0.035]}
        position={[-0.37, 0.91, 0.07]}
        color="#70d6ff"
        radius={0.018}
      />

      <SoftBox
        args={[0.075, 0.075, 0.035]}
        position={[0.37, 0.91, 0.07]}
        color="#70d6ff"
        radius={0.018}
      />
    </group>
  );
}

/* =====================================================
   AVATAR
===================================================== */

const Avatar = forwardRef(
  function Avatar(
    {
      progress = 0,
      ...props
    },
    ref
  ) {
    const groupRef = useRef();
    const bodyRef = useRef();

    const rightArmRef =
      useRef();

    const leftArmRef =
      useRef();

    const timeRef =
      useRef(0);

    useImperativeHandle(
      ref,
      () => groupRef.current
    );

    /* ==================================================
       EXISTING SCROLL STATES
    ================================================== */

    const waveAmount =
      Math.max(
        0,
        1 - progress / 0.12
      );

    const sitAmount =
      Math.min(
        1,
        Math.max(
          0,
          (progress - 0.28) /
            0.12
        )
      );

    /* ==================================================
       EXISTING ANIMATION
    ================================================== */

    useFrame(
      (state, delta) => {
        if (
          !rightArmRef.current
        )
          return;

        timeRef.current +=
          delta * 5;

        /* wave */

        if (
          waveAmount > 0 &&
          sitAmount < 0.5
        ) {
          const waveAngle =
            Math.PI -
            0.5 +
            Math.sin(
              timeRef.current
            ) *
              0.4;

          rightArmRef.current.rotation.z =
            waveAngle *
            waveAmount;

          rightArmRef.current.rotation.x =
            Math.sin(
              timeRef.current *
                0.7
            ) *
            0.2 *
            waveAmount;
        }

        /* seated arms */

        const targetRightZ =
          0.15 *
            (1 -
              sitAmount) +
          0.1 *
            sitAmount;

        const targetRightX =
          -1.1 *
          sitAmount;

        const targetLeftZ =
          -0.15 *
            (1 -
              sitAmount) -
          0.1 *
            sitAmount;

        const targetLeftX =
          -1.1 *
          sitAmount;

        if (
          waveAmount <= 0
        ) {
          rightArmRef.current.rotation.z =
            targetRightZ;

          rightArmRef.current.rotation.x =
            targetRightX;
        }

        if (
          leftArmRef.current
        ) {
          leftArmRef.current.rotation.z =
            targetLeftZ;

          leftArmRef.current.rotation.x =
            targetLeftX;
        }

        /* breathing */

        if (
          bodyRef.current
        ) {
          bodyRef.current.position.y =
            Math.sin(
              state.clock
                .elapsedTime * 2
            ) * 0.012;
        }
      }
    );

    /* ==================================================
       EXISTING SIT
    ================================================== */

    const legRotation = [
      (-Math.PI / 2) *
        sitAmount,
      0,
      0,
    ];

    const legPositionY =
      -0.92 +
      sitAmount * 0.35;

    const legPositionZ =
      sitAmount * 0.55;

    const bodyLowerY =
      sitAmount * -0.18;

    return (
      <group
        ref={groupRef}
        {...props}
      >
        <group
          ref={bodyRef}
          position={[
            0,
            bodyLowerY,
            0,
          ]}
        >
          {/* ===================================
              LEGS / BLUE PANTS
          =================================== */}

          <group
            position={[
              0,
              legPositionY,
              legPositionZ,
            ]}
            rotation={
              legRotation
            }
          >
            <SoftBox
              args={[
                0.3,
                0.9,
                0.34,
              ]}
              position={[
                -0.19,
                0,
                0,
              ]}
              color={
                COLORS.pants
              }
              radius={0.035}
            />

            <SoftBox
              args={[
                0.3,
                0.9,
                0.34,
              ]}
              position={[
                0.19,
                0,
                0,
              ]}
              color={
                COLORS.pants
              }
              radius={0.035}
            />

            <Box
              args={[
                0.23,
                0.18,
                0.025,
              ]}
              position={[
                -0.19,
                -0.19,
                0.18,
              ]}
              color={
                COLORS.pantsDark
              }
            />

            <Box
              args={[
                0.23,
                0.18,
                0.025,
              ]}
              position={[
                0.19,
                -0.19,
                0.18,
              ]}
              color={
                COLORS.pantsDark
              }
            />
          </group>

          {/* ===================================
              SHOES
          =================================== */}

          <group
            position={[
              0,
              -1.38,
              0.06,
            ]}
            visible={
              sitAmount < 0.5
            }
          >
            <SoftBox
              args={[
                0.36,
                0.16,
                0.48,
              ]}
              position={[
                -0.19,
                0,
                0,
              ]}
              color={
                COLORS.shoes
              }
              radius={0.03}
            />

            <SoftBox
              args={[
                0.36,
                0.16,
                0.48,
              ]}
              position={[
                0.19,
                0,
                0,
              ]}
              color={
                COLORS.shoes
              }
              radius={0.03}
            />

            <Box
              args={[
                0.36,
                0.04,
                0.08,
              ]}
              position={[
                -0.19,
                -0.06,
                0.15,
              ]}
              color={
                COLORS.shoeAccent
              }
            />

            <Box
              args={[
                0.36,
                0.04,
                0.08,
              ]}
              position={[
                0.19,
                -0.06,
                0.15,
              ]}
              color={
                COLORS.shoeAccent
              }
            />
          </group>

          {/* ===================================
              LONG BLUE KURTA
          =================================== */}

          <SoftBox
            args={[
              0.83,
              0.9,
              0.47,
            ]}
            position={[
              0,
              0.25,
              0,
            ]}
            color={
              COLORS.kurta
            }
            radius={0.045}
          />

          {/* lower kurta */}

          <SoftBox
            args={[
              0.89,
              0.52,
              0.49,
            ]}
            position={[
              0,
              -0.36,
              0,
            ]}
            color={
              COLORS.kurta
            }
            radius={0.04}
          />

          {/* ===================================
              DUPATTA
          =================================== */}

          <SoftBox
            args={[
              0.86,
              0.12,
              0.54,
            ]}
            position={[
              0,
              0.66,
              0.025,
            ]}
            rotation={[
              0,
              0,
              -0.05,
            ]}
            color={
              COLORS.dupatta
            }
            radius={0.035}
          />

          <SoftBox
            args={[
              0.72,
              0.1,
              0.55,
            ]}
            position={[
              0.08,
              0.58,
              0.05,
            ]}
            rotation={[
              0,
              0,
              -0.13,
            ]}
            color={
              COLORS.dupattaShadow
            }
            radius={0.03}
          />

          {/* ===================================
              KURTA CENTER EMBROIDERY
          =================================== */}

          <Box
            args={[
              0.055,
              0.55,
              0.025,
            ]}
            position={[
              0,
              0.28,
              0.25,
            ]}
            color={
              COLORS.cream
            }
          />

          {[
            0.48,
            0.38,
            0.28,
            0.18,
            0.08,
          ].map(
            (y, index) => (
              <SoftBox
                key={y}
                args={[
                  0.055,
                  0.055,
                  0.03,
                ]}
                position={[
                  0,
                  y,
                  0.268,
                ]}
                color={
                  index % 2 ===
                  0
                    ? COLORS.pink
                    : COLORS.cream
                }
                radius={0.012}
              />
            )
          )}

          {/* ===================================
              FLORAL EMBROIDERY
          =================================== */}

          <TinyFlower
            position={[
              -0.27,
              0.37,
              0.25,
            ]}
          />

          <TinyFlower
            position={[
              0.3,
              0.18,
              0.25,
            ]}
          />

          <TinyFlower
            position={[
              -0.24,
              -0.02,
              0.25,
            ]}
            color={
              COLORS.cream
            }
          />

          <TinyFlower
            position={[
              0.24,
              -0.18,
              0.25,
            ]}
          />

          <TinyFlower
            position={[
              -0.31,
              -0.38,
              0.25,
            ]}
          />

          {/* ===================================
              ARMS — LONG KURTA SLEEVES
          =================================== */}

          <group
            ref={rightArmRef}
            position={[
              -0.48,
              0.5,
              0,
            ]}
          >
            <SoftBox
              args={[
                0.27,
                0.66,
                0.27,
              ]}
              position={[
                0,
                -0.18,
                0,
              ]}
              color={
                COLORS.kurta
              }
              radius={0.035}
            />

            {/* embroidered cuff */}

            <Box
              args={[
                0.28,
                0.08,
                0.28,
              ]}
              position={[
                0,
                -0.51,
                0,
              ]}
              color={
                COLORS.dupattaShadow
              }
            />

            {/* hand */}

            <SoftBox
              args={[
                0.2,
                0.22,
                0.2,
              ]}
              position={[
                0,
                -0.66,
                0,
              ]}
              color={
                COLORS.skin
              }
              radius={0.03}
            />
          </group>

          <group
            ref={leftArmRef}
            position={[
              0.48,
              0.5,
              0,
            ]}
          >
            <SoftBox
              args={[
                0.27,
                0.66,
                0.27,
              ]}
              position={[
                0,
                -0.18,
                0,
              ]}
              color={
                COLORS.kurta
              }
              radius={0.035}
            />

            <Box
              args={[
                0.28,
                0.08,
                0.28,
              ]}
              position={[
                0,
                -0.51,
                0,
              ]}
              color={
                COLORS.dupattaShadow
              }
            />

            <SoftBox
              args={[
                0.2,
                0.22,
                0.2,
              ]}
              position={[
                0,
                -0.66,
                0,
              ]}
              color={
                COLORS.skin
              }
              radius={0.03}
            />
          </group>

          {/* ===================================
              FACE
          =================================== */}

          <Face />

          {/* ===================================
              HAIR
          =================================== */}

          <Hair />
        </group>
      </group>
    );
  }
);

export default Avatar;