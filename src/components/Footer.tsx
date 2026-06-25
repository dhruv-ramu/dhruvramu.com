import { sectionHref } from "@/lib/nav";
import { Container } from "./Container";

const EMAIL = "hello@dhruvramu.com";

const links = [
  { href: sectionHref("writing"), label: "Writing" },
  { href: sectionHref("projects"), label: "Projects" },
  { href: sectionHref("library"), label: "Library" },
  { href: sectionHref("contact"), label: "Contact" },
  { href: `mailto:${EMAIL}`, label: "Email", external: true },
  { href: "https://github.com/dhruvramu", label: "GitHub", external: true },
  { href: "https://linkedin.com/in/dhruv-ramu", label: "LinkedIn", external: true },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <Container wide className="py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <p className="font-display text-3xl md:text-4xl font-medium tracking-tighter text-ink leading-none">
              Dhruv <span className="italic text-accent-ink">Ramu</span>
            </p>
            <p className="mt-4 font-body text-[17px] text-ink-soft max-w-md leading-relaxed">
              Research, strategy, and ideas.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="text-muted hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  → {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  → {link.label}
                </a>
              )
            )}
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-line flex flex-col sm:flex-row sm:justify-between gap-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
            © {new Date().getFullYear()} Dhruv Ramu
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
            San Diego
          </p>
        </div>
      </Container>
    </footer>
  );
}
