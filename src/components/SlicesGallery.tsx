"use client";

import Image from "next/image";
import { PageTransition } from "@/components/PageTransition";
import { Container } from "@/components/Container";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { cn } from "@/lib/utils";
import { lifeSlices } from "@/data/life-slices";

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
}: {
  src?: string;
  alt: string;
  caption: string;
  aspect?: keyof typeof aspectMap;
  span?: string;
}) {
  return (
    <figure className={cn("group", span)}>
      {src ? (
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-line",
            aspectMap[aspect]
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <PhotoPlaceholder
          label={alt}
          aspectRatio={aspect === "portrait" ? "3/4" : aspect === "wide" ? "21/9" : aspect === "square" ? "square" : "4/3"}
          className="[&_div]:rounded-2xl"
        />
      )}
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
            most of a life. Add your photos to{" "}
            <code className="font-mono text-sm text-ink">public/slices/</code> when
            you&apos;re ready.
          </p>
        </ScrollReveal>

        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {lifeSlices.map((slice, i) => (
            <ScrollReveal key={slice.id} delay={0.05 * (i % 4)}>
              <SliceCard
                src={slice.src}
                alt={slice.alt}
                caption={slice.caption}
                aspect={slice.aspect}
                span={slice.span}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}
