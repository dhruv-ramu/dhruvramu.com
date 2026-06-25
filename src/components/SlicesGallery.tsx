"use client";

import Image from "next/image";
import { PageTransition } from "@/components/PageTransition";
import { Container } from "@/components/Container";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import { lifeSlices, photoWallSrc } from "@/data/life-slices";

const aspectMap = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[21/9]",
} as const;

function SliceCard({
  src,
  alt,
  caption,
  aspect = "landscape",
  span,
  size = "default",
}: {
  src: string;
  alt: string;
  caption: string;
  aspect?: keyof typeof aspectMap;
  span?: string;
  size?: "compact" | "default";
}) {
  return (
    <figure
      className={cn(
        "group",
        span,
        size === "compact" && "max-w-[9.5rem] sm:max-w-[11rem] mx-auto w-full"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-line bg-paper-deep shadow-[3px_3px_0_var(--line-dark)]",
          aspectMap[aspect]
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes={size === "compact" ? "176px" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden
        />
      </div>
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted group-hover:text-ink transition-colors">
        {caption}
      </figcaption>
    </figure>
  );
}

export function SlicesGallery() {
  return (
    <PageTransition>
      <Container wide className="py-12 md:py-20">
        <ScrollReveal>
          <p className="section-label">Slices of Life</p>
          <h1 className="mt-2 font-display text-5xl md:text-7xl font-medium tracking-tight text-ink">
            Moments between the <em className="italic text-accent-ink">work</em>.
          </h1>
          <p className="mt-5 font-body text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed">
            Friends, trails, late nights, and the ordinary scenes that make up
            most of a life.
          </p>
        </ScrollReveal>

        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {lifeSlices.map((slice, i) => (
            <ScrollReveal key={slice.id} delay={0.04 * (i % 5)}>
              <SliceCard
                src={photoWallSrc(slice.filename)}
                alt={slice.alt}
                caption={slice.caption}
                aspect={slice.aspect}
                span={slice.span}
                size={slice.size}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}
