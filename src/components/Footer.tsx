import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-24 md:mt-32 border-t border-line">
      <Container className="py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-display text-2xl md:text-3xl font-medium tracking-tight text-ink">
              Dhruv Ramu
            </p>
            <p className="mt-2 font-body text-muted max-w-sm">
              A personal archive of research, strategy, and ideas.
            </p>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.12em]">
            <Link
              href="/writing"
              className="text-muted hover:text-ink transition-colors"
            >
              Writing
            </Link>
            <Link
              href="/projects"
              className="text-muted hover:text-ink transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="text-muted hover:text-ink transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row sm:justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-light">
            © {new Date().getFullYear()} Dhruv Ramu
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-light">
            Built with care
          </p>
        </div>
      </Container>
    </footer>
  );
}
