"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

function isTouchDevice() {
  if (typeof window === "undefined") return true;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [enabled] = useState(() => !isTouchDevice());
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, [enabled, prefersReducedMotion]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full border border-ink/30 pointer-events-none z-[100] mix-blend-difference"
      animate={{
        x: position.x - 6,
        y: position.y - 6,
        opacity: visible ? 0.6 : 0,
        scale: visible ? 1 : 0.5,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}
