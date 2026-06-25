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
  download?: string | boolean;
}

export function Button({
  href,
  children,
  variant = "secondary",
  className,
  onClick,
  type = "button",
  external,
  download,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.14em] px-7 py-3.5 border-2 transition-all duration-300 ease-out";

  const variants = {
    primary:
      "bg-ink text-paper border-ink hover:bg-accent hover:border-accent",
    secondary:
      "bg-transparent text-ink border-ink hover:bg-ink hover:text-paper",
    ghost:
      "bg-transparent text-muted border-transparent hover:text-ink hover:border-line border-b-2 border-t-0 border-x-0 rounded-none px-2",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    if (external || download) {
      return (
        <a
          href={href}
          className={classes}
          target={download ? undefined : "_blank"}
          rel={download ? undefined : "noopener noreferrer"}
          download={download || undefined}
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
