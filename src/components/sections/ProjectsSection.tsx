"use client";

import { ProjectIndexRow } from "@/components/ProjectIndexRow";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Project } from "@/lib/types";

const PRIMARY_COUNT = 3;

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const visible = projects.slice(0, PRIMARY_COUNT);
  const hasMore = projects.length > PRIMARY_COUNT;

  return (
    <section
      id="projects"
      className="scroll-mt-24 py-16 md:py-24 border-t border-line"
    >
      <div className="px-6 md:px-10 lg:px-12 xl:px-14">
        <ScrollReveal>
          <p className="section-label">Projects</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Technical work and <em className="italic text-accent-ink">research systems</em>.
          </h2>
        </ScrollReveal>

        <div className="mt-8">
          {visible.map((project, i) => (
            <ProjectIndexRow
              key={project.slug}
              number={String(i + 1).padStart(2, "0")}
              slug={project.slug}
              frontmatter={project.frontmatter}
            />
          ))}

          {hasMore && (
            <div className="mt-8">
              <Button href="/projects" variant="secondary">
                View all projects →
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
