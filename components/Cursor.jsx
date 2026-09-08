"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const CONFETTI_SYMBOLS = ["{", "}", "<", ">", "/", ";", "0", "1", "*", "+"];
const COLORS = ["#70d6ff", "#ff70a6", "#ffd670", "#e9ff70", "#ff9770"];

function useIsTouch() {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(pointer: coarse)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(pointer: coarse)").matches;
    },
    () => false
  );
}

export default function Cursor() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const isTouch = useIsTouch();

  useEffect(() => {
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles every few frames
      if (time - lastSpawnRef.current > 35) {
        const count = Math.random() > 0.6 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 8,
            y: mouseRef.current.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.2,
            vy: Math.random() * 0.8 + 0.2,
            life: 1,
            decay: 0.015 + Math.random() * 0.015,
            size: 2 + Math.random() * 4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            symbol: CONFETTI_SYMBOLS[Math.floor(Math.random() * CONFETTI_SYMBOLS.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
          });
        }
        lastSpawnRef.current = time;
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.015; // gravity
        p.life -= p.decay;
        p.rotation += p.rotationSpeed;

        if (p.life <= 0) return false;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.life * 0.35; // very faded
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();

        return true;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 99998,
      }}
    />
  );
}
