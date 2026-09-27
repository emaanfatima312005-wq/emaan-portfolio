
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HaloBackground() {
  const leftHaloRef = useRef(null);
  const rightHaloRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const effects = [];

    async function startHalos() {
      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        return;
      }

      try {
        const haloModule = await import(
          "vanta/dist/vanta.halo.min"
        );

        if (cancelled) return;

        const HALO = [
          haloModule.default,
          haloModule.default?.default,
          haloModule.default?.HALO,
          haloModule.HALO,
          window.VANTA?.HALO,
        ].find((item) => typeof item === "function");

        if (!HALO) {
          console.error("Vanta HALO could not be loaded.");
          return;
        }

        const compatibleThree = {
          ...THREE,
          RGBFormat:
            THREE.RGBFormat ?? THREE.RGBAFormat,
        };

        /*
          REPLACE VANTA'S RAINBOW SHADER

          Vanta's standard HALO generates rainbow
          colours independently of the supplied
          brand colours.

          This changes that one shader expression
          so the halo transitions ONLY between
          baseColor and color2.
        */

        function applyBrandColors(effect) {
          const mesh = effect?.scene?.children?.find(
            (child) =>
              child.material?.fragmentShader
          );

          if (!mesh) return;

          const material = mesh.material;

          const rainbowPattern =
            /vec4\s+rainbow\s*=\s*sqrt\(j2hue\(cos\(rainbowInput\)\)\)\s*\+\s*vec4\(baseColor\s*,\s*0\)\s*-\s*1\.0\s*\+\s*brightness\s*;/;

          if (
            !rainbowPattern.test(
              material.fragmentShader
            )
          ) {
            console.warn(
              "Vanta shader format has changed. Brand colour replacement was not applied."
            );
            return;
          }

          material.fragmentShader =
            material.fragmentShader.replace(
              rainbowPattern,
              `
                vec3 brandColor = mix(
                  baseColor,
                  color2,
                  0.5 + 0.5 * sin(rainbowInput * 1.4)
                );

                vec4 rainbow = vec4(
                  brandColor * 0.78,
                  1.0
                );
              `
            );

          material.needsUpdate = true;
        }

        /*
          LEFT HALO

          Pink -> Purple
        */

        if (leftHaloRef.current) {
          const leftEffect = HALO({
            el: leftHaloRef.current,
            THREE: compatibleThree,

            mouseControls: true,
            touchControls: true,
            gyroControls: false,

            minHeight: 200,
            minWidth: 200,

            backgroundColor: 0x0e1630,

            baseColor: 0xf78ecf,
            color2: 0xa480f2,

            amplitudeFactor: 1.15,
            ringFactor: 1.1,
            rotationFactor: 1,

            size: 1.7,
            speed: 0.6,

            xOffset: -0.13,
            yOffset: 0.1,

            scale: 1.7,
            scaleMobile: 2,
          });

          if (leftEffect) {
            effects.push(leftEffect);
            applyBrandColors(leftEffect);
          }
        }

        /*
          RIGHT HALO

          Purple -> Lavender
        */

        const isMobile = window.matchMedia(
          "(max-width: 767px)"
        ).matches;

        if (
          !isMobile &&
          rightHaloRef.current
        ) {
          const rightEffect = HALO({
            el: rightHaloRef.current,
            THREE: compatibleThree,

            mouseControls: true,
            touchControls: true,
            gyroControls: false,

            minHeight: 200,
            minWidth: 200,

            backgroundColor: 0x0e1630,

            baseColor: 0xa480f2,
            color2: 0xd4b0f9,

            amplitudeFactor: 1.2,
            ringFactor: 1.1,
            rotationFactor: 1,

            size: 1.65,
            speed: 0.5,

            xOffset: 0.13,
            yOffset: -0.12,

            scale: 1.7,
          });

          if (rightEffect) {
            effects.push(rightEffect);
            applyBrandColors(rightEffect);
          }
        }
      } catch (error) {
        console.error(
          "Error starting Vanta HALO:",
          error
        );
      }
    }

    startHalos();

    return () => {
      cancelled = true;

      effects.forEach((effect) => {
        effect.destroy?.();
      });
    };
  }, []);

  /*
    BACKGROUND LAYOUT

    Give each halo its own area rather
    than placing two opaque canvases
    directly on top of one another.
  */

  const leftMask =
    "linear-gradient(to right, black 0%, black 55%, transparent 100%)";

  const rightMask =
    "linear-gradient(to left, black 0%, black 55%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
        bg-[#0E1630]
      "
    >
      {/* LEFT: PINK + PURPLE */}

      <div
        className="
          absolute
          -left-[8%]
          inset-y-0
          w-[82%]
        "
        style={{
          maskImage: leftMask,
          WebkitMaskImage: leftMask,
        }}
      >
        <div
          ref={leftHaloRef}
          className="
            absolute
            inset-0
            h-full
            w-full
          "
        />
      </div>

      {/* RIGHT: PURPLE + LAVENDER */}

      <div
        className="
          absolute
          -right-[8%]
          inset-y-0
          hidden
          w-[82%]
          md:block
        "
        style={{
          maskImage: rightMask,
          WebkitMaskImage: rightMask,
        }}
      >
        <div
          ref={rightHaloRef}
          className="
            absolute
            inset-0
            h-full
            w-full
          "
        />
      </div>

      {/* NAVY OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-[#0E1630]/85
        "
      />
    </div>
  );
}
