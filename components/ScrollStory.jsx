"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import ThreeWorkspace from "@/components/three/ThreeWorkspace";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStory() {
  const storyRef = useRef(null);
  const introRef = useRef(null);

  useGSAP(
    () => {
      /*
        Fade the hero away as we begin scrolling
      */

      gsap.to(introRef.current, {
        opacity: 0,
        y: -60,
        scale: 0.96,

        scrollTrigger: {
          trigger: storyRef.current,
          start: "top top",
          end: "25% top",
          scrub: 1,
        },
      });
    },
    {
      scope: storyRef,
    }
  );

  return (
    <section ref={storyRef} className="three-scroll-story">
      <div className="three-sticky">
        {/* HERO TEXT */}

        <div ref={introRef} className="three-intro">
          <p>
            SOFTWARE ENGINEERING · AI · WEB · EXPLORING 3D
          </p>

          <h1>
            Hi, I&apos;m
            <br />
            <span>Emaan.</span>
          </h1>

          <p className="three-description">
            I build meaningful things with
            <br />
            code, creativity and curiosity.
          </p>

          <div className="three-scroll-hint">
            scroll to enter my world
            <span>↓</span>
          </div>
        </div>

        {/* ACTUAL 3D WORLD */}

        <ThreeWorkspace storyRef={storyRef} />
      </div>
    </section>
  );
}