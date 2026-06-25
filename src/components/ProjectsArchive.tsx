"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Tag } from "@/components/Tag";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

const categories = [
  "All",
  "Computational Biology",
  "Healthcare Strategy",
  "Research Education",
  "Product / Engineering",
];

interface ProjectsArchiveProps {
  projects: Project[];
}

export function ProjectsArchive({ projects }: ProjectsArchiveProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.frontmatter.category === activeCategory);

  return (
    <PageTransition>
      <Container className="py-12 md:py-20">
        <ScrollReveal>
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-ink">
            Projects
          </h1>
          <p className="mt-4 font-body text-lg md:text-xl text-muted max-w-2xl">
            Technical work, research systems, strategy tools, and experiments.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.12em] px-4 py-2 rounded-full border transition-all duration-300",
                  activeCategory === cat
                    ? "bg-ink text-paper border-ink"
                    : "bg-transparent text-muted border-line hover:border-line-dark hover:text-ink"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-12 space-y-0">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block py-8 border-b border-line hover:border-line-dark transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted-light group-hover:text-gold transition-colors shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-ink group-hover:translate-x-2 transition-transform duration-300">
                        {project.frontmatter.title}
                      </h2>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted shrink-0">
                        {project.frontmatter.status}
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                      {project.frontmatter.category}
                    </p>
                    <p className="mt-3 font-body text-muted leading-relaxed max-w-2xl">
                      {project.frontmatter.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.frontmatter.tools?.map((tool) => (
                        <Tag key={tool}>{tool}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}
