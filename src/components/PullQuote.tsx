"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PullQuoteProps {
  quote: string;
  label?: string;
  attribution?: string;
  className?: string;
  invert?: boolean;
}

export function PullQuote({
  quote,
  label,
  attribution,
  className,
  invert = false,
}: PullQuoteProps) {
  const prefersReducedMotion = useReducedMotion();
  const lines = quote.split(". ").filter(Boolean);

  return (
    <blockquote
      className={cn(
        "relative py-6 md:py-10",
        !invert && "border-y border-line",
        className
      )}
    >
      {label && (
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted mb-6">
          {label}
        </p>
      )}

      <motion.span
        className={cn(
          "font-display text-[3.5rem] md:text-[4.5rem] leading-none absolute top-2 left-0 select-none",
          invert ? "text-paper/15" : "text-line-dark opacity-30"
        )}
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: invert ? 0.15 : 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        &ldquo;
      </motion.span>

      <div className="relative z-10 max-w-3xl pl-0 md:pl-2">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className={cn(
              "font-display text-2xl md:text-3xl lg:text-[2rem] leading-[1.2] font-medium tracking-tight",
              invert ? "text-paper" : "text-ink"
            )}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.1,
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
              "block mt-6 font-mono text-[11px] uppercase tracking-[0.14em] not-italic",
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
