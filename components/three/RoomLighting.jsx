"use client";

import {
  useEffect,
  useMemo,
  useRef,
} from "react";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import * as THREE from "three";

export default function RoomLighting({
  isNight,

  // Move these later so they sit
  // near your painting/window.
  neonPosition = [0, 2.2, -2],
  windowPosition = [-2, 2.2, -2],
}) {
  const ambientRef = useRef();
  const sunRef = useRef();
  const neonRef = useRef();
  const moonRef = useRef();

  const { scene } = useThree();

  const dayBackground = useMemo(
    () =>
      new THREE.Color(
        "#f8eff4"
      ),
    []
  );

  const nightBackground = useMemo(
    () =>
      new THREE.Color(
        "#100d1d"
      ),
    []
  );

  const dayAmbient = useMemo(
    () =>
      new THREE.Color(
        "#fff0e8"
      ),
    []
  );

  const nightAmbient = useMemo(
    () =>
      new THREE.Color(
        "#7667a8"
      ),
    []
  );

  useEffect(() => {
    if (
      !(
        scene.background instanceof
        THREE.Color
      )
    ) {
      scene.background =
        dayBackground.clone();
    }
  }, [
    scene,
    dayBackground,
  ]);

  useFrame((_, delta) => {
    const smoothing =
      1 - Math.exp(-delta * 3);

    /* =============================
       AMBIENT ROOM LIGHT
    ============================= */

    if (ambientRef.current) {
      ambientRef.current.intensity =
        THREE.MathUtils.lerp(
          ambientRef.current.intensity,
          isNight ? 0.28 : 1.15,
          smoothing
        );

      ambientRef.current.color.lerp(
        isNight
          ? nightAmbient
          : dayAmbient,
        smoothing
      );
    }

    /* =============================
       DAY SUN
    ============================= */

    if (sunRef.current) {
      sunRef.current.intensity =
        THREE.MathUtils.lerp(
          sunRef.current.intensity,
          isNight ? 0.12 : 1.7,
          smoothing
        );
    }

    /* =============================
       PURPLE NEON
    ============================= */

    if (neonRef.current) {
      neonRef.current.intensity =
        THREE.MathUtils.lerp(
          neonRef.current.intensity,
          isNight ? 3.2 : 0,
          smoothing
        );
    }

    /* =============================
       MOONLIGHT
    ============================= */

    if (moonRef.current) {
      moonRef.current.intensity =
        THREE.MathUtils.lerp(
          moonRef.current.intensity,
          isNight ? 2 : 0,
          smoothing
        );
    }

    /* =============================
       BACKGROUND
    ============================= */

    if (
      scene.background instanceof
      THREE.Color
    ) {
      scene.background.lerp(
        isNight
          ? nightBackground
          : dayBackground,
        smoothing
      );
    }

    /*
      If you're using a Drei
      Environment, this also dims it.
    */

    if (
      "environmentIntensity" in
      scene
    ) {
      scene.environmentIntensity =
        THREE.MathUtils.lerp(
          scene.environmentIntensity ??
            1,
          isNight ? 0.25 : 1,
          smoothing
        );
    }
  });

  return (
    <>
      <ambientLight
        ref={ambientRef}
        intensity={1.15}
        color="#fff0e8"
      />

      <directionalLight
        ref={sunRef}
        position={[
          5,
          7,
          5,
        ]}
        intensity={1.7}
        color="#fff7e5"
        castShadow
      />

      {/* PURPLE LIGHT FROM PAINTING */}

      <pointLight
        ref={neonRef}
        position={neonPosition}
        color="#C580ED"
        intensity={0}
        distance={7}
        decay={2}
      />

      {/* BLUE-PURPLE MOONLIGHT */}

      <pointLight
        ref={moonRef}
        position={windowPosition}
        color="#A480F2"
        intensity={0}
        distance={8}
        decay={2}
      />
    </>
  );
}