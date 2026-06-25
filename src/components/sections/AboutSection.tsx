import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/Button";
import { RESUME_PDF, RESUME_DOWNLOAD_NAME } from "@/lib/resume";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 py-16 md:py-24 border-t border-line bg-paper-deep"
    >
      <div className="px-6 md:px-10 lg:px-12 xl:px-14">
        <ScrollReveal>
          <p className="section-label">About</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Dhruv Ramu
          </h2>
          <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
            San Diego · UC San Diego
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 items-start max-w-3xl">
          <ScrollReveal>
            <div className="relative aspect-[3/4] max-w-[200px] overflow-hidden border border-line bg-paper">
              <Image
                src="/Photo of me.JPG"
                alt="Dhruv Ramu"
                fill
                className="object-cover object-top grayscale-[10%]"
                sizes="200px"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="space-y-5 font-body text-[17px] md:text-lg text-ink-soft leading-relaxed">
              <p>
                I&apos;m studying Molecular &amp; Cell Biology and Business
                Economics at UC San Diego (expected 2028). My work sits where
                computation meets biology and where research meets decisions —
                cancer transcriptomics, biotech strategy, and the institutions
                that shape how young people learn to think scientifically.
              </p>
              <p>
                I co-founded the{" "}
                <a
                  href="https://www.internationalresearcholympiad.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-line-dark underline-offset-[3px] hover:text-accent hover:decoration-accent transition-colors"
                >
                  International Research Olympiad
                </a>
                , a global nonprofit building the world&apos;s first
                olympiad-style competition dedicated solely to scientific
                research — now reaching 13,000+ students across 89 countries,
                with finals hosted at Harvard.
              </p>
              <p>
                On the technical side: TCGA survival and gene-combination
                analysis, codon optimization with transformers, variant
                annotation pipelines, and plant pathology research at the Indian
                Institute of Science. On the strategy side: precision oncology
                at Illudent Therapeutics, healthcare operations at Claisen, and
                work on diagnostics, clinical adoption, and translational
                decision-making.
              </p>
              <p>
                I care about the gap between statistical significance and
                biological meaning — why biomarkers fail, what research
                education actually teaches, and how to build tools that make
                complex ideas legible without hiding the uncertainty.
              </p>
            </div>
            <div className="mt-8">
              <Button href={RESUME_PDF} download={RESUME_DOWNLOAD_NAME}>
                Download CV
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
