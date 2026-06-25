import { cn } from "@/lib/utils";

interface EditorialSectionProps {
  index?: string;
  label: string;
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
  bleed?: boolean;
}

export function EditorialSection({
  index,
  label,
  title,
  description,
  children,
  className,
  invert = false,
  bleed = false,
}: EditorialSectionProps) {
  return (
    <section
      className={cn(
        "relative",
        bleed && "w-screen ml-[calc(50%-50vw)]",
        invert ? "bg-ink text-paper" : "",
        className
      )}
    >
      {index && (
        <span
          className={cn(
            "giant-index pointer-events-none select-none",
            invert ? "text-paper" : "text-ink"
          )}
          aria-hidden
        >
          {index}
        </span>
      )}

      <div className={cn("relative z-10", bleed && "px-6 md:px-10 lg:px-16 xl:px-20")}>
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span
              className={cn(
                "section-label !mb-0",
                invert && "!text-paper/50"
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "flex-1 h-px",
                invert ? "bg-paper/20" : "bg-line"
              )}
              aria-hidden
            />
          </div>
          {title && (
            <h2
              className={cn(
                "font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.02] max-w-4xl",
                invert ? "text-paper" : "text-ink"
              )}
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              className={cn(
                "mt-5 font-body text-lg md:text-xl leading-relaxed max-w-2xl",
                invert ? "text-paper/70" : "text-muted"
              )}
            >
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
