"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { WritingRow } from "@/components/WritingRow";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import type { Writing } from "@/lib/types";

const categories = [
  "All",
  "Essays",
  "Notes",
  "Book Reviews",
  "Research Logs",
  "Strategy Memos",
  "Field Notes",
];

interface WritingArchiveProps {
  posts: Writing[];
}

export function WritingArchive({ posts }: WritingArchiveProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.frontmatter.category === activeCategory);

  return (
    <PageTransition>
      <Container className="py-12 md:py-20">
        <ScrollReveal>
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-ink">
            Writing
          </h1>
          <p className="mt-4 font-body text-lg md:text-xl text-muted max-w-2xl">
            Essays, notes, book reviews, research logs, and unfinished thoughts.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.12em] px-4 py-2 rounded-full border transition-all duration-300",
                  activeCategory === cat
                    ? "bg-ink text-paper border-ink"
                    : "bg-transparent text-muted border-line hover:border-line-dark hover:text-ink"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="mt-12">
          {filtered.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <WritingRow slug={post.slug} frontmatter={post.frontmatter} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </PageTransition>
  );
}
