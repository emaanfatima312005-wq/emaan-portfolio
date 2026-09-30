"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const starterQuestions = [
  "What projects has Emaan built?",
  "What technologies does she use?",
  "Tell me about Nishaan",
  "What experience does she have?",
];

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] =
    useState([
      {
        role: "assistant",
        content:
          "Hi! I'm Emaan's portfolio assistant. Ask me about her projects, skills, experience or work.",
      },
    ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] =
    useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text) {
    const cleanText = text.trim();

    if (!cleanText || loading) return;

    const userMessage = {
      role: "user",
      content: cleanText,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/portfolio-chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            messages:
              updatedMessages.slice(-10),
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

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I couldn't connect right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

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
      {/* ===============================
          CHAT WINDOW
      =============================== */}

      <div
        className={`
          absolute
          bottom-[78px]
          right-0

          w-[calc(100vw-32px)]
          max-w-[390px]

          origin-bottom-right

          overflow-hidden
          rounded-[28px]

          border
          border-[#D4B0F9]/25

          bg-[#0E1630]/95

          shadow-[
            0_30px_100px_rgba(0,0,0,.50),
            0_0_60px_rgba(164,128,242,.16)
          ]

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
        {/* ===============================
            HEADER
        =============================== */}

        <div
          className="
            relative
            overflow-hidden
            border-b
            border-[#D4B0F9]/15
            px-5
            py-5
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
              {/* AI INDICATOR */}

              <div
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#F78ECF]/40
                  bg-[#F78ECF]/10
                  font-mono
                  text-[11px]
                  font-bold
                  text-[#FBBCEE]
                  shadow-[0_0_25px_rgba(247,142,207,.18)]
                "
              >
                AI

                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    h-2.5
                    w-2.5
                    rounded-full
                    border-2
                    border-[#0E1630]
                    bg-[#F78ECF]
                    shadow-[0_0_10px_#F78ECF]
                  "
                />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Ask about Emaan
                </p>

                <p
                  className="
                    mt-1
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.14em]
                    text-[#8F98B8]
                  "
                >
                  portfolio_assistant.online
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close portfolio chatbot"
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
                hover:border-[#F78ECF]/50
                hover:text-white
              "
            >
              ×
            </button>
          </div>
        </div>

        {/* ===============================
            MESSAGES
        =============================== */}

        <div
          className="
            h-[390px]
            overflow-y-auto
            px-4
            py-5
            [scrollbar-width:thin]
            [scrollbar-color:#A480F2_#111A36]
          "
        >
          <div className="space-y-4">
            {messages.map(
              (message, index) => {
                const user =
                  message.role ===
                  "user";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`
                      flex
                      ${
                        user
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >
                    <div
                      className={`
                        max-w-[85%]
                        rounded-[20px]
                        px-4
                        py-3
                        text-sm
                        leading-6

                        ${
                          user
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
                      {message.content}
                    </div>
                  </div>
                );
              }
            )}

            {/* TYPING INDICATOR */}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-[20px]
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

            <div ref={bottomRef} />
          </div>
        </div>

        {/* ===============================
            STARTER QUESTIONS
        =============================== */}

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

            <div className="flex flex-wrap gap-2">
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
                      rounded-full
                      border
                      border-[#A480F2]/25
                      bg-[#A480F2]/5
                      px-3
                      py-2
                      text-left
                      text-[10px]
                      text-[#C7CDE2]
                      transition
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

        {/* ===============================
            INPUT
        =============================== */}

        <form
          onSubmit={handleSubmit}
          className="
            border-t
            border-[#D4B0F9]/15
            bg-[#0B1228]/70
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-[#D4B0F9]/20
              bg-[#111A36]/80
              p-2
              transition
              focus-within:border-[#F78ECF]/55
              focus-within:shadow-[0_0_25px_rgba(247,142,207,.10)]
            "
          >
            <input
              value={input}
              onChange={(event) =>
                setInput(
                  event.target.value
                )
              }
              placeholder="Ask about my work..."
              maxLength={500}
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
                transition
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
              text-[8px]
              uppercase
              tracking-[0.12em]
              text-[#59627E]
            "
          >
            Ask about projects • skills • experience
          </p>
        </form>
      </div>

      {/* ===============================
          FLOATING BUTTON
      =============================== */}

      <button
        type="button"
        aria-label={
          open
            ? "Close portfolio assistant"
            : "Open portfolio assistant"
        }
        onClick={() =>
          setOpen((current) => !current)
        }
        className="
          group
          relative

          flex
          h-[62px]
          w-[62px]
          items-center
          justify-center

          overflow-hidden
          rounded-full

          border
          border-[#F78ECF]/55

          bg-[#111A36]/90

          shadow-[
            0_15px_45px_rgba(0,0,0,.35),
            0_0_30px_rgba(247,142,207,.22)
          ]

          backdrop-blur-2xl

          transition-all
          duration-300

          hover:scale-110
          hover:border-[#F78ECF]
          hover:shadow-[
            0_15px_45px_rgba(0,0,0,.35),
            0_0_45px_rgba(247,142,207,.40)
          ]
        "
      >
        {/* GLOW */}

        <span
          className="
            absolute
            inset-1
            rounded-full
            bg-gradient-to-br
            from-[#F78ECF]/20
            via-[#A480F2]/20
            to-[#6D8CFF]/10
            blur-md
          "
        />

        <span
          className="
            relative
            font-mono
            text-[12px]
            font-bold
            tracking-[0.08em]
            text-white
          "
        >
          {open ? "×" : "AI"}
        </span>

        {!open && (
          <span
            className="
              absolute
              right-1
              top-1
              h-2.5
              w-2.5
              animate-pulse
              rounded-full
              bg-[#F78ECF]
              shadow-[0_0_12px_#F78ECF]
            "
          />
        )}
      </button>

      <style>{`
        @keyframes chatbotThinking {
          0%, 80%, 100% {
            opacity: .25;
            transform: translateY(0);
          }

          40% {
            opacity: 1;
            transform: translateY(-4px);
          }
        }

        .chatbot-thinking-dot {
          animation:
            chatbotThinking
            1.15s
            ease-in-out
            infinite;
        }
      `}</style>
    </div>
  );
}