
import Link from "next/link";
import HaloBackground from "../nishaan/HaloBackground";

/* ======================================================
   COTSLE PROJECT SETTINGS

   Add your actual media and project links here later.
   Leave a value empty if you don't have it yet.
====================================================== */


const COTSLE = {
  // VIDEO FOR THE LARGE HERO FRAME
  video: "/projects/cotsle/demo.mp4",

  // TWO SCREENSHOTS FOR THE GALLERY
  screenshots: [
    {
      src: "/projects/cotsle/homepage.png",
      title: "Homepage",
      description:
        "COTSLE's homepage, navigation and main hero section.",
    },
    {
      src: "/projects/cotsle/services.png",
      title: "Services & Training",
      description:
        "The website's technology services and training sections.",
    },
  ],

  // ADD YOUR ACTUAL LINKS WHEN AVAILABLE
  github: "",
  liveWebsite: "",
};


/* ======================================================
   SHARED SMALL COMPONENTS
====================================================== */

function SectionNumber({ number, label }) {
  return (
    <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#78B5FF]">
      <span>{number}</span>

      <span className="h-px w-9 bg-[#78B5FF]/50" />

      <span>{label}</span>
    </div>
  );
}

function TechnologyPill({ children }) {
  return (
    <span className="rounded-full border border-[#78B5FF]/30 bg-[#0D6EFD]/10 px-5 py-2.5 font-mono text-[11px] font-medium text-[#A6CBFF]">
      {children}
    </span>
  );
}

function BrowserBar({ label = "cotsle.preview" }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 bg-[#101A34] px-5 py-4">
      <span className="h-2.5 w-2.5 rounded-full bg-[#F992AD]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#D4B0F9]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#A480F2]" />

      <span className="ml-auto font-mono text-[9px] tracking-[0.12em] text-[#7986AA]">
        {label}
      </span>
    </div>
  );
}

/* ======================================================
   ILLUSTRATIVE WEBSITE PREVIEW

   This displays until you add an actual COTSLE video.
====================================================== */

function CotsleWebsiteMockup() {
  const services = [
    "Web Development",
    "AI Solutions",
    "Cloud Computing",
    "Cyber Security",
  ];

  return (
    <div className="relative min-h-[480px] overflow-hidden bg-[#08172F]">
      {/* Background decoration */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-[430px] w-[430px] rounded-full bg-[#0D6EFD]/25 blur-[100px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[280px] rounded-full bg-[#A480F2]/10 blur-[90px]" />

      {/* Website navigation */}

      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-5 md:px-8">
        <div>
          <p className="text-lg font-black tracking-[-0.04em] text-white">
            COTSLE
            <span className="text-[#4B9BFF]">.</span>
          </p>

          <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.2em] text-[#78B5FF]">
            Technology & Training
          </p>
        </div>

        <div className="hidden items-center gap-5 font-mono text-[8px] text-[#A8B4D2] sm:flex">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Training</span>
        </div>

        <span className="rounded-lg bg-[#0D6EFD] px-3 py-2 text-[8px] font-semibold text-white">
          Contact Us
        </span>
      </div>

      {/* Website hero */}

      <div className="relative z-10 grid min-h-[390px] items-center gap-9 px-6 py-12 md:grid-cols-[1.1fr_.9fr] md:px-9">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#78B5FF]">
            Technology • Innovation • Training
          </p>

          <h3 className="mt-5 max-w-sm text-3xl font-black leading-[0.96] tracking-[-0.045em] text-white md:text-4xl">
            Empowering Businesses Through{" "}
            <span className="text-[#4B9BFF]">
              Technology.
            </span>
          </h3>

          <p className="mt-5 max-w-sm text-[10px] leading-6 text-[#A8B4D2]">
            Technology services and professional
            training through a modern, accessible
            digital experience.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-lg bg-[#0D6EFD] px-4 py-3 text-[9px] font-semibold text-white">
              Explore Services
            </span>

            <span className="rounded-lg border border-white/20 px-4 py-3 text-[9px] text-white">
              Learn More
            </span>
          </div>
        </div>

        {/* Visual on right */}

        <div className="relative mx-auto aspect-square w-full max-w-[320px]">
          <div className="absolute inset-[7%] rotate-[8deg] rounded-[28px] border border-[#0D6EFD]/30 bg-[#0D6EFD]/10" />

          <div className="absolute inset-[13%] -rotate-[5deg] rounded-[24px] border border-[#78B5FF]/25 bg-[#111F3D] shadow-[0_30px_75px_rgba(0,0,0,.35)]" />

          <div className="absolute inset-[19%] flex flex-col justify-center">
            <p className="mb-5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#78B5FF]">
              What we offer
            </p>

            <div className="grid grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div
                  key={service}
                  className="rounded-xl border border-[#78B5FF]/15 bg-[#0B1630] p-3"
                >
                  <span
                    className="block h-2 w-2 rounded-full bg-[#4B9BFF]"
                    style={{
                      opacity: 1 - index * 0.15,
                    }}
                  />

                  <p className="mt-4 text-[8px] font-semibold leading-4 text-white">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   HERO MEDIA

   Displays the actual video when you add its path.
====================================================== */

function CotsleHeroMedia() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#78B5FF]/25 bg-[#08172F] shadow-[0_35px_100px_rgba(0,0,0,.4),0_0_60px_rgba(13,110,253,.10)]">
      <BrowserBar
        label={
          COTSLE.video
            ? "cotsle.demo"
            : "cotsle.website"
        }
      />

      {COTSLE.video ? (
        <video
          src={COTSLE.video}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          className="block aspect-video w-full bg-[#08172F] object-contain"
        >
          Your browser does not support video.
        </video>
      ) : (
        <CotsleWebsiteMockup />
      )}
    </div>
  );
}

/* ======================================================
   SCREENSHOT FRAME
====================================================== */

function ScreenshotFrame({
  screenshot,
  index,
}) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#78B5FF]/15 bg-[#101A34]/60 shadow-[0_25px_65px_rgba(0,0,0,.23)] backdrop-blur-xl">
      <BrowserBar
        label={`screenshot_0${index + 1}`}
      />

      {screenshot.src ? (
        <img
          src={screenshot.src}
          alt={screenshot.title}
          loading="lazy"
          className="block h-auto w-full"
        />
      ) : (
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#0B1730] p-8">
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(120,181,255,.45) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(120,181,255,.45) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative z-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#78B5FF]/25 bg-[#0D6EFD]/10 text-2xl text-[#78B5FF]">
              ◇
            </div>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#78B5FF]">
              Screenshot placeholder
            </p>

            <h3 className="mt-3 text-xl font-bold text-white">
              {screenshot.title}
            </h3>

            <p className="mt-3 font-mono text-[10px] text-[#697A9F]">
              Add your real screenshot here
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-[#78B5FF]/10 p-6">
        <p className="text-base font-semibold text-white">
          {screenshot.title}
        </p>

        <p className="mt-2 text-sm leading-6 text-[#96A6C7]">
          {screenshot.description}
        </p>
      </div>
    </div>
  );
}

/* ======================================================
   COTSLE CASE STUDY
====================================================== */

export default function CotsleProjectPage() {
  const workflow = [
    {
      number: "01",
      title: "Structure",
      description:
        "Organising the website into clear, reusable sections and defining the content hierarchy.",
    },
    {
      number: "02",
      title: "Development",
      description:
        "Building the frontend in Next.js with React components and Tailwind CSS.",
    },
    {
      number: "03",
      title: "Interaction",
      description:
        "Implementing navigation, animations and interactive elements to improve the experience.",
    },
    {
      number: "04",
      title: "Responsive Design",
      description:
        "Adapting layouts, navigation and content for desktop, tablet and mobile screens.",
    },
    {
      number: "05",
      title: "Refinement",
      description:
        "Testing, debugging and improving the website through repeated iterations.",
    },
  ];

  const features = [
    {
      number: "01",
      title: "Responsive Navigation",
      description:
        "A responsive navbar with mobile navigation and a compact appearance on scroll.",
    },
    {
      number: "02",
      title: "Technology Services",
      description:
        "Dedicated sections presenting services such as web development, cloud computing and cybersecurity.",
    },
    {
      number: "03",
      title: "Training Information",
      description:
        "Clear presentation of technology training and educational offerings.",
    },
    {
      number: "04",
      title: "Interactive Experience",
      description:
        "Scroll animations, animated statistics and reusable interface components.",
    },
  ];

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#0E1630] text-[#F8F7FF]">
      {/* ==========================================
          INTERACTIVE BACKGROUND
      ========================================== */}

      <HaloBackground />

      {/* Extra navy tint for COTSLE */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[#0E1630]/10"
      />

      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <header className="sticky top-0 z-50 border-b border-[#D4B0F9]/10 bg-[#0E1630]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-6 py-5 lg:px-12">
          <Link
            href="/portfolio#projects"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#AEB7D5] transition-colors hover:text-white"
          >
            ← Back to Portfolio
          </Link>

          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#78B5FF]">
            Project / 02
          </p>
        </div>
      </header>

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] px-6 pb-28 pt-20 lg:px-12 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[0.78fr_1.22fr]">
          {/* Left */}

          <div>
            <SectionNumber
              number="01"
              label="Web Development Project"
            />

            <p className="mb-6 font-mono text-sm text-[#78B5FF]">
              &gt; project.open("cotsle")
            </p>

            <h1 className="text-[clamp(4rem,8vw,8.5rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-white">
              COTSLE
              <span className="text-[#4B9BFF]">
                _
              </span>
            </h1>

            <h2 className="mt-8 max-w-xl text-2xl font-semibold leading-tight text-[#A8C9FF] md:text-3xl">
              Technology, Training
              <br />
              & Digital Experiences.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#B0BFDA]">
              A responsive technology and training
              website developed during my web
              development internship at Corvit
              Systems, bringing together modern
              design, reusable components and a
              seamless experience across devices.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <TechnologyPill>
                Next.js
              </TechnologyPill>

              <TechnologyPill>
                React
              </TechnologyPill>

              <TechnologyPill>
                Tailwind CSS
              </TechnologyPill>

              <TechnologyPill>
                JavaScript
              </TechnologyPill>

              <TechnologyPill>
                Responsive Design
              </TechnologyPill>
            </div>

            {/* Hero buttons */}

            <div className="mt-10 flex flex-wrap gap-4">
              {COTSLE.github && (
                <a
                  href={COTSLE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[#78B5FF]/50 bg-[#0D6EFD]/15 px-6 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A8C9FF] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0D6EFD]/25"
                >
                  GitHub ↗
                </a>
              )}

              {COTSLE.liveWebsite && (
                <a
                  href={COTSLE.liveWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#0D6EFD] px-6 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#348AFF]"
                >
                  View Live Website ↗
                </a>
              )}

              <Link
                href="/portfolio#projects"
                className="rounded-xl border border-[#D4B0F9]/25 px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#B0BFDA] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4B0F9]/50 hover:text-white"
              >
                All Projects
              </Link>
            </div>
          </div>

          {/* Right */}

          <CotsleHeroMedia />
        </div>
      </section>

      {/* ==========================================
          PROJECT OVERVIEW
      ========================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="02"
          label="Project Overview"
        />

        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <h2 className="text-5xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white md:text-7xl">
            Bringing
            <br />
            technology
            <br />

            <span className="bg-gradient-to-r from-[#4B9BFF] to-[#A480F2] bg-clip-text text-transparent">
              online.
            </span>
          </h2>

          <div className="max-w-2xl space-y-6 text-base leading-8 text-[#B0BFDA]">
            <p>
              COTSLE was a website development
              project I worked on during my
              internship at Corvit Systems.
              The goal was to create an organised,
              responsive web presence for
              technology services and professional
              training.
            </p>

            <p>
              The project involved translating
              website requirements into reusable
              frontend components, arranging
              information into accessible sections
              and creating a consistent experience
              across different screen sizes.
            </p>

            <p>
              It gave me practical experience
              working with Next.js, handling
              layout and interaction issues,
              implementing responsive behaviour
              and improving a website through
              development and testing.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          WHAT I BUILT
      ========================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="03"
          label="Website Features"
        />

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-7xl">
            Built for
            <br />

            <span className="text-[#78B5FF]">
              every screen.
            </span>
          </h2>

          <p className="max-w-sm text-sm leading-7 text-[#A8B4D2]">
            From the main navigation to
            services and content sections,
            the focus was on making the
            website clear, responsive
            and easy to use.
          </p>
        </div>

        {/* Editorial feature rows */}

        <div className="mt-16 border-t border-[#78B5FF]/20">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group grid gap-5 border-b border-[#78B5FF]/15 py-9 transition-colors duration-300 hover:bg-[#0D6EFD]/[0.035] md:grid-cols-[75px_1fr_1.2fr] md:items-center md:gap-8"
            >
              <span className="font-mono text-xs text-[#78B5FF]">
                {feature.number}
              </span>

              <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#A8C9FF] md:text-2xl">
                {feature.title}
              </h3>

              <p className="max-w-xl text-sm leading-7 text-[#94A4C4]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          DEVELOPMENT PROCESS
      ========================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="04"
          label="Development Process"
        />

        <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-7xl">
          From structure
          <br />

          <span className="bg-gradient-to-r from-[#78B5FF] to-[#A480F2] bg-clip-text text-transparent">
            to experience.
          </span>
        </h2>

        <div className="relative mt-20">
          {/* Connecting line */}

          <div className="absolute left-0 right-0 top-[29px] hidden h-px bg-gradient-to-r from-[#0D6EFD] via-[#78B5FF] to-[#A480F2] md:block" />

          <div className="grid gap-10 md:grid-cols-5">
            {workflow.map((step) => (
              <div
                key={step.number}
                className="relative"
              >
                <div className="relative z-10 flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#78B5FF]/45 bg-[#0E1630] font-mono text-[11px] text-[#78B5FF] shadow-[0_0_25px_rgba(13,110,253,.15)]">
                  {step.number}
                </div>

                <h3 className="mt-7 text-lg font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#94A4C4]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          ACTUAL SCREENSHOTS
      ========================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="05"
          label="Interface"
        />

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-7xl">
            Inside
            <br />

            <span className="text-[#78B5FF]">
              COTSLE.
            </span>
          </h2>

          <p className="max-w-md text-sm leading-7 text-[#A8B4D2]">
            A closer look at the website's
            visual design, content structure
            and responsive experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {COTSLE.screenshots.map(
            (screenshot, index) => (
              <ScreenshotFrame
                key={screenshot.title}
                screenshot={screenshot}
                index={index}
              />
            )
          )}
        </div>
      </section>

      {/* ==========================================
          MY ROLE & TECHNOLOGIES
      ========================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="06"
          label="Development"
        />

        <div className="grid gap-16 lg:grid-cols-2">
          {/* My role */}

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#78B5FF]">
              // my role
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.96] tracking-[-0.045em] text-white md:text-5xl">
              Learning
              <br />
              by building.
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-[#B0BFDA]">
              <p>
                As a web development intern,
                I worked on the frontend of
                COTSLE using Next.js, React
                and Tailwind CSS.
              </p>

              <p>
                My work included building and
                updating components, implementing
                responsive layouts, working
                with animations and debugging
                issues during development.
              </p>

              <p>
                The project also introduced
                me to the practical process
                of improving a website based
                on feedback and testing it
                across different devices.
              </p>
            </div>

            <div className="mt-10 border-l-2 border-[#0D6EFD] pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#78B5FF]">
                Internship
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                Corvit Systems
              </p>

              <p className="mt-1 text-sm text-[#94A4C4]">
                Web Development Intern
              </p>
            </div>
          </div>

          {/* Stack */}

          <div className="rounded-[28px] border border-[#78B5FF]/15 bg-[#101A34]/55 p-7 backdrop-blur-xl md:p-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#78B5FF]">
              // technology stack
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Framework", "Next.js"],
                ["Frontend", "React"],
                ["Styling", "Tailwind CSS"],
                ["Language", "JavaScript"],
                ["Animation", "AOS"],
                ["UI Behaviour", "React Hooks"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#78B5FF]/10 bg-[#0B1630]/60 p-5"
                >
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#7182A7]">
                    {label}
                  </p>

                  <p className="mt-3 text-base font-semibold text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#78B5FF]/15 pt-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#7182A7]">
                Additional Focus
              </p>

              <p className="mt-3 text-sm leading-7 text-[#B0BFDA]">
                Responsive design, reusable
                components, user interaction,
                debugging and frontend
                development workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          REFLECTION
      ========================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="07"
          label="Reflection"
        />

        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-7xl">
            More than
            <br />

            <span className="bg-gradient-to-r from-[#78B5FF] to-[#A480F2] bg-clip-text text-transparent">
              just code.
            </span>
          </h2>

          <div className="max-w-2xl space-y-6 text-base leading-8 text-[#B0BFDA]">
            <p>
              COTSLE was an opportunity
              to apply what I was learning
              to a larger website, where
              different sections had to work
              together as one consistent
              experience.
            </p>

            <p>
              The process helped me understand
              why clean component structure,
              responsiveness and attention
              to detail matter just as much
              as getting a page to render.
            </p>

            <p>
              It also taught me to approach
              bugs and design feedback as
              part of the development
              process rather than obstacles
              to it.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          FINAL CTA
      ========================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-24 lg:px-12">
        <div className="relative overflow-hidden rounded-[32px] border border-[#78B5FF]/20 bg-[#101A34]/60 px-7 py-16 text-center backdrop-blur-xl md:px-12 md:py-20">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0D6EFD]/15 blur-[120px]" />

          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#78B5FF]">
              project_02.complete
            </p>

            <h2 className="mt-6 text-5xl font-black uppercase tracking-[-0.055em] text-white md:text-7xl">
              COTSLE
              <span className="text-[#4B9BFF]">
                _
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#A8B4D2]">
              A practical web development
              experience bringing technology
              services and training into
              a modern, responsive website.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {COTSLE.github && (
                <a
                  href={COTSLE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gradient-to-r from-[#0D6EFD] to-[#78B5FF] px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(13,110,253,.3)]"
                >
                  View GitHub ↗
                </a>
              )}

              {COTSLE.liveWebsite && (
                <a
                  href={COTSLE.liveWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[#78B5FF]/55 bg-[#0D6EFD]/10 px-7 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A8C9FF] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0D6EFD]/20"
                >
                  View Live Website ↗
                </a>
              )}

              <Link
                href="/portfolio#projects"
                className="rounded-xl border border-[#D4B0F9]/25 px-7 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D4B0F9]/55"
              >
                ← All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
