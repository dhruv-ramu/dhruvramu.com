"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedText } from "./AnimatedText";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";
import { homeSectionHref } from "@/lib/nav";

export function HomeHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="scroll-mt-24 relative min-h-[min(85vh,760px)] flex items-center border-b border-line overflow-hidden"
    >
      <div className="relative w-full px-6 md:px-10 lg:px-12 xl:px-14 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(240px,320px)] gap-12 lg:gap-16 items-center max-w-6xl">
          <div className="max-w-3xl">
            <ScrollReveal delay={0.05}>
              <h1 className="hero-heading font-display text-ink">
                <span className="block">Dhruv</span>
                <span className="block text-accent-ink italic ml-[0.08em]">Ramu</span>
              </h1>
            </ScrollReveal>

            <div className="mt-5 md:mt-6 max-w-2xl">
              <AnimatedText
                lines={[
                  "Computational biology, biotech strategy,",
                  "and notes on how people learn, build, and think.",
                ]}
                italicWords={["build", "think"]}
                className="font-display text-xl md:text-2xl font-medium tracking-tight leading-[1.2] text-ink-soft"
                delay={0.12}
              />
            </div>

            <ScrollReveal delay={0.25}>
              <p className="mt-5 font-body text-[17px] md:text-lg text-ink-soft max-w-xl leading-relaxed">
                Research in cancer transcriptomics. Writing on science, systems,
                and institutions.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.32}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={homeSectionHref("writing")} variant="primary">
                  Read the writing
                </Button>
                <Button href={homeSectionHref("projects")}>View projects</Button>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15} className="lg:justify-self-end w-full max-w-[320px] mx-auto lg:mx-0">
            <div className="relative">
              <div className="absolute -inset-3 border-2 border-ink rotate-2 opacity-20" aria-hidden />
              <div className="relative aspect-[3/4] overflow-hidden border-2 border-ink bg-paper shadow-[6px_6px_0_var(--line-dark)]">
                <Image
                  src="/Photo of me.JPG"
                  alt="Dhruv Ramu"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 60vw, 320px"
                  priority
                />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted text-center lg:text-right">
                San Diego · UCSD
              </p>
            </div>
          </ScrollReveal>
        </div>

        {!prefersReducedMotion && (
          <motion.div
            className="hidden lg:block absolute bottom-10 right-12"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-light">
              Scroll ↓
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
