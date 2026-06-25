"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { WritingFrontmatter } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface WritingRowProps {
  slug: string;
  frontmatter: WritingFrontmatter;
  className?: string;
}

export function WritingRow({ slug, frontmatter, className }: WritingRowProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("group relative", className)}
      whileHover={prefersReducedMotion ? undefined : {}}
    >
      <Link
        href={`/writing/${slug}`}
        className="block py-6 md:py-8 border-b border-line transition-colors hover:border-line-dark"
      >
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-ink group-hover:translate-x-2 transition-transform duration-300">
              {frontmatter.title}
            </h3>
            {frontmatter.subtitle && (
              <p className="mt-1 font-body text-base italic text-muted">
                {frontmatter.subtitle}
              </p>
            )}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted group-hover:text-ink transition-colors duration-300 shrink-0">
            {frontmatter.category} · {formatDate(frontmatter.date)}
          </p>
        </div>
        <p className="mt-3 font-body text-muted leading-relaxed max-w-2xl">
          {frontmatter.summary}
        </p>
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-line-dark"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </Link>
    </motion.div>
  );
}
