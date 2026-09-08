"use client";

import { experience } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <div className="story-panel experience-panel">
      <p className="panel-label">Work Experience</p>
      <h2 className="panel-title">
        Where I&apos;ve
        <br />
        <span>contributed.</span>
      </h2>

      <div className="experience-timeline">
        {experience.map((job, index) => (
          <div key={job.id} className="experience-card">
            <span className="experience-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="experience-content">
              <h3>{job.role}</h3>
              <p className="experience-company">
                {job.company} · {job.period} · {job.location}
              </p>
              <ul>
                {job.highlights.slice(0, 3).map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
