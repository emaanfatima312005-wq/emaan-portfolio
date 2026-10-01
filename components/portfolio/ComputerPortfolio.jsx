"use client";
import { Vector2 } from "three";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Canvas,
  useFrame,
} from "@react-three/fiber";

import {
  Float,
  Stars,
} from "@react-three/drei";

import PortfolioChatbot from "./PortfolioChatbot";

/* ======================================================
   NAVIGATION
====================================================== */

const navItems = [
  ["01", "intro", "Intro"],
  ["02", "about", "About"],
  ["03", "journey", "Journey"],
  ["04", "experience", "Experience"],
  ["05", "projects", "Projects"],
  ["06", "skills", "Skills"],
  ["07", "contact", "Contact"],
];

/* ======================================================
   3D BACKGROUND OBJECTS
====================================================== */

function FloatingTechObjects() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const time =
      state.clock.elapsedTime;

    groupRef.current.rotation.y =
      Math.sin(time * 0.15) * 0.12;

    groupRef.current.rotation.x =
      Math.cos(time * 0.12) * 0.04;
  });

  return (
    <>
      <ambientLight
        intensity={0.65}
      />

      {/* PINK GLOW */}
      <pointLight
        position={[-4, 2, 4]}
        intensity={5}
        color="#F78ECF"
      />

      {/* PURPLE GLOW */}
      <pointLight
        position={[4, -1, 3]}
        intensity={5}
        color="#A480F2"
      />

      {/* BLUE GLOW */}
      <pointLight
        position={[0, 4, -2]}
        intensity={3}
        color="#6D8CFF"
      />

      <Stars
        radius={30}
        depth={18}
        count={700}
        factor={2}
        saturation={0.15}
        fade
        speed={0.25}
      />

      <group ref={groupRef}>
        {/* LEFT WIREFRAME OBJECT */}

        <Float
          speed={1.2}
          rotationIntensity={0.8}
          floatIntensity={1.2}
        >
          <mesh
            position={[
              -3.8,
              1.7,
              -2,
            ]}
          >
            <icosahedronGeometry
              args={[0.7, 1]}
            />

            <meshStandardMaterial
              color="#A480F2"
              emissive="#A480F2"
              emissiveIntensity={1.5}
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>

        {/* RIGHT NEON RING */}

        <Float
          speed={1.5}
          rotationIntensity={1.1}
          floatIntensity={1.4}
        >
          <mesh
            position={[
              4,
              1.2,
              -3,
            ]}
            rotation={[
              0.6,
              0.3,
              0.2,
            ]}
          >
            <torusGeometry
              args={[
                0.65,
                0.1,
                16,
                60,
              ]}
            />

            <meshStandardMaterial
              color="#F78ECF"
              emissive="#F78ECF"
              emissiveIntensity={2}
              transparent
              opacity={0.75}
            />
          </mesh>
        </Float>

        {/* LOWER PURPLE OBJECT */}

        <Float
          speed={1}
          rotationIntensity={0.7}
          floatIntensity={1}
        >
          <mesh
            position={[
              2.9,
              -2,
              -2,
            ]}
          >
            <octahedronGeometry
              args={[0.55, 0]}
            />

            <meshStandardMaterial
              color="#D4B0F9"
              emissive="#C580ED"
              emissiveIntensity={1.4}
              wireframe
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      </group>
    </>
  );
}

/* ======================================================
   BACKGROUND
====================================================== */

function PortfolioBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* LIGHTER NAVY BASE */}

      <div className="absolute inset-0 bg-[#0E1630]" />

      {/* PINK NEON CLOUD */}

      <div
        className="absolute -left-40 -top-32 h-[650px] w-[650px] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(247,142,207,0.38) 0%, rgba(247,142,207,0.12) 48%, transparent 72%)",
        }}
      />

      {/* PURPLE NEON CLOUD */}

      <div
        className="absolute -right-40 top-[12%] h-[720px] w-[720px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(164,128,242,0.45) 0%, rgba(164,128,242,0.13) 48%, transparent 73%)",
        }}
      />

      {/* CENTER PURPLE / BLUE */}

      <div
        className="absolute left-[20%] top-[55%] h-[600px] w-[600px] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(197,128,237,0.28) 0%, rgba(109,140,255,0.10) 50%, transparent 74%)",
        }}
      />

      {/* LOWER PINK */}

      <div
        className="absolute -bottom-52 right-[5%] h-[650px] w-[650px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(249,146,173,0.35) 0%, rgba(249,146,173,0.08) 52%, transparent 74%)",
        }}
      />

      {/* TECH GRID */}

      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            `
              linear-gradient(
                rgba(212,176,249,.28) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(212,176,249,.28) 1px,
                transparent 1px
              )
            `,
          backgroundSize:
            "52px 52px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,.8), transparent)",
        }}
      />

      {/* REAL 3D LAYER */}

      <Canvas
        camera={{
          position: [
            0,
            0,
            8,
          ],
          fov: 45,
        }}
        gl={{
          alpha: true,
          antialias: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(
            0x000000,
            0
          );
        }}
      >
        <FloatingTechObjects />
      </Canvas>
      {/* SOFT OVERLAY — CALMS THE WHOLE BACKGROUND */}

<div
  className="
    absolute
    inset-0
    bg-[#0E1630]/65
  "
/>
    </div>
  );
}

/* ======================================================
   SMALL REUSABLE UI
====================================================== */

function SectionLabel({
  number,
  children,
}) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-[#D4B0F9]">
      <span>{number}</span>

      <span className="h-px w-8 bg-[#D4B0F9]/50" />

      <span>{children}</span>
    </div>
  );
}

function GlassPanel({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        border
        border-[#D4B0F9]/20
        bg-[#111A36]/65
        shadow-[0_25px_80px_rgba(0,0,0,.28)]
        backdrop-blur-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* ======================================================
   MAIN PORTFOLIO
====================================================== */
const ABOUT_ROLES = [
  {
    id: "developer",
    icon: "</>",
    title: "Developer",
    subtitle:
      "Turning ideas into real digital experiences.",
    tags: [
      "Web Dev",
      "React",
      "Next.js",
    ],
    accent: "#F78ECF",
    glow:
      "rgba(247, 142, 207, .45)",
  },

  {
    id: "problem-solver",
    icon: "◇",
    title: "Problem Solver",
    subtitle:
      "Breaking down complexity into practical solutions.",
    tags: [
      "Logic",
      "Systems",
      "Debugging",
    ],
    accent: "#F992AD",
    glow:
      "rgba(249, 146, 173, .42)",
  },

  {
    id: "ai-explorer",
    icon: "AI",
    title: "AI Explorer",
    subtitle:
      "Exploring intelligent systems and what they can make possible.",
    tags: [
      "ML",
      "NLP",
      "Data",
    ],
    accent: "#A480F2",
    glow:
      "rgba(164, 128, 242, .48)",
  },

  {
    id: "creative-tech",
    icon: "✦",
    title: "Creative Tech",
    subtitle:
      "Blending creativity, design and technology.",
    tags: [
      "Design",
      "3D",
      "Interactive",
    ],
    accent: "#C580ED",
    glow:
      "rgba(197, 128, 237, .45)",
  },

  {
    id: "always-learning",
    icon: "↗",
    title: "Always Learning",
    subtitle:
      "Constantly exploring new tools, ideas and perspectives.",
    tags: [
      "Learn",
      "Build",
      "Repeat",
    ],
    accent: "#D4B0F9",
    glow:
      "rgba(212, 176, 249, .42)",
  },
];

function RoleShuffleDeck() {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    paused,
    setPaused,
  ] = useState(false);

  const total =
    ABOUT_ROLES.length;

  const nextCard = () => {
    setActiveIndex(
      (current) =>
        (current + 1) %
        total
    );
  };

  const previousCard = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + total) %
        total
    );
  };

  useEffect(() => {
    if (paused) return;

    const timer =
      setInterval(() => {
        nextCard();
      }, 3200);

    return () =>
      clearInterval(timer);
  }, [paused]);

  const getPosition = (
    index
  ) => {
    let offset =
      (index -
        activeIndex +
        total) %
      total;

    if (
      offset >
      total / 2
    ) {
      offset -= total;
    }

    return offset;
  };

  const getCardStyle = (
    offset
  ) => {
    if (offset === 0) {
      return {
        transform:
          "translate(-50%, -50%) translateX(0px) translateZ(100px) rotateY(0deg) scale(1)",
        opacity: 1,
        zIndex: 10,
      };
    }

    if (offset === -1) {
      return {
        transform:
          "translate(-50%, -50%) translateX(-190px) translateZ(10px) rotateY(13deg) rotateZ(-3deg) scale(.88)",
        opacity: 0.8,
        zIndex: 7,
      };
    }

    if (offset === 1) {
      return {
        transform:
          "translate(-50%, -50%) translateX(190px) translateZ(10px) rotateY(-13deg) rotateZ(3deg) scale(.88)",
        opacity: 0.8,
        zIndex: 7,
      };
    }

    if (offset === -2) {
      return {
        transform:
          "translate(-50%, -50%) translateX(-300px) translateZ(-80px) rotateY(18deg) rotateZ(-5deg) scale(.73)",
        opacity: 0.34,
        zIndex: 3,
      };
    }

    return {
      transform:
        "translate(-50%, -50%) translateX(300px) translateZ(-80px) rotateY(-18deg) rotateZ(5deg) scale(.73)",
      opacity: 0.34,
      zIndex: 3,
    };
  };

  return (
    <div
      className="
        relative
        min-h-[620px]
        overflow-hidden
        rounded-[36px]
        border
        border-[#D4B0F9]/20
        bg-[#111A36]/35
        shadow-[0_30px_100px_rgba(0,0,0,.28)]
        backdrop-blur-xl
      "
      onMouseEnter={() =>
        setPaused(true)
      }
      onMouseLeave={() =>
        setPaused(false)
      }
    >
      {/* ===============================
          BACKGROUND GLOWS
      ================================ */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-12
          h-80
          w-80
          rounded-full
          bg-[#F78ECF]/20
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-0
          h-96
          w-96
          rounded-full
          bg-[#A480F2]/25
          blur-[110px]
        "
      />

      {/* GRID */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.08]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(212,176,249,.3) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(212,176,249,.3) 1px,
              transparent 1px
            )
          `,
          backgroundSize:
            "40px 40px",
        }}
      />

      {/* TOP TEXT */}

      <div
        className="
          absolute
          left-7
          top-6
          font-mono
          text-[10px]
          uppercase
          tracking-[0.2em]
          text-[#A480F2]
        "
      >
        Different roles
        <br />
        same purpose
        <span className="mt-2 block h-px w-7 bg-[#F78ECF]" />
      </div>

      <div
        className="
          absolute
          right-7
          top-6
          text-right
          font-mono
          text-[10px]
          uppercase
          tracking-[0.18em]
          text-[#8F98B8]
        "
      >
        ideas
        <br />
        technology
        <br />
        impact
      </div>

      {/* ===============================
          NEON ORBIT
      ================================ */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[48%]
          h-[260px]
          w-[82%]
          -translate-x-1/2
          -translate-y-1/2
          rotate-[-8deg]
          rounded-[50%]
          border
          border-[#F78ECF]/40
          shadow-[0_0_45px_rgba(247,142,207,.16)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[48%]
          h-[210px]
          w-[67%]
          -translate-x-1/2
          -translate-y-1/2
          rotate-[9deg]
          rounded-[50%]
          border
          border-[#A480F2]/30
        "
      />

      {/* ===============================
          SHUFFLING CARDS
      ================================ */}

      <div
        className="
          absolute
          left-1/2
          top-[47%]
          h-[390px]
          w-full
          -translate-x-1/2
          -translate-y-1/2
        "
        style={{
          perspective:
            "1300px",
          transformStyle:
            "preserve-3d",
        }}
      >
        {ABOUT_ROLES.map(
          (
            role,
            index
          ) => {
            const position =
              getPosition(
                index
              );

            const isActive =
              position === 0;

            return (
              <button
                key={
                  role.id
                }
                type="button"
                onClick={() =>
                  setActiveIndex(
                    index
                  )
                }
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[330px]
                  w-[270px]
                  rounded-[28px]
                  border
                  bg-[#111A36]/90
                  p-7
                  text-left
                  backdrop-blur-2xl
                  transition-all
                  duration-700
                  ease-[cubic-bezier(.22,1,.36,1)]
                  md:w-[300px]
                "
                style={{
                  ...getCardStyle(
                    position
                  ),

                  borderColor:
                    isActive
                      ? `${role.accent}AA`
                      : `${role.accent}45`,

                  boxShadow:
                    isActive
                      ? `
                        0 28px 70px rgba(0,0,0,.42),
                        0 0 45px ${role.glow},
                        inset 0 0 35px ${role.glow}
                      `
                      : `
                        0 20px 50px rgba(0,0,0,.28),
                        0 0 25px ${role.glow}
                      `,

                  transformStyle:
                    "preserve-3d",
                }}
              >
                {/* TOP ICON */}

                <div
                  className="
                    mb-8
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    font-mono
                    text-lg
                    font-bold
                  "
                  style={{
                    color:
                      role.accent,

                    borderColor:
                      `${role.accent}55`,

                    background:
                      `${role.accent}12`,

                    boxShadow:
                      `0 0 30px ${role.glow}`,
                  }}
                >
                  {
                    role.icon
                  }
                </div>

                {/* ACTIVE MICRO COPY */}

                {isActive && (
                  <div
                    className="
                      absolute
                      right-6
                      top-7
                      font-mono
                      text-[9px]
                      uppercase
                      leading-5
                      tracking-[0.14em]
                      text-[#7F89A9]
                    "
                  >
                    Learn
                    <br />
                    Build
                    <br />
                    Iterate
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white">
                  {
                    role.title
                  }
                </h3>

                <p className="mt-4 min-h-[72px] text-sm leading-6 text-[#AEB7D5]">
                  {
                    role.subtitle
                  }
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {role.tags.map(
                    (
                      tag
                    ) => (
                      <span
                        key={
                          tag
                        }
                        className="
                          rounded-full
                          border
                          px-3
                          py-1.5
                          font-mono
                          text-[9px]
                        "
                        style={{
                          color:
                            role.accent,

                          borderColor:
                            `${role.accent}55`,

                          background:
                            `${role.accent}10`,
                        }}
                      >
                        {
                          tag
                        }
                      </span>
                    )
                  )}
                </div>

                {isActive && (
                  <span
                    className="
                      absolute
                      bottom-6
                      right-7
                      text-xl
                    "
                    style={{
                      color:
                        role.accent,
                    }}
                  >
                    →
                  </span>
                )}
              </button>
            );
          }
        )}
      </div>

      {/* ===============================
          CONTROLS
      ================================ */}

      <button
        type="button"
        onClick={
          previousCard
        }
        className="
          absolute
          bottom-[86px]
          left-8
          z-30
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-[#A480F2]/40
          bg-[#0E1630]/75
          text-xl
          text-white
          backdrop-blur-xl
          transition
          duration-300
          hover:scale-110
          hover:border-[#F78ECF]
          hover:shadow-[0_0_30px_rgba(247,142,207,.25)]
        "
      >
        ‹
      </button>

      <button
        type="button"
        onClick={
          nextCard
        }
        className="
          absolute
          bottom-[86px]
          right-8
          z-30
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-[#A480F2]/40
          bg-[#0E1630]/75
          text-xl
          text-white
          backdrop-blur-xl
          transition
          duration-300
          hover:scale-110
          hover:border-[#F78ECF]
          hover:shadow-[0_0_30px_rgba(247,142,207,.25)]
        "
      >
        ›
      </button>

      {/* ===============================
          DOTS + LABEL
      ================================ */}

      <div
        className="
          absolute
          bottom-8
          left-1/2
          z-30
          -translate-x-1/2
          text-center
        "
      >
        <p
          className="
            mb-4
            whitespace-nowrap
            font-mono
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-[#8F98B8]
          "
        >
          explore • switch
          roles
        </p>

        <div className="flex items-center justify-center gap-2">
          {ABOUT_ROLES.map(
            (
              role,
              index
            ) => (
              <button
                key={
                  role.id
                }
                type="button"
                onClick={() =>
                  setActiveIndex(
                    index
                  )
                }
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-500

                  ${
                    activeIndex ===
                    index
                      ? "w-8 bg-[#F78ECF] shadow-[0_0_15px_rgba(247,142,207,.7)]"
                      : "w-2 bg-[#697394]"
                  }
                `}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function AnimatedLetters({
  text,
  className = "",
  startDelay = 0,
  gradientColors = null,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Smoothly blend from one HEX color to another
  const interpolateColor = (color1, color2, factor) => {
    const hex = (color) =>
      color.replace("#", "").match(/.{2}/g).map((x) => parseInt(x, 16));

    const c1 = hex(color1);
    const c2 = hex(color2);

    const result = c1.map((value, index) =>
      Math.round(value + (c2[index] - value) * factor)
    );

    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  };

  const getLetterColor = (index) => {
    if (!gradientColors) return undefined;

    const progress =
      text.length === 1
        ? 0
        : index / (text.length - 1);

    // Pink → soft pink/purple
    if (progress <= 0.5) {
      return interpolateColor(
        gradientColors[0],
        gradientColors[1],
        progress * 2
      );
    }

    // Soft pink/purple → lavender
    return interpolateColor(
      gradientColors[1],
      gradientColors[2],
      (progress - 0.5) * 2
    );
  };

  return (
    <span
      ref={ref}
      aria-label={text}
      className={`block whitespace-nowrap ${className}`}
      style={{
        perspective: "700px",
      }}
    >
      {text.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          aria-hidden="true"
          className="inline-block"
          style={{
            opacity: visible ? 1 : 0,

            transform: visible
              ? "translateY(0px) rotateX(0deg)"
              : "translateY(45px) rotateX(-70deg)",

            filter: visible
              ? "blur(0px)"
              : "blur(7px)",

            color: gradientColors
              ? getLetterColor(index)
              : undefined,

            transition: `
              opacity .45s ease,
              transform .65s cubic-bezier(.22,1,.36,1),
              filter .5s ease
            `,

            transitionDelay: `${
              startDelay + index * 55
            }ms`,
          }}
        >
          {letter === " "
            ? "\u00A0"
            : letter}
        </span>
      ))}
    </span>
  );
}

function JourneySection() {
  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [activePoint, setActivePoint] = useState(-1);

  const journey = [
    {
      year: "2023",
      title: "BS Software Engineering",
      subtitle:
        "International Islamic University, Islamabad",
      detail:
        "Started building my foundation in software engineering.",
    },
    {
      year: "2024",
      title: "First Professional Experience",
      subtitle:
        "Virtual Assistant — Noble QS",
      detail:
        "Worked with digital operations, communication and business tools.",
    },
    {
      year: "2026",
      title: "AI Learning",
      subtitle:
        "NAVTTC Artificial Intelligence Certification",
      detail:
        "Machine Learning, NLP, Deep Learning and model training.",
    },
    {
      year: "2026",
      title: "Web Development",
      subtitle:
        "Corvit Systems",
      detail:
        "Built real web interfaces, worked with Next.js, APIs and team workflows.",
    },
    {
      year: "NOW",
      title: "Building Forward",
      subtitle:
        "Projects • AI • Web • 3D",
      detail:
        "Turning everything I learn into real, interactive projects.",
    },
  ];

  const journeyCount = journey.length;

  /* ======================================================
     DETECT WHEN SECTION ENTERS VIEW
  ====================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          // Only play the sequence once
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ======================================================
     ACTIVATE EACH JOURNEY POINT ONE BY ONE
  ====================================================== */

  useEffect(() => {
    if (!visible) return;

    // Start completely inactive
    setActivePoint(-1);

    const timers = Array.from(
      { length: journeyCount },
      (_, index) =>
        setTimeout(() => {
          setActivePoint(index);
        }, 700 + index * 1200)
    );

    return () => {
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, [visible, journeyCount]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="
        relative
        z-10
        mx-auto
        min-h-screen
        max-w-[1500px]
        scroll-mt-20
        overflow-hidden
        border-t
        border-[#D4B0F9]/10
        px-6
        py-28
        lg:px-12
      "
    >
      {/* =================================================
          SECTION LABEL
      ================================================= */}

      <SectionLabel number="03">
        Education + Journey
      </SectionLabel>

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-8
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div>
          <p className="mb-5 font-mono text-sm text-[#A480F2]">
            &gt; journey.trace()
          </p>

          <h2
  className="
    text-5xl
    font-black
    uppercase
    leading-[0.9]
    tracking-[-0.055em]
    md:text-7xl
    xl:text-8xl
  "
>
  <AnimatedLetters
    text="SMALL STEPS."
    className="text-white"
    startDelay={100}
  />

  <AnimatedLetters
    text="BIGGER IDEAS."
    gradientColors={[
      "#F992AD",
      "#F78ECF",
      "#A480F2",
    ]}
    startDelay={800}
  />
</h2>
        </div>

        <p
          className="
            max-w-md
            text-sm
            leading-7
            text-[#AEB7D5]
            md:text-base
          "
        >
          A journey shaped by learning,
          experimentation and turning ideas
          into something real.
        </p>
      </div>

      {/* =================================================
          JOURNEY TIMELINE
      ================================================= */}

      <div className="relative mt-24">
        {/* ---------------------------------------------
            DIM BACKGROUND LINE
        --------------------------------------------- */}

        <div
          className="
            absolute
            left-0
            top-[29px]
            hidden
            h-[2px]
            w-full
            bg-[#D4B0F9]/10
            md:block
          "
        />

        {/* ---------------------------------------------
            GLOWING PROGRESS LINE
        --------------------------------------------- */}

        <div
          className="
            absolute
            left-0
            top-[29px]
            hidden
            h-[2px]
            bg-gradient-to-r
            from-[#F78ECF]
            via-[#A480F2]
            to-[#6D8CFF]
            shadow-[0_0_18px_rgba(164,128,242,.8)]
            transition-all
            duration-700
            ease-out
            md:block
          "
          style={{
            width:
              activePoint < 0
                ? "0%"
                : `${
                    (activePoint /
                      (journeyCount - 1)) *
                    100
                  }%`,
          }}
        />

        {/* =================================================
            JOURNEY POINTS
        ================================================= */}

        <div
          className="
            grid
            gap-10
            md:grid-cols-5
          "
        >
          {journey.map((item, index) => {
            const isActive =
              index <= activePoint;

            const isCurrent =
              index === activePoint;

            return (
              <div
                key={`${item.year}-${item.title}`}
                className="
                  relative
                  transition-all
                  duration-700
                  ease-out
                "
                style={{
                  opacity: isActive
                    ? 1
                    : 0.3,

                  transform: isActive
                    ? "translateY(0px)"
                    : "translateY(20px)",

                  filter: isActive
                    ? "blur(0px)"
                    : "blur(1px)",
                }}
              >
                {/* =====================================
                    TIMELINE NODE
                ====================================== */}

                <div
                  className={`
                    relative
                    z-10
                    mb-7
                    flex
                    h-[60px]
                    w-[60px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    bg-[#111A36]
                    transition-all
                    duration-700

                    ${
                      isActive
                        ? `
                          border-[#F78ECF]/80
                          shadow-[
                            0_0_18px_rgba(247,142,207,.55),
                            0_0_40px_rgba(164,128,242,.25)
                          ]
                        `
                        : `
                          border-[#D4B0F9]/20
                          shadow-none
                        `
                    }

                    ${
                      isCurrent
                        ? "scale-110"
                        : "scale-100"
                    }
                  `}
                >
                  {/* CURRENT POINT PULSE */}

                  {isCurrent && (
                    <>
                      <span
                        className="
                          absolute
                          inset-[-6px]
                          animate-ping
                          rounded-full
                          border
                          border-[#F78ECF]/40
                        "
                      />

                      <span
                        className="
                          absolute
                          inset-[-12px]
                          rounded-full
                          border
                          border-[#A480F2]/15
                        "
                      />
                    </>
                  )}

                  {/* INNER DOT */}

                  <div
                    className={`
                      h-3
                      w-3
                      rounded-full
                      transition-all
                      duration-700

                      ${
                        isActive
                          ? `
                            scale-125
                            bg-[#F78ECF]
                            shadow-[0_0_25px_rgba(247,142,207,1)]
                          `
                          : `
                            scale-100
                            bg-[#697394]
                            shadow-none
                          `
                      }
                    `}
                  />
                </div>

                {/* =====================================
                    YEAR
                ====================================== */}

                <p
                  className={`
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    transition-all
                    duration-700

                    ${
                      isActive
                        ? "text-[#F78ECF]"
                        : "text-[#697394]"
                    }
                  `}
                >
                  {item.year}
                </p>

                {/* =====================================
                    TITLE
                ====================================== */}

                <h3
                  className={`
                    mt-3
                    text-lg
                    font-bold
                    transition-all
                    duration-700

                    ${
                      isActive
                        ? "text-white"
                        : "text-[#7F89A9]"
                    }
                  `}
                >
                  {item.title}
                </h3>

                {/* =====================================
                    SUBTITLE
                ====================================== */}

                <p
                  className={`
                    mt-2
                    text-sm
                    font-medium
                    transition-all
                    duration-700

                    ${
                      isActive
                        ? "text-[#D4B0F9]"
                        : "text-[#697394]"
                    }
                  `}
                >
                  {item.subtitle}
                </p>

                {/* =====================================
                    DESCRIPTION
                ====================================== */}

                <p
                  className={`
                    mt-4
                    text-sm
                    leading-6
                    transition-all
                    duration-700

                    ${
                      isActive
                        ? "text-[#8F98B8]"
                        : "text-[#59627E]"
                    }
                  `}
                >
                  {item.detail}
                </p>

                {/* CURRENT POINT LABEL */}

                {isCurrent && (
                  <div
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-[#F78ECF]/20
                      bg-[#F78ECF]/5
                      px-3
                      py-1.5
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.15em]
                      text-[#F78ECF]
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        animate-pulse
                        rounded-full
                        bg-[#F78ECF]
                        shadow-[0_0_10px_rgba(247,142,207,1)]
                      "
                    />

                    tracing
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* =================================================
          BOTTOM DETAIL
      ================================================= */}

      <div
        className="
          mt-20
          flex
          items-center
          gap-4
          font-mono
          text-[10px]
          uppercase
          tracking-[0.2em]
          text-[#697394]
        "
      >
        <span
          className="
            h-px
            flex-1
            bg-gradient-to-r
            from-transparent
            via-[#A480F2]/35
            to-transparent
          "
        />

        <span>
          {activePoint === journeyCount - 1
            ? "journey_loaded"
            : "tracing_journey"}

          <span className="animate-pulse text-[#F78ECF]">
            _
          </span>
        </span>

        <span
          className="
            h-px
            flex-1
            bg-gradient-to-r
            from-transparent
            via-[#A480F2]/35
            to-transparent
          "
        />
      </div>
    </section>
  );
}

/* ======================================================
   IRIDESCENT OIL / WATER EFFECT
====================================================== */

function IridescentOilPlane({
  mouse,
}) {
  const materialRef =
    useRef(null);

  const uniformsRef =
    useRef({
      uTime: {
        value: 0,
      },

      uMouse: {
        value: new Vector2(
          0.72,
          0.78
        ),
      },

      uMouseStrength: {
        value: 0,
      },

      uAspect: {
        value: 1,
      },
    });

  useFrame(
    (
      state,
      delta
    ) => {
      const material =
        materialRef.current;

      if (!material) return;

      const uniforms =
        material.uniforms;

      /*
        Continuous slow liquid motion
      */

      uniforms.uTime.value +=
        delta;

      /*
        Mouse position.

        DOM coordinates have Y going
        downward, shader UV coordinates
        go upward, so we flip Y.
      */

      const targetX =
        mouse?.x ?? 0.72;

      const targetY =
        1 -
        (mouse?.y ?? 0.22);

      uniforms.uMouse.value.lerp(
        new Vector2(
          targetX,
          targetY
        ),
        0.075
      );

      /*
        Stronger reaction while mouse
        is actually inside the box.
      */

      const targetStrength =
        mouse?.active
          ? 1
          : 0.22;

      uniforms.uMouseStrength.value +=
        (
          targetStrength -
          uniforms.uMouseStrength.value
        ) *
        0.055;

      /*
        Keep distortion proportional
        to the Experience panel.
      */

      const width =
        state.size.width;

      const height =
        state.size.height;

      uniforms.uAspect.value =
        height > 0
          ? width / height
          : 1;
    }
  );

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;

      gl_Position =
        vec4(
          position.xy,
          0.0,
          1.0
        );
    }
  `;

  const fragmentShader = `
    precision highp float;

    varying vec2 vUv;

    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseStrength;
    uniform float uAspect;


    /* ============================
       RANDOM
    ============================ */

    float hash(vec2 p) {
      p =
        fract(
          p *
          vec2(
            123.34,
            456.21
          )
        );

      p +=
        dot(
          p,
          p + 45.32
        );

      return
        fract(
          p.x *
          p.y
        );
    }


    /* ============================
       SMOOTH NOISE
    ============================ */

    float noise(vec2 p) {
      vec2 i =
        floor(p);

      vec2 f =
        fract(p);

      float a =
        hash(i);

      float b =
        hash(
          i +
          vec2(
            1.0,
            0.0
          )
        );

      float c =
        hash(
          i +
          vec2(
            0.0,
            1.0
          )
        );

      float d =
        hash(
          i +
          vec2(
            1.0,
            1.0
          )
        );

      vec2 u =
        f *
        f *
        (
          3.0 -
          2.0 * f
        );

      return
        mix(
          a,
          b,
          u.x
        ) +

        (
          c - a
        ) *
        u.y *
        (
          1.0 -
          u.x
        ) +

        (
          d - b
        ) *
        u.x *
        u.y;
    }


    /* ============================
       FRACTAL LIQUID NOISE
    ============================ */

    float fbm(vec2 p) {
      float value =
        0.0;

      float amplitude =
        0.5;

      mat2 rotation =
        mat2(
          0.80,
          0.60,
          -0.60,
          0.80
        );

      for (
        int i = 0;
        i < 5;
        i++
      ) {
        value +=
          amplitude *
          noise(p);

        p =
          rotation *
          p *
          2.02;

        amplitude *=
          0.5;
      }

      return value;
    }


    void main() {
      vec2 uv =
        vUv;

      vec2 p =
        uv;

      /*
        =================================
        BASE LIQUID FLOW
        =================================
      */

      float slowTime =
        uTime *
        0.16;

      float flowOne =
        fbm(
          p *
          2.7 +
          vec2(
            slowTime,
            -slowTime * 0.65
          )
        );

      float flowTwo =
        fbm(
          p *
          4.1 +
          vec2(
            -slowTime * 0.48,
            slowTime * 0.75
          ) +
          flowOne
        );

      /*
        Distort coordinates before
        drawing the colors.
      */

      p.x +=
        (
          flowOne -
          0.5
        ) *
        0.16;

      p.y +=
        (
          flowTwo -
          0.5
        ) *
        0.14;


      /*
        =================================
        MOUSE DISTURBANCE
        =================================
      */

      vec2 mouseSpace =
        p -
        uMouse;

      mouseSpace.x *=
        uAspect;

      float mouseDistance =
        length(
          mouseSpace
        );

      float mouseField =
        exp(
          -mouseDistance *
          3.4
        );

      /*
        Gentle circular ripple,
        similar to liquid being pushed.
      */

      float ripple =
        sin(
          mouseDistance *
          25.0 -
          uTime *
          3.0
        );

      ripple *=
        exp(
          -mouseDistance *
          5.2
        );

      ripple *=
        uMouseStrength;

      /*
        Warp UVs around cursor.
      */

      vec2 direction =
        normalize(
          mouseSpace +
          vec2(
            0.0001
          )
        );

      p +=
        direction *
        ripple *
        0.022;

      p.x +=
        mouseField *
        sin(
          uTime * 0.65
        ) *
        0.018 *
        uMouseStrength;

      p.y +=
        mouseField *
        cos(
          uTime * 0.55
        ) *
        0.018 *
        uMouseStrength;


      /*
        =================================
        OIL INTERFERENCE BANDS
        =================================
      */

      float liquidNoise =
        fbm(
          p *
          3.5 +
          flowOne *
          1.8
        );

      float liquidNoiseTwo =
        fbm(
          p *
          6.0 -
          flowTwo *
          1.5
        );

      float bands =
        sin(
          (
            p.x *
            2.4 +

            p.y *
            2.0 +

            liquidNoise *
            2.8 +

            liquidNoiseTwo *
            0.8
          ) *
          6.0 +

          uTime *
          0.34 +

          ripple *
          3.5
        );

      bands =
        bands *
        0.5 +
        0.5;


      /*
        =================================
        YOUR PORTFOLIO COLORS
        =================================
      */

      vec3 pink =
        vec3(
          0.969,
          0.557,
          0.812
        );

      vec3 rose =
        vec3(
          0.976,
          0.573,
          0.678
        );

      vec3 lavender =
        vec3(
          0.831,
          0.690,
          0.976
        );

      vec3 purple =
        vec3(
          0.643,
          0.502,
          0.949
        );

      vec3 violet =
        vec3(
          0.773,
          0.502,
          0.929
        );

      vec3 blue =
        vec3(
          0.427,
          0.549,
          1.0
        );


      /*
        Build the shifting iridescence.
      */

      float phase =
        bands;

      vec3 color =
        mix(
          pink,
          lavender,
          smoothstep(
            0.00,
            0.28,
            phase
          )
        );

      color =
        mix(
          color,
          purple,
          smoothstep(
            0.25,
            0.52,
            phase
          )
        );

      color =
        mix(
          color,
          blue,
          smoothstep(
            0.50,
            0.76,
            phase
          )
        );

      color =
        mix(
          color,
          violet,
          smoothstep(
            0.74,
            1.0,
            phase
          )
        );


      /*
        Add smaller pearlescent colors
        between the main bands.
      */

      float shimmer =
        sin(
          liquidNoiseTwo *
          12.0 +
          uTime *
          0.25
        ) *
        0.5 +
        0.5;

      color +=
        rose *
        shimmer *
        0.10;

      color +=
        lavender *
        (
          1.0 -
          shimmer
        ) *
        0.10;


      /*
        =================================
        CURSOR LIGHT / LIQUID RESPONSE
        =================================
      */

      color +=
        pink *
        mouseField *
        0.16 *
        uMouseStrength;

      color +=
        lavender *
        mouseField *
        0.12 *
        uMouseStrength;


      /*
        =================================
        KEEP EDGES DARK
        =================================
      */

      float edge =
        smoothstep(
          0.95,
          0.18,
          distance(
            uv,
            vec2(
              0.5
            )
          )
        );

      float textureStrength =
        0.56 +

        liquidNoise *
        0.20 +

        mouseField *
        0.10;


      /*
        Keep it visible, but still
        transparent enough for text.
      */

      float alpha =
        (
          0.34 +
          textureStrength *
          0.28
        ) *
        (
          0.75 +
          edge *
          0.25
        );

      gl_FragColor =
        vec4(
          color,
          alpha
        );
    }
  `;

  return (
    <mesh>
      <planeGeometry
        args={[
          2,
          2,
        ]}
      />

      <shaderMaterial
        ref={materialRef}
        uniforms={
          uniformsRef.current
        }
        vertexShader={
          vertexShader
        }
        fragmentShader={
          fragmentShader
        }
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}


/* ======================================================
   MOUSE REACTIVE OIL SURFACE
====================================================== */

function MouseReactiveBlob({
  mouse,
}) {
  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0

        z-[2]

        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* BASE COLOR GLOW */}

      <div
        className="
          absolute
          inset-0

          opacity-40
        "
        style={{
          background: `
            radial-gradient(
              ellipse at 78% 18%,
              rgba(
                247,
                142,
                207,
                .28
              ),
              transparent 46%
            ),

            radial-gradient(
              ellipse at 65% 68%,
              rgba(
                164,
                128,
                242,
                .23
              ),
              transparent 48%
            ),

            radial-gradient(
              ellipse at 92% 55%,
              rgba(
                109,
                140,
                255,
                .18
              ),
              transparent 42%
            )
          `,
        }}
      />

      {/* REAL LIQUID / OIL LAYER */}

      <Canvas
        orthographic

        camera={{
          position: [
            0,
            0,
            1,
          ],

          zoom: 1,
        }}

        gl={{
          alpha: true,
          antialias: true,
        }}

        dpr={[
          1,
          1.5,
        ]}

        className="
          absolute
          inset-0
        "

        style={{
          width:
            "100%",

          height:
            "100%",
        }}
      >
        <IridescentOilPlane
          mouse={mouse}
        />
      </Canvas>

      {/* ==========================================
    GLASS OVERLAY
========================================== */}

<div
  className="
    absolute
    inset-0
    z-[3]

    bg-[#0E1630]/75

    backdrop-blur-[3px]
  "
/>

{/* ==========================================
    SOFT DEPTH OVERLAY
========================================== */}

<div
  className="
    absolute
    inset-0
    z-[4]
  "
  style={{
    background: `
      radial-gradient(
        ellipse at 78% 18%,

        rgba(
          247,
          142,
          207,
          .05
        ) 0%,

        transparent 45%
      ),

      linear-gradient(
        105deg,

        rgba(
          14,
          22,
          48,
          .58
        ) 0%,

        rgba(
          14,
          22,
          48,
          .36
        ) 38%,

        rgba(
          14,
          22,
          48,
          .20
        ) 68%,

        rgba(
          14,
          22,
          48,
          .12
        ) 100%
      )
    `,
  }}
/>
    </div>
  );
}

/* ======================================================
   EXPERIENCE
====================================================== */

function ExperienceSection() {
  const [
    activeExperience,
    setActiveExperience,
  ] = useState(0);

  const [
    blobMouse,
    setBlobMouse,
  ] = useState({
    x: 0.78,
    y: 0.18,
    active: false,
  });

  const handleBlobMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    setBlobMouse({
      x: Math.max(
        0,
        Math.min(1, x)
      ),

      y: Math.max(
        0,
        Math.min(1, y)
      ),

      active: true,
    });
  };

  const handleBlobMouseLeave = () => {
    setBlobMouse({
      x: 0.78,
      y: 0.18,
      active: false,
    });
  };

  const experiences = [
    {
      id: "corvit",

      company:
        "Corvit Systems",

      role:
        "Web Developer Intern",

      period:
        "JUN — AUG 2026",

      location:
        "Islamabad, Pakistan",

      code:
        "01",

      accent:
        "#F78ECF",

      glow:
        "rgba(247,142,207,.35)",

      summary:
        "Worked on real-world web development projects while strengthening my frontend, debugging and collaboration skills.",

      points: [
        "Developed COTSLE using Next.js.",

        "Built responsive and user-friendly interfaces.",

        "Created reusable frontend components.",

        "Worked with APIs and backend functionality.",

        "Debugged, tested and maintained application features.",

        "Collaborated within a development team.",
      ],

      stack: [
        "Next.js",
        "React",
        "Tailwind",
        "APIs",
        "Git",
      ],
    },

    {
      id:
        "signature",

      company:
        "Signature Trips",

      role:
        "Web Developer & Co-Founder",

      period:
        "JUN — JUL 2026",

      location:
        "Islamabad, Pakistan",

      code:
        "02",

      accent:
        "#A480F2",

      glow:
        "rgba(164,128,242,.38)",

      summary:
        "Combined development and entrepreneurship while helping shape the company's digital presence and technical direction.",

      points: [
        "Designed and developed the company website.",

        "Focused on responsiveness and usability.",

        "Managed website features and content.",

        "Handled maintenance and troubleshooting.",

        "Contributed to digital strategy.",

        "Participated in business and technical decisions.",
      ],

      stack: [
        "Web Development",
        "UI/UX",
        "Strategy",
        "Maintenance",
      ],
    },

    {
      id:
        "noble",

      company:
        "Noble QS",

      role:
        "Virtual Assistant",

      period:
        "MAR — JUN 2024",

      location:
        "Dublin, Ireland",

      code:
        "03",

      accent:
        "#D4B0F9",

      glow:
        "rgba(212,176,249,.32)",

      summary:
        "My first professional experience helped me develop communication, organisation and digital operations skills.",

      points: [
        "Handled administrative tasks.",

        "Supported email communication.",

        "Managed records and digital information.",

        "Worked with administrative dashboards.",

        "Assisted with social media activities.",

        "Supported digital marketing and online operations.",
      ],

      stack: [
        "Communication",
        "Operations",
        "Content",
        "Organisation",
      ],
    },
  ];

  const active =
    experiences[
      activeExperience
    ];

  
  return (
    <section
      id="experience"
      className="
        relative
        z-10

        mx-auto

        min-h-screen
        max-w-[1500px]

        scroll-mt-20
        overflow-hidden

        border-t
        border-[#D4B0F9]/10

        px-6
        py-28

        lg:px-12
      "
    >
      {/* ============================================
          SECTION LABEL
      ============================================ */}

      <SectionLabel number="04">
        Experience
      </SectionLabel>

      {/* ============================================
          HEADER
      ============================================ */}

      <div
        className="
          flex
          flex-col
          gap-8

          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div>
          <p
            className="
              mb-5

              font-mono
              text-sm

              text-[#A480F2]
            "
          >
            &gt; experience.log()
          </p>

          <h2
  className="
    text-5xl
    font-black
    uppercase
    leading-[0.9]
    tracking-[-0.055em]
    md:text-7xl
    xl:text-8xl
  "
>
  <AnimatedLetters
    text="TURNING LEARNING"
    className="text-white"
    startDelay={100}
  />

  <AnimatedLetters
    text="INTO IMPACT."
    gradientColors={[
      "#F992AD",
      "#F78ECF",
      "#A480F2",
    ]}
    startDelay={850}
  />
</h2>
        </div>

        <p
          className="
            max-w-md

            text-sm
            leading-7

            text-[#AEB7D5]

            md:text-base
          "
        >
          Every role taught me something
          different — from development and
          collaboration to communication,
          strategy and problem solving.
        </p>
      </div>

      {/* ============================================
          EXPERIENCE SYSTEM
      ============================================ */}

      <div
        className="
          mt-20

          grid
          gap-8

          lg:grid-cols-[0.78fr_1.22fr]
        "
      >
        {/* ========================================
            LEFT — EXPERIENCE SELECTOR
        ======================================== */}

        <div className="space-y-4">
          <p
            className="
              mb-5

              font-mono
              text-[10px]

              uppercase
              tracking-[0.22em]

              text-[#697394]
            "
          >
            // select experience
          </p>

          {experiences.map(
            (
              experience,
              index
            ) => {
              const isActive =
                activeExperience ===
                index;

              return (
                <button
                  key={
                    experience.id
                  }
                  type="button"

                  onClick={() =>
                    setActiveExperience(
                      index
                    )
                  }

                  onMouseEnter={() =>
                    setActiveExperience(
                      index
                    )
                  }

                  className={`
                    group

                    relative

                    w-full

                    overflow-hidden

                    rounded-2xl

                    border

                    p-5

                    text-left

                    backdrop-blur-xl

                    transition-all
                    duration-500

                    ${
                      isActive
                        ? `
                          translate-x-2
                          bg-[#111A36]/85
                        `
                        : `
                          bg-[#111A36]/35
                          hover:translate-x-1
                        `
                    }
                  `}

                  style={{
                    borderColor:
                      isActive
                        ? `${experience.accent}90`
                        : "rgba(212,176,249,.14)",

                    boxShadow:
                      isActive
                        ? `
                          0 20px 55px rgba(0,0,0,.22),
                          0 0 35px ${experience.glow}
                        `
                        : "none",
                  }}
                >
                  {/* ACTIVE SIDE LINE */}

                  <span
                    className="
                      absolute

                      bottom-0
                      left-0
                      top-0

                      w-[3px]

                      transition-all
                      duration-500
                    "

                    style={{
                      background:
                        isActive
                          ? experience.accent
                          : "transparent",

                      boxShadow:
                        isActive
                          ? `0 0 18px ${experience.accent}`
                          : "none",
                    }}
                  />

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div>
                      <p
                        className="
                          font-mono

                          text-[9px]

                          uppercase
                          tracking-[0.18em]
                        "

                        style={{
                          color:
                            experience.accent,
                        }}
                      >
                        EXP_
                        {
                          experience.code
                        }
                      </p>

                      <h3
                        className="
                          mt-3

                          text-xl
                          font-bold

                          text-white
                        "
                      >
                        {
                          experience.company
                        }
                      </h3>

                      <p
                        className="
                          mt-1

                          text-sm

                          text-[#AEB7D5]
                        "
                      >
                        {
                          experience.role
                        }
                      </p>
                    </div>

                    <span
                      className={`
                        text-xl

                        transition-all
                        duration-500

                        ${
                          isActive
                            ? "translate-x-1 opacity-100"
                            : "opacity-30"
                        }
                      `}

                      style={{
                        color:
                          experience.accent,
                      }}
                    >
                      →
                    </span>
                  </div>

                  <div
                    className="
                      mt-5

                      flex
                      flex-wrap
                      items-center
                      gap-2

                      font-mono
                      text-[9px]

                      uppercase
                      tracking-[0.14em]

                      text-[#697394]
                    "
                  >
                    <span>
                      {
                        experience.period
                      }
                    </span>

                    <span
                      style={{
                        color:
                          experience.accent,
                      }}
                    >
                      •
                    </span>

                    <span>
                      {
                        experience.location
                      }
                    </span>
                  </div>
                </button>
              );
            }
          )}
        </div>

        {/* ========================================
            RIGHT — ACTIVE EXPERIENCE PANEL
        ======================================== */}

        <div
  onMouseMove={
    handleBlobMouseMove
  }

  onMouseLeave={
    handleBlobMouseLeave
  }

  className="
    relative
    min-h-[590px]
    overflow-hidden

            rounded-[30px]

            border
            border-[#D4B0F9]/20

            bg-[#111A36]/55

            p-7

            shadow-[0_30px_90px_rgba(0,0,0,.28)]

            backdrop-blur-2xl

            md:p-9
            lg:p-10
          "
        >
          {/* ======================================
              BACKGROUND GRID
          ====================================== */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              z-0

              opacity-[0.06]
            "

            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(
                    212,
                    176,
                    249,
                    .3
                  ) 1px,

                  transparent 1px
                ),

                linear-gradient(
                  90deg,

                  rgba(
                    212,
                    176,
                    249,
                    .3
                  ) 1px,

                  transparent 1px
                )
              `,

              backgroundSize:
                "38px 38px",
            }}
          />

          {/* ======================================
              ORIGINAL EXPERIENCE GLOW
              KEPT EXACTLY AS PART OF DESIGN
          ====================================== */}

          <div
            key={`glow-${active.id}`}

            className="
              pointer-events-none

              absolute

              -right-24
              -top-24

              z-[1]

              h-80
              w-80

              rounded-full

              blur-[100px]

              transition-all
              duration-700
            "

            style={{
              background:
                active.glow,
            }}
          />

          {/* ======================================
              NEW MOVING BUBBLE
          ====================================== */}

          <MouseReactiveBlob
  mouse={blobMouse}
/>

          {/* ======================================
              TOP BAR
          ====================================== */}

          <div
            className="
              relative

              z-10

              flex
              items-center
              justify-between

              border-b
              border-[#D4B0F9]/10

              pb-6
            "
          >
            <div className="flex gap-2">
              <span
                className="
                  h-2.5
                  w-2.5

                  rounded-full

                  bg-[#F992AD]
                "
              />

              <span
                className="
                  h-2.5
                  w-2.5

                  rounded-full

                  bg-[#D4B0F9]
                "
              />

              <span
                className="
                  h-2.5
                  w-2.5

                  rounded-full

                  bg-[#A480F2]
                "
              />
            </div>

            <p
              className="
                font-mono

                text-[9px]

                uppercase
                tracking-[0.18em]

                text-[#697394]
              "
            >
              professional_history.log
            </p>
          </div>

          {/* ======================================
              ACTIVE CONTENT
          ====================================== */}

          <div
            key={`content-${active.id}`}

            className="
              relative

              z-10

              transition-all
              duration-500
            "
          >
            <div className="mt-8">
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3

                  font-mono

                  text-[10px]

                  uppercase
                  tracking-[0.18em]
                "

                style={{
                  color:
                    active.accent,
                }}
              >
                <span>
                  {active.period}
                </span>

                <span>
                  •
                </span>

                <span>
                  {
                    active.location
                  }
                </span>
              </div>

              <h3
                className="
                  mt-5

                  text-3xl
                  font-black

                  uppercase

                  tracking-[-0.035em]

                  text-white

                  md:text-5xl
                "
              >
                {active.role}
              </h3>

              <p
                className="
                  mt-3

                  text-lg
                  font-semibold
                "

                style={{
                  color:
                    active.accent,
                }}
              >
                {active.company}
              </p>

              <p
                className="
                  mt-6

                  max-w-2xl

                  text-sm
                  leading-7

                  text-[#AEB7D5]

                  md:text-base
                "
              >
                {active.summary}
              </p>
            </div>

            {/* ====================================
                WHAT I DID
            ==================================== */}

            <div className="mt-9">
              <p
                className="
                  mb-5

                  font-mono

                  text-[10px]

                  uppercase
                  tracking-[0.18em]

                  text-[#697394]
                "
              >
                // what_i_did
              </p>

              <div
                className="
                  grid
                  gap-3

                  md:grid-cols-2
                "
              >
                {active.points.map(
                  (
                    point
                  ) => (
                    <div
                      key={point}

                      className="
                        flex
                        items-start
                        gap-3

                        rounded-xl

                        border
                        border-[#D4B0F9]/10

                        bg-[#0E1630]/35

                        p-4

                        transition
                        duration-300

                        hover:border-[#D4B0F9]/25
                      "
                    >
                      <span
                        className="
                          mt-[7px]

                          h-1.5
                          w-1.5

                          shrink-0

                          rounded-full
                        "

                        style={{
                          background:
                            active.accent,

                          boxShadow:
                            `0 0 10px ${active.accent}`,
                        }}
                      />

                      <p
                        className="
                          text-sm
                          leading-6

                          text-[#B8C0DC]
                        "
                      >
                        {point}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ====================================
                STACK
            ==================================== */}

            <div className="mt-9">
              <p
                className="
                  mb-4

                  font-mono

                  text-[10px]

                  uppercase
                  tracking-[0.18em]

                  text-[#697394]
                "
              >
                // tools + skills
              </p>

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {active.stack.map(
                  (
                    item
                  ) => (
                    <span
                      key={item}

                      className="
                        rounded-full

                        border

                        px-4
                        py-2

                        font-mono
                        text-[10px]
                      "

                      style={{
                        color:
                          active.accent,

                        borderColor:
                          `${active.accent}55`,

                        background:
                          `${active.accent}10`,
                      }}
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ======================================
              DECORATIVE CODE
          ====================================== */}

          <div
            className="
              pointer-events-none

              absolute
              bottom-6
              right-7

              z-10

              font-mono

              text-[9px]

              uppercase
              tracking-[0.16em]

              text-[#697394]/50
            "
          >
            0
            {
              activeExperience +
              1
            }
            /0
            {
              experiences.length
            }
          </div>
        </div>
      </div>

      {/* ============================================
          SMALL BOTTOM STATUS
      ============================================ */}

      <div
        className="
          mt-16

          flex
          items-center
          gap-4

          font-mono

          text-[10px]

          uppercase
          tracking-[0.2em]

          text-[#697394]
        "
      >
        <span
          className="
            h-px
            flex-1

            bg-gradient-to-r

            from-transparent
            via-[#A480F2]/30
            to-transparent
          "
        />

        <span>
          experience_loaded

          <span
            className="
              animate-pulse

              text-[#F78ECF]
            "
          >
            _
          </span>
        </span>

        <span
          className="
            h-px
            flex-1

            bg-gradient-to-r

            from-transparent
            via-[#A480F2]/30
            to-transparent
          "
        />
      </div>
    </section>
  );
}

/* ======================================================
   PROJECTS
====================================================== */

/* ======================================================
   05 PROJECTS
====================================================== */

/* ======================================================
   05 PROJECTS
====================================================== */

function ProjectsSection() {
  const [
    activeProject,
    setActiveProject,
  ] = useState(0);

  const projects = [
    {
      id: "nishaan",
      number: "01",
      title: "NISHAAN",
      subtitle:
        "AI-Powered Location Discovery",
      category:
        "AI + GEOSPATIAL",

      description:
        "Nishaan helps users identify a location from partial memories using text, voice and images.",

      detail:
        "The platform analyses remembered clues and uses geospatial search to surface potential location matches.",

      accent:
        "#F78ECF",

      glow:
        "rgba(247,142,207,.25)",

      stack: [
        "Next.js",
        "FastAPI",
        "AI",
        "PostGIS",
        "Leaflet",
      ],

      preview:
        "nishaan",

      page:
        "/projects/nishaan",  
    },

    {
  id: "cotsle",
  number: "02",
  title: "COTSLE",

  subtitle:
    "Modern Technology & Training Platform",

  category:
    "NEXT.JS + WEB",

  description:
    "A modern responsive website developed during my internship at Corvit Systems, focused on presenting technology services and training through a polished digital experience.",

  detail:
    "The project strengthened my practical experience with Next.js, reusable frontend components, responsive interfaces, APIs, debugging and real development workflows.",

  accent:
    "#A480F2",

  glow:
    "rgba(164,128,242,.25)",

  stack: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "APIs",
    "JavaScript",
  ],

  preview:
    "cotsle",

  page:
    "/projects/cotsle",
},
    {
      id: "donation",
      number: "03",
      title:
        "DONATION TRACKER",

      subtitle:
        "Transparent Donation Tracking",

      category:
        "BLOCKCHAIN + WEB",

      description:
        "A donation tracking system designed around blockchain principles to improve transparency and accountability.",

      detail:
        "Anonymous identifiers and hashes create a verifiable history of charitable transactions.",

      accent:
        "#C580ED",

      glow:
        "rgba(197,128,237,.25)",

      stack: [
        "React",
        "Python",
        "Flask",
        "SQLite",
        "SHA256",
      ],

      preview:
        "donation",
      
      page:
        "/projects/donation-tracker",  
    },

    {
      id: "lost-found",
      number: "04",
      title:
        "LOST & FOUND",

      subtitle:
        "Search • Match • Recover",

      category:
        "JAVA + MYSQL",

      description:
        "A desktop management system for reporting, searching and recovering lost and found items.",

      detail:
        "The system manages item records, potential matches, verification and claiming through structured database operations.",

      accent:
        "#D4B0F9",

      glow:
        "rgba(212,176,249,.22)",

      stack: [
        "Java",
        "MySQL",
        "OOP",
        "CRUD",
      ],

      preview:
        "lostfound",

      page:
        "/projects/lost-found",  
    },
  ];

  const active =
    projects[
      activeProject
    ];

  return (
    <section
      id="projects"
      className="
        relative
        z-10

        mx-auto

        min-h-screen
        max-w-[1500px]

        scroll-mt-20

        overflow-hidden

        border-t
        border-[#D4B0F9]/10

        px-6
        py-28

        lg:px-12
      "
    >
      {/* ==========================================
          SECTION LABEL
      ========================================== */}

      <SectionLabel number="05">
        Projects
      </SectionLabel>

      {/* ==========================================
          HEADING
      ========================================== */}

      <div
        className="
          flex
          flex-col
          gap-8

          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div>
          <p
            className="
              mb-5

              font-mono
              text-sm

              text-[#A480F2]
            "
          >
            &gt; selected_work.load()
          </p>

          <h2
            className="
              text-5xl
              font-black

              uppercase

              leading-[0.9]
              tracking-[-0.055em]

              md:text-7xl
              xl:text-8xl
            "
          >
            <AnimatedLetters
              text="SELECTED"
              className="text-white"
              startDelay={100}
            />

            <AnimatedLetters
              text="WORK."
              gradientColors={[
                "#F992AD",
                "#F78ECF",
                "#A480F2",
              ]}
              startDelay={600}
            />
          </h2>
        </div>

        <p
          className="
            max-w-md

            text-sm
            leading-7

            text-[#AEB7D5]

            md:text-base
          "
        >
          A few projects where ideas,
          experiments and learning became
          real working products.
        </p>
      </div>

      {/* =================================================
          PROJECT SELECTOR — NOW AT THE TOP
      ================================================= */}

      <div
        className="
          relative

          mt-16

          border-y
          border-[#D4B0F9]/10

          py-5
        "
      >
        <div
          className="
            grid
            gap-3

            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {projects.map(
            (
              project,
              index
            ) => {
              const isActive =
                index ===
                activeProject;

              return (
                <button
                  key={
                    project.id
                  }

                  type="button"

                  onClick={() =>
                    setActiveProject(
                      index
                    )
                  }

                  className="
                    group
                    relative

                    min-w-0

                    py-4
                    pr-4

                    text-left
                  "
                >
                  {/* TOP ACTIVE LINE */}

                  <span
                    className="
                      absolute

                      -top-[21px]

                      left-0

                      h-[2px]

                      transition-all
                      duration-500
                    "
                    style={{
                      width:
                        isActive
                          ? "100%"
                          : "0%",

                      background:
                        project.accent,

                      boxShadow:
                        isActive
                          ? `0 0 16px ${project.accent}`
                          : "none",
                    }}
                  />

                  <div
                    className="
                      flex
                      items-start
                      gap-4
                    "
                  >
                    {/* NUMBER */}

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          h-2.5
                          w-2.5

                          rounded-full

                          border

                          transition-all
                          duration-500
                        "
                        style={{
                          borderColor:
                            isActive
                              ? project.accent
                              : "#697394",

                          background:
                            isActive
                              ? project.accent
                              : "transparent",

                          boxShadow:
                            isActive
                              ? `0 0 18px ${project.accent}`
                              : "none",
                        }}
                      />

                      <span
                        className="
                          font-mono
                          text-[10px]

                          tracking-[0.16em]
                        "
                        style={{
                          color:
                            isActive
                              ? project.accent
                              : "#697394",
                        }}
                      >
                        {
                          project.number
                        }
                      </span>
                    </div>

                    {/* NAME */}

                    <div className="min-w-0">
                      <p
                        className={`
                          truncate

                          text-sm
                          font-bold

                          uppercase

                          transition-colors
                          duration-300

                          ${
                            isActive
                              ? "text-white"
                              : "text-[#7F89A9] group-hover:text-[#DCE1F4]"
                          }
                        `}
                      >
                        {
                          project.title
                        }
                      </p>

                      <p
                        className="
                          mt-1

                          font-mono

                          text-[8px]

                          uppercase
                          tracking-[0.14em]

                          text-[#59627E]
                        "
                      >
                        {
                          project.category
                        }
                      </p>
                    </div>
                  </div>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* =================================================
          SELECTED PROJECT
      ================================================= */}

      <div
        className="
          relative

          mt-14

          overflow-hidden

          rounded-[34px]

          border
          border-[#D4B0F9]/15

          bg-[#101831]/55

          shadow-[0_35px_100px_rgba(0,0,0,.24)]

          backdrop-blur-xl
        "
      >
        {/* BACKGROUND GRID */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            opacity-[0.05]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(212,176,249,.35) 1px,
                transparent 1px
              ),

              linear-gradient(
                90deg,
                rgba(212,176,249,.35) 1px,
                transparent 1px
              )
            `,

            backgroundSize:
              "44px 44px",
          }}
        />

        {/* ACTIVE COLOR GLOW */}

        <div
          className="
            pointer-events-none

            absolute

            -right-40
            -top-48

            h-[700px]
            w-[700px]

            rounded-full

            blur-[150px]

            transition-all
            duration-700
          "
          style={{
            background:
              active.glow,
          }}
        />

        {/* ==========================================
            CONTENT
        ========================================== */}

        <div
          className="
            relative
            z-10

            grid

            lg:grid-cols-[0.75fr_1.25fr]
          "
        >
          {/* ======================================
              LEFT — PROJECT COPY
          ====================================== */}

          <div
            className="
              flex
              min-h-[620px]

              flex-col
              justify-center

              p-7

              md:p-10
              lg:p-12
            "
          >
            {/* NUMBER */}

            <div
              className="
                flex
                items-center
                gap-3

                font-mono

                text-[10px]

                uppercase
                tracking-[0.2em]
              "
            >
              <span
                style={{
                  color:
                    active.accent,
                }}
              >
                {
                  active.number
                }
              </span>

              <span className="text-[#697394]">
                /
              </span>

              <span className="text-[#697394]">
                04
              </span>
            </div>

            {/* PROJECT NAME */}

            <h3
              className="
                mt-8

                text-5xl
                font-black

                uppercase

                leading-[0.88]
                tracking-[-0.055em]

                text-white

                md:text-6xl
                xl:text-7xl
              "
            >
              {
                active.title
              }
            </h3>

            {/* SUBTITLE */}

            <p
              className="
                mt-4

                text-xl
                font-semibold

                md:text-2xl
              "
              style={{
                color:
                  active.accent,
              }}
            >
              {
                active.subtitle
              }
            </p>

            {/* DESCRIPTION */}

            <p
              className="
                mt-7

                max-w-lg

                text-sm
                leading-7

                text-[#B8C0DC]

                md:text-base
              "
            >
              {
                active.description
              }
            </p>

            <p
              className="
                mt-4

                max-w-lg

                text-sm
                leading-7

                text-[#7F89A9]
              "
            >
              {
                active.detail
              }
            </p>

            {/* STACK */}

            <div
  className="
    mt-10
    flex
    flex-wrap
    gap-3
  "
>
              {active.stack.map(
                (
                  technology
                ) => (
                  <span
                    key={
                      technology
                    }

                 className="
  rounded-full
  border

  px-5
  py-2.5

  font-mono
  text-[11px]
  font-medium
  tracking-[0.04em]

  transition-all
  duration-300

  hover:-translate-y-0.5
"

                    style={{
                      color:
                        active.accent,

                      borderColor:
                        `${active.accent}45`,

                      background:
                        `${active.accent}0D`,
                    }}
                  >
                    {
                      technology
                    }
                  </span>
                )
              )}
            </div>

            {/* BUTTON */}

           <div className="mt-11">
  <a
    href={active.page}
    className="
      group

      inline-flex
      items-center
      gap-5

      rounded-2xl

      border

      px-7
      py-4

      font-mono
      text-[11px]
      font-semibold

      uppercase
      tracking-[0.18em]

      transition-all
      duration-300

      hover:-translate-y-1
    "
    style={{
      color:
        active.accent,

      borderColor:
        `${active.accent}70`,

      background:
        `${active.accent}08`,

      boxShadow:
        `0 0 30px ${active.glow}`,
    }}
  >
    Explore Project

    <span
      className="
        text-base
        transition-transform
        duration-300
        group-hover:translate-x-1
        group-hover:-translate-y-1
      "
    >
      ↗
    </span>
  </a>
</div>
          </div>

          {/* ======================================
              RIGHT — BROWSER MOCKUP
          ====================================== */}

          <div
            className="
              flex

              min-h-[620px]

              items-center
              justify-center

              border-t
              border-[#D4B0F9]/10

              p-5

              md:p-8

              lg:border-l
              lg:border-t-0
              lg:p-10
            "
          >
            <ProjectBrowserPreview
              project={
                active
              }
            />
          </div>
        </div>
      </div>

      {/* =================================================
          BOTTOM STATUS
      ================================================= */}

      <div
        className="
          mt-14

          flex
          items-center
          gap-4

          font-mono

          text-[10px]

          uppercase
          tracking-[0.2em]

          text-[#697394]
        "
      >
        <span
          className="
            h-px
            flex-1

            bg-gradient-to-r

            from-transparent
            via-[#A480F2]/30
            to-transparent
          "
        />

        <span>
          selected_work_loaded

          <span
            className="
              animate-pulse

              text-[#F78ECF]
            "
          >
            _
          </span>
        </span>

        <span
          className="
            h-px
            flex-1

            bg-gradient-to-r

            from-transparent
            via-[#A480F2]/30
            to-transparent
          "
        />
      </div>
    </section>
  );
}


/* ======================================================
   PROJECT BROWSER WINDOW
====================================================== */

function ProjectBrowserPreview({
  project,
}) {
  return (
    <div
      className="
        relative

        w-full
        max-w-[850px]

        overflow-hidden

        rounded-[24px]

        border
        border-[#D4B0F9]/25

        bg-[#0D142B]

        shadow-[0_30px_90px_rgba(0,0,0,.4)]
      "
      style={{
        boxShadow: `
          0 30px 90px rgba(0,0,0,.4),
          0 0 35px ${project.glow}
        `,
      }}
    >
      {/* ==========================================
          BROWSER BAR
      ========================================== */}

      <div
        className="
          flex

          items-center
          justify-between

          border-b
          border-[#D4B0F9]/10

          bg-[#131C38]

          px-5
          py-4
        "
      >
        <div className="flex gap-2">
          <span
            className="
              h-2.5
              w-2.5

              rounded-full

              bg-[#F992AD]
            "
          />

          <span
            className="
              h-2.5
              w-2.5

              rounded-full

              bg-[#D4B0F9]
            "
          />

          <span
            className="
              h-2.5
              w-2.5

              rounded-full

              bg-[#A480F2]
            "
          />
        </div>

        <p
          className="
            font-mono

            text-[8px]

            uppercase
            tracking-[0.18em]

            text-[#697394]
          "
        >
          {
            project.id
          }
          .project
        </p>
      </div>

      {/* ==========================================
          PREVIEW BODY
      ========================================== */}

      <div
        className="
          relative

          min-h-[470px]
        "
      >
        {project.preview ===
          "nishaan" && (
          <NishaanPreview />
        )}

        {project.preview ===
  "cotsle" && (
  <CotslePreview />
)}

        {project.preview ===
          "donation" && (
          <DonationPreview />
        )}

        {project.preview ===
          "lostfound" && (
          <LostFoundPreview />
        )}
      </div>
    </div>
  );
}


/* ======================================================
   NISHAAN PREVIEW
====================================================== */

function NishaanPreview() {
  return (
    <div
      className="
        grid

        min-h-[470px]

        md:grid-cols-[0.85fr_1.15fr]
      "
    >
      {/* LEFT */}

      <div
        className="
          border-b
          border-[#D4B0F9]/10

          p-6

          md:border-b-0
          md:border-r
          md:p-8
        "
      >
        <div
          className="
            flex
            items-center
            gap-2

            font-mono

            text-[10px]

            uppercase
            tracking-[0.18em]

            text-white
          "
        >
          <span
            className="
              flex
              h-7
              w-7

              items-center
              justify-center

              rounded-full

              bg-[#F78ECF]/15

              text-[#F78ECF]
            "
          >
            ●
          </span>

          Nishaan
        </div>

        <h4
          className="
            mt-10

            max-w-sm

            text-3xl
            font-semibold

            leading-[1.02]

            text-white
          "
        >
          Find places from your{" "}

          <span className="text-[#F78ECF]">
            memories
          </span>
        </h4>

        <p
          className="
            mt-4

            max-w-sm

            text-xs
            leading-6

            text-[#8F98B8]
          "
        >
          Describe what you remember,
          speak a clue or upload an image
          to start searching.
        </p>

        {/* INPUT TYPE */}

        <div
          className="
            mt-7

            grid
            grid-cols-3

            overflow-hidden

            rounded-xl

            border
            border-[#D4B0F9]/15
          "
        >
          {[
            "Text",
            "Voice",
            "Image",
          ].map(
            (
              option,
              index
            ) => (
              <div
                key={
                  option
                }

                className={`
                  px-3
                  py-3

                  text-center

                  font-mono
                  text-[8px]

                  ${
                    index ===
                    0
                      ? "bg-[#F78ECF]/12 text-[#F78ECF]"
                      : "text-[#697394]"
                  }
                `}
              >
                {
                  option
                }
              </div>
            )
          )}
        </div>

        {/* SEARCH */}

        <div
          className="
            mt-4

            flex
            items-center
            gap-3

            rounded-xl

            border
            border-[#D4B0F9]/15

            bg-[#111A36]

            px-4
            py-3
          "
        >
          <span className="text-[#697394]">
            ○
          </span>

          <span
            className="
              flex-1

              text-[9px]

              text-[#697394]
            "
          >
            Describe what you
            remember...
          </span>

          <span
            className="
              flex
              h-8
              w-8

              items-center
              justify-center

              rounded-full

              bg-[#F78ECF]

              text-[#0E1630]
            "
          >
            →
          </span>
        </div>

        {/* EXAMPLES */}

        <div className="mt-6 space-y-2">
          {[
            "A tall white tower",
            "A street near water",
            "Yellow buildings",
          ].map(
            (
              clue
            ) => (
              <div
                key={
                  clue
                }

                className="
                  rounded-lg

                  border
                  border-[#D4B0F9]/10

                  bg-[#111A36]/60

                  px-3
                  py-2.5

                  text-[9px]

                  text-[#8F98B8]
                "
              >
                {clue}
              </div>
            )
          )}
        </div>
      </div>

      {/* MAP */}

      <div
        className="
          relative

          min-h-[390px]

          overflow-hidden

          bg-[#111A36]
        "
      >
        {/* MAP GRID */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.15]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                32deg,
                transparent 46%,
                rgba(164,128,242,.4) 47%,
                transparent 48%
              ),

              linear-gradient(
                -28deg,
                transparent 46%,
                rgba(212,176,249,.25) 47%,
                transparent 48%
              ),

              linear-gradient(
                rgba(109,140,255,.18) 1px,
                transparent 1px
              ),

              linear-gradient(
                90deg,
                rgba(109,140,255,.18) 1px,
                transparent 1px
              )
            `,

            backgroundSize:
              "95px 95px, 120px 120px, 42px 42px, 42px 42px",
          }}
        />

        {/* WATER */}

        <div
          className="
            absolute

            bottom-[10%]
            right-[12%]

            h-[44%]
            w-[48%]

            rotate-[-9deg]

            rounded-[45%]

            bg-[#20396D]/35

            blur-[2px]
          "
        />

        {/* CENTER PIN */}

        <div
          className="
            absolute

            left-[57%]
            top-[51%]

            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <span
            className="
              absolute

              left-1/2
              top-1/2

              h-24
              w-24

              -translate-x-1/2
              -translate-y-1/2

              animate-ping

              rounded-full

              border
              border-[#F78ECF]/20
            "
          />

          <div
            className="
              flex

              h-12
              w-12

              items-center
              justify-center

              rounded-full

              border
              border-[#F78ECF]/50

              bg-[#F78ECF]/20

              text-xl
              text-[#F78ECF]

              shadow-[0_0_40px_rgba(247,142,207,.45)]
            "
          >
            ●
          </div>
        </div>

        {/* OTHER POINTS */}

        <span
          className="
            absolute

            left-[26%]
            top-[33%]

            h-2.5
            w-2.5

            rounded-full

            bg-[#A480F2]
          "
        />

        <span
          className="
            absolute

            bottom-[21%]
            left-[31%]

            h-2
            w-2

            rounded-full

            bg-[#D4B0F9]
          "
        />

        <span
          className="
            absolute

            right-[18%]
            top-[35%]

            h-2
            w-2

            rounded-full

            bg-[#A480F2]
          "
        />

        {/* MATCH RESULT */}

        <div
          className="
            absolute

            right-5
            top-6

            w-[210px]

            rounded-xl

            border
            border-[#F78ECF]/25

            bg-[#0E1630]/85

            p-4

            backdrop-blur-xl
          "
        >
          <p
            className="
              font-mono

              text-[8px]

              uppercase
              tracking-[0.16em]

              text-[#F78ECF]
            "
          >
            Possible match
          </p>

          <p
            className="
              mt-2

              text-sm
              font-semibold

              text-white
            "
          >
            Location result
          </p>

          <div
            className="
              mt-3

              flex
              items-center
              gap-3
            "
          >
            <p
              className="
                font-mono
                text-[8px]

                text-[#F78ECF]
              "
            >
              92% MATCH
            </p>

            <span
              className="
                h-1
                flex-1

                overflow-hidden

                rounded-full

                bg-[#D4B0F9]/10
              "
            >
              <span
                className="
                  block

                  h-full
                  w-[92%]

                  bg-gradient-to-r

                  from-[#F78ECF]
                  to-[#A480F2]
                "
              />
            </span>
          </div>
        </div>

        {/* LABEL */}

        <p
          className="
            absolute

            bottom-6
            right-7

            max-w-[180px]

            text-right

            font-mono

            text-[9px]

            italic

            leading-5

            text-[#D4B0F9]
          "
        >
          memories become clues.
        </p>
      </div>
    </div>
  );
}


/* ======================================================
   COTSLE PREVIEW
====================================================== */

function CotslePreview() {
  return (
    <div
      className="
        relative
        min-h-[470px]
        overflow-hidden
        bg-[#0B1730]
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-20
          h-72
          w-72
          rounded-full
          bg-[#A480F2]/20
          blur-[90px]
        "
      />

      {/* NAV */}

      <div
        className="
          relative
          z-10

          flex
          items-center
          justify-between

          border-b
          border-white/10

          px-6
          py-5
        "
      >
        <div>
          <p
            className="
              text-lg
              font-black
              tracking-[-0.03em]
              text-white
            "
          >
            COTSLE
          </p>

          <p
            className="
              mt-0.5
              font-mono
              text-[7px]
              uppercase
              tracking-[0.2em]
              text-[#A480F2]
            "
          >
            technology
          </p>
        </div>

        <div
          className="
            hidden
            gap-5

            font-mono
            text-[8px]
            text-[#8F98B8]

            sm:flex
          "
        >
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Training</span>
        </div>

        <div
          className="
            rounded-lg
            bg-[#A480F2]
            px-3
            py-2
            text-[8px]
            font-semibold
            text-[#0E1630]
          "
        >
          Contact
        </div>
      </div>

      {/* HERO */}

      <div
        className="
          relative
          z-10

          grid
          min-h-[395px]
          items-center
          gap-8

          px-7
          py-10

          md:grid-cols-[1.05fr_.95fr]
          md:px-9
        "
      >
        {/* LEFT */}

        <div>
          <p
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-[#A480F2]
            "
          >
            Technology • Training • Innovation
          </p>

          <h4
            className="
              mt-5

              max-w-md

              text-3xl
              font-black

              leading-[0.95]
              tracking-[-0.04em]

              text-white

              md:text-4xl
            "
          >
            Empowering Businesses Through{" "}

            <span
              className="
                bg-gradient-to-r
                from-[#D4B0F9]
                to-[#A480F2]
                bg-clip-text
                text-transparent
              "
            >
              Technology
            </span>
          </h4>

          <p
            className="
              mt-5

              max-w-sm

              text-[10px]
              leading-5

              text-[#8F98B8]
            "
          >
            Modern digital solutions,
            technology services and
            professional training presented
            through a responsive web
            experience.
          </p>

          <div
            className="
              mt-7
              flex
              gap-3
            "
          >
            <span
              className="
                rounded-lg
                bg-[#A480F2]
                px-4
                py-2.5
                text-[8px]
                font-semibold
                text-[#0E1630]
              "
            >
              Explore Services
            </span>

            <span
              className="
                rounded-lg
                border
                border-white/10
                px-4
                py-2.5
                text-[8px]
                text-white
              "
            >
              Learn More
            </span>
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
            relative
            min-h-[260px]
          "
        >
          <div
            className="
              absolute
              inset-[8%]

              rotate-[5deg]

              rounded-[26px]

              border
              border-[#A480F2]/25

              bg-[#A480F2]/10
            "
          />

          <div
            className="
              absolute
              inset-[14%]

              -rotate-[4deg]

              rounded-[24px]

              border
              border-[#D4B0F9]/20

              bg-[#111A36]
              p-5

              shadow-[0_25px_60px_rgba(0,0,0,.3)]
            "
          >
            <p
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.16em]
                text-[#697394]
              "
            >
              digital_services
            </p>

            <div
              className="
                mt-5
                grid
                grid-cols-2
                gap-3
              "
            >
              {[
                "Web Development",
                "AI Solutions",
                "Cloud",
                "Cyber Security",
              ].map(
                (service) => (
                  <div
                    key={service}
                    className="
                      rounded-xl
                      border
                      border-[#D4B0F9]/10
                      bg-[#0E1630]/65
                      p-3
                    "
                  >
                    <span
                      className="
                        block
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[#A480F2]
                        shadow-[0_0_10px_rgba(164,128,242,.8)]
                      "
                    />

                    <p
                      className="
                        mt-3
                        text-[8px]
                        font-semibold
                        text-white
                      "
                    >
                      {service}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ======================================================
   DONATION TRACKER PREVIEW
====================================================== */

function DonationPreview() {
  return (
    <div
      className="
        min-h-[470px]

        p-7

        md:p-9
      "
    >
      <div
        className="
          flex
          items-end
          justify-between
        "
      >
        <div>
          <p
            className="
              font-mono

              text-[9px]

              uppercase
              tracking-[0.16em]

              text-[#C580ED]
            "
          >
            Donation Tracker
          </p>

          <h4
            className="
              mt-2

              text-2xl
              font-bold

              text-white
            "
          >
            Transparent records.
          </h4>
        </div>

        <span
          className="
            rounded-full

            border
            border-[#C580ED]/30

            bg-[#C580ED]/10

            px-4
            py-2

            font-mono

            text-[8px]

            uppercase

            text-[#C580ED]
          "
        >
          verified
        </span>
      </div>

      <div
        className="
          mt-10

          overflow-hidden

          rounded-2xl

          border
          border-[#D4B0F9]/10
        "
      >
        {[
          [
            "#A81F",
            "Donation received",
            "Verified",
          ],

          [
            "#C35B",
            "Transaction hash",
            "Confirmed",
          ],

          [
            "#D492",
            "Organisation record",
            "Verified",
          ],

          [
            "#F219",
            "History updated",
            "Complete",
          ],
        ].map(
          (
            [
              hash,
              action,
              status,
            ],
            index
          ) => (
            <div
              key={
                hash
              }

              className={`
                grid
                grid-cols-[.6fr_1.5fr_.8fr]

                gap-4

                px-5
                py-5

                ${
                  index !==
                  3
                    ? "border-b border-[#D4B0F9]/10"
                    : ""
                }
              `}
            >
              <span
                className="
                  font-mono

                  text-[9px]

                  text-[#C580ED]
                "
              >
                {hash}
              </span>

              <span
                className="
                  text-xs

                  text-[#B8C0DC]
                "
              >
                {action}
              </span>

              <span
                className="
                  text-right

                  font-mono

                  text-[8px]

                  uppercase

                  text-[#697394]
                "
              >
                {status}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}


/* ======================================================
   LOST & FOUND PREVIEW
====================================================== */

function LostFoundPreview() {
  return (
    <div
      className="
        min-h-[470px]

        p-7

        md:p-9
      "
    >
      <p
        className="
          font-mono

          text-[9px]

          uppercase
          tracking-[0.16em]

          text-[#D4B0F9]
        "
      >
        Lost + Found
      </p>

      <h4
        className="
          mt-2

          text-2xl
          font-bold

          text-white
        "
      >
        Find what&apos;s missing.
      </h4>

      {/* SEARCH */}

      <div
        className="
          mt-8

          flex
          items-center

          rounded-xl

          border
          border-[#D4B0F9]/15

          bg-[#111A36]

          px-4
          py-4
        "
      >
        <span
          className="
            flex-1

            text-[10px]

            text-[#697394]
          "
        >
          Search reported items...
        </span>

        <span className="text-[#D4B0F9]">
          →
        </span>
      </div>

      <div
        className="
          mt-6
          space-y-3
        "
      >
        {[
          [
            "Black Backpack",
            "Reported lost",
            "Potential match",
          ],

          [
            "Student ID Card",
            "Reported found",
            "Awaiting claim",
          ],

          [
            "Wireless Earbuds",
            "Reported found",
            "Verified",
          ],
        ].map(
          (
            [
              item,
              status,
              match,
            ]
          ) => (
            <div
              key={
                item
              }

              className="
                flex

                items-center
                justify-between

                gap-5

                rounded-xl

                border
                border-[#D4B0F9]/10

                bg-[#111A36]/65

                p-4
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    font-semibold

                    text-white
                  "
                >
                  {item}
                </p>

                <p
                  className="
                    mt-1

                    font-mono

                    text-[8px]

                    uppercase

                    text-[#697394]
                  "
                >
                  {status}
                </p>
              </div>

              <span
                className="
                  rounded-full

                  border
                  border-[#D4B0F9]/20

                  bg-[#D4B0F9]/5

                  px-3
                  py-2

                  font-mono

                  text-[8px]

                  text-[#D4B0F9]
                "
              >
                {match}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* ======================================================
   PROJECT VISUAL SYSTEM
====================================================== */

function ProjectVisual({
  project,
  mouse,
}) {
  const x =
    (mouse?.x ?? 0.5) -
    0.5;

  const y =
    (mouse?.y ?? 0.5) -
    0.5;

  const moveX =
    x * 26;

  const moveY =
    y * 20;

  if (
    project.visual ===
    "nishaan"
  ) {
    return (
      <div className="absolute inset-0">
        {/* MAP-LIKE BACKGROUND */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.12]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(164,128,242,.35) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(164,128,242,.35) 1px,
                transparent 1px
              )
            `,
            backgroundSize:
              "34px 34px",
          }}
        />

        {/* COORDINATES */}

        <p
          className="
            absolute
            right-7
            top-7
            font-mono
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-[#697394]
          "
        >
          geo_search.active
        </p>

        {/* CENTRAL GEO SYSTEM */}

        <div
          className="
            absolute
            left-1/2
            top-[43%]
            h-[330px]
            w-[330px]
            -translate-x-1/2
            -translate-y-1/2
            transition-transform
            duration-500
            ease-out
          "
          style={{
            transform: `
              translate(
                calc(-50% + ${moveX}px),
                calc(-50% + ${moveY}px)
              )
            `,
          }}
        >
          <div
            className="
              absolute
              inset-0
              rounded-full
              border
              border-[#A480F2]/20
            "
          />

          <div
            className="
              absolute
              inset-[45px]
              rounded-full
              border
              border-[#F78ECF]/30
            "
          />

          <div
            className="
              absolute
              inset-[90px]
              rounded-full
              border
              border-[#D4B0F9]/35
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[110px]
              w-[110px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#F78ECF]/50
              bg-[#F78ECF]/10
              shadow-[0_0_70px_rgba(247,142,207,.25)]
            "
          >
            <span
              className="
                absolute
                left-1/2
                top-1/2
                h-4
                w-4
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#F78ECF]
                shadow-[0_0_30px_rgba(247,142,207,1)]
              "
            />

            <span
              className="
                absolute
                inset-[23px]
                animate-ping
                rounded-full
                border
                border-[#F78ECF]/35
              "
            />
          </div>

          {/* NODES */}

          <span
            className="
              absolute
              left-[5%]
              top-[30%]
              h-3
              w-3
              rounded-full
              bg-[#A480F2]
              shadow-[0_0_18px_rgba(164,128,242,.8)]
            "
          />

          <span
            className="
              absolute
              right-[8%]
              top-[21%]
              h-2.5
              w-2.5
              rounded-full
              bg-[#F78ECF]
              shadow-[0_0_18px_rgba(247,142,207,.8)]
            "
          />

          <span
            className="
              absolute
              bottom-[9%]
              right-[24%]
              h-3
              w-3
              rounded-full
              bg-[#6D8CFF]
              shadow-[0_0_18px_rgba(109,140,255,.8)]
            "
          />
        </div>

        {/* PROCESS */}

        <div
          className="
            absolute
            bottom-8
            left-7
            right-7
            flex
            items-center
            justify-between
            gap-2
            font-mono
            text-[8px]
            uppercase
            tracking-[0.12em]
            text-[#8F98B8]
          "
        >
          <span>input</span>
          <span className="text-[#F78ECF]">
            →
          </span>
          <span>AI analysis</span>
          <span className="text-[#A480F2]">
            →
          </span>
          <span>clues</span>
          <span className="text-[#A480F2]">
            →
          </span>
          <span>geo search</span>
          <span className="text-[#F78ECF]">
            →
          </span>
          <span>result</span>
        </div>
      </div>
    );
  }

  if (
    project.visual ===
    "timebank"
  ) {
    return (
      <div className="absolute inset-0">
        <p
          className="
            absolute
            right-7
            top-7
            font-mono
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-[#697394]
          "
        >
          exchange.protocol
        </p>

        {/* LEFT USER */}

        <div
          className="
            absolute
            left-[16%]
            top-1/2
            h-36
            w-36
            -translate-y-1/2
            rounded-full
            border
            border-[#A480F2]/40
            bg-[#A480F2]/10
            transition-transform
            duration-500
          "
          style={{
            transform: `
              translate(
                ${moveX * 0.5}px,
                calc(-50% + ${moveY * 0.4}px)
              )
            `,
          }}
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-16
              w-16
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#D4B0F9]/35
            "
          />

          <p
            className="
              absolute
              -bottom-10
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              font-mono
              text-[9px]
              uppercase
              tracking-[0.15em]
              text-[#A480F2]
            "
          >
            share skill
          </p>
        </div>

        {/* RIGHT USER */}

        <div
          className="
            absolute
            right-[16%]
            top-1/2
            h-36
            w-36
            -translate-y-1/2
            rounded-full
            border
            border-[#F78ECF]/40
            bg-[#F78ECF]/10
            transition-transform
            duration-500
          "
          style={{
            transform: `
              translate(
                ${-moveX * 0.5}px,
                calc(-50% + ${-moveY * 0.4}px)
              )
            `,
          }}
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-16
              w-16
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#F992AD]/35
            "
          />

          <p
            className="
              absolute
              -bottom-10
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              font-mono
              text-[9px]
              uppercase
              tracking-[0.15em]
              text-[#F78ECF]
            "
          >
            receive skill
          </p>
        </div>

        {/* CONNECTION */}

        <div
          className="
            absolute
            left-[31%]
            right-[31%]
            top-1/2
            h-px
            bg-gradient-to-r
            from-[#A480F2]
            via-[#D4B0F9]
            to-[#F78ECF]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            flex
            h-20
            w-20
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#D4B0F9]/40
            bg-[#111A36]
            font-mono
            text-lg
            font-black
            text-[#D4B0F9]
            shadow-[0_0_50px_rgba(164,128,242,.25)]
          "
        >
          +1H
        </div>
      </div>
    );
  }

  if (
    project.visual ===
    "blockchain"
  ) {
    return (
      <div className="absolute inset-0">
        <p
          className="
            absolute
            right-7
            top-7
            font-mono
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-[#697394]
          "
        >
          verification_chain
        </p>

        <div
          className="
            absolute
            left-[10%]
            right-[10%]
            top-1/2
            h-px
            bg-gradient-to-r
            from-[#F78ECF]/20
            via-[#C580ED]
            to-[#A480F2]/20
          "
        />

        {[
          "DONATION",
          "HASH",
          "VERIFY",
          "RECORD",
        ].map(
          (
            label,
            index
          ) => (
            <div
              key={label}
              className="
                absolute
                top-1/2
                flex
                h-[92px]
                w-[92px]
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-2xl
                border
                bg-[#111A36]/85
                font-mono
                text-[8px]
                uppercase
                tracking-[0.12em]
                text-white
                shadow-[0_20px_50px_rgba(0,0,0,.25)]
                transition-transform
                duration-500
              "
              style={{
                left:
                  `${18 + index * 21}%`,

                borderColor:
                  index % 2 === 0
                    ? "#F78ECF55"
                    : "#A480F255",

                transform: `
                  translate(
                    calc(-50% + ${
                      moveX *
                      (
                        0.15 +
                        index *
                          0.08
                      )
                    }px),

                    calc(-50% + ${
                      moveY *
                      (
                        index %
                          2 ===
                        0
                          ? 0.25
                          : -0.25
                      )
                    }px)
                  )
                `,
              }}
            >
              {label}
            </div>
          )
        )}

        <p
          className="
            absolute
            bottom-10
            left-1/2
            -translate-x-1/2
            font-mono
            text-[9px]
            uppercase
            tracking-[0.17em]
            text-[#697394]
          "
        >
          transparent • verifiable • traceable
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <p
        className="
          absolute
          right-7
          top-7
          font-mono
          text-[9px]
          uppercase
          tracking-[0.18em]
          text-[#697394]
        "
      >
        matching_system
      </p>

      {/* LOST */}

      <div
        className="
          absolute
          left-[15%]
          top-[30%]
          h-[190px]
          w-[190px]
          rounded-full
          border
          border-[#D4B0F9]/25
          transition-transform
          duration-500
        "
        style={{
          transform: `
            translate(
              ${moveX * 0.5}px,
              ${moveY * 0.5}px
            )
          `,
        }}
      >
        <div
          className="
            absolute
            inset-[35px]
            rounded-full
            border
            border-[#D4B0F9]/40
          "
        />

        <span
          className="
            absolute
            left-1/2
            top-1/2
            h-3
            w-3
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#D4B0F9]
            shadow-[0_0_25px_rgba(212,176,249,1)]
          "
        />

        <p
          className="
            absolute
            bottom-[-34px]
            left-1/2
            -translate-x-1/2
            font-mono
            text-[9px]
            uppercase
            tracking-[0.15em]
            text-[#D4B0F9]
          "
        >
          LOST
        </p>
      </div>

      {/* FOUND */}

      <div
        className="
          absolute
          bottom-[22%]
          right-[14%]
          h-[190px]
          w-[190px]
          rounded-full
          border
          border-[#6D8CFF]/25
          transition-transform
          duration-500
        "
        style={{
          transform: `
            translate(
              ${-moveX * 0.5}px,
              ${-moveY * 0.5}px
            )
          `,
        }}
      >
        <div
          className="
            absolute
            inset-[35px]
            rounded-full
            border
            border-[#6D8CFF]/40
          "
        />

        <span
          className="
            absolute
            left-1/2
            top-1/2
            h-3
            w-3
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#6D8CFF]
            shadow-[0_0_25px_rgba(109,140,255,1)]
          "
        />

        <p
          className="
            absolute
            bottom-[-34px]
            left-1/2
            -translate-x-1/2
            font-mono
            text-[9px]
            uppercase
            tracking-[0.15em]
            text-[#6D8CFF]
          "
        >
          FOUND
        </p>
      </div>

      {/* MATCH LINE */}

      <div
        className="
          absolute
          left-[39%]
          top-[51%]
          h-px
          w-[28%]
          rotate-[19deg]
          bg-gradient-to-r
          from-[#D4B0F9]
          via-[#F78ECF]
          to-[#6D8CFF]
          shadow-[0_0_18px_rgba(164,128,242,.5)]
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-1/2
          rounded-full
          border
          border-[#F78ECF]/30
          bg-[#F78ECF]/10
          px-4
          py-2
          font-mono
          text-[8px]
          uppercase
          tracking-[0.15em]
          text-[#F78ECF]
          backdrop-blur-xl
        "
      >
        potential match
      </div>
    </div>
  );
}


/* ======================================================
   06 — SKILLS
   INTERACTIVE ORBIT DESIGN
====================================================== */

function SkillProjectPreview({ project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a
      href={project.href || "#skills"}
      className="
        group
        block
        overflow-hidden
        rounded-xl
        border
        border-[#D4B0F9]/20
        bg-[#111A36]/35
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#F78ECF]/50
        hover:bg-[#111A36]/65
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#D4B0F9]">
          {project.name}
        </span>

        <span className="text-lg text-[#AEB7D5] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#F78ECF]">
          ↗
        </span>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-[#0B142B]">
        {project.image && !imageFailed ? (
          <img
            src={project.image}
            alt={`${project.name} project preview`}
            onError={() => setImageFailed(true)}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              object-top
              transition-transform
              duration-700
              group-hover:scale-[1.05]
            "
          />
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#A480F2]/20 blur-3xl" />

            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#F78ECF]/15 blur-3xl" />

            <span className="relative text-center text-xl font-black uppercase tracking-[-0.05em] text-white">
              {project.name}
            </span>

            <span className="relative mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-[#A480F2]">
              Project case study
            </span>
          </div>
        )}
      </div>
    </a>
  );
}


/* ======================================================
   LIQUID ORBIT VISUAL
====================================================== */

function SkillOrbit({
  category,
  focusedSkill,
  onFocusSkill,
}) {
  const positions = [
    { left: "50%", top: "9%", side: "top" },
    { left: "80%", top: "24%", side: "right" },
    { left: "91%", top: "53%", side: "right" },
    { left: "77%", top: "82%", side: "right" },
    { left: "28%", top: "85%", side: "left" },
    { left: "9%", top: "53%", side: "left" },
    { left: "20%", top: "24%", side: "left" },
  ];

  const labelPositions = {
    top: "-top-8 left-1/2 -translate-x-1/2",
    right: "left-[calc(100%+13px)] top-1/2 -translate-y-1/2",
    left: "right-[calc(100%+13px)] top-1/2 -translate-y-1/2 text-right",
  };

  const currentSkill =
    focusedSkill || category.skills[0].name;

  return (
    <div
      className="
        relative
        flex
        min-h-[540px]
        w-full
        items-center
        justify-center
        sm:min-h-[650px]
        xl:min-h-[740px]
      "
    >
      {/* ======================================
          OUTER ATMOSPHERE
      ====================================== */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[95%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A480F2]/[0.08]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[81%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6D8CFF]/10" />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[65%]
          w-[72%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-[95px]
          transition-colors
          duration-700
        "
        style={{
          background: `${category.accent}14`,
        }}
      />

      {/* ======================================
          MAIN ORBIT
      ====================================== */}

      <div
        className="
          relative
          aspect-square
          w-[min(74vw,450px)]
          shrink-0
          sm:w-[min(70vw,510px)]
          xl:w-[min(36vw,570px)]
        "
      >
        {/* ORBIT RINGS */}

        <div className="pointer-events-none absolute inset-[6%] rounded-full border border-[#A480F2]/35" />

        <div className="pointer-events-none absolute inset-[13%] rounded-full border border-dashed border-[#6D8CFF]/15" />

        <div className="pointer-events-none absolute inset-[23%] rounded-full border border-[#F78ECF]/10" />

        {/* DECORATIVE CONNECTIONS */}

        <svg
          aria-hidden="true"
          viewBox="0 0 500 500"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient
              id="skills-orbit-lines"
              x1="0"
              x2="1"
              y1="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#6D8CFF" stopOpacity=".15" />

              <stop offset="55%" stopColor="#A480F2" stopOpacity=".45" />

              <stop offset="100%" stopColor="#F78ECF" stopOpacity=".15" />
            </linearGradient>
          </defs>

          {[
            [250, 45],
            [400, 120],
            [455, 265],
            [385, 410],
            [140, 425],
            [45, 265],
            [100, 120],
          ].map(([x, y], index) => (
            <line
              key={index}
              x1="250"
              y1="250"
              x2={x}
              y2={y}
              stroke="url(#skills-orbit-lines)"
              strokeWidth=".7"
            />
          ))}

          <circle
            cx="250"
            cy="250"
            r="236"
            fill="none"
            stroke="#A480F2"
            strokeWidth=".5"
            strokeOpacity=".15"
            strokeDasharray="2 7"
          />
        </svg>

        {/* ==================================
            LIQUID CORE
        ================================== */}

        <div className="pointer-events-none absolute inset-[22%]">
          {/* SOFT OUTER GLOW */}

          <div
            className="
              absolute
              -inset-[5%]
              rounded-full
              blur-[34px]
              transition-all
              duration-700
            "
            style={{
              background: `
                radial-gradient(
                  circle,
                  ${category.accent}28,
                  #A480F210 55%,
                  transparent 75%
                )
              `,
            }}
          />

          {/* LIQUID LAYER ONE */}

          <div
            className="
              skills-liquid-one
              absolute
              inset-0
              rounded-[54%_46%_62%_38%/42%_59%_41%_58%]
              opacity-85
            "
            style={{
              background: `
                conic-gradient(
                  from 35deg,
                  rgba(109,140,255,.10),
                  rgba(164,128,242,.72),
                  rgba(247,142,207,.20),
                  rgba(247,142,207,.78),
                  rgba(212,176,249,.22),
                  rgba(109,140,255,.55),
                  rgba(164,128,242,.15)
                )
              `,
              filter: "blur(8px)",
            }}
          />

          {/* LIQUID LAYER TWO */}

          <div
            className="
              skills-liquid-two
              absolute
              inset-[5%]
              rounded-[37%_63%_45%_55%/62%_41%_59%_38%]
              border
              border-[#D4B0F9]/35
              opacity-75
            "
            style={{
              background: `
                conic-gradient(
                  from 170deg,
                  transparent 0%,
                  rgba(109,140,255,.33) 18%,
                  rgba(164,128,242,.55) 34%,
                  transparent 47%,
                  rgba(247,142,207,.65) 67%,
                  rgba(212,176,249,.18) 83%,
                  transparent 100%
                )
              `,
              boxShadow: `
                inset 0 0 32px rgba(212,176,249,.20),
                0 0 38px rgba(164,128,242,.16)
              `,
            }}
          />

          {/* LIQUID LAYER THREE */}

          <div
            className="
              skills-liquid-three
              absolute
              inset-[9%]
              rounded-[61%_39%_52%_48%/49%_57%_43%_51%]
              border
              border-[#F78ECF]/40
              opacity-65
            "
            style={{
              background: `
                radial-gradient(
                  ellipse at 22% 18%,
                  rgba(212,176,249,.35),
                  transparent 40%
                ),
                radial-gradient(
                  ellipse at 80% 72%,
                  rgba(247,142,207,.26),
                  transparent 42%
                )
              `,
              boxShadow: `
                0 0 28px rgba(247,142,207,.14),
                inset 0 0 35px rgba(109,140,255,.20)
              `,
            }}
          />

          {/* DARK GLASS CENTER */}

          <div
            className="
              absolute
              inset-[13%]
              rounded-full
              border
              border-[#D4B0F9]/20
              bg-[#111631]/80
              shadow-[inset_0_0_45px_rgba(164,128,242,.15)]
              backdrop-blur-md
            "
          />

          {/* CENTER TEXT */}

          <div
            key={category.id}
            className="
              skills-core-enter
              absolute
              inset-0
              z-10
              flex
              flex-col
              items-center
              justify-center
              p-3
              text-center
            "
          >
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#D4B0F9]">
              {category.number}
            </p>

            <h3
              className="
                mt-4
                text-[clamp(1.1rem,2vw,1.9rem)]
                font-black
                uppercase
                leading-[1.07]
                tracking-[0.04em]
                text-white
              "
            >
              {category.line1}
              <br />
              {category.line2}
            </h3>

            <p
              className="
                mt-4
                max-w-[205px]
                font-mono
                text-[9px]
                leading-[1.8]
                text-[#BFC7E0]
                sm:text-[10px]
              "
            >
              {category.centerDescription}
            </p>

            <p
              className="
                mt-4
                hidden
                max-w-[180px]
                truncate
                font-mono
                text-[8px]
                uppercase
                tracking-[0.12em]
                sm:block
              "
              style={{ color: category.accent }}
            >
              Focus / {currentSkill}
            </p>
          </div>
        </div>

        {/* ==================================
            TECHNOLOGIES AROUND THE ORBIT
        ================================== */}

        {category.skills.map((skill, index) => {
          const position = positions[index];

          const isFocused =
            currentSkill === skill.name;

          return (
            <button
              key={skill.name}
              type="button"
              aria-label={`Highlight ${skill.name}`}
              aria-pressed={isFocused}
              onMouseEnter={() => onFocusSkill(skill.name)}
              onFocus={() => onFocusSkill(skill.name)}
              onClick={() => onFocusSkill(skill.name)}
              className="
                group
                absolute
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                bg-[#111631]/95
                font-mono
                text-[10px]
                font-bold
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-110
                sm:h-[58px]
                sm:w-[58px]
                sm:text-sm
              "
              style={{
                left: position.left,
                top: position.top,
                transform: "translate(-50%, -50%)",

                borderColor: isFocused
                  ? category.accent
                  : `${category.accent}80`,

                boxShadow: isFocused
                  ? `0 0 25px ${category.accent}65`
                  : `0 0 17px ${category.accent}25`,
              }}
            >
              <span
                className="transition-colors duration-300"
                style={{
                  color: isFocused
                    ? category.accent
                    : "#F8F7FF",
                }}
              >
                {skill.symbol}
              </span>

              {/* TECHNOLOGY LABEL */}

              <span
                className={`
                  pointer-events-none
                  absolute
                  hidden
                  whitespace-nowrap
                  text-[11px]
                  font-normal
                  normal-case
                  tracking-normal
                  text-[#C7CDE2]
                  sm:block
                  ${labelPositions[position.side]}
                `}
              >
                {skill.name}
              </span>
            </button>
          );
        })}

        {/* SMALL ORBIT PARTICLES */}

        <span className="skills-particle-one pointer-events-none absolute left-[4%] top-[28%] h-2 w-2 rounded-full bg-[#6D8CFF] shadow-[0_0_14px_#6D8CFF]" />

        <span className="skills-particle-two pointer-events-none absolute right-[7%] top-[37%] h-2 w-2 rounded-full bg-[#C580ED] shadow-[0_0_14px_#C580ED]" />

        <span className="skills-particle-one pointer-events-none absolute bottom-[7%] left-[52%] h-1.5 w-1.5 rounded-full bg-[#F78ECF] shadow-[0_0_14px_#F78ECF]" />
      </div>
    </div>
  );
}


/* ======================================================
   MAIN SKILLS SECTION
====================================================== */

function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [focusedSkill, setFocusedSkill] = useState(null);

  const categories = [
    {
      id: "frontend",
      number: "01",
      name: "Frontend & UI",
      subtitle: "Web interfaces, design and interaction",
      line1: "FRONTEND",
      line2: "& UI",
      accent: "#F78ECF",

      description:
        "Building responsive websites and interfaces, with attention to design, animation and interaction.",

      centerDescription:
        "Building responsive interfaces with thoughtful details and interaction.",

      skills: [
        { name: "Next.js", symbol: "N" },
        { name: "JavaScript", symbol: "JS" },
        { name: "Tailwind CSS", symbol: "≈" },
        { name: "AOS Animations", symbol: "◇" },
        { name: "Responsive Design", symbol: "▣" },
        { name: "HTML & CSS", symbol: "</>" },
        { name: "React", symbol: "⚛" },
      ],

      projects: [
        {
          name: "Nishaan",
          href: "/projects/nishaan",
          image: "/projects/nishaan/screenshot-1.png",
        },
        {
          name: "COTSLE",
          href: "/projects/cotsle",
          image: "/projects/cotsle/homepage.png",
        },
      ],

      otherSkills: [
        "UI/UX",
        "Animations",
        "Responsive Layouts",
      ],
    },

    {
      id: "backend",
      number: "02",
      name: "Backend & Data",
      subtitle: "APIs, databases and data handling",
      line1: "BACKEND",
      line2: "& DATA",
      accent: "#A480F2",

      description:
        "Connecting interfaces with APIs, working with databases and developing backend functionality.",

      centerDescription:
        "Connecting the interface to the data and logic behind it.",

      skills: [
        { name: "Python", symbol: "Py" },
        { name: "FastAPI", symbol: "FA" },
        { name: "Flask", symbol: "Fl" },
        { name: "PostgreSQL", symbol: "PG" },
        { name: "SQLite", symbol: "SQL" },
        { name: "REST APIs", symbol: "{}" },
        { name: "PostGIS", symbol: "GIS" },
      ],

      projects: [
        {
          name: "Nishaan",
          href: "/projects/nishaan",
          image: "/projects/nishaan/screenshot-1.png",
        },
        {
          name: "Donation Tracker",
          href: "/projects/donation-tracker",
          image:
            "/projects/donation-tracker/screenshot-1.png",
        },
      ],

      otherSkills: [
        "Database Design",
        "API Integration",
        "Data Handling",
      ],
    },

    {
      id: "ai",
      number: "03",
      name: "AI & Geospatial",
      subtitle: "Intelligent systems and location data",
      line1: "AI &",
      line2: "GEOSPATIAL",
      accent: "#D4B0F9",

      description:
        "Exploring how AI and geospatial technologies can turn incomplete information into useful results.",

      centerDescription:
        "Finding connections between intelligent systems and real-world locations.",

      skills: [
        { name: "Groq API", symbol: "AI" },
        { name: "NLP", symbol: "NLP" },
        { name: "Computer Vision", symbol: "CV" },
        { name: "Leaflet", symbol: "◈" },
        { name: "OpenStreetMap", symbol: "◎" },
        { name: "Geospatial Search", symbol: "⌖" },
        { name: "AI Integration", symbol: "✦" },
      ],

      projects: [
        {
          name: "Nishaan",
          href: "/projects/nishaan",
          image: "/projects/nishaan/screenshot-1.png",
        },
      ],

      otherSkills: [
        "Machine Learning",
        "AI Coursework",
        "PostGIS",
      ],
    },

    {
      id: "tools",
      number: "04",
      name: "Tools & Workflow",
      subtitle: "Development tools and everyday practice",
      line1: "TOOLS &",
      line2: "WORKFLOW",
      accent: "#F992AD",

      description:
        "The languages, tools and development practices I use to build, test, debug and improve projects.",

      centerDescription:
        "The everyday tools and habits behind turning ideas into working applications.",

      skills: [
        { name: "Git", symbol: "Git" },
        { name: "GitHub", symbol: "GH" },
        { name: "VS Code", symbol: "</>" },
        { name: "Java", symbol: "J" },
        { name: "MySQL", symbol: "DB" },
        { name: "Debugging", symbol: "⌘" },
        { name: "Mobile Testing", symbol: "▣" },
      ],

      projects: [
        {
          name: "COTSLE",
          href: "/projects/cotsle",
          image: "/projects/cotsle/homepage.png",
        },
        {
          name: "Lost & Found",
          href: "/projects/lost-found",
          image: "",
        },
      ],

      otherSkills: [
        "Problem Solving",
        "Collaboration",
        "Testing",
      ],
    },
  ];

  const active = categories[activeCategory];

  function selectCategory(index) {
    setActiveCategory(index);
    setFocusedSkill(null);
  }

  return (
    <section
      id="skills"
      className="
        relative
        z-10
        mx-auto
        max-w-[1600px]
        scroll-mt-20
        overflow-hidden
        border-t
        border-[#D4B0F9]/10
        px-6
        py-24
        lg:px-10
        xl:px-12
      "
    >
      {/* BACKGROUND DETAILS */}

      <div className="pointer-events-none absolute left-[43%] top-[12%] h-[520px] w-[520px] rounded-full bg-[#A480F2]/[0.045] blur-[150px]" />

      <div
        className="
          relative
          grid
          gap-8
          lg:grid-cols-[0.85fr_1.15fr]
          xl:grid-cols-[0.93fr_1.38fr_0.72fr]
          xl:gap-8
        "
      >
        {/* ==================================
            LEFT — TITLE AND CATEGORY MENU
        ================================== */}

        <div className="relative flex flex-col xl:pt-1">
          <SectionLabel number="06">
            Skills
          </SectionLabel>

          <div className="mt-16">
            <p className="font-mono text-sm uppercase tracking-[0.48em] text-[#D4B0F9]">
              SKILLS IN
            </p>

            <h2
              className="
                mt-3
                whitespace-nowrap
                text-[clamp(2.8rem,4.3vw,5.6rem)]
                font-black
                uppercase
                leading-none
                tracking-[-0.065em]
              "
            >
              <AnimatedLetters
                text="PRACTICE."
                gradientColors={[
                  "#FFFFFF",
                  "#D4B0F9",
                  "#A480F2",
                  "#F78ECF",
                ]}
                startDelay={250}
              />
            </h2>

            <p className="mt-8 max-w-[360px] font-mono text-[11px] leading-7 text-[#AEB7D5]">
              Technologies I work with across my
              projects, from building interfaces
              to connecting data, exploring AI
              and bringing ideas to life.
            </p>
          </div>

          {/* CATEGORY MENU */}

          <div className="mt-14 border-t border-[#D4B0F9]/20 xl:mt-20">
            {categories.map((category, index) => {
              const selected =
                activeCategory === index;

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={selected}
                  onMouseEnter={() =>
                    selectCategory(index)
                  }
                  onFocus={() =>
                    selectCategory(index)
                  }
                  onClick={() =>
                    selectCategory(index)
                  }
                  className="
                    group
                    relative
                    block
                    w-full
                    border-b
                    border-[#D4B0F9]/20
                    py-7
                    pl-5
                    pr-2
                    text-left
                    transition-all
                    duration-300
                  "
                >
                  {/* ACTIVE LEFT LINE */}

                  <span
                    className="
                      absolute
                      bottom-0
                      left-0
                      top-0
                      w-[2px]
                      transition-all
                      duration-300
                    "
                    style={{
                      background: selected
                        ? category.accent
                        : "transparent",

                      boxShadow: selected
                        ? `0 0 15px ${category.accent}`
                        : "none",
                    }}
                  />

                  {/* SUBTLE SELECTED GLOW */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-[#F78ECF]/[0.07]
                      to-transparent
                      transition-opacity
                      duration-300
                    "
                    style={{
                      opacity: selected ? 1 : 0,
                    }}
                  />

                  <div className="relative flex items-start gap-5">
                    <span
                      className="pt-1 font-mono text-xs"
                      style={{
                        color: selected
                          ? category.accent
                          : "#8F88CA",
                      }}
                    >
                      {category.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`
                          text-xl
                          font-semibold
                          tracking-[-0.025em]
                          transition-colors
                          duration-300
                          sm:text-2xl

                          ${
                            selected
                              ? "text-white"
                              : "text-[#B2BAD2] group-hover:text-white"
                          }
                        `}
                      >
                        {category.name}
                      </h3>

                      <p className="mt-2 font-mono text-[10px] leading-5 text-[#8791B1]">
                        {category.subtitle}
                      </p>
                    </div>

                    <span
                      className="
                        text-xl
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                      "
                      style={{
                        color: selected
                          ? category.accent
                          : "#AEB7D5",
                      }}
                    >
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================
            CENTER — INTERACTIVE ORB
        ================================== */}

        <div className="relative flex min-w-0 items-center justify-center">
          <SkillOrbit
            category={active}
            focusedSkill={focusedSkill}
            onFocusSkill={setFocusedSkill}
          />
        </div>

        {/* ==================================
            RIGHT — RELATED PROJECTS
        ================================== */}

        <aside
          className="
            relative
            flex
            flex-col
            gap-8
            lg:col-span-2
            lg:grid
            lg:grid-cols-2
            xl:col-span-1
            xl:flex
            xl:justify-center
            xl:gap-10
          "
        >
          {/* PROJECTS */}

          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4B0F9]">
                USED IN
              </span>

              <span className="h-px flex-1 bg-[#D4B0F9]/30" />
            </div>

            <div
              key={active.id}
              className="
                skills-preview-enter
                space-y-4
              "
            >
              {active.projects.map((project) => (
                <SkillProjectPreview
                  key={project.name}
                  project={project}
                />
              ))}
            </div>
          </div>

          {/* RELATED SKILLS */}

          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4B0F9]">
                ALSO EXPLORING
              </span>

              <span className="h-px flex-1 bg-[#D4B0F9]/30" />
            </div>

            <div className="flex flex-wrap gap-2">
              {active.otherSkills.map((skill) => (
                <span
                  key={skill}
                  className="
                    rounded-full
                    border
                    border-[#D4B0F9]/25
                    bg-[#111A36]/30
                    px-3.5
                    py-2
                    font-mono
                    text-[9px]
                    text-[#C7CDE2]
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ======================================
          BOTTOM CATEGORY NAVIGATION
      ====================================== */}

      <div
        className="
          relative
          mt-16
          flex
          flex-col
          items-center
          justify-between
          gap-7
          border-t
          border-[#D4B0F9]/10
          pt-8
          lg:flex-row
        "
      >
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-[#A480F2]/55" />

          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9D9BC9]">
            EXPLORING.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
          {categories.map((category, index) => {
            const selected =
              activeCategory === index;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  selectCategory(index)
                }
                aria-pressed={selected}
                className="
                  flex
                  items-center
                  gap-3
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                  transition-colors
                "
                style={{
                  color: selected
                    ? "#F8F7FF"
                    : "#838DAF",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full transition-all duration-300"
                  style={{
                    background: selected
                      ? category.accent
                      : "#7770B4",

                    boxShadow: selected
                      ? `0 0 14px ${category.accent}`
                      : "none",
                  }}
                />

                {category.id === "frontend"
                  ? "FRONTEND"
                  : category.id === "backend"
                    ? "BACKEND"
                    : category.id === "ai"
                      ? "AI + GEO"
                      : "TOOLS"}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9D9BC9]">
            CONTINUOUSLY LEARNING
          </p>

          <span className="h-px w-8 bg-[#A480F2]/55" />
        </div>
      </div>

      {/* ======================================
          ANIMATIONS
      ====================================== */}

      <style>{`
        @keyframes skillsLiquidOne {
          0% {
            transform: rotate(0deg) scale(1);
            border-radius: 54% 46% 62% 38% /
              42% 59% 41% 58%;
          }

          50% {
            transform: rotate(180deg) scale(1.09);
            border-radius: 42% 58% 38% 62% /
              56% 42% 58% 44%;
          }

          100% {
            transform: rotate(360deg) scale(1);
            border-radius: 54% 46% 62% 38% /
              42% 59% 41% 58%;
          }
        }

        @keyframes skillsLiquidTwo {
          0% {
            transform: rotate(0deg) scale(1.04);
          }

          50% {
            transform: rotate(-180deg) scale(.94);
          }

          100% {
            transform: rotate(-360deg) scale(1.04);
          }
        }

        @keyframes skillsLiquidThree {
          0%, 100% {
            transform: rotate(-12deg)
              scale(1.02, .96);
          }

          50% {
            transform: rotate(22deg)
              scale(.96, 1.06);
          }
        }

        @keyframes skillsParticleFloat {
          0%, 100% {
            transform: translateY(0);
            opacity: .55;
          }

          50% {
            transform: translateY(-13px);
            opacity: 1;
          }
        }

        @keyframes skillsCoreEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
            filter: blur(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .skills-liquid-one {
          animation: skillsLiquidOne
            19s linear infinite;
        }

        .skills-liquid-two {
          animation: skillsLiquidTwo
            25s linear infinite;
        }

        .skills-liquid-three {
          animation: skillsLiquidThree
            12s ease-in-out infinite;
        }

        .skills-particle-one {
          animation: skillsParticleFloat
            4s ease-in-out infinite;
        }

        .skills-particle-two {
          animation: skillsParticleFloat
            5.5s ease-in-out infinite reverse;
        }

        .skills-core-enter,
        .skills-preview-enter {
          animation: skillsCoreEnter
            550ms cubic-bezier(.22, 1, .36, 1)
            both;
        }

        @media (prefers-reduced-motion: reduce) {
          .skills-liquid-one,
          .skills-liquid-two,
          .skills-liquid-three,
          .skills-particle-one,
          .skills-particle-two,
          .skills-core-enter,
          .skills-preview-enter {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

{/* ======================================
          Contact Section
      ====================================== */}
    function ContactSection() {
  return (
    <section
      id="contact"
      className="
        relative overflow-hidden
        min-h-screen
        bg-[#050816]
        text-white
        px-6 md:px-10 lg:px-16
        py-24
      "
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,140,207,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,128,242,0.18),transparent_30%),linear-gradient(135deg,#070b1f_0%,#09153a_45%,#050816_100%)]" />

      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="absolute -top-20 left-[-80px] h-[260px] w-[260px] rounded-full bg-[#f992ad]/20 blur-[80px]" />
      <div className="absolute bottom-[-60px] right-[-80px] h-[280px] w-[280px] rounded-full bg-[#a480f2]/20 blur-[90px]" />

      {/* floating stars */}
      <div className="absolute left-[10%] top-[18%] h-2 w-2 rounded-full bg-[#fbbcee] opacity-70" />
      <div className="absolute left-[20%] top-[65%] h-1.5 w-1.5 rounded-full bg-[#cfb9f7] opacity-60" />
      <div className="absolute right-[16%] top-[22%] h-2 w-2 rounded-full bg-[#f78ecf] opacity-70" />
      <div className="absolute right-[30%] bottom-[18%] h-1.5 w-1.5 rounded-full bg-[#d4b0f9] opacity-70" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* top label */}
        <div className="mb-8 flex items-center gap-4 text-[12px] uppercase tracking-[0.45em] text-[#cfb9f7]">
          <span>06</span>
          <div className="h-px w-14 bg-[#cfb9f7]/40" />
          <span>Contact</span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ================= LEFT ================= */}
          <div className="relative">
            <p className="mb-4 font-mono text-[18px] text-[#b993ff]">
              {`> open_connection()`}
            </p>

            <h2 className="max-w-[11ch] text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              LET&apos;S BUILD
              <span className="block bg-gradient-to-r from-[#f992ad] via-[#f78ecf] to-[#a480f2] bg-clip-text text-transparent">
                SOMETHING
              </span>
              TOGETHER.
            </h2>

            <p className="mt-8 max-w-xl text-[17px] leading-8 text-white/72">
              I love building clean, meaningful and interactive digital
              experiences. If you have a project, collaboration idea or just
              want to connect, my inbox is always open.
            </p>

            {/* mini badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Software Engineering",
                "Web Development",
                "AI + Learning",
                "Interactive Design",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    rounded-full border border-white/12
                    bg-white/5 px-4 py-2 text-sm
                    text-[#fbbcee] backdrop-blur-md
                  "
                >
                  {item}
                </span>
              ))}
            </div>

            {/* quote / mini panel */}
            <div className="mt-10 max-w-md rounded-[26px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.28em] text-[#cfb9f7]/80">
                current status
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                Open to learning, collaborations and meaningful projects.
              </p>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="relative">
            {/* orbit ring decoration */}
            <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full border border-[#f78ecf]/25" />
            <div className="pointer-events-none absolute right-10 top-[-20px] h-24 w-24 rounded-full border border-[#a480f2]/20" />

            <div className="rounded-[34px] border border-white/10 bg-white/6 p-6 shadow-[0_0_60px_rgba(164,128,242,0.12)] backdrop-blur-2xl md:p-8">
              {/* top bar */}
              <div className="mb-6 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#f992ad]" />
                <span className="h-3 w-3 rounded-full bg-[#f78ecf]" />
                <span className="h-3 w-3 rounded-full bg-[#a480f2]" />
                <span className="ml-auto text-[11px] uppercase tracking-[0.3em] text-white/40">
                  connect.panel
                </span>
              </div>

              {/* card header */}
              <div className="rounded-[24px] border border-white/10 bg-[#0b1334]/70 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-[#cfb9f7]">
                  contact info
                </p>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                      Email
                    </p>
                    <p className="mt-2 text-base font-medium text-white">
                      emaanfatima312005@gmail.com
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                      Location
                    </p>
                    <p className="mt-2 text-base font-medium text-white">
                      Islamabad / Rawalpindi, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              {/* buttons */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=emaan.fatima.312005@gmail.com"
                  className="
                    rounded-2xl bg-gradient-to-r from-[#f992ad] via-[#f78ecf] to-[#a480f2]
                    px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em]
                    text-white transition duration-300 hover:scale-[1.02]
                  "
                >
                  Send Email
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    rounded-2xl border border-white/12 bg-white/6
                    px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em]
                    text-white transition duration-300 hover:bg-white/10
                  "
                >
                  View Resume
                </a>
              </div>

              {/* social row */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <a
                  href="https://www.linkedin.com/in/emaan-fatima-919269343/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm font-medium text-white/85 transition hover:bg-white/10"
                >
                  LinkedIn
                </a>

                <a
                  href="https://github.com/emaanfatima312005-wq"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm font-medium text-white/85 transition hover:bg-white/10"
                >
                  GitHub
                </a>

                <a
                  href="#projects"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm font-medium text-white/85 transition hover:bg-white/10"
                >
                  Projects
                </a>
              </div>

              {/* bottom note */}
              <div className="mt-6 rounded-2xl border border-dashed border-[#cfb9f7]/30 bg-[#0d1438]/50 px-4 py-4">
                <p className="text-sm leading-7 text-white/65">
                  Whether it’s a web project, creative idea, portfolio build or
                  collaboration — I’d love to hear from you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}  

/* ======================================================
   CUSTOM PORTFOLIO CURSOR
   Keeps the existing sparkle trail,
   but adds a clear visible pointer.
====================================================== */

function PortfolioCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Don't use the custom cursor on touch devices.
    const finePointer = window.matchMedia(
      "(pointer: fine)"
    );

    if (!finePointer.matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;

    let ringX = -100;
    let ringY = -100;

    let frameId;

    const moveCursor = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      // Main dot follows instantly
      dot.style.transform = `
        translate3d(
          ${mouseX}px,
          ${mouseY}px,
          0
        )
        translate(-50%, -50%)
      `;

      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const animateRing = () => {
      // Small delay gives the outer ring
      // a smooth floating feel.
      ringX +=
        (mouseX - ringX) * 0.18;

      ringY +=
        (mouseY - ringY) * 0.18;

      ring.style.transform = `
        translate3d(
          ${ringX}px,
          ${ringY}px,
          0
        )
        translate(-50%, -50%)
      `;

      frameId =
        requestAnimationFrame(
          animateRing
        );
    };

    const handleMouseOver = (event) => {
      const interactive =
        event.target.closest(
          `
            a,
            button,
            [role="button"],
            input,
            textarea,
            select
          `
        );

      if (interactive) {
        ring.classList.add(
          "portfolio-cursor-hover"
        );

        dot.classList.add(
          "portfolio-cursor-dot-hover"
        );
      }
    };

    const handleMouseOut = (event) => {
      const interactive =
        event.target.closest(
          `
            a,
            button,
            [role="button"],
            input,
            textarea,
            select
          `
        );

      if (interactive) {
        ring.classList.remove(
          "portfolio-cursor-hover"
        );

        dot.classList.remove(
          "portfolio-cursor-dot-hover"
        );
      }
    };

    const hideCursor = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const showCursor = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    document.addEventListener(
      "mouseover",
      handleMouseOver
    );

    document.addEventListener(
      "mouseout",
      handleMouseOut
    );

    document.documentElement.addEventListener(
      "mouseleave",
      hideCursor
    );

    document.documentElement.addEventListener(
      "mouseenter",
      showCursor
    );

    frameId =
      requestAnimationFrame(
        animateRing
      );

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor
      );

      document.removeEventListener(
        "mouseover",
        handleMouseOver
      );

      document.removeEventListener(
        "mouseout",
        handleMouseOut
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        hideCursor
      );

      document.documentElement.removeEventListener(
        "mouseenter",
        showCursor
      );

      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {/* ==================================
          OUTER RING
      ================================== */}

      <div
        ref={ringRef}
        aria-hidden="true"
        className="
          portfolio-cursor-ring

          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]

          h-7
          w-7

          rounded-full

          border
          border-[#F78ECF]/80

          opacity-0

          shadow-[
            0_0_12px_rgba(247,142,207,.35),
            inset_0_0_10px_rgba(164,128,242,.12)
          ]

          transition-[
            width,
            height,
            border-color,
            background-color,
            opacity
          ]

          duration-300
        "
      />

      {/* ==================================
          CENTER DOT
      ================================== */}

      <div
        ref={dotRef}
        aria-hidden="true"
        className="
          portfolio-cursor-dot

          pointer-events-none
          fixed
          left-0
          top-0
          z-[10000]

          h-[7px]
          w-[7px]

          rounded-full

          bg-[#F8F7FF]

          opacity-0

          shadow-[
            0_0_5px_#FFFFFF,
            0_0_12px_#F78ECF,
            0_0_22px_rgba(164,128,242,.85)
          ]

          transition-[
            width,
            height,
            background-color,
            box-shadow,
            opacity
          ]

          duration-200
        "
      />

      <style>{`
        /*
          Interactive elements:
          ring opens up instead of turning
          into another distracting cursor.
        */

        .portfolio-cursor-ring.portfolio-cursor-hover {
          width: 46px;
          height: 46px;

          border-color:
            rgba(212, 176, 249, .95);

          background:
            rgba(164, 128, 242, .08);

          box-shadow:
            0 0 22px rgba(247,142,207,.28),
            inset 0 0 18px rgba(164,128,242,.12);
        }

        .portfolio-cursor-dot.portfolio-cursor-dot-hover {
          width: 5px;
          height: 5px;

          background: #F78ECF;

          box-shadow:
            0 0 6px #F78ECF,
            0 0 15px rgba(247,142,207,.9);
        }

        /*
          Don't display custom cursor
          on touch/mobile devices.
        */

        @media (pointer: coarse) {
          .portfolio-cursor-ring,
          .portfolio-cursor-dot {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-cursor-ring {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

export function ComputerPortfolio() {
  const goTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };
useEffect(() => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });

  const frame = requestAnimationFrame(() => {
    window.scrollTo(0, 0);
  });

  return () => {
    cancelAnimationFrame(frame);
  };
}, []);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0E1630] text-[#F8F7FF]">
      <PortfolioChatbot />
      <PortfolioBackground />
      <PortfolioCursor />

      {/* =================================================
          TOP TECH NAV
      ================================================= */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#D4B0F9]/15
          bg-[#0E1630]/75
          backdrop-blur-2xl
        "
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-12">
          <button
            onClick={() =>
              goTo("intro")
            }
            className="font-mono text-sm font-semibold tracking-[0.16em]"
          >
            EMAAN.DEV
            <span className="text-[#F78ECF]">
              _
            </span>
          </button>

          <nav className="hidden items-center gap-5 lg:flex">
            {navItems.map(
              ([
                number,
                id,
                label,
              ]) => (
                <button
                  key={id}
                  onClick={() =>
                    goTo(id)
                  }
                  className="
                    flex
                    items-center
                    gap-1.5
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-[0.12em]
                    text-[#AEB7D5]
                    transition
                    hover:text-white
                  "
                >
                  <span className="text-[#A480F2]">
                    {number}
                  </span>

                  {label}
                </button>
              )
            )}
          </nav>

          <span className="font-mono text-[10px] tracking-[0.16em] text-[#8F98B8]">
            portfolio / 2026
          </span>
        </div>
      </header>

      {/* =================================================
          INTRO
      ================================================= */}

      <section
        id="intro"
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-65px)]
          max-w-[1500px]
          scroll-mt-24
          items-center
          px-6
          py-20
          lg:px-12
        "
      >
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          {/* LEFT SIDE */}

          <div>
            <SectionLabel number="01">
              Intro
            </SectionLabel>

            <p className="mb-7 font-mono text-sm text-[#A480F2]">
              &gt; initializing
              portfolio...
            </p>

            <p className="mb-3 text-xl font-medium text-[#DCE1F4] md:text-2xl">
              Hi, I&apos;m
            </p>

            <h1
              className="
                text-[clamp(4.2rem,9vw,9rem)]
                font-black
                uppercase
                leading-[0.80]
                tracking-[-0.075em]
              "
            >
              <span className="block text-white">
                Emaan
              </span>

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#F992AD]
                  via-[#F78ECF]
                  to-[#A480F2]
                  bg-clip-text
                  text-transparent
                "
              >
                Fatima_
              </span>
            </h1>

            <div
              className="
                mt-9
                flex
                flex-wrap
                gap-3
                font-mono
                text-xs
                uppercase
                tracking-[0.16em]
                text-[#C8CFE6]
                md:text-sm
              "
            >
              <span>
                Software Engineering
                Student
              </span>

              <span className="text-[#F78ECF]">
                •
              </span>

              <span>AI</span>

              <span className="text-[#F78ECF]">
                •
              </span>

              <span>Web</span>

              <span className="text-[#F78ECF]">
                •
              </span>

              <span>
                Creative Technology
              </span>
            </div>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#B8C0DC] md:text-lg">
              I build thoughtful
              digital experiences where
              code, creativity and
              technology meet — with a
              growing focus on software
              development, AI and
              interactive web
              experiences.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() =>
                  goTo("projects")
                }
                className="
                  rounded-xl
                  border
                  border-[#F78ECF]/70
                  bg-gradient-to-r
                  from-[#F78ECF]
                  to-[#A480F2]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-[#0E1630]
                  shadow-[0_0_35px_rgba(247,142,207,.28)]
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_0_55px_rgba(247,142,207,.45)]
                "
              >
                Explore My Work →
              </button>

              <a
                href="/Emaan-Fatima-CV.pdf"
                download
                className="
                  rounded-xl
                  border
                  border-[#D4B0F9]/35
                  bg-[#111A36]/60
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-xl
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#D4B0F9]/70
                "
              >
                Download CV ↓
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="relative min-h-[470px]">
            {/* FLOATING BACK SHAPE */}

            <div
              className="
                absolute
                right-[4%]
                top-[3%]
                h-36
                w-36
                -rotate-12
                rounded-full
                border
                border-[#A480F2]/30
                bg-[#A480F2]/10
                shadow-[0_0_90px_rgba(164,128,242,.22)]
              "
            />

            {/* MAIN TERMINAL */}

            <GlassPanel
              className="
                absolute
                left-0
                top-[20%]
                w-[84%]
                rotate-[-3deg]
                rounded-3xl
                p-7
                transition
                duration-500
                hover:rotate-0
                md:p-8
              "
            >
              {/* WINDOW DOTS */}

              <div className="mb-7 flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F992AD]" />

                <span className="h-2.5 w-2.5 rounded-full bg-[#D4B0F9]" />

                <span className="h-2.5 w-2.5 rounded-full bg-[#A480F2]" />
              </div>

              <div className="space-y-3 font-mono text-sm leading-7 text-[#C8CFE6] md:text-base">
                <p className="text-[#F78ECF]">
                  &gt; whoami
                </p>

                <p className="text-white">
                  Emaan Fatima
                </p>

                <p className="pt-3 text-[#A480F2]">
                  &gt; current_focus
                </p>

                <p>
                  AI + Web + interactive
                  experiences
                </p>

                <p className="pt-3 text-[#F78ECF]">
                  &gt; status
                </p>

                <p>
                  always_learning
                  <span className="animate-pulse">
                    _
                  </span>
                </p>
              </div>
            </GlassPanel>

            {/* SECOND SMALL WINDOW */}

            <GlassPanel
              className="
                absolute
                bottom-[2%]
                right-0
                w-[54%]
                rotate-[4deg]
                rounded-2xl
                p-5
                transition
                duration-500
                hover:rotate-0
              "
            >
              <p className="font-mono text-xs leading-6 text-[#AEB7D5]">
                // build
                <br />
                // learn
                <br />
                // create
                <br />
                // repeat_
              </p>
            </GlassPanel>

            {/* NEON MINI OBJECT */}

            <div
              className="
                absolute
                bottom-[10%]
                left-[4%]
                h-20
                w-20
                rotate-45
                border
                border-[#F78ECF]/40
                bg-[#F78ECF]/10
                shadow-[0_0_60px_rgba(247,142,207,.30)]
              "
            />
          </div>
        </div>

        {/* SCROLL INDICATOR */}

        <button
          onClick={() =>
            goTo("about")
          }
          className="
            absolute
            bottom-7
            left-1/2
            -translate-x-1/2
            font-mono
            text-[10px]
            uppercase
            tracking-[0.22em]
            text-[#AEB7D5]
          "
        >
          ↓ scroll
        </button>
      </section>

{/* =================================================
    02 ABOUT
================================================= */}

<section
  id="about"
  className="
    relative
    z-10
    mx-auto
    min-h-screen
    max-w-[1500px]
    scroll-mt-20
    border-t
    border-[#D4B0F9]/10
    px-6
    py-28
    lg:px-12
  "
>
  <SectionLabel number="02">
    About
  </SectionLabel>

  <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
    {/* ================= LEFT ================= */}

    <div>
      <p className="mb-5 font-mono text-sm text-[#A480F2]">
        &gt; profile.load()
      </p>

      <h2
  className="
    text-5xl
    font-black
    uppercase
    leading-[0.9]
    tracking-[-0.055em]
    md:text-7xl
    xl:text-8xl
  "
>
  <AnimatedLetters
    text="CURIOUS"
    className="text-white"
    startDelay={0}
  />

  <AnimatedLetters
  text="MIND."
  gradientColors={[
    "#F992AD",
    "#F78ECF",
    "#A480F2",
  ]}
  startDelay={350}
/>

  <AnimatedLetters
    text="THOUGHTFUL"
    className="text-white"
    startDelay={650}
  />

  <AnimatedLetters
    text="BUILDER."
    className="text-[#D4B0F9]"
    startDelay={1200}
  />
</h2>

      <div className="mt-9 max-w-2xl space-y-5">
        <p className="text-base leading-8 text-[#C4CAE0] md:text-lg">
          I&apos;m a Software Engineering
          student with a strong interest in
          software development, artificial
          intelligence and modern web
          technologies.
        </p>

        <p className="text-base leading-8 text-[#AEB7D5]">
          I enjoy solving practical problems
          through technology, experimenting
          with new tools and turning ideas
          into functional, user-focused
          digital experiences.
        </p>

        <p className="text-base leading-8 text-[#AEB7D5]">
          Right now, I&apos;m continuing to
          grow across web development, AI and
          interactive technology while
          building projects that help me turn
          what I learn into something real.
        </p>
      </div>

      {/* MINI PROFILE DETAILS */}

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <div
          className="
            rounded-2xl
            border
            border-[#D4B0F9]/15
            bg-[#111A36]/45
            p-4
            backdrop-blur-xl
          "
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F78ECF]">
            Education
          </p>

          <p className="mt-2 text-sm font-medium text-white">
            BS Software Engineering
          </p>

          <p className="mt-1 text-xs text-[#929BB9]">
            IIUI Islamabad
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-[#D4B0F9]/15
            bg-[#111A36]/45
            p-4
            backdrop-blur-xl
          "
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A480F2]">
            Current Learning
          </p>

          <p className="mt-2 text-sm font-medium text-white">
            Artificial Intelligence
          </p>

          <p className="mt-1 text-xs text-[#929BB9]">
            NAVTTC Certification
          </p>
        </div>
      </div>
    </div>

    {/* ================= RIGHT / ROLE SHUFFLE ================= */}

<RoleShuffleDeck />
  </div>
</section>

<JourneySection />
<ExperienceSection />
<ProjectsSection />
<SkillsSection />
<ContactSection />

{/* =================================================
    TEMPORARY MARKERS FOR THE REST
================================================= */}

{[
    
].map(
  ([
    id,
    number,
    label,
    heading,
  ]) => (
    <section
      key={id}
      id={id}
      className="
        relative
        z-10
        mx-auto
        flex
        min-h-[70vh]
        max-w-[1500px]
        scroll-mt-20
        items-center
        border-t
        border-[#D4B0F9]/10
        px-6
        py-28
        lg:px-12
      "
    >
      <div>
        <SectionLabel
          number={number}
        >
          {label}
        </SectionLabel>

        <h2
          className="
            max-w-4xl
            text-5xl
            font-black
            uppercase
            leading-[0.92]
            tracking-[-0.05em]
            text-white
            md:text-7xl
          "
        >
          {heading}
        </h2>

        <p className="mt-6 font-mono text-sm text-[#8F98B8]">
          &gt; section coming
          next_
        </p>
      </div>
    </section>
  )
)}
    </main>
  );
}