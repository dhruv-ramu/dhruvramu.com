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
  index?: string;
}

export function WritingRow({
  slug,
  frontmatter,
  className,
  index,
}: WritingRowProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article className={cn("group relative", className)}>
      <Link
        href={`/writing/${slug}`}
        className="grid grid-cols-1 md:grid-cols-[3rem_1fr_auto] gap-4 md:gap-8 py-8 md:py-10 border-b border-line hover:border-ink transition-colors duration-500"
      >
        {index && (
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted-light group-hover:text-accent transition-colors pt-1">
            {index}
          </span>
        )}

        <div className="min-w-0 md:col-span-1">
          <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-ink group-hover:italic transition-all duration-500 leading-tight">
            {frontmatter.title}
          </h3>
          {frontmatter.subtitle && (
            <p className="mt-2 font-body text-base italic text-muted">
              {frontmatter.subtitle}
            </p>
          )}
          <p className="mt-3 font-body text-muted leading-relaxed max-w-xl line-clamp-2">
            {frontmatter.summary}
          </p>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted group-hover:text-ink transition-colors shrink-0 self-start md:text-right md:pt-1">
          {frontmatter.category}
          <br />
          <span className="text-muted-light">{formatDate(frontmatter.date)}</span>
        </p>
      </Link>

      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </motion.article>
  );
}
