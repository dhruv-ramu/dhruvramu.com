import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "For research, writing, project collaborations, or serious conversations.",
};

const links = [
  {
    label: "Email",
    value: "dhruv@example.com",
    href: "mailto:dhruv@example.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dhruvramu",
    href: "https://linkedin.com/in/dhruvramu",
  },
  {
    label: "GitHub",
    value: "github.com/dhruvramu",
    href: "https://github.com/dhruvramu",
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <Container narrow className="py-12 md:py-20">
        <ScrollReveal>
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-ink">
            Contact
          </h1>
          <p className="mt-6 font-body text-xl text-muted leading-relaxed">
            For research, writing, project collaborations, or serious
            conversations.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-16 space-y-8">
            {links.map((link) => (
              <div key={link.label} className="border-b border-line pb-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {link.label}
                </p>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-display text-2xl md:text-3xl font-medium text-ink hover:text-accent transition-colors duration-300"
                >
                  {link.value}
                </a>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <blockquote className="mt-16 pt-8 border-t border-line">
            <p className="font-display text-xl md:text-2xl italic text-ink-soft leading-relaxed">
              I read every message. I respond to the ones where I can be
              genuinely useful.
            </p>
          </blockquote>
        </ScrollReveal>
      </Container>
    </PageTransition>
  );
}
