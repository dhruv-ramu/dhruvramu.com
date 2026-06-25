import { getAllBooks } from "@/lib/content";
import { Bookshelf } from "@/components/Bookshelf";
import { BookEntry } from "@/components/BookEntry";
import { ScrollReveal } from "@/components/ScrollReveal";

export function LibrarySection() {
  const books = getAllBooks();
  const reviewed = books.filter((b) => b.frontmatter.status === "reviewed");

  return (
    <section
      id="library"
      className="scroll-mt-20 py-16 md:py-24 border-t border-line"
    >
      <div className="px-6 md:px-10 lg:px-12 xl:px-14">
        <ScrollReveal>
          <p className="section-label">Library</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Books that shaped how I think.
          </h2>
        </ScrollReveal>

        <div className="mt-10">
          <Bookshelf />
        </div>

        {reviewed.length > 0 && (
          <div className="mt-14">
            {reviewed.map((book) => (
              <BookEntry key={book.slug} frontmatter={book.frontmatter} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
