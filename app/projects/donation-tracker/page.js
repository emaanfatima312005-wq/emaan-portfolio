
import Link from "next/link";
import HaloBackground from "../nishaan/HaloBackground";

/* ======================================================
   PROJECT SETTINGS

   Add your media and actual links here.
====================================================== */

const DONATION = {
  video: "/projects/donation-tracker/demo.mp4",

  screenshots: [
    {
      src: "/projects/donation-tracker/screenshot-1.png",
      title: "Donation Interface",
      description: "The donation recording interface.",
    },
    {
      src: "/projects/donation-tracker/screenshot-2.png",
      title: "Transaction History",
      description: "The donation history and verification details.",
    },
  ],

  github: "",
  liveWebsite: "",
};

/* ======================================================
   PROJECT DATA
====================================================== */

const technologies = [
  "React",
  "Python",
  "Flask",
  "SQLite",
  "SHA-256",
];

const features = [
  {
    number: "01",
    title: "Anonymous Donor Identification",
    description:
      "Donation records use anonymous identifiers to support donor privacy without exposing personal information in the displayed transaction history.",
  },
  {
    number: "02",
    title: "Donation Records",
    description:
      "A structured system for storing and retrieving donation information through a database-backed application.",
  },
  {
    number: "03",
    title: "SHA-256 Hashing",
    description:
      "Hashing demonstrates how a digital fingerprint can be associated with records for verification purposes.",
  },
  {
    number: "04",
    title: "Transparent History",
    description:
      "A transaction history makes donation activity easier to review while demonstrating blockchain-inspired transparency.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Donation",
    description:
      "Donation information is submitted through the application.",
  },
  {
    number: "02",
    title: "Anonymous ID",
    description:
      "The record is associated with an anonymous donor identifier.",
  },
  {
    number: "03",
    title: "Record",
    description:
      "The Flask backend processes the information and stores it in SQLite.",
  },
  {
    number: "04",
    title: "Hash",
    description:
      "SHA-256 hashing creates a digital fingerprint associated with the record.",
  },
  {
    number: "05",
    title: "History",
    description:
      "Recorded transactions can be reviewed through the application's interface.",
  },
];

const stack = [
  ["Frontend", "React"],
  ["Backend", "Python + Flask"],
  ["Database", "SQLite"],
  ["Hashing", "SHA-256"],
  ["Architecture", "REST API"],
  ["Core Concept", "Blockchain Principles"],
];

/* ======================================================
   SMALL COMPONENTS
====================================================== */

function SectionNumber({ number, label }) {
  return (
    <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C580ED]">
      <span>{number}</span>

      <span className="h-px w-9 bg-[#C580ED]/50" />

      <span>{label}</span>
    </div>
  );
}

function TechPill({ children }) {
  return (
    <span className="rounded-full border border-[#C580ED]/35 bg-[#C580ED]/10 px-5 py-2.5 font-mono text-[11px] font-medium text-[#E0BCFA]">
      {children}
    </span>
  );
}

function BrowserBar({ label }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#D4B0F9]/10 bg-[#141B37] px-5 py-4">
      <span className="h-2.5 w-2.5 rounded-full bg-[#F992AD]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#D4B0F9]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#A480F2]" />

      <span className="ml-auto font-mono text-[9px] tracking-[0.15em] text-[#7981A4]">
        {label}
      </span>
    </div>
  );
}

/* ======================================================
   ILLUSTRATIVE PROJECT PREVIEW

   Automatically replaced by your video
   when you add its path above.
====================================================== */

function DonationMockup() {
  const exampleRecords = [
    ["DON-001", "Anonymous", "Verified"],
    ["DON-002", "Anonymous", "Recorded"],
    ["DON-003", "Anonymous", "Verified"],
  ];

  return (
    <div className="relative min-h-[470px] overflow-hidden bg-[#0D142B] p-6 md:p-9">
      {/* Background */}

      <div className="pointer-events-none absolute -right-24 -top-20 h-[400px] w-[400px] rounded-full bg-[#C580ED]/15 blur-[105px]" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[330px] w-[330px] rounded-full bg-[#F78ECF]/10 blur-[100px]" />

      <div className="relative z-10">
        {/* Preview heading */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#C580ED]">
              Example interface
            </p>

            <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Donation Tracker
            </h3>

            <p className="mt-2 max-w-sm text-[11px] leading-5 text-[#929DBD]">
              Transparent records. Anonymous
              identifiers. Verifiable data.
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C580ED]/30 bg-[#C580ED]/10 text-xl text-[#C580ED]">
            ◈
          </div>
        </div>

        {/* Illustrative verification line */}

        <div className="mt-10 flex items-center gap-3 rounded-xl border border-[#C580ED]/20 bg-[#C580ED]/[0.07] px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-[#D4B0F9] shadow-[0_0_12px_rgba(212,176,249,.7)]" />

          <span className="flex-1 font-mono text-[9px] text-[#D4B0F9]">
            HASH-BASED RECORD VERIFICATION
          </span>

          <span className="font-mono text-[8px] text-[#929DBD]">
            SHA-256
          </span>
        </div>

        {/* Transaction ledger */}

        <div className="mt-5 overflow-hidden rounded-2xl border border-[#D4B0F9]/15 bg-[#111A36]/80">
          <div className="grid grid-cols-[.8fr_1fr_.8fr] gap-3 border-b border-[#D4B0F9]/10 px-4 py-4 font-mono text-[8px] uppercase tracking-[0.12em] text-[#7783A5] md:px-6">
            <span>Record</span>
            <span>Donor</span>
            <span className="text-right">
              Status
            </span>
          </div>

          {exampleRecords.map(
            ([id, donor, status], index) => (
              <div
                key={id}
                className={`grid grid-cols-[.8fr_1fr_.8fr] items-center gap-3 px-4 py-5 md:px-6 ${
                  index !== exampleRecords.length - 1
                    ? "border-b border-[#D4B0F9]/10"
                    : ""
                }`}
              >
                <span className="font-mono text-[10px] text-[#E0BCFA]">
                  {id}
                </span>

                <span className="text-[10px] text-[#B8C0DC]">
                  {donor}
                </span>

                <span className="text-right font-mono text-[9px] text-[#C580ED]">
                  {status}
                </span>
              </div>
            )
          )}
        </div>

        {/* Hash illustration */}

        <div className="mt-5 rounded-xl border border-[#D4B0F9]/10 bg-[#0E1630]/65 p-4">
          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#7783A5]">
            Example SHA-256 fingerprint
          </p>

          <p className="mt-3 break-all font-mono text-[10px] leading-6 text-[#C580ED]">
            2cf24dba5fb0a30e26e83b2ac5b9e29e...
          </p>
        </div>

        <p className="mt-5 text-right font-mono text-[8px] uppercase tracking-[0.14em] text-[#647093]">
          Illustrative preview
        </p>
      </div>
    </div>
  );
}

/* ======================================================
   HERO MEDIA
====================================================== */

function DonationHeroMedia() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#C580ED]/25 bg-[#0D142B] shadow-[0_35px_100px_rgba(0,0,0,.38),0_0_55px_rgba(197,128,237,.10)]">
      <BrowserBar
        label={
          DONATION.video
            ? "donation.demo"
            : "donation.preview"
        }
      />

      {DONATION.video ? (
        <video
          src={DONATION.video}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          className="block aspect-video w-full bg-[#0D142B] object-contain"
        >
          Your browser does not support video.
        </video>
      ) : (
        <DonationMockup />
      )}
    </div>
  );
}

/* ======================================================
   SCREENSHOT COMPONENT
====================================================== */

function ScreenshotFrame({ screenshot, index }) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#C580ED]/20 bg-[#111A36]/55 shadow-[0_25px_65px_rgba(0,0,0,.22)] backdrop-blur-xl">
      <BrowserBar label={`screenshot_0${index + 1}`} />

      {screenshot.src ? (
        <img
          src={screenshot.src}
          alt={screenshot.title}
          loading="lazy"
          className="block h-auto w-full"
        />
      ) : (
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#0D142B] p-8">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(197,128,237,.45) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(197,128,237,.45) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C580ED]/25 bg-[#C580ED]/10 text-2xl text-[#C580ED]">
              ◇
            </span>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#C580ED]">
              Screenshot placeholder
            </p>

            <h3 className="mt-3 text-xl font-bold text-white">
              {screenshot.title}
            </h3>

            <p className="mt-3 text-xs text-[#7783A5]">
              Add your actual screenshot here
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-[#D4B0F9]/10 p-6">
        <p className="text-base font-semibold text-white">
          {screenshot.title}
        </p>

        <p className="mt-2 text-sm leading-6 text-[#9EA9C7]">
          {screenshot.description}
        </p>
      </div>
    </div>
  );
}

/* ======================================================
   MAIN PROJECT PAGE
====================================================== */

export default function DonationTrackerPage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#0E1630] text-[#F8F7FF]">
      {/* INTERACTIVE HALO BACKGROUND */}

      <HaloBackground />

      {/* NAVIGATION */}

      <header className="sticky top-0 z-50 border-b border-[#D4B0F9]/10 bg-[#0E1630]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-6 py-5 lg:px-12">
          <Link
            href="/portfolio#projects"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#AEB7D5] transition-colors hover:text-white"
          >
            ← Back to Portfolio
          </Link>

          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C580ED]">
            Project / 03
          </span>
        </div>
      </header>

      {/* ======================================
          01 — HERO
      ====================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] px-6 pb-28 pt-20 lg:px-12 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionNumber
              number="01"
              label="Featured Project"
            />

            <p className="mb-6 font-mono text-sm text-[#C580ED]">
              &gt; project.open("donation_tracker")
            </p>

            <h1 className="text-[clamp(3.5rem,6.5vw,7.5rem)] font-black uppercase leading-[0.86] tracking-[-0.065em] text-white">
              DONATION
              <br />

              <span className="bg-gradient-to-r from-[#F78ECF] to-[#A480F2] bg-clip-text text-transparent">
                TRACKER
              </span>

              <span className="text-[#C580ED]">
                _
              </span>
            </h1>

            <h2 className="mt-8 max-w-xl text-2xl font-semibold leading-tight text-[#D4B0F9] md:text-3xl">
              Transparency through
              blockchain-inspired technology.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#B8C0DC]">
              A donation-tracking prototype
              exploring how anonymous donor
              identifiers, structured records
              and SHA-256 hashing can support
              transparency and accountability.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {technologies.map((technology) => (
                <TechPill key={technology}>
                  {technology}
                </TechPill>
              ))}
            </div>

            {/* HERO BUTTONS */}

            <div className="mt-10 flex flex-wrap gap-4">
              {DONATION.github && (
                <a
                  href={DONATION.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[#C580ED]/55 bg-[#C580ED]/10 px-7 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E0BCFA] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C580ED]/20"
                >
                  View GitHub ↗
                </a>
              )}

              {DONATION.liveWebsite && (
                <a
                  href={DONATION.liveWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gradient-to-r from-[#F78ECF] to-[#A480F2] px-7 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#0E1630] transition-all duration-300 hover:-translate-y-1"
                >
                  View Live Website ↗
                </a>
              )}

              <Link
                href="/portfolio#projects"
                className="rounded-xl border border-[#D4B0F9]/25 px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#B8C0DC] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4B0F9]/55 hover:text-white"
              >
                All Projects
              </Link>
            </div>
          </div>

          <DonationHeroMedia />
        </div>
      </section>

      {/* ======================================
          02 — PROJECT OVERVIEW
      ====================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="02"
          label="Project Overview"
        />

        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-7xl">
            Every
            <br />
            donation.
            <br />

            <span className="bg-gradient-to-r from-[#F78ECF] to-[#A480F2] bg-clip-text text-transparent">
              Accounted for.
            </span>
          </h2>

          <div className="max-w-2xl space-y-6 text-base leading-8 text-[#B8C0DC]">
            <p>
              Trust is important in charitable
              giving. Donors may want to know
              that their contributions have
              been recorded correctly, while
              organisations need an organised
              way to maintain donation history.
            </p>

            <p>
              This project explores how
              blockchain principles can be
              represented in a web application.
              Donation information is stored
              in SQLite, and SHA-256 hashing
              is used to demonstrate
              record verification concepts.
            </p>

            <p>
              Anonymous identifiers provide
              a way to associate records
              with donors without displaying
              their personal identities.
            </p>

            <div className="rounded-2xl border-l-2 border-[#C580ED] bg-[#C580ED]/[0.06] px-5 py-4 text-sm leading-7 text-[#D4B0F9]">
              This is a blockchain-inspired
              educational prototype. It does
              not depend on a live blockchain
              network or cryptocurrency.
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          03 — KEY FEATURES
      ====================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="03"
          label="Project Features"
        />

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-7xl">
            Built around
            <br />

            <span className="text-[#C580ED]">
              trust.
            </span>
          </h2>

          <p className="max-w-sm text-sm leading-7 text-[#AEB7D5]">
            The project brings together
            donation management, anonymous
            identification and hashing
            concepts in one application.
          </p>
        </div>

        <div className="mt-16 border-t border-[#C580ED]/20">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group grid gap-5 border-b border-[#C580ED]/15 py-9 transition-colors duration-300 hover:bg-[#C580ED]/[0.035] md:grid-cols-[75px_1fr_1.2fr] md:items-center md:gap-8"
            >
              <span className="font-mono text-xs text-[#C580ED]">
                {feature.number}
              </span>

              <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#D4B0F9] md:text-2xl">
                {feature.title}
              </h3>

              <p className="max-w-xl text-sm leading-7 text-[#9EA9C7]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================
          04 — HOW IT WORKS
      ====================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="04"
          label="How It Works"
        />

        <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-7xl">
          From donation
          <br />

          <span className="bg-gradient-to-r from-[#F78ECF] to-[#A480F2] bg-clip-text text-transparent">
            to record.
          </span>
        </h2>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-[29px] hidden h-px bg-gradient-to-r from-[#F78ECF] via-[#C580ED] to-[#A480F2] md:block" />

          <div className="grid gap-10 md:grid-cols-5">
            {workflow.map((step) => (
              <div key={step.number} className="relative">
                <div className="relative z-10 flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#C580ED]/45 bg-[#0E1630] font-mono text-[11px] text-[#D4B0F9] shadow-[0_0_25px_rgba(197,128,237,.15)]">
                  {step.number}
                </div>

                <h3 className="mt-7 text-lg font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#9EA9C7]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          05 — SCREENSHOTS
      ====================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="05"
          label="Interface"
        />

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-7xl">
            Inside the
            <br />

            <span className="text-[#C580ED]">
              tracker.
            </span>
          </h2>

          <p className="max-w-md text-sm leading-7 text-[#AEB7D5]">
            A closer look at the donation
            interface and transaction
            record management.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {DONATION.screenshots.map(
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

      {/* ======================================
          06 — DEVELOPMENT
      ====================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="06"
          label="Development"
        />

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C580ED]">
              // project development
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.96] tracking-[-0.045em] text-white md:text-5xl">
              Exploring
              <br />
              blockchain
              <br />
              principles.
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-[#B8C0DC]">
              <p>
                The project combines a React
                frontend with a Python Flask
                backend and SQLite database.
              </p>

              <p>
                Its core technical concept
                involves anonymous donation
                identifiers, structured
                transaction records and
                SHA-256 hashing.
              </p>

              <p>
                It demonstrates how concepts
                associated with blockchain
                can be explored using a
                conventional web application
                without implementing an
                actual blockchain network.
              </p>
            </div>
          </div>

          {/* TECHNOLOGY STACK */}

          <div className="rounded-[28px] border border-[#C580ED]/20 bg-[#111A36]/55 p-7 backdrop-blur-xl md:p-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C580ED]">
              // technology stack
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {stack.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#D4B0F9]/10 bg-[#0E1630]/60 p-5"
                >
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#7580A1]">
                    {label}
                  </p>

                  <p className="mt-3 text-base font-semibold text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#D4B0F9]/15 pt-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#7580A1]">
                Project Focus
              </p>

              <p className="mt-3 text-sm leading-7 text-[#B8C0DC]">
                Full-stack integration,
                database operations,
                anonymous record handling
                and cryptographic hashing
                concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          07 — REFLECTION
      ====================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-28 lg:px-12">
        <SectionNumber
          number="07"
          label="Reflection"
        />

        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-7xl">
            Beyond
            <br />

            <span className="bg-gradient-to-r from-[#F78ECF] to-[#A480F2] bg-clip-text text-transparent">
              the code.
            </span>
          </h2>

          <div className="max-w-2xl space-y-6 text-base leading-8 text-[#B8C0DC]">
            <p>
              This project was an exploration
              of how cryptographic hashing
              and structured records relate
              to transparency in digital
              systems.
            </p>

            <p>
              It also provided an opportunity
              to connect frontend development
              with backend processing and
              database management.
            </p>

            <p>
              One important distinction was
              understanding the difference
              between using blockchain-inspired
              techniques and implementing
              a fully decentralised blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================
          FINAL CTA
      ====================================== */}

      <section className="relative z-10 mx-auto max-w-[1500px] border-t border-[#D4B0F9]/10 px-6 py-24 lg:px-12">
        <div className="relative overflow-hidden rounded-[32px] border border-[#C580ED]/25 bg-[#111A36]/60 px-7 py-16 text-center backdrop-blur-xl md:px-12 md:py-20">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C580ED]/15 blur-[120px]" />

          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C580ED]">
              project_03.complete
            </p>

            <h2 className="mt-6 text-4xl font-black uppercase tracking-[-0.055em] text-white md:text-6xl">
              DONATION
              <br />

              <span className="text-[#C580ED]">
                TRACKER_
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#AEB7D5]">
              Exploring transparent record
              keeping, donor privacy and
              blockchain-inspired verification
              through a full-stack application.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {DONATION.github && (
                <a
                  href={DONATION.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gradient-to-r from-[#F78ECF] to-[#A480F2] px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#0E1630] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(197,128,237,.3)]"
                >
                  View GitHub ↗
                </a>
              )}

              {DONATION.liveWebsite && (
                <a
                  href={DONATION.liveWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[#C580ED]/55 bg-[#C580ED]/10 px-7 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E0BCFA] transition-all duration-300 hover:-translate-y-1"
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
