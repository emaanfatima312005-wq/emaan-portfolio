"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  useRouter,
} from "next/navigation";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  useGSAP,
} from "@gsap/react";

import ThreeWorkspace from "@/components/three/ThreeWorkspace";

gsap.registerPlugin(
  ScrollTrigger
);

export default function ScrollStory() {
  const storyRef =
    useRef(null);

  const introRef =
    useRef(null);

  const enteredPortfolioRef =
    useRef(false);

  const router =
    useRouter();

  /* =========================================
     PRELOAD REAL PORTFOLIO
  ========================================= */

  useEffect(() => {
    router.prefetch(
      "/portfolio"
    );
  }, [router]);

  /* =========================================
     INTRO TEXT
  ========================================= */

  useGSAP(
    () => {
      if (
        !storyRef.current
      ) {
        return;
      }

      gsap.to(
        introRef.current,
        {
          opacity: 0,
          y: -60,
          scale: 0.96,

          scrollTrigger: {
            trigger:
              storyRef.current,

            start:
              "top top",

            end:
              "18% top",

            scrub: 1,
          },
        }
      );
    },
    {
      scope: storyRef,
    }
  );

  /* =========================================
     MONITOR → REAL PORTFOLIO
  ========================================= */

  useGSAP(
    () => {
      if (
        !storyRef.current
      ) {
        return;
      }

      const trigger =
        ScrollTrigger.create({
          trigger:
            storyRef.current,

          start:
            "top top",

          end:
            "bottom bottom",

          onUpdate: (
            self
          ) => {
            /*
              Only enter while
              scrolling forward.
            */

            if (
              self.direction <=
              0
            ) {
              return;
            }

            /*
              Only run once.
            */

            if (
              enteredPortfolioRef.current
            ) {
              return;
            }

            /*
              At this point the camera
              is entering the monitor.
            */

            if (
              self.progress >=
              0.80
            ) {
              enteredPortfolioRef.current =
                true;

              /*
                This tells the portfolio
                that this is NOT a reload.

                It came through the room.
              */

              sessionStorage.setItem(
                "portfolioEnteredFromRoom",
                "true"
              );

              /*
                DIRECTLY ENTER PROJECTS.
              */

              window.location.href =
  "/portfolio";
              
            }
          },
        });

      return () => {
        trigger.kill();
      };
    },
    {
      scope: storyRef,

      dependencies: [
        router,
      ],
    }
  );

  return (
    <section
      ref={storyRef}
      className="three-scroll-story"
    >
      <div className="three-sticky">
        {/* =====================================
            INTRO
        ===================================== */}

        <div
          ref={introRef}
          className="three-intro"
        >
          <p>
            SOFTWARE ENGINEERING · AI · WEB · EXPLORING 3D
          </p>

          <h1>
            Hi, I&apos;m
            <br />

            <span>
              Emaan.
            </span>
          </h1>

          <p className="three-description">
            I build meaningful things with
            <br />
            code, creativity and curiosity.
          </p>

          <div className="three-scroll-hint">
            scroll to enter my world

            <span>
              ↓
            </span>
          </div>
        </div>

        {/* =====================================
            3D ROOM
        ===================================== */}

        <ThreeWorkspace
          storyRef={
            storyRef
          }
        />
      </div>
    </section>
  );
}