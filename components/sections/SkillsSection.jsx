"use client";

import { skills } from "@/lib/data";

export default function SkillsSection() {
  return (
    <div className="story-panel skills-panel">
      <p className="panel-label">Circuit Garden</p>
      <h2 className="panel-title">
        Skills that
        <br />
        <span>grow.</span>
      </h2>
      <p className="panel-body">Technology meets a greener tomorrow.</p>

      <div className="skills-garden">
        {skills.technical.map((skill) => (
          <div
            key={skill.name}
            className="skill-bloom"
            style={{ "--bloom-color": skill.color }}
          >
            <span className="skill-dot" style={{ background: skill.color }} />
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>

      <div className="soft-skills">
        <p className="soft-title">Soft Skills</p>
        <div className="soft-tags">
          {skills.soft.map((skill) => (
            <span key={skill} className="soft-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
