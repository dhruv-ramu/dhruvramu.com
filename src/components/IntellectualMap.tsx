"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

const clusters = [
  {
    label: "Cancer biology and survival",
    x: "8%",
    y: "12%",
    delay: 0,
  },
  {
    label: "Scientific uncertainty",
    x: "62%",
    y: "8%",
    delay: 0.1,
  },
  {
    label: "Research education",
    x: "35%",
    y: "38%",
    delay: 0.2,
  },
  {
    label: "Biotech translation",
    x: "72%",
    y: "42%",
    delay: 0.15,
  },
  {
    label: "Institutions and incentives",
    x: "15%",
    y: "68%",
    delay: 0.25,
  },
  {
    label: "Books, systems, and taste",
    x: "55%",
    y: "72%",
    delay: 0.3,
  },
];

export function IntellectualMap() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ScrollReveal>
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[520px] rounded-3xl border border-line bg-paper/50 overflow-hidden">
        {/* Subtle connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          aria-hidden
        >
          <line x1="15%" y1="20%" x2="40%" y2="42%" stroke="var(--line-dark)" strokeWidth="1" />
          <line x1="40%" y1="42%" x2="68%" y2="45%" stroke="var(--line-dark)" strokeWidth="1" />
          <line x1="20%" y1="72%" x2="40%" y2="42%" stroke="var(--line-dark)" strokeWidth="1" />
          <line x1="68%" y1="45%" x2="58%" y2="76%" stroke="var(--line-dark)" strokeWidth="1" />
          <line x1="68%" y1="15%" x2="68%" y2="45%" stroke="var(--line-dark)" strokeWidth="1" />
        </svg>

        {clusters.map((cluster) => (
          <motion.div
            key={cluster.label}
            className="absolute"
            style={{ left: cluster.x, top: cluster.y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: cluster.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            {...(prefersReducedMotion
              ? {}
              : {
                  animate: {
                    y: [0, -4, 0, 3, 0],
                    x: [0, 2, 0, -2, 0],
                  },
                  transition: {
                    opacity: { duration: 0.6, delay: cluster.delay },
                    scale: { duration: 0.6, delay: cluster.delay },
                    y: {
                      duration: 12 + cluster.delay * 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    x: {
                      duration: 14 + cluster.delay * 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  },
                })}
          >
            <span
              className={cn(
                "inline-block font-mono text-[10px] md:text-[11px] uppercase tracking-[0.12em]",
                "px-4 py-2.5 rounded-full border border-line bg-paper/90 backdrop-blur-sm",
                "text-ink-soft hover:text-ink hover:border-line-dark transition-colors cursor-default"
              )}
            >
              {cluster.label}
            </span>
          </motion.div>
        ))}

        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
          <Link
            href="/about"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-accent transition-colors"
          >
            Explore further →
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
