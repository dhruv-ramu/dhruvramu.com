import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { HomeHero } from "@/components/HomeHero";
import { ProjectIndexRow } from "@/components/ProjectIndexRow";
import { WritingRow } from "@/components/WritingRow";
import { AtlasOfRecurringQuestions } from "@/components/atlas/AtlasOfRecurringQuestions";
import { PullQuote } from "@/components/PullQuote";
import { PageTransition } from "@/components/PageTransition";
import { EditorialSection } from "@/components/EditorialSection";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { getFeaturedProjects, getAllWriting } from "@/lib/content";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const recentWriting = getAllWriting().slice(0, 4);

  return (
    <PageTransition>
      <HomeHero />

      {/* Selected Work — index style, not grid */}
      <EditorialSection
        index="01"
        label="Selected work"
        title={
          <>
            Technical work,{" "}
            <em className="italic text-accent-ink">research systems</em>, and
            experiments.
          </>
        }
        className="py-20 md:py-32"
      >
        <Container wide>
          <StaggerContainer>
            {featuredProjects.map((project, i) => (
              <StaggerItem key={project.slug}>
                <ProjectIndexRow
                  number={String(i + 1).padStart(2, "0")}
                  slug={project.slug}
                  frontmatter={project.frontmatter}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-10">
            <Button href="/projects" variant="ghost">
              Full project archive →
            </Button>
          </div>
        </Container>
      </EditorialSection>

      {/* Recent Notes — offset layout */}
      <section className="py-20 md:py-32 bg-paper-deep border-y border-line">
        <Container wide>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            <ScrollReveal>
              <p className="font-display text-6xl md:text-8xl font-medium tracking-tighter text-line-dark leading-none">
                02
              </p>
              <p className="mt-4 section-label">Recent notes</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-medium tracking-tight text-ink leading-tight">
                Essays, logs, and{" "}
                <em className="italic">unfinished</em> thoughts.
              </h2>
            </ScrollReveal>

            <div>
              {recentWriting.map((post, i) => (
                <WritingRow
                  key={post.slug}
                  slug={post.slug}
                  frontmatter={post.frontmatter}
                  index={String(i + 1).padStart(2, "0")}
                />
              ))}
              <div className="mt-8">
                <Button href="/writing">View all writing →</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Atlas — inverted full bleed */}
      <EditorialSection
        index="03"
        label="The Atlas of Recurring Questions"
        title={
          <>
            An incomplete map of what I keep{" "}
            <em className="italic text-accent-soft">returning to</em>.
          </>
        }
        description="Things I study, things I have built, things I have written, and things I do not understand yet."
        invert
        bleed
        className="py-24 md:py-36"
      >
          <AtlasOfRecurringQuestions compact invert />
        <div className="mt-8">
          <Button href="/atlas" variant="secondary" className="!border-paper/30 !text-paper hover:!bg-paper/10">
            Open full atlas →
          </Button>
        </div>
      </EditorialSection>

      {/* Closing quote — full bleed accent */}
      <section className="ink-band py-24 md:py-32">
        <Container wide>
          <PullQuote
            quote="Good work is usually not the result of having cleaner answers. It is the result of asking better-shaped questions"
            invert
          />
        </Container>
      </section>
    </PageTransition>
  );
}
