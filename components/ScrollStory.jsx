"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStory() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const avatarRef = useRef(null);
  const chairRef = useRef(null);
  const monitorRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",

          // Longer scroll = slower / more cinematic sequence
          end: "+=4200",

          scrub: 1,
          pin: true,
        },
      });

      /* =====================================
         01 — HERO LEAVES
      ===================================== */

      tl.to(
        introRef.current,
        {
          opacity: 0,
          y: -80,
          scale: 0.96,
          duration: 1,
        },
        0
      );

      /* =====================================
         02 — EMAAN WALKS TO DESK
      ===================================== */

      tl.to(
        avatarRef.current,
        {
          x: "15vw",
          duration: 2.4,
          ease: "none",
        },
        0.5
      );

      // Little fake walking bounce
      tl.to(
        avatarRef.current,
        {
          y: -13,
          rotation: 2,

          duration: 0.22,

          repeat: 10,
          yoyo: true,

          ease: "sine.inOut",
        },
        0.5
      );

      /* =====================================
         03 — ARRIVES AT CHAIR
      ===================================== */

      tl.to(
        avatarRef.current,
        {
          y: 0,
          rotation: 0,
          duration: 0.3,
        },
        2.8
      );

      // Turn toward chair/desk
      tl.to(
        avatarRef.current,
        {
          scaleX: -1,
          duration: 0.35,
        },
        3
      );

      /* =====================================
         04 — CHAIR MOVES OUT A LITTLE
      ===================================== */

      tl.to(
        chairRef.current,
        {
          x: -25,
          duration: 0.5,
          ease: "power2.out",
        },
        3.15
      );

      /* =====================================
         05 — EMAAN SITS
      ===================================== */

      tl.to(
        avatarRef.current,
        {
          x: "16.5vw",
          y: 35,

          scaleY: 0.9,

          duration: 1,
          ease: "power2.inOut",
        },
        3.45
      );

      /*
        Fake seated legs
      */

      tl.to(
        ".mini-leg-left",
        {
          rotation: -62,
          y: -10,
          x: 2,
          duration: 0.8,
        },
        3.55
      );

      tl.to(
        ".mini-leg-right",
        {
          rotation: -62,
          y: -10,
          x: -2,
          duration: 0.8,
        },
        3.55
      );

      /* =====================================
         06 — CHAIR SLIDES BACK IN
      ===================================== */

      tl.to(
        chairRef.current,
        {
          x: 5,
          duration: 0.7,
          ease: "power2.inOut",
        },
        4.25
      );

      /* =====================================
         07 — MONITOR WAKES UP
      ===================================== */

      tl.to(
        monitorRef.current,
        {
          boxShadow:
            "0 0 45px rgba(112,214,255,.55), 0 0 100px rgba(255,112,166,.16)",

          duration: 0.7,
        },
        4.45
      );

      tl.to(
        ".monitor-screen-inner",
        {
          opacity: 1,
          duration: 0.7,
        },
        4.45
      );

      /* =====================================
         08 — EMAAN LEANS TOWARD COMPUTER
      ===================================== */

     tl.to(
  avatarRef.current,
  {
    rotation: -3,
    x: "17vw",
    y: 35,
    duration: 0.65,
  },
  4.7
);
      /*
        Fake typing arms
      */

      tl.to(
        ".mini-arm-left",
        {
          rotation: -55,
          x: 12,
          y: 12,
          duration: 0.35,
        },
        4.75
      );

      tl.to(
        ".mini-arm-right",
        {
          rotation: -42,
          x: 2,
          y: 13,
          duration: 0.35,
        },
        4.75
      );

      /* =====================================
         09 — CODE APPEARS
      ===================================== */

      tl.fromTo(
        ".fake-terminal-line",
        {
          opacity: 0,
          x: -8,
        },
        {
          opacity: 1,
          x: 0,

          stagger: 0.15,

          duration: 0.5,
        },
        5
      );

      /* =====================================
         10 — FINAL TEXT
      ===================================== */

      tl.fromTo(
        ".working-message",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        5.35
      );
    },

    {
      scope: sectionRef,
    }
  );

  return (
    <section ref={sectionRef} className="workspace-scene">
      {/* =====================================
          HERO
      ===================================== */}

      <div ref={introRef} className="workspace-intro">
        <p className="workspace-label">
          SOFTWARE ENGINEERING · AI · WEB · EXPLORING 3D
        </p>

        <h1>
          Hi, I&apos;m <span>Emaan.</span>
        </h1>

        <h2>
          I build meaningful things
          <br />
          with code, creativity
          <br />
          and curiosity.
        </h2>

        <div className="workspace-scroll">
          <span>scroll to enter my world</span>
          <span className="workspace-arrow">↓</span>
        </div>
      </div>

      {/* =====================================
          MINI EMAAN
      ===================================== */}

      <div ref={avatarRef} className="mini-emaan">
        <div className="mini-hair-back"></div>

        <div className="mini-head">
          <div className="mini-hair-front"></div>

          <span className="mini-eye mini-eye-left"></span>
          <span className="mini-eye mini-eye-right"></span>

          <span className="mini-smile"></span>
        </div>

        <div className="mini-body">
          <span className="mini-heart">♥</span>
        </div>

        <div className="mini-arm mini-arm-left"></div>
        <div className="mini-arm mini-arm-right"></div>

        <div className="mini-leg mini-leg-left"></div>
        <div className="mini-leg mini-leg-right"></div>
      </div>

      {/* =====================================
          DESK
      ===================================== */}

      <div className="workspace-desk">
        {/* MONITOR */}

        <div ref={monitorRef} className="workspace-monitor">
          <div className="monitor-screen-inner">
            <div className="monitor-topbar">
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <p>emaan.dev</p>
            </div>

            <div className="fake-terminal">
              <p className="fake-terminal-line">
                <span>&gt;</span> curiosity.initialize()
              </p>

              <p className="fake-terminal-line">
                <span>&gt;</span> loading ideas...
              </p>

              <p className="fake-terminal-line">
                <span>&gt;</span> building something lovely
              </p>

              <p className="fake-terminal-line terminal-success">
                ✓ ready
              </p>

              <span className="terminal-cursor">_</span>
            </div>
          </div>
        </div>

        <div className="workspace-monitor-neck"></div>

        <div className="workspace-monitor-base"></div>

        {/* KEYBOARD */}

        <div className="workspace-keyboard">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* TINY PLANT — keeping room minimal */}

        <div className="desk-plant">
          <div className="plant-leaf plant-leaf-one"></div>
          <div className="plant-leaf plant-leaf-two"></div>
          <div className="plant-leaf plant-leaf-three"></div>

          <div className="plant-pot"></div>
        </div>

        <div className="workspace-desk-top"></div>

        <div className="workspace-desk-leg desk-leg-one"></div>
        <div className="workspace-desk-leg desk-leg-two"></div>
      </div>

      {/* =====================================
          CHAIR
      ===================================== */}

      <div ref={chairRef} className="workspace-chair">
        <div className="workspace-chair-back"></div>

        <div className="workspace-chair-seat"></div>

        <div className="workspace-chair-pole"></div>

        <div className="workspace-chair-base"></div>
      </div>

      {/* =====================================
          MESSAGE
      ===================================== */}

      <p className="working-message">
        okay... time to make some ideas real ✦
      </p>
    </section>
  );
}