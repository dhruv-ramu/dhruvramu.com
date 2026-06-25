import Link from "next/link";
import type { BookFrontmatter } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BookEntryProps {
  frontmatter: BookFrontmatter;
  className?: string;
}

export function BookEntry({ frontmatter, className }: BookEntryProps) {
  return (
    <article
      className={cn(
        "group py-6 border-b border-line hover:border-line-dark transition-colors",
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-ink group-hover:translate-x-1 transition-transform duration-300">
            {frontmatter.title}
          </h3>
          <p className="mt-1 font-body italic text-muted">{frontmatter.author}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {frontmatter.rating && (
            <span className="font-mono text-[10px] tracking-[0.1em] text-gold">
              {"★".repeat(frontmatter.rating)}
              {"☆".repeat(5 - frontmatter.rating)}
            </span>
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {frontmatter.status}
          </span>
        </div>
      </div>
      {frontmatter.note && (
        <p className="mt-3 font-body text-muted leading-relaxed max-w-2xl">
          {frontmatter.note}
        </p>
      )}
      {frontmatter.reviewSlug && (
        <Link
          href={`/writing/${frontmatter.reviewSlug}`}
          className="inline-block mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-accent hover:text-accent-ink transition-colors"
        >
          Read review →
        </Link>
      )}
    </article>
  );
}
