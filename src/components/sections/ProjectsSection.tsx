"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectIndexRow } from "@/components/ProjectIndexRow";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Project } from "@/lib/types";

const PRIMARY_COUNT = 3;

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showMore, setShowMore] = useState(false);

  const primary = projects.slice(0, PRIMARY_COUNT);
  const secondary = projects.slice(PRIMARY_COUNT);
  const visible = showMore ? projects : primary;

  return (
    <section
      id="projects"
      className="scroll-mt-20 py-16 md:py-24 border-t border-line"
    >
      <div className="px-6 md:px-10 lg:px-12 xl:px-14">
        <ScrollReveal>
          <p className="section-label">Projects</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Technical work and <em className="italic text-accent-ink">research systems</em>.
          </h2>
        </ScrollReveal>

        <div className="mt-8">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectIndexRow
                  number={String(i + 1).padStart(2, "0")}
                  slug={project.slug}
                  frontmatter={project.frontmatter}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {secondary.length > 0 && (
            <div className="mt-8">
              <Button
                type="button"
                variant={showMore ? "ghost" : "secondary"}
                onClick={() => setShowMore((v) => !v)}
              >
                {showMore ? "Show fewer projects" : "View more projects →"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
