"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectFrontmatter } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  number: string;
  slug: string;
  frontmatter: ProjectFrontmatter;
  className?: string;
}

export function ProjectCard({
  number,
  slug,
  frontmatter,
  className,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -4, transition: { duration: 0.3 } }
      }
      className={className}
    >
      <Link
        href={`/projects/${slug}`}
        className={cn(
          "group block h-full p-6 md:p-8 rounded-3xl border border-line",
          "bg-[rgba(251,248,241,0.72)] backdrop-blur-[12px]",
          "transition-all duration-300 ease-out",
          "hover:bg-paper-deep hover:border-line-dark"
        )}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <motion.span
            className="font-mono text-[11px] tracking-[0.14em] text-muted-light group-hover:text-gold transition-colors duration-300"
            whileHover={prefersReducedMotion ? undefined : { rotate: -3, x: 2 }}
          >
            {number}
          </motion.span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {frontmatter.status}
          </span>
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-ink group-hover:translate-x-1 transition-transform duration-300">
          {frontmatter.title}
        </h3>

        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {frontmatter.category}
        </p>

        <p className="mt-4 font-body text-muted leading-relaxed line-clamp-3">
          {frontmatter.summary}
        </p>

        {frontmatter.tools && frontmatter.tools.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {frontmatter.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-light border border-line/60 rounded-full px-2.5 py-0.5"
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
