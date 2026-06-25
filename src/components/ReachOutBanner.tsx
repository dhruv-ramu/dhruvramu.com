import Link from "next/link";

const EMAIL = "dramu@ucsd.edu";

export function ReachOutBanner() {
  return (
    <div
      className="border-t border-line bg-paper-deep"
      aria-label="Contact"
    >
      <div className="px-6 md:px-10 lg:px-12 xl:px-14 py-4 md:py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted shrink-0">
          Reach out
        </span>
        <Link
          href={`mailto:${EMAIL}`}
          className="font-body text-[17px] md:text-lg text-ink-soft hover:text-accent transition-colors"
        >
          <span className="text-muted">dramu@</span>ucsd.edu
        </Link>
      </div>
    </div>
  );
}
