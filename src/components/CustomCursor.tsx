"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const enabled = !prefersReducedMotion && !isTouchDevice();

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[200]"
      animate={{
        x: position.x - 5,
        y: position.y - 5,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 600, damping: 32, mass: 0.4 }}
      aria-hidden
    >
      <span className="block w-2.5 h-2.5 rounded-full bg-accent/70 ring-1 ring-accent/30" />
    </motion.div>
  );
}
