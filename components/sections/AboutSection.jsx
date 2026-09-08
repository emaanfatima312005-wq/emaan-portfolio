"use client";

import { profile } from "@/lib/data";

export default function AboutSection() {
  return (
    <div className="story-panel about-panel">
      <p className="panel-label">About Workspace</p>
      <h2 className="panel-title">
        A peek into my
        <br />
        <span>creative space.</span>
      </h2>
      <p className="panel-body">{profile.about}</p>

      <div className="role-tags">
        {profile.labels.map((label) => (
          <span key={label} className="role-tag">
            {label}
          </span>
        ))}
      </div>

      <div className="mini-quote">
        <span>“Code, ideas, coffee and curiosity.”</span>
      </div>
    </div>
  );
}
