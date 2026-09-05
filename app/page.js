"use client";

import { useEffect, useState } from "react";
import ScrollStory from "@/components/ScrollStory";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {loading && (
        <section className="loading-screen">
          <span className="sparkle sparkle-1">✦</span>
          <span className="sparkle sparkle-2">✦</span>
          <span className="sparkle sparkle-3">✧</span>
          <span className="sparkle sparkle-4">✦</span>

          <div className="sun-wrapper">
            <div className="sun-glow"></div>
            <div className="sun"></div>
          </div>

          <div className="loading-content">
            <p className="domain">emaanfatima.dev</p>

            <h1>
              initializing curiosity
              <span className="dots">...</span>
            </h1>

            <div className="progress-track">
              <div className="progress-bar"></div>
            </div>

            <p className="loading-small">
              booting tiny universe
              <span className="cursor">_</span>
            </p>
          </div>

          <div className="sprout">
            <span className="leaf left-leaf"></span>
            <span className="stem"></span>
            <span className="leaf right-leaf"></span>
          </div>
        </section>
      )}

      {!loading && <ScrollStory />}
    </main>
  );
}