"use client";

import { profile } from "@/lib/data";

export default function ContactSection() {
  return (
    <div className="story-panel contact-panel">
      <p className="panel-label">Contact / Future Scene</p>
      <h2 className="panel-title">
        Thanks for
        <br />
        <span>visiting!</span>
      </h2>

      <p className="contact-body">
        Let&apos;s build a kinder, brighter, more creative world together.
      </p>

      <div className="contact-actions">
        <a
          href={`mailto:${profile.email}`}
          className="contact-btn contact-btn--email"
          data-cursor="pointer"
        >
          <span>✉</span> Email
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="contact-btn contact-btn--linkedin"
          data-cursor="pointer"
        >
          <span>in</span> LinkedIn
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="contact-btn contact-btn--github"
          data-cursor="pointer"
        >
          <span>⌘</span> GitHub
        </a>
        <a
          href="/CV_EmaanFatima.pdf"
          target="_blank"
          rel="noreferrer"
          className="contact-btn contact-btn--resume"
          data-cursor="pointer"
        >
          <span>☰</span> Résumé
        </a>
      </div>

      <div className="ending-quote">
        <span>Stay curious. Keep building. Brighter futures.</span>
      </div>
    </div>
  );
}
