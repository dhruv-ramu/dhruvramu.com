"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn, formatDate } from "@/lib/utils";
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

function estimateReadTime(summary: string) {
  const words = summary.split(/\s+/).length;
  return Math.max(3, Math.round(words / 40));
}

function FeaturedCard({ post }: { post: Writing }) {
  const { frontmatter, slug } = post;

  return (
    <Link
      href={`/writing/${slug}`}
      className="group relative block overflow-hidden border-2 border-ink bg-ink text-paper min-h-[420px] md:min-h-[480px]"
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -12deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`,
        }}
        aria-hidden
      />

      <div className="relative h-full flex flex-col justify-between p-8 md:p-12 lg:p-14">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
            Featured · {frontmatter.category}
          </p>
          <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[0.95] group-hover:italic transition-all duration-500">
            {frontmatter.title}
          </h2>
          {frontmatter.subtitle && (
            <p className="mt-4 font-body text-lg md:text-xl italic text-paper/75 max-w-xl">
              {frontmatter.subtitle}
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <p className="font-body text-[17px] text-paper/70 max-w-lg leading-relaxed">
            {frontmatter.summary}
          </p>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50 shrink-0 group-hover:text-gold transition-colors">
            Read essay →
          </span>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gold origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
  );
}

function WritingCard({
  post,
  index,
  variant = "default",
}: {
  post: Writing;
  index: number;
  variant?: "default" | "wide";
}) {
  const { frontmatter, slug } = post;
  const readTime = estimateReadTime(frontmatter.summary);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className={cn(variant === "wide" && "md:col-span-2")}
    >
      <Link
        href={`/writing/${slug}`}
        className="group relative flex flex-col h-full border border-line bg-paper hover:border-ink hover:shadow-[4px_4px_0_var(--line-dark)] transition-all duration-300 p-6 md:p-8"
      >
        <span
          className="absolute top-4 right-5 font-display text-6xl md:text-7xl font-medium text-ink/[0.04] leading-none select-none pointer-events-none"
          aria-hidden
        >
          {String(index).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span>{frontmatter.category}</span>
          <span className="text-line-dark">·</span>
          <span>{formatDate(frontmatter.date)}</span>
          <span className="text-line-dark">·</span>
          <span>{readTime} min</span>
        </div>

        <h3 className="mt-5 font-display text-2xl md:text-3xl font-medium tracking-tight text-ink group-hover:italic transition-all duration-300 leading-tight pr-8">
          {frontmatter.title}
        </h3>

        {frontmatter.subtitle && (
          <p className="mt-2 font-body text-base italic text-ink-soft line-clamp-2">
            {frontmatter.subtitle}
          </p>
        )}

        <p className="mt-4 font-body text-[17px] text-ink-soft leading-relaxed line-clamp-3 flex-1">
          {frontmatter.summary}
        </p>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-[0.1em] px-2.5 py-1 border border-line text-muted group-hover:border-line-dark group-hover:text-ink transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted group-hover:text-accent transition-colors">
          Read →
        </span>
      </Link>
    </motion.article>
  );
}

export function WritingArchive({ posts }: WritingArchiveProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = useMemo(
    () => posts.find((p) => p.frontmatter.featured) ?? posts[0],
    [posts]
  );

  const filtered = useMemo(() => {
    const pool =
      activeCategory === "All"
        ? posts
        : posts.filter((p) => p.frontmatter.category === activeCategory);
    return pool.filter((p) => p.slug !== featured?.slug);
  }, [posts, activeCategory, featured]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    for (const post of posts) {
      const cat = post.frontmatter.category;
      counts[cat] = (counts[cat] ?? 0) + 1;
    }
    return counts;
  }, [posts]);

  return (
    <PageTransition>
      {/* Hero band */}
      <section className="relative border-b-2 border-ink overflow-hidden">
        <div className="absolute inset-0 bg-paper-deep" aria-hidden />
        <span
          className="absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[clamp(8rem,28vw,18rem)] font-medium text-ink/[0.03] leading-none pointer-events-none select-none"
          aria-hidden
        >
          W
        </span>

        <Container wide className="relative py-16 md:py-24 lg:py-28">
          <ScrollReveal>
            <p className="section-label">Writing</p>
            <h1 className="mt-3 font-display text-[clamp(3.5rem,10vw,7rem)] font-medium tracking-tighter text-ink leading-[0.9]">
              Essays &amp; <em className="italic text-accent-ink">logs</em>
            </h1>
            <p className="mt-6 font-body text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed">
              Unfinished thoughts on science, systems, and the gap between what
              we measure and what we mean.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {posts.length} pieces · {categories.length - 1} categories
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <Container wide className="py-12 md:py-16">
        {/* Category rail */}
        <ScrollReveal delay={0.05}>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] px-5 py-2.5 border-2 transition-all duration-300",
                  activeCategory === cat
                    ? "bg-ink text-paper border-ink"
                    : "bg-transparent text-muted border-line hover:border-ink hover:text-ink"
                )}
              >
                {cat}
                <span className="ml-2 opacity-60">
                  {categoryCounts[cat] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Featured */}
        {featured && activeCategory === "All" && (
          <ScrollReveal delay={0.1} className="mt-12 md:mt-16">
            <FeaturedCard post={featured} />
          </ScrollReveal>
        )}

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            layout
            className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          >
            {filtered.map((post, i) => (
              <WritingCard
                key={post.slug}
                post={post}
                index={i + 1}
                variant={i === 0 && activeCategory !== "All" ? "wide" : "default"}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && activeCategory !== "All" && (
          <p className="mt-12 font-body text-lg text-muted text-center">
            No pieces in this category yet.
          </p>
        )}
      </Container>
    </PageTransition>
  );
}
