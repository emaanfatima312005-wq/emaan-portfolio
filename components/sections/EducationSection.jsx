"use client";

import { education } from "@/lib/data";

export default function EducationSection() {
  return (
    <div className="story-panel education-panel">
      <p className="panel-label">Education & Training</p>
      <h2 className="panel-title">
        Always
        <br />
        <span>learning.</span>
      </h2>

      <div className="education-cards">
        {education.map((edu) => (
          <div key={edu.id} className="education-card">
            <span className="education-badge">
              {edu.id === "iiui" ? "🎓" : "🤖"}
            </span>
            <h3>{edu.degree}</h3>
            <p className="education-school">{edu.institution}</p>
            <p className="education-meta">
              {edu.period} · {edu.location}
            </p>
            {edu.level && <p className="education-extra">Level: {edu.level}</p>}
            {edu.focus && (
              <div className="focus-tags">
                {edu.focus.map((item) => (
                  <span key={item} className="focus-tag">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
