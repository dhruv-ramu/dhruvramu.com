import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtlasOfRecurringQuestions } from "@/components/atlas/AtlasOfRecurringQuestions";

export const metadata: Metadata = {
  title: "The Atlas of Recurring Questions",
  description:
    "An interactive map of problems, questions, projects, essays, and unresolved ideas.",
};

export default function AtlasPage() {
  return (
    <PageTransition>
      <Container className="py-12 md:py-20">
        <ScrollReveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4">
            The Atlas of Recurring Questions
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-ink leading-[1.05] max-w-4xl">
            A map of what I study, build, write, and{" "}
            <em className="italic text-accent-ink">do not yet understand</em>.
          </h1>
          <p className="mt-6 font-body text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            Six constellations on the surface. Click to unfold deeper layers of
            concepts, questions, artifacts, and unresolved pressure points.
          </p>
        </ScrollReveal>

        <AtlasOfRecurringQuestions />
      </Container>
    </PageTransition>
  );
}
