import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dhruv Ramu works across computational biology, biotech strategy, and research education.",
};

const interests = [
  "Cancer transcriptomics and survival modeling",
  "Research education systems and student competitions",
  "Biotech strategy and translational decision-making",
  "Healthcare institutions and incentive design",
  "Philosophy of science and explanation",
  "Building tools that make complex ideas legible",
];

const experience = [
  {
    role: "Research & Strategy",
    detail:
      "Computational biology projects spanning TCGA survival analysis, variant annotation pipelines, and codon optimization experiments.",
  },
  {
    role: "Research Education",
    detail:
      "Designed analytics and integrity systems for the International Research Olympiad, serving thousands of students globally.",
  },
  {
    role: "Technical Building",
    detail:
      "Vision-correcting display research, data pipelines, and systems for making research outputs interpretable.",
  },
];

const principles = [
  "Prefer questions that are hard but well-shaped over answers that are neat but shallow.",
  "Take institutions seriously — incentives, standards, and taste matter as much as methods.",
  "Build tools that preserve interpretability, not just performance.",
  "Write to clarify thinking, not to perform expertise.",
  "Hold scientific uncertainty without becoming cynical.",
];

const exploring = [
  "Gene-combination signatures in survival endpoints",
  "How research competitions shape student scientific taste",
  "Annotation workflows that remain interpretable under constraint",
  "The gap between statistical significance and biological meaning",
];

export default function AboutPage() {
  return (
    <PageTransition>
      <Container className="py-12 md:py-20">
        <ScrollReveal>
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-ink">
            About
          </h1>
        </ScrollReveal>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
          <ScrollReveal>
            <div className="relative">
              <div className="absolute -inset-2 border-2 border-ink translate-x-3 translate-y-3" aria-hidden />
              <div className="relative aspect-[3/4] max-w-[280px] overflow-hidden bg-paper-deep">
                <Image
                  src="/Photo of me.JPG"
                  alt="Dhruv Ramu"
                  fill
                  className="object-cover object-top grayscale-[15%]"
                  sizes="280px"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-ink-soft">
              Dhruv Ramu works across computational biology, biotech strategy, and
              research education. His work spans cancer transcriptomics,
              gene-expression analysis, student research systems, and healthcare
              strategy. He is especially interested in how rigorous technical
              methods can be translated into usable tools, institutions, and
              decisions.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          <ScrollReveal>
            <SectionLabel>Current interests</SectionLabel>
            <ul className="space-y-4">
              {interests.map((item) => (
                <li
                  key={item}
                  className="font-body text-ink-soft leading-relaxed border-b border-line pb-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <SectionLabel>Selected experience</SectionLabel>
            <div className="space-y-8">
              {experience.map((item) => (
                <div key={item.role}>
                  <h3 className="font-display text-xl font-medium text-ink">
                    {item.role}
                  </h3>
                  <p className="mt-2 font-body text-muted leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          <ScrollReveal>
            <SectionLabel>Principles</SectionLabel>
            <ul className="space-y-4">
              {principles.map((item) => (
                <li
                  key={item}
                  className="font-body italic text-ink-soft leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <SectionLabel>Currently exploring</SectionLabel>
            <ul className="space-y-3">
              {exploring.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[11px] tracking-[0.06em] text-muted leading-relaxed"
                >
                  → {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </Container>
    </PageTransition>
  );
}
