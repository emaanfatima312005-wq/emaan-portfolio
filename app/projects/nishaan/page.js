import Link from "next/link";

/* ======================================================
   SMALL UI
====================================================== */

function TechPill({ children }) {
  return (
    <span
      className="
        rounded-full
        border
        border-[#F78ECF]/30
        bg-[#F78ECF]/[0.06]
        px-5
        py-2.5
        font-mono
        text-[11px]
        font-medium
        tracking-[0.04em]
        text-[#FBBCEE]
      "
    >
      {children}
    </span>
  );
}

function SectionNumber({
  number,
  label,
}) {
  return (
    <div
      className="
        mb-7
        flex
        items-center
        gap-3
        font-mono
        text-[10px]
        uppercase
        tracking-[0.24em]
        text-[#D4B0F9]
      "
    >
      <span>{number}</span>

      <span
        className="
          h-px
          w-9
          bg-[#D4B0F9]/40
        "
      />

      <span>{label}</span>
    </div>
  );
}

/* ======================================================
   HERO VISUAL
====================================================== */

function NishaanHeroVisual() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-[#D4B0F9]/25
        bg-[#0B142D]
        shadow-[0_35px_100px_rgba(0,0,0,.38)]
      "
    >
      {/* BROWSER BAR */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[#D4B0F9]/10
          bg-[#111A36]
          px-5
          py-4
        "
      >
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F992AD]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D4B0F9]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#A480F2]" />
        </div>

        <p
          className="
            font-mono
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-[#697394]
          "
        >
          nishaan.app
        </p>
      </div>

      {/* APP */}

      <div
        className="
          grid
          min-h-[560px]
          md:grid-cols-[0.82fr_1.18fr]
        "
      >
        {/* LEFT */}

        <div
          className="
            relative
            border-b
            border-[#D4B0F9]/10
            p-7
            md:border-b-0
            md:border-r
            md:p-9
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
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
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#F78ECF]/10
                text-lg
                text-[#F78ECF]
              "
            >
              ◉
            </span>

            NISHAAN
          </div>

          <p
            className="
              mt-16
              max-w-md
              font-mono
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-[#A480F2]
            "
          >
            remember a clue.
            <br />
            discover a place.
          </p>

          <h2
            className="
              mt-5
              max-w-md
              text-4xl
              font-black
              leading-[0.95]
              tracking-[-0.045em]
              text-white
              md:text-5xl
            "
          >
            Find places from your{" "}

            <span
              className="
                bg-gradient-to-r
                from-[#F992AD]
                via-[#F78ECF]
                to-[#A480F2]
                bg-clip-text
                text-transparent
              "
            >
              memories.
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-sm
              text-sm
              leading-7
              text-[#8F98B8]
            "
          >
            Describe a place, speak what
            you remember or provide an
            image. Nishaan turns those
            clues into possible locations.
          </p>

          {/* INPUT METHODS */}

          <div
            className="
              mt-9
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
                item,
                index
              ) => (
                <div
                  key={item}
                  className={`
                    px-4
                    py-3
                    text-center
                    font-mono
                    text-[9px]

                    ${
                      index === 0
                        ? "bg-[#F78ECF]/10 text-[#F78ECF]"
                        : "text-[#697394]"
                    }
                  `}
                >
                  {item}
                </div>
              )
            )}
          </div>

          {/* INPUT */}

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
              py-4
            "
          >
            <span className="text-[#697394]">
              ○
            </span>

            <p
              className="
                flex-1
                text-[10px]
                text-[#697394]
              "
            >
              Describe what you
              remember...
            </p>

            <span
              className="
                flex
                h-9
                w-9
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
        </div>

        {/* RIGHT / MAP */}

        <div
          className="
            relative
            min-h-[440px]
            overflow-hidden
          "
        >
          {/* MAP PATTERN */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.13]
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
                ),
                linear-gradient(
                  28deg,
                  transparent 47%,
                  rgba(212,176,249,.25) 48%,
                  transparent 49%
                ),
                linear-gradient(
                  -33deg,
                  transparent 47%,
                  rgba(109,140,255,.18) 48%,
                  transparent 49%
                )
              `,
              backgroundSize:
                "44px 44px, 44px 44px, 115px 115px, 140px 140px",
            }}
          />

          {/* WATER */}

          <div
            className="
              absolute
              bottom-[4%]
              right-[7%]
              h-[54%]
              w-[57%]
              rotate-[-8deg]
              rounded-[48%]
              bg-[#20396D]/30
              blur-[2px]
            "
          />

          {/* RADAR */}

          <div
            className="
              absolute
              left-[54%]
              top-[55%]
              h-[220px]
              w-[220px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#F78ECF]/10
            "
          />

          <div
            className="
              absolute
              left-[54%]
              top-[55%]
              h-[140px]
              w-[140px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#F78ECF]/15
            "
          />

          {/* PIN */}

          <div
            className="
              absolute
              left-[54%]
              top-[55%]
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
                border-[#F78ECF]/15
              "
            />

            <span
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-[#F78ECF]/50
                bg-[#F78ECF]/15
                text-xl
                text-[#F78ECF]
                shadow-[0_0_45px_rgba(247,142,207,.4)]
              "
            >
              ◉
            </span>
          </div>

          {/* SMALL POINTS */}

          <span
            className="
              absolute
              left-[21%]
              top-[32%]
              h-2.5
              w-2.5
              rounded-full
              bg-[#A480F2]
              shadow-[0_0_12px_rgba(164,128,242,.8)]
            "
          />

          <span
            className="
              absolute
              right-[17%]
              top-[25%]
              h-2
              w-2
              rounded-full
              bg-[#D4B0F9]
            "
          />

          <span
            className="
              absolute
              bottom-[18%]
              left-[23%]
              h-2
              w-2
              rounded-full
              bg-[#6D8CFF]
            "
          />

          {/* MATCH RESULT */}

          <div
            className="
              absolute
              right-6
              top-7
              w-[225px]
              rounded-2xl
              border
              border-[#F78ECF]/20
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
                tracking-[0.18em]
                text-[#F78ECF]
              "
            >
              potential match
            </p>

            <p
              className="
                mt-2
                text-sm
                font-semibold
                text-white
              "
            >
              Possible location
            </p>

            <p
              className="
                mt-1
                text-[9px]
                text-[#697394]
              "
            >
              geographic result
            </p>

            <div
              className="
                mt-4
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  font-mono
                  text-[8px]
                  text-[#F78ECF]
                "
              >
                92%
              </span>

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

          <p
            className="
              absolute
              bottom-7
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
            same places.
            <br />
            new ways to find them.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   SCREENSHOT PLACEHOLDER
====================================================== */

function ScreenshotSlot({
  number,
  title,
  description,
  large = false,
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#D4B0F9]/15
        bg-[#111A36]/45
        backdrop-blur-xl

        ${
          large
            ? "min-h-[520px]"
            : "min-h-[360px]"
        }
      `}
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[#D4B0F9]/10
          px-5
          py-4
        "
      >
        <div className="flex gap-2">
          <span className="h-2 w-2 rounded-full bg-[#F992AD]" />
          <span className="h-2 w-2 rounded-full bg-[#D4B0F9]" />
          <span className="h-2 w-2 rounded-full bg-[#A480F2]" />
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
          screenshot_{number}
        </p>
      </div>

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          top-[57px]
          flex
          items-center
          justify-center
          p-7
        "
      >
        <div className="text-center">
          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-[#F78ECF]
            "
          >
            screenshot placeholder
          </p>

          <h3
            className="
              mt-3
              text-xl
              font-bold
              text-white
            "
          >
            {title}
          </h3>

          <p
            className="
              mx-auto
              mt-3
              max-w-sm
              text-sm
              leading-6
              text-[#697394]
            "
          >
            {description}
          </p>

          <p
            className="
              mt-5
              font-mono
              text-[9px]
              text-[#59627E]
            "
          >
            // image will be added here
          </p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   PAGE
====================================================== */

export default function NishaanProjectPage() {
  const workflow = [
    {
      number: "01",
      title: "Input",
      text:
        "The user provides a clue through text, voice or an image.",
    },

    {
      number: "02",
      title: "AI Analysis",
      text:
        "The input is interpreted and useful information is extracted.",
    },

    {
      number: "03",
      title: "Location Clues",
      text:
        "Relevant geographic clues are organised for the search.",
    },

    {
      number: "04",
      title: "Geospatial Search",
      text:
        "The system searches geographic data using the extracted clues.",
    },

    {
      number: "05",
      title: "Potential Match",
      text:
        "Possible locations are ranked and presented to the user.",
    },
  ];

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-[#0E1630]
        text-[#F8F7FF]
      "
    >
      {/* =================================================
          GLOBAL BACKGROUND
      ================================================= */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          overflow-hidden
        "
      >
        <div className="absolute inset-0 bg-[#0E1630]" />

        <div
          className="
            absolute
            -left-44
            -top-44
            h-[650px]
            w-[650px]
            rounded-full
            bg-[#F78ECF]/10
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            -right-52
            top-[22%]
            h-[750px]
            w-[750px]
            rounded-full
            bg-[#A480F2]/10
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.05]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(212,176,249,.30) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(212,176,249,.30) 1px,
                transparent 1px
              )
            `,
            backgroundSize:
              "52px 52px",
          }}
        />
      </div>

      {/* =================================================
          NAV
      ================================================= */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#D4B0F9]/10
          bg-[#0E1630]/75
          backdrop-blur-2xl
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            items-center
            justify-between
            px-6
            py-4
            lg:px-12
          "
        >
          <Link
            href="/portfolio#projects"
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#AEB7D5]
              transition
              hover:text-white
            "
          >
            ← Back to Portfolio
          </Link>

          <p
            className="
              font-mono
              text-[10px]
              tracking-[0.16em]
              text-[#697394]
            "
          >
            project / 01
          </p>
        </div>
      </header>

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          px-6
          pb-28
          pt-20
          lg:px-12
          lg:pt-28
        "
      >
        <div
          className="
            grid
            items-end
            gap-14
            lg:grid-cols-[0.72fr_1.28fr]
          "
        >
          {/* HERO COPY */}

          <div>
            <SectionNumber
              number="01"
              label="Featured Project"
            />

            <p
              className="
                mb-6
                font-mono
                text-sm
                text-[#A480F2]
              "
            >
              &gt; project.open(&quot;nishaan&quot;)
            </p>

            <h1
              className="
                text-[clamp(4rem,8vw,8.5rem)]
                font-black
                uppercase
                leading-[0.8]
                tracking-[-0.075em]
                text-white
              "
            >
              Nishaan
              <span className="text-[#F78ECF]">
                _
              </span>
            </h1>

            <h2
              className="
                mt-8
                max-w-xl
                text-2xl
                font-semibold
                leading-tight
                text-[#D4B0F9]
                md:text-3xl
              "
            >
              AI-Powered Geospatial
              Location Identification
            </h2>

            <p
              className="
                mt-7
                max-w-xl
                text-base
                leading-8
                text-[#AEB7D5]
              "
            >
              A system designed to help
              people identify places from
              incomplete memories using
              text, voice and image clues.
            </p>

            <div
              className="
                mt-9
                flex
                flex-wrap
                gap-3
              "
            >
              <TechPill>
                Next.js
              </TechPill>

              <TechPill>
                FastAPI
              </TechPill>

              <TechPill>
                AI
              </TechPill>

              <TechPill>
                PostGIS
              </TechPill>

              <TechPill>
                Leaflet
              </TechPill>
            </div>

            <div
              className="
                mt-10
                flex
                flex-wrap
                gap-4
              "
            >
              <a
                href="https://github.com/emaanfatima312005-wq"
                target="_blank"
                rel="noreferrer"
                className="
                  rounded-xl
                  border
                  border-[#F78ECF]/60
                  bg-[#F78ECF]/10
                  px-6
                  py-3.5
                  font-mono
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#FBBCEE]
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#F78ECF]/15
                "
              >
                GitHub ↗
              </a>

              <Link
                href="/portfolio#projects"
                className="
                  rounded-xl
                  border
                  border-[#D4B0F9]/20
                  px-6
                  py-3.5
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-[#AEB7D5]
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#D4B0F9]/50
                  hover:text-white
                "
              >
                All Projects
              </Link>
            </div>
          </div>

          {/* HERO PROJECT MOCKUP */}

          <NishaanHeroVisual />
        </div>
      </section>

      {/* =================================================
          PROJECT OVERVIEW
      ================================================= */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          border-t
          border-[#D4B0F9]/10
          px-6
          py-28
          lg:px-12
        "
      >
        <SectionNumber
          number="02"
          label="Project Overview"
        />

        <div
          className="
            grid
            gap-14
            lg:grid-cols-[0.8fr_1.2fr]
          "
        >
          <h2
            className="
              max-w-xl
              text-5xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.05em]
              text-white
              md:text-7xl
            "
          >
            From a memory
            <br />

            <span
              className="
                bg-gradient-to-r
                from-[#F992AD]
                via-[#F78ECF]
                to-[#A480F2]
                bg-clip-text
                text-transparent
              "
            >
              to a place.
            </span>
          </h2>

          <div
            className="
              max-w-2xl
              space-y-6
              text-base
              leading-8
              text-[#AEB7D5]
            "
          >
            <p>
              Sometimes people remember a
              location without knowing its
              name. They may remember a
              landmark, a street colour, a
              nearby building, an image or
              simply a detail from the
              surrounding environment.
            </p>

            <p>
              Nishaan explores how those
              incomplete memories can be
              transformed into useful
              geographic clues and searched
              against location data.
            </p>

            <p>
              The goal is not just to search
              for a place by name, but to
              search using the fragments of
              information a person actually
              remembers.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          HOW IT WORKS
      ================================================= */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          border-t
          border-[#D4B0F9]/10
          px-6
          py-28
          lg:px-12
        "
      >
        <SectionNumber
          number="03"
          label="How It Works"
        />

        <h2
          className="
            max-w-4xl
            text-5xl
            font-black
            uppercase
            leading-[0.9]
            tracking-[-0.05em]
            text-white
            md:text-7xl
          "
        >
          From clue
          <br />

          <span className="text-[#F78ECF]">
            to coordinates.
          </span>
        </h2>

        <div
          className="
            relative
            mt-20
          "
        >
          {/* LINE */}

          <div
            className="
              absolute
              left-0
              right-0
              top-[29px]
              hidden
              h-px
              bg-gradient-to-r
              from-[#F78ECF]
              via-[#A480F2]
              to-[#6D8CFF]
              md:block
            "
          />

          <div
            className="
              grid
              gap-12
              md:grid-cols-5
            "
          >
            {workflow.map(
              (
                step
              ) => (
                <div
                  key={
                    step.number
                  }
                  className="relative"
                >
                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-[58px]
                      w-[58px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#F78ECF]/40
                      bg-[#0E1630]
                      font-mono
                      text-[10px]
                      text-[#F78ECF]
                      shadow-[0_0_25px_rgba(247,142,207,.12)]
                    "
                  >
                    {step.number}
                  </div>

                  <h3
                    className="
                      mt-7
                      text-lg
                      font-bold
                      text-white
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-[#7F89A9]
                    "
                  >
                    {step.text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          SCREENSHOTS
      ================================================= */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          border-t
          border-[#D4B0F9]/10
          px-6
          py-28
          lg:px-12
        "
      >
        <SectionNumber
          number="04"
          label="Interface"
        />

        <div
          className="
            flex
            flex-col
            gap-7
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <h2
            className="
              text-5xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.05em]
              text-white
              md:text-7xl
            "
          >
            Inside
            <br />

            <span className="text-[#D4B0F9]">
              Nishaan.
            </span>
          </h2>

          <p
            className="
              max-w-md
              text-sm
              leading-7
              text-[#8F98B8]
            "
          >
            We&apos;ll replace these
            placeholders with your real
            Nishaan screenshots once you
            send them.
          </p>
        </div>

        <div
          className="
            mt-16
            grid
            gap-6
          "
        >
          <ScreenshotSlot
            number="01"
            title="Main Search Experience"
            description="The primary interface where users provide the location clues they remember."
            large
          />

          <div
            className="
              grid
              gap-6
              lg:grid-cols-2
            "
          >
            <ScreenshotSlot
              number="02"
              title="AI Analysis"
              description="The stage where remembered details are interpreted and transformed into useful clues."
            />

            <ScreenshotSlot
              number="03"
              title="Location Results"
              description="Potential geographic matches and the final interactive map experience."
            />
          </div>
        </div>
      </section>

      {/* =================================================
          MY ROLE + TECHNOLOGY
      ================================================= */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          border-t
          border-[#D4B0F9]/10
          px-6
          py-28
          lg:px-12
        "
      >
        <SectionNumber
          number="05"
          label="Development"
        />

        <div
          className="
            grid
            gap-16
            lg:grid-cols-2
          "
        >
          {/* ROLE */}

          <div>
            <p
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#F78ECF]
              "
            >
              // my role
            </p>

            <h2
              className="
                mt-5
                text-4xl
                font-black
                uppercase
                tracking-[-0.045em]
                text-white
                md:text-5xl
              "
            >
              Designing the experience.
              <br />
              Building the system.
            </h2>

            <div
              className="
                mt-8
                space-y-4
                text-sm
                leading-7
                text-[#AEB7D5]
              "
            >
              <p>
                The project involved
                designing the user
                experience around incomplete
                memories rather than normal
                location searches.
              </p>

              <p>
                This meant thinking through
                how text, voice and image
                input could move through AI
                analysis, clue extraction and
                geospatial matching while
                remaining understandable to
                the user.
              </p>
            </div>
          </div>

          {/* STACK */}

          <div
            className="
              rounded-[28px]
              border
              border-[#D4B0F9]/15
              bg-[#111A36]/45
              p-7
              backdrop-blur-xl
              md:p-9
            "
          >
            <p
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#A480F2]
              "
            >
              // technology stack
            </p>

            <div
              className="
                mt-8
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              {[
                [
                  "Frontend",
                  "Next.js",
                ],
                [
                  "Backend",
                  "FastAPI",
                ],
                [
                  "AI",
                  "AI Analysis",
                ],
                [
                  "Geospatial DB",
                  "PostGIS",
                ],
                [
                  "Mapping",
                  "Leaflet",
                ],
                [
                  "Location Data",
                  "OpenStreetMap",
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    key={label}
                    className="
                      rounded-2xl
                      border
                      border-[#D4B0F9]/10
                      bg-[#0E1630]/45
                      p-5
                    "
                  >
                    <p
                      className="
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.17em]
                        text-[#697394]
                      "
                    >
                      {label}
                    </p>

                    <p
                      className="
                        mt-2
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {value}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          LEARNING
      ================================================= */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          border-t
          border-[#D4B0F9]/10
          px-6
          py-28
          lg:px-12
        "
      >
        <SectionNumber
          number="06"
          label="Reflection"
        />

        <div
          className="
            grid
            gap-14
            lg:grid-cols-[0.8fr_1.2fr]
          "
        >
          <h2
            className="
              text-5xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.05em]
              text-white
              md:text-7xl
            "
          >
            What I
            <br />

            <span
              className="
                bg-gradient-to-r
                from-[#F992AD]
                to-[#A480F2]
                bg-clip-text
                text-transparent
              "
            >
              learned.
            </span>
          </h2>

          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
            "
          >
            {[
              "Designing interfaces around uncertain user input.",

              "Connecting AI-generated information with real application workflows.",

              "Working with geospatial concepts and location data.",

              "Turning a complex technical idea into a user-friendly experience.",
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={item}
                  className="
                    rounded-2xl
                    border
                    border-[#D4B0F9]/12
                    bg-[#111A36]/35
                    p-5
                  "
                >
                  <p
                    className="
                      font-mono
                      text-[9px]
                      text-[#F78ECF]
                    "
                  >
                    0{index + 1}
                  </p>

                  <p
                    className="
                      mt-4
                      text-sm
                      leading-6
                      text-[#B8C0DC]
                    "
                  >
                    {item}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          border-t
          border-[#D4B0F9]/10
          px-6
          py-24
          lg:px-12
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-[#F78ECF]/20
            bg-[#111A36]/55
            px-7
            py-14
            text-center
            backdrop-blur-xl
            md:px-12
            md:py-20
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[420px]
              w-[600px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#F78ECF]/10
              blur-[120px]
            "
          />

          <div className="relative z-10">
            <p
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-[#A480F2]
              "
            >
              project_01.complete
            </p>

            <h2
              className="
                mt-5
                text-4xl
                font-black
                uppercase
                tracking-[-0.05em]
                text-white
                md:text-6xl
              "
            >
              Nishaan
              <span className="text-[#F78ECF]">
                _
              </span>
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-xl
                text-sm
                leading-7
                text-[#8F98B8]
              "
            >
              A project exploring how AI,
              human memory and geospatial
              technology can work together
              to solve a very human problem.
            </p>

            <div
              className="
                mt-9
                flex
                flex-wrap
                justify-center
                gap-4
              "
            >
              <a
                href="https://github.com/emaanfatima312005-wq"
                target="_blank"
                rel="noreferrer"
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-[#F78ECF]
                  to-[#A480F2]
                  px-7
                  py-3.5
                  font-mono
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#0E1630]
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_0_35px_rgba(247,142,207,.3)]
                "
              >
                GitHub ↗
              </a>

              <Link
                href="/portfolio#projects"
                className="
                  rounded-xl
                  border
                  border-[#D4B0F9]/25
                  px-7
                  py-3.5
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-white
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#D4B0F9]/55
                "
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