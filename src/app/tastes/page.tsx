import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { Container } from "@/components/Container";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Bookshelf } from "@/components/Bookshelf";
import { RecordPlayer } from "@/components/RecordPlayer";
import {
  TasteObject,
  FilmCameraIllustration,
  CoffeeIllustration,
  NotebookIllustration,
} from "@/components/TasteObjects";

export const metadata: Metadata = {
  title: "Tastes",
  description:
    "Books, vinyl, film, coffee — the things I keep coming back to.",
};

export default function TastesPage() {
  return (
    <PageTransition>
      <Container wide className="py-12 md:py-20">
        <ScrollReveal>
          <p className="section-label">Tastes</p>
          <h1 className="mt-2 font-display text-5xl md:text-7xl font-medium tracking-tight text-ink">
            A room of <em className="italic text-accent-ink">favorite things</em>.
          </h1>
          <p className="mt-5 font-body text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed">
            Books on the shelf, records on the turntable, and the small rituals
            that shape how I think. Less résumé, more personality.
          </p>
        </ScrollReveal>

        <div className="mt-14 md:mt-20">
          <ScrollReveal delay={0.05}>
            <Bookshelf />
          </ScrollReveal>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <ScrollReveal delay={0.1} className="md:col-span-2">
            <RecordPlayer />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <TasteObject title="35mm" subtitle="Film">
              <FilmCameraIllustration />
            </TasteObject>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <TasteObject title="Morning ritual" subtitle="Coffee">
              <CoffeeIllustration />
            </TasteObject>
          </ScrollReveal>

          <ScrollReveal delay={0.25} className="lg:col-span-2">
            <TasteObject title="Field notes" subtitle="Notebook">
              <NotebookIllustration />
            </TasteObject>
          </ScrollReveal>
        </div>
      </Container>
    </PageTransition>
  );
}
