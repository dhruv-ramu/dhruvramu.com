import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "CV",
  description: "Education, research, experience, and technical skills.",
};

const education = [
  {
    institution: "University",
    degree: "B.S. / B.A. (placeholder)",
    detail: "Relevant coursework in biology, computer science, and statistics.",
    period: "Expected 20XX",
  },
];

const research = [
  "TCGA gene-combination survival analysis across cancer transcriptomic datasets",
  "CHOFormer: transformer-based codon optimization for CHO expression systems",
  "OncoKB-free variant annotation pipeline preserving clinical interpretability",
  "Vision-correcting display: computational pre-compensation for visual correction",
];

const experience = [
  {
    title: "International Research Olympiad",
    role: "Analytics & Systems Design",
    detail:
      "Designed scoring, ranking, and integrity-analysis systems for a global research competition.",
    period: "20XX – Present",
  },
];

const leadership = [
  "Research education program development",
  "Student research competition design and judging",
  "Technical mentorship for computational biology projects",
];

const awards = [
  "Research competition honors (placeholder)",
  "Academic distinctions (placeholder)",
];

const skills = [
  "Python, R, SQL",
  "Survival analysis, transcriptomics, variant annotation",
  "Machine learning (transformers, sequence models)",
  "Data visualization and research communication",
  "Technical writing and strategy memos",
];

export default function ResumePage() {
  return (
    <PageTransition>
      <Container className="py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-ink">
              Curriculum Vitae
            </h1>
            <p className="mt-4 font-body text-lg text-muted">
              Dhruv Ramu — computational biology, strategy, research education
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Button href="/resume.pdf" external variant="primary">
              Download PDF
            </Button>
          </ScrollReveal>
        </div>

        <div className="mt-16 md:mt-20 space-y-16">
          <ScrollReveal>
            <SectionLabel>Education</SectionLabel>
            {education.map((item) => (
              <div key={item.institution} className="mt-4">
                <div className="flex flex-col md:flex-row md:justify-between gap-1">
                  <h3 className="font-display text-xl font-medium text-ink">
                    {item.institution}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 font-body italic text-muted">{item.degree}</p>
                <p className="mt-2 font-body text-ink-soft">{item.detail}</p>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal>
            <SectionLabel>Research</SectionLabel>
            <ul className="mt-4 space-y-3">
              {research.map((item) => (
                <li
                  key={item}
                  className="font-body text-ink-soft leading-relaxed border-b border-line pb-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal>
            <SectionLabel>Experience</SectionLabel>
            {experience.map((item) => (
              <div key={item.title} className="mt-4">
                <div className="flex flex-col md:flex-row md:justify-between gap-1">
                  <h3 className="font-display text-xl font-medium text-ink">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  {item.role}
                </p>
                <p className="mt-2 font-body text-ink-soft">{item.detail}</p>
              </div>
            ))}
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ScrollReveal>
              <SectionLabel>Leadership</SectionLabel>
              <ul className="mt-4 space-y-3">
                {leadership.map((item) => (
                  <li key={item} className="font-body text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <SectionLabel>Awards</SectionLabel>
              <ul className="mt-4 space-y-3">
                {awards.map((item) => (
                  <li key={item} className="font-body text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <SectionLabel>Technical skills</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted border border-line rounded-full px-4 py-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </PageTransition>
  );
}
