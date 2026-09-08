"use client";

import Link from "next/link";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
  return (
    <div className="story-panel projects-panel">
      <p className="panel-label">Project Lab</p>
      <h2 className="panel-title">
        Real ideas.
        <br />
        <span>Real impact.</span>
      </h2>
      <p className="panel-body">A showcase of what I&apos;ve built.</p>

      <div className="projects-grid">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            className="project-card"
            data-cursor="pointer"
          >
            <div className="project-card-glow" />
            <div className="project-card-inner">
              <span className="project-icon">
                {project.id === "timebank" && "⏳"}
                {project.id === "blockchain-donation" && "🤍"}
                {project.id === "lost-found" && "📍"}
              </span>
              <h3>{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-stack">{project.stack}</p>
              <span className="project-link">View Project →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
