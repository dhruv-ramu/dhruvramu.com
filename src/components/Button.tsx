import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  external?: boolean;
}

export function Button({
  href,
  children,
  variant = "secondary",
  className,
  onClick,
  type = "button",
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.12em] rounded-full px-6 py-3 border transition-all duration-300 ease-out";

  const variants = {
    primary:
      "bg-ink text-paper border-ink hover:bg-accent-ink hover:border-accent-ink",
    secondary:
      "bg-paper/70 text-ink border-line hover:bg-paper-deep hover:border-line-dark",
    ghost:
      "bg-transparent text-muted border-transparent hover:text-ink hover:border-line",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
