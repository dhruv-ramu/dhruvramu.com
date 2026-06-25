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
  featured?: boolean;
}

export function WritingRow({
  slug,
  frontmatter,
  className,
  index,
  featured = false,
}: WritingRowProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article className={cn("group relative", className)}>
      <Link
        href={`/writing/${slug}`}
        className="grid grid-cols-1 md:grid-cols-[3rem_1fr_auto] gap-4 md:gap-8 py-7 md:py-9 border-b border-line hover:border-line-dark transition-colors duration-300"
      >
        {index && (
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted group-hover:text-accent transition-colors pt-1">
            {index}
          </span>
        )}

        <div className="min-w-0 md:col-span-1">
          {featured && (
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent mb-2">
              Featured
            </p>
          )}
          <h3
            className={cn(
              "font-display font-medium tracking-tight text-ink group-hover:italic transition-all duration-300 leading-tight",
              featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            )}
          >
            {frontmatter.title}
          </h3>
          {frontmatter.subtitle && (
            <p className="mt-2 font-body text-[17px] italic text-ink-soft">
              {frontmatter.subtitle}
            </p>
          )}
          <p className="mt-3 font-body text-[17px] text-ink-soft leading-relaxed max-w-2xl">
            {frontmatter.summary}
          </p>
        </div>

        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted group-hover:text-ink transition-colors shrink-0 self-start md:text-right md:pt-1">
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
