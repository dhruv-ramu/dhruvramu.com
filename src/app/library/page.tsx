import type { Metadata } from "next";
import { getAllBooks } from "@/lib/content";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { BookEntry } from "@/components/BookEntry";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";

export const metadata: Metadata = {
  title: "Library",
  description: "Books, reviews, annotations, and reading notes.",
};

const themes = [
  "Philosophy of science and explanation",
  "Decision-making under uncertainty",
  "Institutions, incentives, and judgment",
  "Biology, medicine, and translation",
  "Systems thinking and mental models",
];

export default function LibraryPage() {
  const books = getAllBooks();
  const reading = books.filter((b) => b.frontmatter.status === "reading");
  const reviewed = books.filter((b) => b.frontmatter.status === "reviewed");
  const notes = books.filter(
    (b) => b.frontmatter.status === "notes" || b.frontmatter.status === "marginalia"
  );

  return (
    <PageTransition>
      <Container className="py-12 md:py-20">
        <ScrollReveal>
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-ink">
            Library
          </h1>
          <p className="mt-4 font-body text-lg md:text-xl text-muted max-w-2xl">
            Books, reviews, annotations, and reading notes — a shelf of ideas
            that have shaped how I think.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <PhotoPlaceholder aspectRatio="3/4" label="Shelf" className="col-span-1" />
          <PhotoPlaceholder aspectRatio="3/4" label="Shelf" className="col-span-1 hidden sm:block" />
          <PhotoPlaceholder aspectRatio="3/4" label="Reading desk" className="col-span-1 hidden md:block" />
          <PhotoPlaceholder aspectRatio="3/4" label="Marginalia" className="col-span-1 hidden lg:block" />
        </div>

        {reading.length > 0 && (
          <section className="mt-16 md:mt-20">
            <SectionLabel>Currently reading</SectionLabel>
            {reading.map((book) => (
              <BookEntry
                key={book.slug}
                frontmatter={book.frontmatter}
              />
            ))}
          </section>
        )}

        <section className="mt-16 md:mt-20">
          <SectionLabel>Reviewed</SectionLabel>
          {reviewed.map((book) => (
            <BookEntry
              key={book.slug}
              frontmatter={book.frontmatter}
            />
          ))}
        </section>

        {notes.length > 0 && (
          <section className="mt-16 md:mt-20">
            <SectionLabel>Notes and marginalia</SectionLabel>
            {notes.map((book) => (
              <BookEntry
                key={book.slug}
                frontmatter={book.frontmatter}
              />
            ))}
          </section>
        )}

        <section className="mt-16 md:mt-20">
          <SectionLabel>Reading themes</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {themes.map((theme) => (
              <div
                key={theme}
                className="p-5 rounded-2xl border border-line bg-paper/60"
              >
                <p className="font-body text-ink-soft leading-relaxed">
                  {theme}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </PageTransition>
  );
}
