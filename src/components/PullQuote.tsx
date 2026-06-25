"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  className?: string;
  invert?: boolean;
}

export function PullQuote({
  quote,
  attribution,
  className,
  invert = false,
}: PullQuoteProps) {
  const prefersReducedMotion = useReducedMotion();
  const lines = quote.split(". ").filter(Boolean);

  return (
    <blockquote
      className={cn(
        "relative py-8 md:py-12",
        !invert && "border-y border-line",
        className
      )}
    >
      <motion.span
        className={cn(
          "font-display text-[5rem] md:text-[7rem] leading-none absolute -top-6 left-0 select-none",
          invert ? "text-paper/15" : "text-line-dark opacity-40"
        )}
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: invert ? 0.15 : 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        &ldquo;
      </motion.span>

      <div className="relative z-10 max-w-4xl">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className={cn(
              "font-display text-3xl md:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-tight",
              invert ? "text-paper" : "text-ink"
            )}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
            {i < lines.length - 1 ? "." : ""}
            {i === lines.length - 1 && (
              <em className={cn("italic", invert ? "text-accent-soft" : "text-accent-ink")}>
                .
              </em>
            )}
          </motion.p>
        ))}
        {attribution && (
          <cite
            className={cn(
              "block mt-8 font-mono text-[11px] uppercase tracking-[0.14em] not-italic",
              invert ? "text-paper/50" : "text-muted"
            )}
          >
            — {attribution}
          </cite>
        )}
      </div>
    </blockquote>
  );
}
