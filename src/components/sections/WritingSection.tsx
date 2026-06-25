"use client";

import { useMemo } from "react";
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
  const primary = useMemo(() => buildPrimaryPosts(posts), [posts]);
  const hasMore = posts.length > primary.length;

  return (
    <section
      id="writing"
      className="scroll-mt-24 py-16 md:py-24 border-t border-line bg-paper-deep"
    >
      <div className="px-6 md:px-10 lg:px-12 xl:px-14">
        <ScrollReveal>
          <p className="section-label">Writing</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Essays, logs, and unfinished thoughts.
          </h2>
        </ScrollReveal>

        <div className="mt-8">
          {primary.map((post, i) => (
            <WritingRow
              key={post.slug}
              slug={post.slug}
              frontmatter={post.frontmatter}
              index={String(i + 1).padStart(2, "0")}
              featured={i === 0 && post.frontmatter.featured === true}
            />
          ))}

          {hasMore && (
            <div className="mt-8">
              <Button href="/writing" variant="secondary">
                View all writing →
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
