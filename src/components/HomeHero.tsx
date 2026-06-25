"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedText } from "./AnimatedText";
import { Button } from "./Button";
import { RESUME_PDF, RESUME_DOWNLOAD_NAME } from "@/lib/resume";
import { ScrollReveal } from "./ScrollReveal";

export function HomeHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span className="font-display text-[clamp(8rem,28vw,22rem)] font-medium tracking-tighter text-ink/[0.03] leading-none whitespace-nowrap">
          ARCHIVE
        </span>
      </div>

      {/* Oxblood rule */}
      <div className="absolute top-24 lg:top-12 left-0 right-0 h-[3px] bg-accent" aria-hidden />

      <div className="relative w-full px-6 md:px-10 lg:px-16 xl:px-20 pb-16 md:pb-24 pt-32 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,380px)] gap-12 lg:gap-0 items-end">
          {/* Text column */}
          <div className="relative z-10 lg:pr-12">
            <ScrollReveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted mb-8">
                Vol. I — Research, Strategy & Ideas
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h1 className="hero-heading font-display text-ink">
                <span className="block">Dhruv</span>
                <span className="block text-accent-ink italic ml-[0.12em]">Ramu</span>
              </h1>
            </ScrollReveal>

            <div className="mt-10 md:mt-14 max-w-3xl">
              <AnimatedText
                lines={[
                  "Computational biology, biotech strategy,",
                  "and notes on how people learn, build, and think.",
                ]}
                italicWords={["build", "think"]}
                className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-[1.12] text-ink-soft"
                delay={0.15}
              />
            </div>

            <ScrollReveal delay={0.35}>
              <p className="mt-8 font-body text-lg md:text-xl text-muted max-w-xl leading-relaxed border-l-2 border-accent pl-5">
                Cancer transcriptomics, research education, healthcare strategy,
                and systems for making ideas legible.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/writing" variant="primary">
                  Read the writing
                </Button>
                <Button href="/projects">View projects</Button>
                <Button
                  href={RESUME_PDF}
                  download={RESUME_DOWNLOAD_NAME}
                  variant="ghost"
                >
                  Download CV
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Photo — breaks the grid */}
          <ScrollReveal delay={0.2} className="relative lg:-mb-24 lg:translate-x-8">
            <div className="relative">
              <div
                className="absolute -inset-3 border-2 border-ink pointer-events-none z-10 translate-x-4 translate-y-4"
                aria-hidden
              />
              <div className="relative aspect-[3/4] max-h-[520px] overflow-hidden bg-paper-deep">
                <Image
                  src="/Photo of me.JPG"
                  alt="Dhruv Ramu"
                  fill
                  className="object-cover object-top grayscale-[20%] contrast-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 380px"
                  priority
                />
              </div>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-muted text-right">
                Portrait · 2026
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll cue */}
        {!prefersReducedMotion && (
          <motion.div
            className="hidden lg:block absolute bottom-8 right-16 xl:right-20"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-light [writing-mode:vertical-rl]">
              Scroll to explore
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
