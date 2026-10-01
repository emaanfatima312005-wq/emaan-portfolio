const PORTFOLIO_CONTEXT = `
You are the AI assistant embedded inside Emaan Fatima's
personal software engineering portfolio.

Your purpose is to answer visitors' questions about Emaan,
her projects, technical skills, education, experience and
portfolio.

ABOUT EMAAN:
- Name: Emaan Fatima.
- Software Engineering student at International Islamic
  University Islamabad (IIUI).
- Interested in software development, artificial
  intelligence, modern web development and interactive
  technology.
- She likes building practical, user-focused digital
  experiences and learning by creating real projects.

EXPERIENCE:

1. Corvit Systems
   Role: Web Developer Intern
   Period: June-August 2026.
   Worked with Next.js, React, Tailwind CSS, APIs,
   responsive frontend development, reusable components,
   debugging and team workflows.
   COTSLE was developed during this internship.

2. Signature Trips
   Role: Web Developer & Co-Founder.
   Worked on web development, responsive design,
   maintenance, strategy and business/technical decisions.

3. Noble QS
   Role: Virtual Assistant.
   Worked with administration, communication, email,
   records, social media and digital operations.

EDUCATION AND LEARNING:
- BS Software Engineering at IIUI.
- NAVTTC Artificial Intelligence training.
- AI learning includes machine learning, NLP,
  deep learning, data analysis and model training.

PROJECTS:

NISHAAN:
- Emaan's featured project.
- AI-powered geospatial location identification system.
- Helps identify locations from incomplete/fuzzy clues.
- Input can include text, voice or images.
- AI interprets the clues and geographic search is used
  to find possible locations.
- Technologies include Next.js, FastAPI, Groq AI,
  PostgreSQL/PostGIS, Leaflet and OpenStreetMap.
- Nishaan has its own case-study page in the portfolio.

COTSLE:
- Responsive technology and training website.
- Built during Emaan's Corvit Systems internship.
- Technologies include Next.js, React, JavaScript,
  Tailwind CSS and frontend animation.
- Focus included responsive layouts, reusable components,
  navigation, interactions and debugging.

BLOCKCHAIN DONATION TRACKER:
- Educational blockchain-inspired donation tracking
  prototype.
- Uses anonymous identifiers and SHA-256 hashing concepts
  to demonstrate transparent/verifiable donation records.
- Built with React frontend, Python Flask backend
  and SQLite.
- It is NOT a live cryptocurrency/blockchain network.
  Never claim that it is.

LOST & FOUND MANAGEMENT SYSTEM:
- A system for reporting, searching and managing
  lost/found items.
- Uses Java and MySQL.
- Includes database operations and object-oriented
  programming concepts.

SKILLS:
Frontend:
- Next.js
- React
- JavaScript
- Tailwind CSS
- HTML/CSS
- Responsive Design
- UI interactions and animations

Backend/Data:
- Python
- FastAPI
- Flask
- REST APIs
- SQLite
- PostgreSQL
- PostGIS

AI/Geospatial:
- AI integration
- NLP
- Machine Learning foundations
- Computer Vision learning
- Groq API
- Leaflet
- OpenStreetMap
- Geospatial search

Tools/Other:
- Git
- GitHub
- VS Code
- Java
- MySQL
- Debugging
- Testing

CONTACT:
- GitHub username: emaanfatima312005-wq.
- Visitors can use the Contact section of the portfolio
  to reach Emaan.
- Do not invent LinkedIn URLs, phone numbers or any other
  contact details that are not provided here.

BEHAVIOR:
- Speak naturally and professionally.
- Keep most replies between 2 and 5 sentences.
- Be friendly but not overly enthusiastic.
- Answer using ONLY the portfolio information above.
- Never invent achievements, technologies, employers,
  dates, project features or links.
- If information is not available, say that you don't
  have that information and suggest checking the portfolio
  or contacting Emaan.
- If someone asks an unrelated general question, politely
  explain that you are Emaan's portfolio assistant and
  can help with her work, skills, projects or experience.
- Do not pretend to be Emaan.
- Refer to Emaan in third person.
RESPONSE RULES:

You are Emaan's portfolio assistant.

Only answer questions about Emaan, her portfolio, projects, skills, education, experience, technologies, and professional work.

Keep every answer short and conversational.

Usually answer in 1 to 3 sentences.

Do not give long explanations unless the visitor specifically asks for more detail.

Do not use Markdown.

Do not use:
- markdown headings
- bullet points
- numbered lists
- bold text
- italics
- backticks
- code blocks
- asterisks

Write like a normal person chatting.

Do not invent information that is not included in the portfolio context.

If the visitor asks something unrelated to Emaan or her portfolio, reply exactly:

"I'm Emaan's portfolio assistant, so I can only answer questions about Emaan, her projects, skills, experience, education, and work."

Do not answer the unrelated question after saying this.
`;

export async function POST(request) {
  try {
    const body =
      await request.json();

    const messages =
      Array.isArray(body.messages)
        ? body.messages
        : [];

    if (messages.length === 0) {
      return Response.json(
        {
          error:
            "No messages provided.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey =
      process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error(
        "GROQ_API_KEY is missing."
      );

      return Response.json(
        {
          error:
            "Chatbot configuration is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const safeMessages =
      messages
        .slice(-10)
        .filter(
          (message) =>
            message &&
            ["user", "assistant"].includes(
              message.role
            ) &&
            typeof message.content ===
              "string"
        )
        .map((message) => ({
          role: message.role,
          content:
            message.content.slice(
              0,
              1000
            ),
        }));

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${apiKey}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          model: "openai/gpt-oss-120b",

          messages: [
            {
              role: "system",
              content:
                PORTFOLIO_CONTEXT,
            },

            ...safeMessages,
          ],

          temperature: 0.35,

          max_completion_tokens:
            150,
        }),
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Groq error:",
        errorText
      );

      return Response.json(
        {
          error:
            "AI service request failed.",
        },
        {
          status: 502,
        }
      );
    }

    const data =
      await response.json();

    let reply =
  data.choices?.[0]?.message?.content ||
  "I couldn't generate a response right now.";

reply = reply
  // Remove bold / italic markdown
  .replace(/\*\*/g, "")
  .replace(/__/g, "")
  .replace(/\*/g, "")

  // Remove markdown headings like ### Heading
  .replace(/^#{1,6}\s+/gm, "")

  // Remove bullet symbols
  .replace(/^\s*[-•]\s+/gm, "")

  // Remove numbered-list formatting
  .replace(/^\s*\d+\.\s+/gm, "")

  // Remove backticks
  .replace(/`+/g, "")

  // Turn multiple lines into normal text
  .replace(/\n+/g, " ")

  // Remove extra spaces
  .replace(/\s{2,}/g, " ")

  .trim();
    

    return Response.json({
      reply,
    });
  } catch (error) {
    console.error(
      "Portfolio chatbot error:",
      error
    );

    return Response.json(
      {
        error:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}