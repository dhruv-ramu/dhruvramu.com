import { ScrollReveal } from "@/components/ScrollReveal";

const links = [
  {
    label: "Email",
    value: "dramu@ucsd.edu",
    href: "mailto:dramu@ucsd.edu",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dhruv-ramu",
    href: "https://linkedin.com/in/dhruv-ramu",
  },
  {
    label: "GitHub",
    value: "github.com/dhruvramu",
    href: "https://github.com/dhruvramu",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 py-16 md:py-24 border-t border-line"
    >
      <div className="px-6 md:px-10 lg:px-12 xl:px-14 max-w-2xl">
        <ScrollReveal>
          <p className="section-label">Contact</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Reach out.
          </h2>
          <p className="mt-4 font-body text-[17px] text-ink-soft leading-relaxed">
            Research, writing, collaborations, or serious conversations.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 space-y-6">
            {links.map((link) => (
              <div key={link.label}>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  {link.label}
                </p>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-display text-xl md:text-2xl font-medium text-ink hover:text-accent transition-colors"
                >
                  {link.value}
                </a>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
