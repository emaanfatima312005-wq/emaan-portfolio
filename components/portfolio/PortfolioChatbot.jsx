"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

/* ======================================================
   STARTER QUESTIONS
====================================================== */

const starterQuestions = [
  "What projects has Emaan built?",
  "What technologies does she use?",
  "Tell me about Nishaan",
  "What experience does she have?",
];

/* ======================================================
   TINY CHAT ROBOT
====================================================== */

function TinyChatRobot() {
  const headRef = useRef(null);
  const frameRef = useRef(null);

  const [eyeOffset, setEyeOffset] = useState({
    x: 0,
    y: 0,
  });

  /* ======================================================
     EYES FOLLOW THE MOUSE
  ====================================================== */

  useEffect(() => {
    function handleMouseMove(event) {
      if (!headRef.current) return;

      cancelAnimationFrame(
        frameRef.current
      );

      frameRef.current =
        requestAnimationFrame(() => {
          if (!headRef.current) return;

          const rect =
            headRef.current.getBoundingClientRect();

          const centerX =
            rect.left +
            rect.width / 2;

          const centerY =
            rect.top +
            rect.height / 2;

          const deltaX =
            event.clientX -
            centerX;

          const deltaY =
            event.clientY -
            centerY;

          const angle =
            Math.atan2(
              deltaY,
              deltaX
            );

          const distance =
            Math.hypot(
              deltaX,
              deltaY
            );

          const movement =
            Math.min(
              2.1,
              distance / 110
            );

          setEyeOffset({
            x:
              Math.cos(angle) *
              movement,

            y:
              Math.sin(angle) *
              movement,
          });
        });
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(
        frameRef.current
      );
    };
  }, []);

  return (
    <>
      {/* =================================================
          ROBOT HEAD + BODY BEHIND INPUT BAR
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          right-[66px]
          top-[1px]
          z-0
          h-[46px]
          w-[44px]
        "
        aria-hidden="true"
      >
        <div className="tiny-chat-robot relative h-full w-full">
          {/* ANTENNA */}

          <span
            className="
              absolute
              left-1/2
              top-[-7px]
              h-[9px]
              w-[2px]
              -translate-x-1/2
              rounded-full
              bg-[#A480F2]
            "
          />

          <span
            className="
              robot-antenna-light
              absolute
              left-1/2
              top-[-11px]
              h-[7px]
              w-[7px]
              -translate-x-1/2
              rounded-full
              bg-[#F78ECF]
              shadow-[0_0_9px_rgba(247,142,207,.95)]
            "
          />

          {/* EARS */}

          <span
            className="
              absolute
              left-[1px]
              top-[11px]
              h-[11px]
              w-[4px]
              rounded-l-full
              border
              border-[#A480F2]/45
              bg-[#111A36]
            "
          />

          <span
            className="
              absolute
              right-[1px]
              top-[11px]
              h-[11px]
              w-[4px]
              rounded-r-full
              border
              border-[#A480F2]/45
              bg-[#111A36]
            "
          />

          {/* =================================================
              HEAD
          ================================================= */}

          <div
            ref={headRef}
            className="
              absolute
              left-1/2
              top-[3px]
              h-[30px]
              w-[36px]
              -translate-x-1/2
              overflow-hidden
              rounded-[11px]
              border
              border-[#D4B0F9]/45
              bg-[#101936]
              shadow-[0_7px_17px_rgba(0,0,0,.32),0_0_14px_rgba(164,128,242,.16)]
            "
          >
            {/* FACE SCREEN */}

            <div
              className="
                absolute
                inset-[4px]
                rounded-[7px]
                border
                border-[#A480F2]/20
                bg-[#080F26]
              "
            />

            {/* FACE GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                -right-2
                -top-2
                h-6
                w-6
                rounded-full
                bg-[#F78ECF]/10
                blur-[9px]
              "
            />

            {/* LEFT EYE */}

            <span
              className="
                robot-eye
                absolute
                left-[7px]
                top-[9px]
                flex
                h-[8px]
                w-[8px]
                items-center
                justify-center
                rounded-full
                bg-[#F8F7FF]
                shadow-[0_0_6px_rgba(247,142,207,.6)]
              "
            >
              <span
                className="
                  h-[4px]
                  w-[4px]
                  rounded-full
                  bg-[#21162F]
                "
                style={{
                  transform: `
                    translate(
                      ${eyeOffset.x}px,
                      ${eyeOffset.y}px
                    )
                  `,
                }}
              />
            </span>

            {/* RIGHT EYE */}

            <span
              className="
                robot-eye
                absolute
                right-[7px]
                top-[9px]
                flex
                h-[8px]
                w-[8px]
                items-center
                justify-center
                rounded-full
                bg-[#F8F7FF]
                shadow-[0_0_6px_rgba(164,128,242,.6)]
              "
            >
              <span
                className="
                  h-[4px]
                  w-[4px]
                  rounded-full
                  bg-[#21162F]
                "
                style={{
                  transform: `
                    translate(
                      ${eyeOffset.x}px,
                      ${eyeOffset.y}px
                    )
                  `,
                }}
              />
            </span>

            {/* SMILE */}

            <span
              className="
                absolute
                left-1/2
                top-[21px]
                h-[3px]
                w-[8px]
                -translate-x-1/2
                rounded-b-full
                border-b
                border-[#D4B0F9]/80
              "
            />
          </div>

          {/* =================================================
              BODY — GOES BEHIND INPUT BAR
          ================================================= */}

          <div
            className="
              absolute
              left-1/2
              top-[29px]
              h-[19px]
              w-[21px]
              -translate-x-1/2
              rounded-b-[8px]
              border
              border-t-0
              border-[#D4B0F9]/30
              bg-[#111A36]
            "
          >
            <span
              className="
                absolute
                left-1/2
                top-[5px]
                h-[4px]
                w-[4px]
                -translate-x-1/2
                rounded-full
                bg-[#F78ECF]
                shadow-[0_0_7px_rgba(247,142,207,.65)]
              "
            />
          </div>
        </div>
      </div>

      {/* =================================================
          ARMS + HANDS IN FRONT OF INPUT BAR
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          right-[62px]
          top-[23px]
          z-30
          h-[18px]
          w-[52px]
        "
        aria-hidden="true"
      >
        {/* LEFT ARM */}

        <span
          className="
            absolute
            left-[7px]
            top-0
            h-[12px]
            w-[3px]
            rotate-[20deg]
            rounded-full
            bg-[#A480F2]
          "
        />

        {/* RIGHT ARM */}

        <span
          className="
            absolute
            right-[7px]
            top-0
            h-[12px]
            w-[3px]
            rotate-[-20deg]
            rounded-full
            bg-[#A480F2]
          "
        />

        {/* LEFT HAND */}

        <span
          className="
            absolute
            left-[4px]
            top-[9px]
            h-[6px]
            w-[8px]
            rounded-full
            bg-[#D4B0F9]
            shadow-[0_0_5px_rgba(212,176,249,.45)]
          "
        />

        {/* RIGHT HAND */}

        <span
          className="
            absolute
            right-[4px]
            top-[9px]
            h-[6px]
            w-[8px]
            rounded-full
            bg-[#D4B0F9]
            shadow-[0_0_5px_rgba(212,176,249,.45)]
          "
        />
      </div>
    </>
  );
}

/* ======================================================
   PORTFOLIO CHATBOT
====================================================== */

export default function PortfolioChatbot() {
  const [open, setOpen] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        role: "assistant",
        content:
          "Hi! I'm Emaan's portfolio assistant. Ask me about her projects, skills, experience or work.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const bottomRef =
    useRef(null);

  /* ======================================================
     AUTO SCROLL
  ====================================================== */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* ======================================================
     SEND MESSAGE
  ====================================================== */

  async function sendMessage(text) {
    const cleanText =
      text.trim();

    if (!cleanText || loading) {
      return;
    }

    const userMessage = {
      role: "user",
      content: cleanText,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(
      updatedMessages
    );

    setInput("");

    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/portfolio-chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              messages:
                updatedMessages.slice(
                  -10
                ),
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Chat request failed"
        );
      }

      setMessages(
        (current) => [
          ...current,

          {
            role: "assistant",
            content:
              data.reply,
          },
        ]
      );
    } catch (error) {
      console.error(
        "Portfolio chatbot:",
        error
      );

      setMessages(
        (current) => [
          ...current,

          {
            role: "assistant",

            content:
              "I couldn't connect right now. Please try again in a moment.",
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  }

  /* ======================================================
     SUBMIT
  ====================================================== */

  function handleSubmit(event) {
    event.preventDefault();

    sendMessage(input);
  }

  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-[9000]
        font-sans
      "
    >
      {/* =================================================
          CHAT WINDOW
      ================================================= */}

      <div
        className={`
          absolute
          bottom-[78px]
          right-0

          w-[calc(100vw-32px)]
          max-w-[420px]

          origin-bottom-right

          overflow-hidden

          rounded-[28px]

          border
          border-[#D4B0F9]/25

          bg-[#0E1630]/95

          shadow-[0_30px_100px_rgba(0,0,0,.50),0_0_60px_rgba(164,128,242,.16)]

          backdrop-blur-2xl

          transition-all
          duration-300

          ${
            open
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-5 scale-95 opacity-0"
          }
        `}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            relative
            overflow-hidden
            border-b
            border-[#D4B0F9]/15
            px-5
            py-4
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-40
              w-40
              rounded-full
              bg-[#F78ECF]/20
              blur-[60px]
            "
          />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* ICON */}

              <div
                className="
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[14px]
                  border
                  border-[#F78ECF]/30
                  bg-gradient-to-br
                  from-[#F78ECF]/10
                  to-[#A480F2]/10
                  text-[#F78ECF]
                  shadow-[0_0_25px_rgba(247,142,207,.12)]
                "
              >
                ✦

                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    h-2
                    w-2
                    rounded-full
                    bg-[#D4B0F9]
                    shadow-[0_0_9px_#D4B0F9]
                  "
                />
              </div>

              <div>
                <p className="text-[14px] font-semibold text-white">
                  Emaan.dev / Guide
                </p>

                <p
                  className="
                    mt-1
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                    text-[#8F98B8]
                  "
                >
                  projects • skills • experience
                </p>
              </div>
            </div>

            {/* CLOSE */}

            <button
              type="button"
              aria-label="Close portfolio guide"
              onClick={() =>
                setOpen(false)
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#D4B0F9]/15
                text-[#AEB7D5]
                transition
                duration-300
                hover:rotate-90
                hover:border-[#F78ECF]/50
                hover:text-white
              "
            >
              ×
            </button>
          </div>
        </div>

        {/* =================================================
            MESSAGES
        ================================================= */}

        <div
          className="
            h-[220px]
            overflow-y-auto
            px-4
            py-4
            sm:h-[240px]
            [scrollbar-width:thin]
            [scrollbar-color:#A480F2_#111A36]
          "
        >
          <div
            className="space-y-4"
            aria-live="polite"
          >
            {messages.map(
              (
                message,
                index
              ) => {
                const isUser =
                  message.role ===
                  "user";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`
                      flex
                      ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >
                    <div
                      className={`
                        max-w-[82%]
                        rounded-[18px]
                        px-4
                        py-3
                        text-[13px]
                        leading-6

                        ${
                          isUser
                            ? `
                                rounded-br-md
                                bg-gradient-to-br
                                from-[#F78ECF]
                                to-[#A480F2]
                                text-[#0E1630]
                              `
                            : `
                                rounded-bl-md
                                border
                                border-[#D4B0F9]/15
                                bg-[#111A36]/75
                                text-[#DCE1F4]
                              `
                        }
                      `}
                    >
                      {
                        message.content
                      }
                    </div>
                  </div>
                );
              }
            )}

            {/* TYPING */}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-[18px]
                    rounded-bl-md
                    border
                    border-[#D4B0F9]/15
                    bg-[#111A36]/75
                    px-4
                    py-4
                  "
                >
                  {[0, 1, 2].map(
                    (dot) => (
                      <span
                        key={dot}
                        className="
                          chatbot-thinking-dot
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-[#D4B0F9]
                        "
                        style={{
                          animationDelay:
                            `${dot * 160}ms`,
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            <div
              ref={bottomRef}
            />
          </div>
        </div>

        {/* =================================================
            STARTER QUESTIONS
        ================================================= */}

        {messages.length === 1 && (
          <div
            className="
              border-t
              border-[#D4B0F9]/10
              px-4
              py-3
            "
          >
            <p
              className="
                mb-2
                font-mono
                text-[8px]
                uppercase
                tracking-[0.16em]
                text-[#697394]
              "
            >
              Try asking
            </p>

            <div className="grid grid-cols-2 gap-2">
              {starterQuestions.map(
                (question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() =>
                      sendMessage(
                        question
                      )
                    }
                    className="
                      min-h-[38px]
                      rounded-[13px]
                      border
                      border-[#A480F2]/25
                      bg-[#A480F2]/5
                      px-3
                      py-2
                      text-left
                      text-[9px]
                      leading-4
                      text-[#C7CDE2]
                      transition
                      duration-300
                      hover:-translate-y-[1px]
                      hover:border-[#F78ECF]/50
                      hover:bg-[#F78ECF]/10
                      hover:text-white
                    "
                  >
                    {question}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* =================================================
            INPUT + ROBOT
        ================================================= */}

        <form
          onSubmit={
            handleSubmit
          }
          className="
            relative
            border-t
            border-[#D4B0F9]/15
            bg-[#0B1228]/80
            px-4
            pb-4
            pt-7
          "
        >
          <TinyChatRobot />

          {/* INPUT BAR */}

          <div
            className="
              relative
              z-10
              flex
              items-center
              gap-2
              rounded-[18px]
              border
              border-[#D4B0F9]/20
              bg-[#111A36]/95
              p-2
              shadow-[inset_0_1px_0_rgba(255,255,255,.025)]
              transition
              focus-within:border-[#F78ECF]/60
              focus-within:shadow-[0_0_26px_rgba(247,142,207,.11)]
            "
          >
            <input
              value={input}
              onChange={(
                event
              ) =>
                setInput(
                  event.target.value
                )
              }
              placeholder="Ask about my work..."
              maxLength={500}
              aria-label="Ask about Emaan's portfolio"
              className="
                min-w-0
                flex-1
                bg-transparent
                px-3
                py-2
                text-sm
                text-white
                outline-none
                placeholder:text-[#697394]
              "
            />

            <button
              type="submit"
              disabled={
                loading ||
                !input.trim()
              }
              aria-label="Send message"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-[#F78ECF]
                to-[#A480F2]
                text-[#0E1630]
                shadow-[0_7px_20px_rgba(164,128,242,.22)]
                transition
                duration-300
                hover:scale-105
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              ↑
            </button>
          </div>

          <p
            className="
              mt-2
              text-center
              font-mono
              text-[7px]
              uppercase
              tracking-[0.18em]
              text-[#59627E]
            "
          >
            ask about projects • skills • experience
          </p>
        </form>
      </div>

      {/* =================================================
          FLOATING LAUNCHER
      ================================================= */}

      <button
        type="button"
        aria-label={
          open
            ? "Close portfolio guide"
            : "Open portfolio guide"
        }
        onClick={() =>
          setOpen(
            (current) =>
              !current
          )
        }
        className={`
          portfolio-chat-launcher
          group
          relative
          flex
          h-[64px]
          items-center
          overflow-hidden
          rounded-[22px]
          border
          border-[#D4B0F9]/25
          bg-[#0E1630]/90
          shadow-[0_18px_55px_rgba(0,0,0,.42),0_0_35px_rgba(164,128,242,.10)]
          backdrop-blur-2xl
          transition-all
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]
          hover:-translate-y-1
          hover:border-[#F78ECF]/55

          ${
            open
              ? "w-[64px] justify-center px-0"
              : "w-[205px] px-4"
          }
        `}
      >
        {/* SHEEN */}

        <span
          className="
            portfolio-chat-sheen
            pointer-events-none
            absolute
            -left-[60%]
            top-0
            h-full
            w-[45%]
            rotate-[18deg]
            bg-gradient-to-r
            from-transparent
            via-[#F78ECF]/20
            to-transparent
            blur-md
          "
        />

        {/* GLOW */}

        <span
          className="
            pointer-events-none
            absolute
            -bottom-10
            -left-4
            h-24
            w-24
            rounded-full
            bg-[#A480F2]/15
            blur-[35px]
            transition-all
            duration-500
            group-hover:bg-[#F78ECF]/20
          "
        />

        {open ? (
          <span
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#D4B0F9]/20
              font-mono
              text-xl
              font-light
              text-white
              transition
              duration-300
              group-hover:rotate-90
              group-hover:border-[#F78ECF]/50
              group-hover:text-[#F78ECF]
            "
          >
            ×
          </span>
        ) : (
          <>
            {/* ICON */}

            <div
              className="
                relative
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-[14px]
                border
                border-[#F78ECF]/30
                bg-gradient-to-br
                from-[#F78ECF]/10
                to-[#A480F2]/10
                shadow-[0_0_24px_rgba(247,142,207,.10)]
              "
            >
              <span
                className="
                  portfolio-chat-star
                  text-lg
                  text-[#F78ECF]
                  drop-shadow-[0_0_8px_rgba(247,142,207,.8)]
                "
              >
                ✦
              </span>

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-[8px]
                  w-[8px]
                  rounded-full
                  border-2
                  border-[#0E1630]
                  bg-[#D4B0F9]
                  shadow-[0_0_9px_#D4B0F9]
                "
              />
            </div>

            {/* TEXT */}

            <div className="relative ml-3 min-w-0 text-left">
              <div className="flex items-center gap-2">
                <span
                  className="
                    whitespace-nowrap
                    text-[13px]
                    font-semibold
                    tracking-[-0.01em]
                    text-white
                  "
                >
                  Ask Emaan.dev
                </span>

                <span
                  className="
                    text-xs
                    text-[#F78ECF]
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                >
                  ↗
                </span>
              </div>

              <p
                className="
                  mt-[3px]
                  whitespace-nowrap
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.16em]
                  text-[#7F89A9]
                "
              >
                portfolio guide
              </p>
            </div>
          </>
        )}
      </button>

      {/* =================================================
          ANIMATIONS
      ================================================= */}

      <style>{`
        @keyframes portfolioChatSheen {
          0% {
            transform:
              translateX(-180%)
              rotate(18deg);
          }

          55%,
          100% {
            transform:
              translateX(650%)
              rotate(18deg);
          }
        }

        @keyframes portfolioChatStar {
          0%,
          100% {
            transform:
              scale(1)
              rotate(0deg);

            opacity: .8;
          }

          50% {
            transform:
              scale(1.18)
              rotate(10deg);

            opacity: 1;
          }
        }

        @keyframes chatbotThinking {
          0%,
          80%,
          100% {
            opacity: .25;

            transform:
              translateY(0);
          }

          40% {
            opacity: 1;

            transform:
              translateY(-4px);
          }
        }

        @keyframes tinyRobotFloat {
          0%,
          100% {
            transform:
              translateY(0px)
              rotate(-1.5deg);
          }

          50% {
            transform:
              translateY(-2px)
              rotate(1.5deg);
          }
        }

        @keyframes robotAntennaPulse {
          0%,
          100% {
            opacity: .65;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes robotBlink {
          0%,
          45%,
          48%,
          100% {
            transform:
              scaleY(1);
          }

          46% {
            transform:
              scaleY(.12);
          }
        }

        .portfolio-chat-launcher:hover
        .portfolio-chat-sheen {
          animation:
            portfolioChatSheen
            1.6s
            ease
            forwards;
        }

        .portfolio-chat-star {
          animation:
            portfolioChatStar
            3.2s
            ease-in-out
            infinite;
        }

        .chatbot-thinking-dot {
          animation:
            chatbotThinking
            1.15s
            ease-in-out
            infinite;
        }

        .tiny-chat-robot {
          transform-origin:
            50% 100%;

          animation:
            tinyRobotFloat
            3.6s
            ease-in-out
            infinite;
        }

        .robot-antenna-light {
          animation:
            robotAntennaPulse
            2.4s
            ease-in-out
            infinite;
        }

        .robot-eye {
          transform-origin:
            center;

          animation:
            robotBlink
            5.2s
            ease-in-out
            infinite;
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .portfolio-chat-star,
          .portfolio-chat-sheen,
          .chatbot-thinking-dot,
          .tiny-chat-robot,
          .robot-antenna-light,
          .robot-eye {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}