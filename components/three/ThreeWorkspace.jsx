"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Avatar from "./Avatar";
import Room from "./Room";
import Desk from "./Desk";
import Chair from "./Chair";
import Cat from "./Cat";
import WhimsyWorld from "./WhimsyWorld";

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   SCROLL + CAMERA CONTROLLER
========================================= */

function ScrollCamera({ storyRef, avatarRef }) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0.2, z: 0 });

  useFrame(() => {
    camera.lookAt(target.current.x, target.current.y, target.current.z);
  });

  useGSAP(() => {
    if (!storyRef?.current) return;

    camera.position.set(6, 4, 8);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    /* Phase 2: Emaan walks to chair */

tl.to(
  avatarRef.current.position,
  {
    x: 0.2,
    z: 1.32,
    duration: 1.8,
    ease: "none",
  },
  0.6
);
/* Turn Emaan toward the desk */

tl.to(
  avatarRef.current.rotation,
  {
    y: Math.PI,
    duration: 0.75,
    ease: "power2.inOut",
  },
  1.65
);

    /* Phase 3: Camera follows and frames her sitting */
    tl.to(camera.position, { x: 3.2, y: 2.5, z: 4.6, duration: 1.4, ease: "power1.inOut" }, 1.2);
    tl.to(target.current, { x: 0.5, y: 0.6, z: 0.4, duration: 1.4, ease: "power1.inOut" }, 1.2);

    /* Phase 4: Camera turns toward monitor */
    tl.to(target.current, { x: 1.5, y: 1.05, z: 0, duration: 1.2, ease: "power1.inOut" }, 2.4);
    tl.to(camera.position, { x: 2.6, y: 1.9, z: 3.4, duration: 1.2, ease: "power1.inOut" }, 2.4);

    /* Phase 5: Zoom into the screen */
    tl.to(
      camera.position,
      { x: 1.5, y: 1.05, z: 1.6, duration: 1.6, ease: "power2.inOut" },
      3.4
    );

    /* Phase 6: Pass through monitor into whimsical world */
    tl.to(
      camera.position,
      { x: 1.5, y: 1.05, z: -1.5, duration: 0.8, ease: "none" },
      4.8
    );

    /* Phase 7: Pull back to wide whimsical view */
    tl.to(
      camera.position,
      { x: 0, y: 3, z: 10, duration: 2, ease: "power2.inOut" },
      5.4
    );

    tl.to(
      target.current,
      { x: 0, y: 1.2, z: -3, duration: 2, ease: "power2.inOut" },
      5.4
    );
  }, []);

  return null;
}

/* =========================================
   ACTUAL SCENE
========================================= */

function Scene({ storyRef }) {
  const avatarRef = useRef();
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (!storyRef?.current) return;

    ScrollTrigger.create({
      trigger: storyRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });
  }, [storyRef]);

  return (
    <>
      {/* Warm, welcoming lighting */}
      <ambientLight intensity={1.3} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-3, 4, 4]} intensity={8} color="#ffd670" />
      <pointLight position={[3.5, 2.5, -2]} intensity={5} color="#70d6ff" />
      <pointLight position={[-4, 2, -2]} intensity={4} color="#ff70a6" />

      <Room />

      <Avatar
        ref={avatarRef}
        position={[-1.8, 0, 0]}
        progress={progress}
      />

      <Desk />
      <Chair />
      <Cat position={[-2.6, -1, 1.2]} />

      <WhimsyWorld progress={progress} />

      <ScrollCamera storyRef={storyRef} avatarRef={avatarRef} />
    </>
  );
}

/* =========================================
   CANVAS
========================================= */

export default function ThreeWorkspace({ storyRef }) {
  return (
    <div className="three-workspace">
      <Canvas
        shadows
        dpr={[1, 1.5]}
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
