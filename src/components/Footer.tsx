import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <Container wide className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <p className="font-display text-5xl md:text-7xl font-medium tracking-tighter text-ink leading-none">
              Dhruv
              <br />
              <span className="italic text-accent-ink">Ramu</span>
            </p>
            <p className="mt-6 font-body text-lg text-muted max-w-md leading-relaxed">
              A personal archive of research, strategy, and ideas — not a
              portfolio template.
            </p>
          </div>

          <div className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
            {[
              { href: "/writing", label: "Writing" },
              { href: "/projects", label: "Projects" },
              { href: "/atlas", label: "Atlas" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:text-accent hover:translate-x-2 transition-all duration-300 inline-block"
              >
                → {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row sm:justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-light">
            © {new Date().getFullYear()} Dhruv Ramu
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-light">
            San Diego · Est. 2024
          </p>
        </div>
      </Container>
    </footer>
  );
}
