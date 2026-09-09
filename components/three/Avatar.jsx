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
   LONG CURL STRAND
===================================================== */

function Ringlet({
  position,
  side = "left",
  loops = 4.5,
  length = 1.15,
  radius = 0.075,
  thickness = 0.024,
  tone = "dark",
  back = false,
}) {
  const dir = side === "left" ? -1 : 1;

  const baseColor =
    tone === "light"
      ? COLORS.hairHighlight
      : COLORS.hair;

  const secondColor =
    tone === "light"
      ? COLORS.hair
      : COLORS.hairHighlight;

  const depthShift = back ? -0.06 : 0.02;

  const makeCoil = (
    xOffset = 0,
    zOffset = 0,
    phase = 0,
    radiusScale = 1,
    lengthScale = 1,
    tubeScale = 1
  ) => {
    const coilPoints = [];
    const total = 60;

    /* =========================================
       ORIGINAL COIL
       SAME SHAPE YOU ALREADY LIKE
    ========================================= */

    for (let i = 0; i <= total; i++) {
      const t = i / total;

      const angle =
        t * Math.PI * 2 * loops + phase;

      const taper = 1 - t * 0.18;

      const r =
        radius *
        radiusScale *
        taper;

      const x =
        dir *
          (Math.cos(angle) *
            r *
            0.95) +
        xOffset +
        dir * 0.012 * t;

      const y =
        -t *
        length *
        lengthScale;

      const z =
        Math.sin(angle) *
          r *
          0.72 +
        depthShift +
        zOffset;

      coilPoints.push(
        new THREE.Vector3(
          x,
          y,
          z
        )
      );
    }

    /* =========================================
       NEW ROOT CONNECTION

       These points begin INSIDE the crown,
       then smoothly flow into the first point
       of the existing curl.
    ========================================= */

    const first =
      coilPoints[0];

        const rootTop =
      new THREE.Vector3(
        xOffset +
          dir *
            radius *
            radiusScale *
            0.12,
        0.08,
        depthShift +
          zOffset -
          0.11
      );

    const rootMiddle =
      new THREE.Vector3(
        xOffset +
          dir *
            radius *
            radiusScale *
            0.24,
        0.035,
        depthShift +
          zOffset -
          0.07
      );

    const rootLower =
      new THREE.Vector3(
        THREE.MathUtils.lerp(
          rootMiddle.x,
          first.x,
          0.78
        ),
        0.01,
        THREE.MathUtils.lerp(
          rootMiddle.z,
          first.z,
          0.78
        )
      );

    /* root + original curl become ONE continuous strand */

    const points = [
      rootTop,
      rootMiddle,
      rootLower,
      ...coilPoints,
    ];

    const curve =
      new THREE.CatmullRomCurve3(
        points
      );

    return new THREE.TubeGeometry(
      curve,
      96,
      thickness * tubeScale,
      12,
      false
    );
  };

  const geo1 = useMemo(
    () =>
      makeCoil(
        0,
        0,
        0,
        1,
        1,
        1
      ),
    [
      dir,
      loops,
      length,
      radius,
      thickness,
      depthShift,
    ]
  );

  const geo2 = useMemo(
    () =>
      makeCoil(
        dir * 0.026,
        0.02,
        0.7,
        0.82,
        0.96,
        0.82
      ),
    [
      dir,
      loops,
      length,
      radius,
      thickness,
      depthShift,
    ]
  );

  const geo3 = useMemo(
    () =>
      makeCoil(
        -dir * 0.024,
        -0.015,
        -0.55,
        0.88,
        1.02,
        0.78
      ),
    [
      dir,
      loops,
      length,
      radius,
      thickness,
      depthShift,
    ]
  );

  return (
    <group
      position={position}
      rotation={
        back
          ? [
              0,
              dir * 0.18,
              0,
            ]
          : [0, 0, 0]
      }
    >
      <mesh
        geometry={geo1}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={baseColor}
          roughness={0.84}
        />
      </mesh>

      <mesh
        geometry={geo2}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={secondColor}
          roughness={0.86}
        />
      </mesh>

      <mesh
        geometry={geo3}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={baseColor}
          roughness={0.84}
        />
      </mesh>
    </group>
  );
}


/* =====================================================
   BACK CROWN RINGLET

   Same coily hair language as Ringlet, but this version
   has NO upward root. It follows the curved back surface
   of the scalp so it fills the exposed oval instead of
   standing on top of the head.
===================================================== */

/* =====================================================
   CROWN SURFACE CURL

   These curls physically follow the rounded surface
   of the brown crown. They do NOT stand upward and
   they do NOT hang behind it.
===================================================== */

function CrownSurfaceCurl({
  baseX = 0,
  yTop = 1.5,
  yBottom = 1.14,
  turns = 2.8,
  phase = 0,
  tone = "dark",
  thickness = 0.022,
}) {
  const baseColor =
    tone === "light"
      ? COLORS.hairHighlight
      : COLORS.hair;

  const secondColor =
    tone === "light"
      ? COLORS.hair
      : COLORS.hairHighlight;

  /*
    THESE NUMBERS MATCH YOUR EXISTING CROWN:

    position={[0, 1.25, -0.09]}
    scale={[0.42, 0.31, 0.35]}
  */

  const centerX = 0;
  const centerY = 1.25;
  const centerZ = -0.09;

  const radiusX = 0.42;
  const radiusY = 0.31;
  const radiusZ = 0.35;

  const buildCurl = (
    xOffset = 0,
    phaseOffset = 0,
    tubeScale = 1
  ) => {
    const points = [];
    const total = 70;

    for (let i = 0; i <= total; i++) {
      const t = i / total;

      const y =
        THREE.MathUtils.lerp(
          yTop,
          yBottom,
          t
        );

      /*
        Small left/right coil movement.
        This gives us visible curls instead of straight strips.
      */
      const wave =
        Math.sin(
          t * Math.PI * 2 * turns +
            phase +
            phaseOffset
        ) * 0.026;

      const x =
        baseX +
        xOffset +
        wave;

      /*
        Calculate the BACK surface of the exact
        ellipsoid used as your brown crown.
      */

      const nx =
        (x - centerX) / radiusX;

      const ny =
        (y - centerY) / radiusY;

      const surface =
        Math.max(
          0.01,
          1 -
            nx * nx -
            ny * ny
        );

      /*
        Negative Z = BACK of the crown.

        -0.018 pushes the curl JUST outside the brown
        sphere so it renders visibly over the crown.
      */

      const z =
        centerZ -
        radiusZ *
          Math.sqrt(surface) -
        0.018;

      points.push(
        new THREE.Vector3(
          x,
          y,
          z
        )
      );
    }

    const curve =
      new THREE.CatmullRomCurve3(
        points
      );

    return new THREE.TubeGeometry(
      curve,
      90,
      thickness * tubeScale,
      10,
      false
    );
  };

  const mainGeo = useMemo(
    () =>
      buildCurl(
        0,
        0,
        1
      ),
    [
      baseX,
      yTop,
      yBottom,
      turns,
      phase,
      thickness,
    ]
  );

  const leftGeo = useMemo(
    () =>
      buildCurl(
        -0.018,
        0.6,
        0.78
      ),
    [
      baseX,
      yTop,
      yBottom,
      turns,
      phase,
      thickness,
    ]
  );

  const rightGeo = useMemo(
    () =>
      buildCurl(
        0.018,
        -0.55,
        0.78
      ),
    [
      baseX,
      yTop,
      yBottom,
      turns,
      phase,
      thickness,
    ]
  );

  return (
    <group>
      <mesh
        geometry={mainGeo}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={baseColor}
          roughness={0.84}
        />
      </mesh>

      <mesh
        geometry={leftGeo}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={secondColor}
          roughness={0.86}
        />
      </mesh>

      <mesh
        geometry={rightGeo}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={baseColor}
          roughness={0.84}
        />
      </mesh>
    </group>
  );
}

/* =====================================================
   HAIR
===================================================== */

function Hair() {
  return (
    <group>
      {/* =================================================
          REAL SCALP CAP

          This is the important fix.

          It wraps across the top of the head and extends
          toward the hairline, but stays BEHIND the face
          features so it won't cover the eyes/brows.
      ================================================= */}

      <mesh
        position={[0, 1.25, -0.09]}
        scale={[0.42, 0.31, 0.35]}
        castShadow
        receiveShadow
      >
        
        <sphereGeometry
          args={[
            1,
            32,
            24,
            0,
            Math.PI * 2,
            0,
            Math.PI * 0.62,
          ]}
        />

        <meshStandardMaterial
          color={COLORS.hair}
          roughness={0.82}
        />
      </mesh>

      {/* subtle back volume */}
      <mesh
        position={[0, 1.24, -0.23]}
        scale={[0.43, 0.3, 0.29]}
        castShadow
        receiveShadow
      >
        <sphereGeometry
          args={[
            1,
            28,
            20,
            0,
            Math.PI * 2,
            0,
            Math.PI * 0.62,
          ]}
        />

        <meshStandardMaterial
          color={COLORS.hairHighlight}
          roughness={0.84}
        />
      </mesh>

      {/* =================================================
          BACK OVAL RINGLET FILL
          FULL OVAL COVER VERSION

          This version places MORE ringlets directly
          on the exposed oval so the crown gets covered
          instead of only framed.
      ================================================= */}

      {/* TOP OVAL COVER ROW */}
      <Ringlet
        position={[-0.26, 1.37, -0.13]}
        side="left"
        loops={2.8}
        length={0.92}
        radius={0.058}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[-0.1, 1.39, -0.14]}
        side="left"
        loops={2.95}
        length={0.98}
        radius={0.06}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[0.08, 1.39, -0.14]}
        side="right"
        loops={2.95}
        length={0.98}
        radius={0.06}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.25, 1.37, -0.13]}
        side="right"
        loops={2.8}
        length={0.92}
        radius={0.058}
        thickness={0.022}
        tone="light"
        back
      />

      {/* INNER OVAL COVER ROW */}
      <Ringlet
        position={[-0.31, 1.31, -0.17]}
        side="left"
        loops={2.95}
        length={1.0}
        radius={0.06}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[-0.16, 1.31, -0.18]}
        side="left"
        loops={3.05}
        length={1.05}
        radius={0.061}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0, 1.32, -0.19]}
        side="left"
        loops={3.15}
        length={1.08}
        radius={0.062}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[0.16, 1.31, -0.18]}
        side="right"
        loops={3.05}
        length={1.05}
        radius={0.061}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.31, 1.31, -0.17]}
        side="right"
        loops={2.95}
        length={1.0}
        radius={0.06}
        thickness={0.022}
        tone="light"
        back
      />

      {/* CENTER OVAL DENSITY ROW */}
      <Ringlet
        position={[-0.24, 1.25, -0.24]}
        side="left"
        loops={3.1}
        length={1.02}
        radius={0.061}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[-0.08, 1.24, -0.26]}
        side="left"
        loops={3.15}
        length={1.08}
        radius={0.062}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[0.08, 1.24, -0.26]}
        side="right"
        loops={3.15}
        length={1.08}
        radius={0.062}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.24, 1.25, -0.24]}
        side="right"
        loops={3.1}
        length={1.02}
        radius={0.061}
        thickness={0.022}
        tone="light"
        back
      />

      {/* DEEP BACK FILL ROW */}
      <Ringlet
        position={[-0.18, 1.18, -0.31]}
        side="left"
        loops={3.1}
        length={1.08}
        radius={0.062}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0, 1.18, -0.33]}
        side="left"
        loops={3.2}
        length={1.12}
        radius={0.063}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[0.18, 1.18, -0.31]}
        side="right"
        loops={3.1}
        length={1.08}
        radius={0.062}
        thickness={0.022}
        tone="dark"
        back
      />

      {/* LOWER BLEND INTO MAIN HAIR */}
      <Ringlet
        position={[-0.28, 1.1, -0.34]}
        side="left"
        loops={3.05}
        length={1.05}
        radius={0.06}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[-0.1, 1.08, -0.37]}
        side="left"
        loops={3.15}
        length={1.12}
        radius={0.062}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.1, 1.08, -0.37]}
        side="right"
        loops={3.15}
        length={1.12}
        radius={0.062}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[0.28, 1.1, -0.34]}
        side="right"
        loops={3.05}
        length={1.05}
        radius={0.06}
        thickness={0.022}
        tone="dark"
        back
      />
         {/* =================================================
    FULL CROWN CONNECTOR LAYER

    Short curls across the ENTIRE hairline so every
    long curl visually grows from the crown.
================================================= */}

{/* FAR LEFT ROOT */}
<Ringlet
  position={[-0.53, 1.28, -0.04]}
  side="left"
  loops={1.8}
  length={0.4}
  radius={0.052}
  thickness={0.022}
  tone="dark"
  back
/>

{/* LEFT OUTER ROOT */}
<Ringlet
  position={[-0.45, 1.31, 0.02]}
  side="left"
  loops={1.75}
  length={0.4}
  radius={0.053}
  thickness={0.022}
  tone="light"
/>

{/* LEFT MID ROOT */}
<Ringlet
  position={[-0.36, 1.34, 0.07]}
  side="left"
  loops={1.7}
  length={0.38}
  radius={0.052}
  thickness={0.022}
  tone="dark"
/>

{/* LEFT INNER ROOT */}
<Ringlet
  position={[-0.27, 1.37, 0.1]}
  side="left"
  loops={1.65}
  length={0.36}
  radius={0.05}
  thickness={0.021}
  tone="light"
/>

{/* LEFT CENTER ROOT */}
<Ringlet
  position={[-0.17, 1.39, 0.1]}
  side="left"
  loops={1.55}
  length={0.34}
  radius={0.048}
  thickness={0.021}
  tone="dark"
/>

{/* LEFT CENTER-BACK ROOT */}
<Ringlet
  position={[-0.08, 1.37, -0.02]}
  side="left"
  loops={1.65}
  length={0.36}
  radius={0.049}
  thickness={0.021}
  tone="light"
  back
/>

{/* RIGHT CENTER-BACK ROOT */}
<Ringlet
  position={[0.08, 1.37, -0.02]}
  side="right"
  loops={1.65}
  length={0.36}
  radius={0.049}
  thickness={0.021}
  tone="dark"
  back
/>

{/* RIGHT CENTER ROOT */}
<Ringlet
  position={[0.17, 1.39, 0.1]}
  side="right"
  loops={1.55}
  length={0.34}
  radius={0.048}
  thickness={0.021}
  tone="light"
/>

{/* RIGHT INNER ROOT */}
<Ringlet
  position={[0.27, 1.37, 0.1]}
  side="right"
  loops={1.65}
  length={0.36}
  radius={0.05}
  thickness={0.021}
  tone="dark"
/>

{/* RIGHT MID ROOT */}
<Ringlet
  position={[0.36, 1.34, 0.07]}
  side="right"
  loops={1.7}
  length={0.38}
  radius={0.052}
  thickness={0.022}
  tone="light"
/>

{/* RIGHT OUTER ROOT */}
<Ringlet
  position={[0.45, 1.31, 0.02]}
  side="right"
  loops={1.75}
  length={0.4}
  radius={0.053}
  thickness={0.022}
  tone="dark"
/>

{/* FAR RIGHT ROOT */}
<Ringlet
  position={[0.53, 1.28, -0.04]}
  side="right"
  loops={1.8}
  length={0.4}
  radius={0.052}
  thickness={0.022}
  tone="light"
  back
/>
{/* =================================================
    SECOND ROOT ROW
    Fills the tiny spaces behind the first row
================================================= */}

<Ringlet
  position={[-0.43, 1.27, -0.13]}
  side="left"
  loops={1.8}
  length={0.4}
  radius={0.052}
  thickness={0.021}
  tone="dark"
  back
/>

<Ringlet
  position={[-0.31, 1.29, -0.13]}
  side="left"
  loops={1.75}
  length={0.39}
  radius={0.051}
  thickness={0.021}
  tone="light"
  back
/>

<Ringlet
  position={[-0.19, 1.3, -0.15]}
  side="left"
  loops={1.7}
  length={0.38}
  radius={0.05}
  thickness={0.021}
  tone="dark"
  back
/>

<Ringlet
  position={[-0.06, 1.3, -0.17]}
  side="left"
  loops={1.65}
  length={0.37}
  radius={0.049}
  thickness={0.021}
  tone="light"
  back
/>

<Ringlet
  position={[0.06, 1.3, -0.17]}
  side="right"
  loops={1.65}
  length={0.37}
  radius={0.049}
  thickness={0.021}
  tone="dark"
  back
/>

<Ringlet
  position={[0.19, 1.3, -0.15]}
  side="right"
  loops={1.7}
  length={0.38}
  radius={0.05}
  thickness={0.021}
  tone="light"
  back
/>

<Ringlet
  position={[0.31, 1.29, -0.13]}
  side="right"
  loops={1.75}
  length={0.39}
  radius={0.051}
  thickness={0.021}
  tone="dark"
  back
/>

<Ringlet
  position={[0.43, 1.27, -0.13]}
  side="right"
  loops={1.8}
  length={0.4}
  radius={0.052}
  thickness={0.021}
  tone="light"
  back
/>

      {/* =================================================
          TOP ROOT COILS

          These sit ON the scalp cap so you no longer get:

          scalp
          GAP
          curls

          Instead:
          scalp -> short coils -> long curls
      ================================================= */}

      <Ringlet
        position={[-0.18, 1.48, 0.01]}
        side="left"
        loops={2.0}
        length={0.46}
        radius={0.052}
        thickness={0.022}
        tone="dark"
      />

      <Ringlet
        position={[0.18, 1.48, 0.01]}
        side="right"
        loops={2.0}
        length={0.46}
        radius={0.052}
        thickness={0.022}
        tone="light"
      />

      <Ringlet
        position={[-0.31, 1.42, 0.05]}
        side="left"
        loops={2.1}
        length={0.48}
        radius={0.055}
        thickness={0.022}
        tone="light"
      />

      <Ringlet
        position={[0.31, 1.42, 0.05]}
        side="right"
        loops={2.1}
        length={0.48}
        radius={0.055}
        thickness={0.022}
        tone="dark"
      />

      {/* =================================================
          FRONT HAIRLINE ROOTS

          These fill exactly the bald strip visible
          in your screenshot.

          They start high enough to connect to the cap,
          but don't cross over the face.
      ================================================= */}

      <Ringlet
        position={[-0.12, 1.37, 0.18]}
        side="left"
        loops={1.8}
        length={0.38}
        radius={0.048}
        thickness={0.021}
        tone="dark"
      />

      <Ringlet
        position={[0.12, 1.37, 0.18]}
        side="right"
        loops={1.8}
        length={0.38}
        radius={0.048}
        thickness={0.021}
        tone="light"
      />

      <Ringlet
        position={[-0.26, 1.36, 0.16]}
        side="left"
        loops={2.0}
        length={0.44}
        radius={0.052}
        thickness={0.022}
        tone="light"
      />

      <Ringlet
        position={[0.26, 1.36, 0.16]}
        side="right"
        loops={2.0}
        length={0.44}
        radius={0.052}
        thickness={0.022}
        tone="dark"
      />

      <Ringlet
        position={[-0.38, 1.31, 0.09]}
        side="left"
        loops={2.1}
        length={0.48}
        radius={0.055}
        thickness={0.022}
        tone="dark"
      />

      <Ringlet
        position={[0.38, 1.31, 0.09]}
        side="right"
        loops={2.1}
        length={0.48}
        radius={0.055}
        thickness={0.022}
        tone="light"
      />

      {/* =================================================
          FRONT FACE-FRAMING CURLS
      ================================================= */}

      <Ringlet
        position={[-0.25, 1.27, 0.24]}
        side="left"
        loops={3.8}
        length={0.82}
        radius={0.06}
        thickness={0.022}
        tone="light"
      />

      <Ringlet
        position={[0.25, 1.27, 0.24]}
        side="right"
        loops={3.8}
        length={0.82}
        radius={0.06}
        thickness={0.022}
        tone="dark"
      />

      {/* =================================================
          ROOT / ATTACHMENT FILLERS
      ================================================= */}

      <Ringlet
        position={[-0.42, 1.22, 0.05]}
        side="left"
        loops={4.1}
        length={0.86}
        radius={0.062}
        thickness={0.021}
        tone="dark"
      />

      <Ringlet
        position={[-0.2, 1.22, -0.03]}
        side="left"
        loops={4.1}
        length={0.82}
        radius={0.06}
        thickness={0.021}
        tone="light"
        back
      />

      <Ringlet
        position={[0.2, 1.22, -0.03]}
        side="right"
        loops={4.1}
        length={0.82}
        radius={0.06}
        thickness={0.021}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.42, 1.22, 0.05]}
        side="right"
        loops={4.1}
        length={0.86}
        radius={0.062}
        thickness={0.021}
        tone="light"
      />

      <Ringlet
        position={[-0.08, 1.21, -0.1]}
        side="left"
        loops={4.0}
        length={0.82}
        radius={0.058}
        thickness={0.021}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.08, 1.21, -0.1]}
        side="right"
        loops={4.0}
        length={0.82}
        radius={0.058}
        thickness={0.021}
        tone="light"
        back
      />

      {/* =================================================
          INNER TOP FILL
      ================================================= */}

      <Ringlet
        position={[-0.31, 1.27, 0.1]}
        side="left"
        loops={4.1}
        length={0.92}
        radius={0.065}
        thickness={0.022}
        tone="dark"
      />

      <Ringlet
        position={[0.31, 1.27, 0.1]}
        side="right"
        loops={4.1}
        length={0.92}
        radius={0.065}
        thickness={0.022}
        tone="light"
      />

      <Ringlet
        position={[-0.18, 1.28, 0.08]}
        side="left"
        loops={3.9}
        length={0.78}
        radius={0.055}
        thickness={0.021}
        tone="light"
      />

      <Ringlet
        position={[0.18, 1.28, 0.08]}
        side="right"
        loops={3.9}
        length={0.78}
        radius={0.055}
        thickness={0.021}
        tone="dark"
      />

      {/* =================================================
          TOP-BACK DENSE FILL
      ================================================= */}

      <Ringlet
        position={[-0.28, 1.23, -0.12]}
        side="left"
        loops={4.2}
        length={0.92}
        radius={0.064}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.28, 1.23, -0.12]}
        side="right"
        loops={4.2}
        length={0.92}
        radius={0.064}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[-0.48, 1.17, -0.08]}
        side="left"
        loops={4.4}
        length={0.98}
        radius={0.067}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[-0.22, 1.17, -0.12]}
        side="left"
        loops={4.3}
        length={0.96}
        radius={0.066}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.22, 1.17, -0.12]}
        side="right"
        loops={4.3}
        length={0.96}
        radius={0.066}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[0.48, 1.17, -0.08]}
        side="right"
        loops={4.4}
        length={0.98}
        radius={0.067}
        thickness={0.022}
        tone="dark"
        back
      />

      {/* =================================================
          LEFT SIDE MAIN CURLS
      ================================================= */}

      <Ringlet
        position={[-0.4, 1.2, 0.16]}
        side="left"
        loops={4.3}
        length={1.0}
        radius={0.072}
        thickness={0.024}
        tone="dark"
      />

      <Ringlet
        position={[-0.5, 1.13, 0.03]}
        side="left"
        loops={4.8}
        length={1.18}
        radius={0.078}
        thickness={0.025}
        tone="light"
      />

      <Ringlet
        position={[-0.58, 1.0, -0.12]}
        side="left"
        loops={5.1}
        length={1.25}
        radius={0.08}
        thickness={0.025}
        tone="dark"
        back
      />

      <Ringlet
        position={[-0.34, 1.07, -0.25]}
        side="left"
        loops={4.5}
        length={1.1}
        radius={0.072}
        thickness={0.024}
        tone="light"
        back
      />

      <Ringlet
        position={[-0.46, 1.03, -0.02]}
        side="left"
        loops={4.6}
        length={1.06}
        radius={0.07}
        thickness={0.023}
        tone="dark"
      />

      <Ringlet
        position={[-0.28, 1.09, -0.12]}
        side="left"
        loops={4.4}
        length={0.98}
        radius={0.067}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[-0.37, 1.12, 0.03]}
        side="left"
        loops={4.25}
        length={0.94}
        radius={0.064}
        thickness={0.022}
        tone="light"
      />

      <Ringlet
        position={[-0.22, 1.04, -0.03]}
        side="left"
        loops={4.2}
        length={0.9}
        radius={0.062}
        thickness={0.021}
        tone="dark"
        back
      />

      <Ringlet
        position={[-0.42, 1.0, -0.15]}
        side="left"
        loops={4.55}
        length={1.04}
        radius={0.069}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[-0.32, 0.98, -0.2]}
        side="left"
        loops={4.5}
        length={1.0}
        radius={0.067}
        thickness={0.022}
        tone="dark"
        back
      />

      {/* =================================================
          RIGHT SIDE MAIN CURLS
      ================================================= */}

      <Ringlet
        position={[0.4, 1.2, 0.16]}
        side="right"
        loops={4.3}
        length={1.0}
        radius={0.072}
        thickness={0.024}
        tone="light"
      />

      <Ringlet
        position={[0.5, 1.13, 0.03]}
        side="right"
        loops={4.8}
        length={1.18}
        radius={0.078}
        thickness={0.025}
        tone="dark"
      />

      <Ringlet
        position={[0.58, 1.0, -0.12]}
        side="right"
        loops={5.1}
        length={1.25}
        radius={0.08}
        thickness={0.025}
        tone="light"
        back
      />

      <Ringlet
        position={[0.34, 1.07, -0.25]}
        side="right"
        loops={4.5}
        length={1.1}
        radius={0.072}
        thickness={0.024}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.46, 1.03, -0.02]}
        side="right"
        loops={4.6}
        length={1.06}
        radius={0.07}
        thickness={0.023}
        tone="light"
      />

      <Ringlet
        position={[0.28, 1.09, -0.12]}
        side="right"
        loops={4.4}
        length={0.98}
        radius={0.067}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.37, 1.12, 0.03]}
        side="right"
        loops={4.25}
        length={0.94}
        radius={0.064}
        thickness={0.022}
        tone="dark"
      />

      <Ringlet
        position={[0.22, 1.04, -0.03]}
        side="right"
        loops={4.2}
        length={0.9}
        radius={0.062}
        thickness={0.021}
        tone="light"
        back
      />

      <Ringlet
        position={[0.42, 1.0, -0.15]}
        side="right"
        loops={4.55}
        length={1.04}
        radius={0.069}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.32, 0.98, -0.2]}
        side="right"
        loops={4.5}
        length={1.0}
        radius={0.067}
        thickness={0.022}
        tone="light"
        back
      />

      {/* =================================================
          BACK CURLS
      ================================================= */}

      <Ringlet
        position={[-0.18, 1.11, -0.36]}
        side="left"
        loops={4.9}
        length={1.22}
        radius={0.075}
        thickness={0.024}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.02, 1.13, -0.42]}
        side="left"
        loops={5.0}
        length={1.26}
        radius={0.075}
        thickness={0.024}
        tone="light"
        back
      />

      <Ringlet
        position={[0.22, 1.11, -0.36]}
        side="right"
        loops={4.9}
        length={1.22}
        radius={0.075}
        thickness={0.024}
        tone="dark"
        back
      />

      <Ringlet
        position={[-0.05, 1.07, -0.31]}
        side="left"
        loops={4.8}
        length={1.1}
        radius={0.07}
        thickness={0.023}
        tone="light"
        back
      />

      <Ringlet
        position={[0.12, 1.05, -0.29]}
        side="right"
        loops={4.8}
        length={1.08}
        radius={0.07}
        thickness={0.023}
        tone="dark"
        back
      />

      <Ringlet
        position={[-0.28, 1.01, -0.28]}
        side="left"
        loops={4.7}
        length={1.02}
        radius={0.068}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.3, 1.01, -0.28]}
        side="right"
        loops={4.7}
        length={1.02}
        radius={0.068}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[-0.38, 0.98, -0.34]}
        side="left"
        loops={4.8}
        length={1.08}
        radius={0.07}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[-0.14, 0.98, -0.4]}
        side="left"
        loops={4.9}
        length={1.1}
        radius={0.07}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.1, 0.98, -0.4]}
        side="right"
        loops={4.9}
        length={1.1}
        radius={0.07}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[0.36, 0.98, -0.34]}
        side="right"
        loops={4.8}
        length={1.08}
        radius={0.07}
        thickness={0.022}
        tone="dark"
        back
      />

      {/* =================================================
          FINAL NECK GAP FILLERS
      ================================================= */}

      <Ringlet
        position={[-0.24, 0.92, -0.24]}
        side="left"
        loops={4.6}
        length={0.96}
        radius={0.068}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[-0.08, 0.9, -0.3]}
        side="left"
        loops={4.7}
        length={0.98}
        radius={0.067}
        thickness={0.022}
        tone="light"
        back
      />

      <Ringlet
        position={[0.08, 0.9, -0.3]}
        side="right"
        loops={4.7}
        length={0.98}
        radius={0.067}
        thickness={0.022}
        tone="dark"
        back
      />

      <Ringlet
        position={[0.24, 0.92, -0.24]}
        side="right"
        loops={4.6}
        length={0.96}
        radius={0.068}
        thickness={0.022}
        tone="light"
        back
      />
    </group>
  );
}
/* =====================================================
   FACE
===================================================== */

function Face() {
  return (
    <group>
      <SoftBox
        args={[0.6, 0.64, 0.6]}
        position={[0, 1.08, 0]}
        color={COLORS.skin}
        radius={0.11}
      />

      {/* THIN EYEBROWS */}

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

      {/* HAPPY CLOSED EYES */}

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

      {/* SMALL BLUSH */}

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

      {/* BIG HAPPY SMILE */}

      <SoftBox
        args={[0.18, 0.075, 0.024]}
        position={[0, 0.91, 0.31]}
        color={COLORS.mouth}
        radius={0.026}
      />

      <SoftBox
        args={[0.095, 0.022, 0.014]}
        position={[0, 0.89, 0.326]}
        color="#f8c0c7"
        radius={0.008}
      />

      {/* BLUE DANGLING EARRINGS */}

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

          {/* FACE */}

          <Face />

          {/* HAIR */}

          <Hair />
        </group>
      </group>
    );
  }
);

export default Avatar;