import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionLabel } from "@/components/SectionLabel";
import { AnimatedText } from "@/components/AnimatedText";
import { ProjectCard } from "@/components/ProjectCard";
import { WritingRow } from "@/components/WritingRow";
import { AtlasOfRecurringQuestions } from "@/components/atlas/AtlasOfRecurringQuestions";
import { PullQuote } from "@/components/PullQuote";
import { PageTransition } from "@/components/PageTransition";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ScrollReveal";
import { getFeaturedProjects, getAllWriting } from "@/lib/content";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const recentWriting = getAllWriting().slice(0, 4);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <Container className="relative py-16 md:py-24">
          {/* Side label */}
          <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-light whitespace-nowrap">
              A personal archive of research, strategy, and ideas
            </p>
          </div>

          <ScrollReveal>
            <h1 className="hero-heading font-display text-ink">
              Dhruv Ramu
            </h1>
          </ScrollReveal>

          <div className="mt-8 md:mt-12 max-w-4xl">
            <AnimatedText
              lines={[
                "Computational biology, biotech strategy,",
                "and notes on how people learn, build, and think.",
              ]}
              italicWords={["build", "think"]}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-ink"
              delay={0.2}
            />
          </div>

          <ScrollReveal delay={0.4}>
            <p className="hero-subtitle mt-8 md:mt-10 max-w-2xl">
              I work across cancer transcriptomics, research education, healthcare
              strategy, and systems for making ideas legible.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/writing">Read the writing</Button>
              <Button href="/projects">View projects</Button>
              <Button href="/resume" variant="ghost">
                Download CV
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Featured Work */}
      <section className="py-16 md:py-24 border-t border-line">
        <Container>
          <SectionLabel>Selected work</SectionLabel>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {featuredProjects.map((project, i) => (
              <StaggerItem key={project.slug}>
                <ProjectCard
                  number={String(i + 1).padStart(2, "0")}
                  slug={project.slug}
                  frontmatter={project.frontmatter}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Recent Notes */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionLabel>Recent notes</SectionLabel>
          <div>
            {recentWriting.map((post) => (
              <WritingRow
                key={post.slug}
                slug={post.slug}
                frontmatter={post.frontmatter}
              />
            ))}
          </div>
          <div className="mt-8">
            <Button href="/writing" variant="ghost">
              View all writing →
            </Button>
          </div>
        </Container>
      </section>

      {/* Atlas of Recurring Questions */}
      <section className="py-16 md:py-24 border-t border-line">
        <Container>
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4">
              The Atlas of Recurring Questions
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-ink max-w-3xl leading-[1.15]">
              An incomplete map of what I keep{" "}
              <em className="italic text-accent-ink">returning to</em>.
            </h2>
            <p className="mt-4 font-body text-muted max-w-2xl">
              Things I study, things I have built, things I have written, and
              things I do not understand yet.
            </p>
          </ScrollReveal>
          <AtlasOfRecurringQuestions compact />
        </Container>
      </section>

      {/* Closing Quote */}
      <section className="py-16 md:py-24">
        <Container>
          <PullQuote quote="Good work is usually not the result of having cleaner answers. It is the result of asking better-shaped questions" />
        </Container>
      </section>
    </PageTransition>
  );
}
