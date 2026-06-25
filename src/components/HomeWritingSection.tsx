"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { WritingRow } from "./WritingRow";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import type { Writing } from "@/lib/types";

const filters = ["All", "Essays", "Notes", "Book Reviews", "Research Logs", "Strategy Memos"];

export function HomeWritingSection({ posts }: { posts: Writing[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return posts;
    return posts.filter((p) => p.frontmatter.category === active);
  }, [posts, active]);

  const featured = posts[0];

  return (
    <section className="py-16 md:py-24 bg-paper-deep border-y border-line">
      <div className="px-6 md:px-10 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-14">
          <ScrollReveal>
            <p className="section-label">Recent notes</p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-medium tracking-tight text-ink leading-tight">
              Essays, logs, and <em className="italic">unfinished</em> thoughts.
            </h2>

            {featured && (
              <div className="mt-8 p-4 border border-line bg-paper hidden lg:block">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  Featured
                </p>
                <Link
                  href={`/writing/${featured.slug}`}
                  className="mt-2 block font-display text-lg font-medium text-ink hover:text-accent transition-colors leading-snug"
                >
                  {featured.frontmatter.title}
                </Link>
              </div>
            )}

            <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted hidden lg:block">
              Currently thinking about
            </p>
            <p className="mt-2 font-body text-[15px] italic text-ink-soft hidden lg:block leading-relaxed">
              Why biomarkers fail, and what research education actually teaches.
            </p>
          </ScrollReveal>

          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={cn(
                    "font-mono text-[10.5px] uppercase tracking-[0.1em] px-3 py-1.5 border transition-colors duration-200",
                    active === f
                      ? "bg-ink text-paper border-ink"
                      : "text-muted border-line hover:border-line-dark hover:text-ink"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            {filtered.map((post, i) => (
              <WritingRow
                key={post.slug}
                slug={post.slug}
                frontmatter={post.frontmatter}
                index={String(i + 1).padStart(2, "0")}
              />
            ))}

            <div className="mt-8">
              <Button href="/writing" variant="ghost">
                View all writing →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
