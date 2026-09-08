import Link from "next/link";
import { projects, profile } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default function ProjectDetailPage({ params }) {
  const project = projects.find((p) => p.id === params.slug);

  if (!project) {
    return (
      <main className="detail-page">
        <div className="detail-container">
          <h1>Project not found</h1>
          <Link href="/" className="detail-back" data-cursor="pointer">
            ← Back home
          </Link>
        </div>
      </main>
    );
  }

  const icon =
    project.id === "timebank"
      ? "⏳"
      : project.id === "blockchain-donation"
      ? "🤍"
      : "📍";

  return (
    <main className="detail-page">
      <div className="detail-container">
        <Link href="/" className="detail-back" data-cursor="pointer">
          ← Back home
        </Link>

        <span className="detail-icon">{icon}</span>

        <p className="detail-label">Project Lab</p>

        <h1 className="detail-title">{project.title}</h1>
        <p className="detail-subtitle">{project.subtitle}</p>
        <p className="detail-stack">{project.stack}</p>

        <p className="detail-description">{project.description}</p>

        <div className="detail-features">
          <h2>Key features</h2>
          <ul>
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="detail-contact">
          <p>
            Interested in this project?{" "}
            <a href={`mailto:${profile.email}`} data-cursor="pointer">
              Let&apos;s talk
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
