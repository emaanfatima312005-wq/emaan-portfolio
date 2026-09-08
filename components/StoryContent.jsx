"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import ContactSection from "./sections/ContactSection";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { id: "about", Component: AboutSection, start: 0.58, end: 0.72 },
  { id: "projects", Component: ProjectsSection, start: 0.66, end: 0.80 },
  { id: "skills", Component: SkillsSection, start: 0.74, end: 0.87 },
  { id: "experience", Component: ExperienceSection, start: 0.80, end: 0.92 },
  { id: "education", Component: EducationSection, start: 0.86, end: 0.97 },
  { id: "contact", Component: ContactSection, start: 0.92, end: 1.0 },
];

export default function StoryContent({ storyRef }) {
  const containerRef = useRef();
  const panelRefs = useRef([]);

  useGSAP(
    () => {
      if (!storyRef?.current) return;

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;

        const config = PANELS[index];

        gsap.fromTo(
          panel,
          {
            opacity: 0,
            y: 80,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: storyRef.current,
              start: `${config.start * 100}% top`,
              end: `${(config.start + 0.08) * 100}% top`,
              scrub: 1,
            },
          }
        );

        gsap.to(panel, {
          opacity: 0,
          y: -60,
          scale: 0.98,
          scrollTrigger: {
            trigger: storyRef.current,
            start: `${(config.end - 0.08) * 100}% top`,
            end: `${config.end * 100}% top`,
            scrub: 1,
          },
        });
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <div ref={containerRef} className="story-content-layer">
      {PANELS.map(({ id, Component }, index) => (
        <div
          key={id}
          ref={(el) => (panelRefs.current[index] = el)}
          className="story-panel-wrapper"
        >
          <Component />
        </div>
      ))}
    </div>
  );
}
