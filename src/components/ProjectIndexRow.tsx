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

  return (
    <motion.article
      className={cn("group relative", className)}
      whileHover={prefersReducedMotion ? undefined : {}}
    >
      <Link
        href={`/projects/${slug}`}
        className="grid grid-cols-1 md:grid-cols-[5rem_1fr_auto] gap-4 md:gap-8 py-10 md:py-14 border-b border-line hover:border-ink transition-colors duration-500"
      >
        <span className="font-display text-5xl md:text-7xl font-medium tracking-tighter text-line-dark group-hover:text-accent transition-colors duration-500 leading-none">
          {number}
        </span>

        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted mb-2">
            {frontmatter.category} · {frontmatter.status}
          </p>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.05] group-hover:italic transition-all duration-500">
            {frontmatter.title}
          </h3>
          <p className="mt-4 font-body text-lg text-muted leading-relaxed max-w-2xl">
            {frontmatter.summary}
          </p>
          {frontmatter.tools && frontmatter.tools.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {frontmatter.tools.slice(0, 5).map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted border border-line px-2.5 py-1 group-hover:border-line-dark transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center self-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">
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
