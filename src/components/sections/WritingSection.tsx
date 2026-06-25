"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WritingRow } from "@/components/WritingRow";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Writing } from "@/lib/types";

const PRIMARY_COUNT = 3;

function buildPrimaryPosts(posts: Writing[]): Writing[] {
  if (posts.length <= PRIMARY_COUNT) return posts;

  const featured = posts.find((p) => p.frontmatter.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return [featured, ...rest.slice(0, PRIMARY_COUNT - 1)];
}

interface WritingSectionProps {
  posts: Writing[];
}

export function WritingSection({ posts }: WritingSectionProps) {
  const [showMore, setShowMore] = useState(false);

  const primary = useMemo(() => buildPrimaryPosts(posts), [posts]);
  const hasMore = posts.length > primary.length;
  const visible = showMore ? posts : primary;

  return (
    <section
      id="writing"
      className="scroll-mt-20 py-16 md:py-24 border-t border-line bg-paper-deep"
    >
      <div className="px-6 md:px-10 lg:px-12 xl:px-14">
        <ScrollReveal>
          <p className="section-label">Writing</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Essays, logs, and unfinished thoughts.
          </h2>
        </ScrollReveal>

        <div className="mt-8">
          <AnimatePresence mode="popLayout">
            {visible.map((post, i) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <WritingRow
                  slug={post.slug}
                  frontmatter={post.frontmatter}
                  index={String(i + 1).padStart(2, "0")}
                  featured={i === 0 && post.frontmatter.featured === true}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {hasMore && (
            <div className="mt-8">
              <Button
                type="button"
                variant={showMore ? "ghost" : "secondary"}
                onClick={() => setShowMore((v) => !v)}
              >
                {showMore ? "Show fewer" : "View more writing →"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
