"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectFrontmatter } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectIndexRowProps {
  number: string;
  slug: string;
  frontmatter: ProjectFrontmatter;
  className?: string;
}

export function ProjectIndexRow({
  number,
  slug,
  frontmatter,
  className,
}: ProjectIndexRowProps) {
  const prefersReducedMotion = useReducedMotion();
  const num = parseInt(number, 10);
  const numberSize =
    num >= 3 ? "text-4xl md:text-5xl" : "text-5xl md:text-6xl";

  return (
    <motion.article
      className={cn("group relative", className)}
      whileHover={prefersReducedMotion ? undefined : {}}
    >
      <Link
        href={`/projects/${slug}`}
        className="grid grid-cols-1 md:grid-cols-[4.5rem_1fr_auto] gap-4 md:gap-8 py-8 md:py-12 border-b border-line transition-colors duration-300 group-hover:bg-paper-deep/60 group-hover:border-line-dark -mx-4 px-4 md:-mx-6 md:px-6"
      >
        <span
          className={cn(
            "font-display font-medium tracking-tighter text-line-dark group-hover:text-accent transition-colors duration-300 leading-none",
            numberSize
          )}
        >
          {number}
        </span>

        <div className="min-w-0">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted mb-2">
            {frontmatter.category} · {frontmatter.status}
          </p>
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-ink leading-[1.08] group-hover:italic transition-all duration-300">
            {frontmatter.title}
          </h3>
          <p className="mt-3 font-body text-[17px] text-ink-soft leading-[1.7] max-w-2xl">
            {frontmatter.summary}
          </p>
          {frontmatter.tools && frontmatter.tools.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {frontmatter.tools.slice(0, 5).map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted border border-line px-2.5 py-1 group-hover:border-line-dark transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center self-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
            Read →
          </span>
        </div>
      </Link>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.article>
  );
}
