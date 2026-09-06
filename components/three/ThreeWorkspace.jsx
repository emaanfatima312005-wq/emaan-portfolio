"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   EMAAN PLACEHOLDER
========================================= */

function Emaan({ avatarRef }) {
  return (
    <group
      ref={avatarRef}
      position={[-1.8, 0, 0]}
    >
      {/* legs */}

      <mesh position={[-0.18, -0.5, 0]}>
        <boxGeometry args={[0.25, 0.8, 0.3]} />
        <meshStandardMaterial color="#fff4e8" />
      </mesh>

      <mesh position={[0.18, -0.5, 0]}>
        <boxGeometry args={[0.25, 0.8, 0.3]} />
        <meshStandardMaterial color="#fff4e8" />
      </mesh>

      {/* body */}

      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.8, 0.9, 0.45]} />
        <meshStandardMaterial color="#70d6ff" />
      </mesh>

      {/* head */}

      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[0.68, 0.68, 0.68]} />
        <meshStandardMaterial color="#f2bea0" />
      </mesh>

      {/* hair */}

      <mesh position={[0, 1.22, -0.08]}>
        <boxGeometry args={[0.78, 0.45, 0.75]} />
        <meshStandardMaterial color="#3c302d" />
      </mesh>

      {/* pink detail */}

      <mesh position={[0, 0.28, 0.235]}>
        <boxGeometry args={[0.18, 0.18, 0.03]} />
        <meshStandardMaterial color="#ff70a6" />
      </mesh>
    </group>
  );
}

/* =========================================
   MONITOR
========================================= */

function Monitor() {
  return (
    <group position={[0, 1.35, 0]}>
      <mesh>
        <boxGeometry args={[1.7, 1.1, 0.16]} />
        <meshStandardMaterial color="#202638" />
      </mesh>

      {/* glowing screen */}

      <mesh position={[0, 0, 0.095]}>
        <boxGeometry args={[1.45, 0.84, 0.025]} />

        <meshStandardMaterial
          color="#70d6ff"
          emissive="#70d6ff"
          emissiveIntensity={0.28}
        />
      </mesh>

      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[0.13, 0.4, 0.13]} />
        <meshStandardMaterial color="#aaaeb7" />
      </mesh>

      <mesh position={[0, -0.92, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.4]} />
        <meshStandardMaterial color="#aaaeb7" />
      </mesh>
    </group>
  );
}

/* =========================================
   DESK
========================================= */

function Desk() {
  return (
    <group position={[1.5, -0.2, 0]}>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[3.2, 0.18, 1.3]} />
        <meshStandardMaterial color="#fffaf4" />
      </mesh>

      <mesh position={[-1.25, -0.55, 0]}>
        <boxGeometry args={[0.18, 1.5, 0.18]} />
        <meshStandardMaterial color="#ffd670" />
      </mesh>

      <mesh position={[1.25, -0.55, 0]}>
        <boxGeometry args={[0.18, 1.5, 0.18]} />
        <meshStandardMaterial color="#ffd670" />
      </mesh>

      <Monitor />
    </group>
  );
}

/* =========================================
   CHAIR
========================================= */

function Chair() {
  return (
    <group position={[0.2, -0.4, 1.1]}>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.9, 1.05, 0.18]} />
        <meshStandardMaterial color="#ff70a6" />
      </mesh>

      <mesh position={[0, 0, 0.25]}>
        <boxGeometry args={[1, 0.18, 0.9]} />
        <meshStandardMaterial color="#ff9770" />
      </mesh>

      <mesh position={[0, -0.48, 0.2]}>
        <boxGeometry args={[0.12, 0.8, 0.12]} />
        <meshStandardMaterial color="#aeb4bc" />
      </mesh>

      <mesh position={[0, -0.88, 0.2]}>
        <boxGeometry args={[0.95, 0.08, 0.2]} />
        <meshStandardMaterial color="#aeb4bc" />
      </mesh>
    </group>
  );
}

/* =========================================
   FLOOR
========================================= */

function Floor() {
  return (
    <mesh
      position={[0, -1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[20, 20]} />

      <meshStandardMaterial color="#fffdf8" />
    </mesh>
  );
}

/* =========================================
   SCROLL + CAMERA CONTROLLER
========================================= */

function ScrollCamera({
  storyRef,
  avatarRef,
}) {
  const { camera } = useThree();

  /*
    The camera needs somewhere to LOOK.

    We animate this little invisible point.
  */

  const target = useRef({
    x: 0,
    y: 0.2,
    z: 0,
  });

  /*
    Every rendered frame:

    camera looks toward our animated target.
  */

  useFrame(() => {
    camera.lookAt(
      target.current.x,
      target.current.y,
      target.current.z
    );
  });

  useGSAP(() => {
    if (!storyRef?.current) return;

    /*
      Starting camera position
    */

    camera.position.set(6, 4, 8);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: storyRef.current,

        start: "top top",
        end: "bottom bottom",

        scrub: 1,
      },
    });

    /* =====================================
       PHASE 1
       ENTER THE ROOM
    ===================================== */

    tl.to(
      camera.position,
      {
        x: 5,
        y: 3.3,
        z: 7,

        duration: 1,
        ease: "none",
      },
      0
    );

    /* =====================================
       PHASE 2
       EMAAN MOVES TOWARD DESK
    ===================================== */

    tl.to(
      avatarRef.current.position,
      {
        x: 0.1,
        z: 1,

        duration: 1.8,
        ease: "none",
      },
      0.7
    );

    /*
      little up/down movement

      Fake walking for now.
    */

    tl.to(
      avatarRef.current.position,
      {
        y: 0.08,

        duration: 0.18,

        repeat: 7,
        yoyo: true,

        ease: "sine.inOut",
      },
      0.7
    );

    /* =====================================
       PHASE 3
       CAMERA FOLLOWS HER
    ===================================== */

    tl.to(
      camera.position,
      {
        x: 4,
        y: 2.7,
        z: 5.5,

        duration: 1.5,
        ease: "power1.inOut",
      },
      1.3
    );

    tl.to(
      target.current,
      {
        x: 0.6,
        y: 0.5,
        z: 0.3,

        duration: 1.5,
        ease: "power1.inOut",
      },
      1.3
    );

    /* =====================================
       PHASE 4
       CAMERA TURNS TOWARD MONITOR
    ===================================== */

    tl.to(
      target.current,
      {
        /*
          monitor global position is about:
          x = 1.5
          y = 1.15
          z = 0
        */

        x: 1.5,
        y: 1.15,
        z: 0,

        duration: 1.3,
        ease: "power1.inOut",
      },
      2.7
    );

    tl.to(
      camera.position,
      {
        x: 3.1,
        y: 2.1,
        z: 4.3,

        duration: 1.3,
        ease: "power1.inOut",
      },
      2.7
    );

    /* =====================================
       PHASE 5
       BIG MONITOR ZOOM
    ===================================== */

    tl.to(
      camera.position,
      {
        x: 1.5,
        y: 1.15,

        /*
          We're physically moving the
          camera toward the monitor now.
        */

        z: 1.25,

        duration: 2,
        ease: "power2.inOut",
      },
      4
    );
  }, []);

  return null;
}

/* =========================================
   ACTUAL SCENE
========================================= */

function Scene({ storyRef }) {
  const avatarRef = useRef();

  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 7, 6]}
        intensity={2.5}
        castShadow
      />

      <pointLight
        position={[-4, 4, 4]}
        intensity={10}
        color="#ffd670"
      />

      <Floor />

      <Emaan avatarRef={avatarRef} />

      <Desk />

      <Chair />

      {/* SCROLL NOW CONTROLS EVERYTHING */}

      <ScrollCamera
        storyRef={storyRef}
        avatarRef={avatarRef}
      />
    </>
  );
}

/* =========================================
   CANVAS
========================================= */

export default function ThreeWorkspace({
  storyRef,
}) {
  return (
    <div className="three-workspace">
      <Canvas
        shadows
        camera={{
          position: [6, 4, 8],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
      >
        <Scene storyRef={storyRef} />
      </Canvas>
    </div>
  );
}