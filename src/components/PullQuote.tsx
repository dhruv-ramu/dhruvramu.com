"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  className?: string;
}

export function PullQuote({ quote, attribution, className }: PullQuoteProps) {
  const prefersReducedMotion = useReducedMotion();
  const lines = quote.split(". ").filter(Boolean);

  return (
    <blockquote
      className={cn(
        "relative py-12 md:py-16 border-y border-line",
        className
      )}
    >
      <motion.span
        className="font-display text-[6rem] md:text-[8rem] leading-none text-line-dark absolute -top-4 left-0 md:left-8 select-none"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 0.4, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        &ldquo;
      </motion.span>
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="font-display text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.25] font-medium tracking-tight text-ink"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
            {i < lines.length - 1 ? "." : ""}
            {i === lines.length - 1 && (
              <em className="italic text-accent-ink">.</em>
            )}
          </motion.p>
        ))}
        {attribution && (
          <cite className="block mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted not-italic">
            — {attribution}
          </cite>
        )}
      </div>
    </blockquote>
  );
}
