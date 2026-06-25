import { cn } from "@/lib/utils";

interface EditorialSectionProps {
  index?: string;
  label: string;
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
  titleSize?: "default" | "large" | "medium";
}

export function EditorialSection({
  index,
  label,
  title,
  description,
  children,
  className,
  invert = false,
  titleSize = "default",
}: EditorialSectionProps) {
  const titleClasses = {
    default: "text-3xl md:text-4xl lg:text-5xl",
    large: "text-4xl md:text-5xl lg:text-6xl",
    medium: "text-2xl md:text-3xl lg:text-4xl",
  };

  return (
    <section
      className={cn(
        "relative px-6 md:px-10 lg:px-12 xl:px-14",
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

      <div className="relative z-10">
        <header className="mb-10 md:mb-12">
          <div className="flex items-center gap-4 mb-5">
            <span
              className={cn(
                "section-label !mb-0",
                invert && "!text-paper/60"
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
                "font-display font-medium tracking-tight leading-[1.08] max-w-3xl",
                titleClasses[titleSize],
                invert ? "text-paper" : "text-ink"
              )}
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              className={cn(
                "mt-4 font-body text-[17px] md:text-lg leading-relaxed max-w-2xl",
                invert ? "text-paper/75" : "text-ink-soft"
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
