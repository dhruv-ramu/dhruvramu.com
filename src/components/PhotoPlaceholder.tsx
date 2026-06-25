import { cn } from "@/lib/utils";

type AspectRatio = "square" | "4/3" | "16/9" | "3/4" | "21/9";

const aspectClasses: Record<AspectRatio, string> = {
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "3/4": "aspect-[3/4]",
  "21/9": "aspect-[21/9]",
};

interface PhotoPlaceholderProps {
  aspectRatio?: AspectRatio;
  caption?: string;
  label?: string;
  className?: string;
  variant?: "default" | "hero" | "inline" | "portrait";
}

export function PhotoPlaceholder({
  aspectRatio = "4/3",
  caption,
  label = "Photograph",
  className,
  variant = "default",
}: PhotoPlaceholderProps) {
  const ratio =
    variant === "portrait"
      ? "3/4"
      : variant === "hero"
        ? "21/9"
        : aspectRatio;

  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-line bg-paper-deep",
          aspectClasses[ratio],
          variant === "hero" && "rounded-3xl"
        )}
      >
        {/* Subtle cross-hatch texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              var(--ink) 0,
              var(--ink) 1px,
              transparent 1px,
              transparent 12px
            ),
            repeating-linear-gradient(
              -45deg,
              var(--ink) 0,
              var(--ink) 1px,
              transparent 1px,
              transparent 12px
            )`,
          }}
          aria-hidden
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-light">
            {label}
          </span>
          <span className="font-display text-lg md:text-xl italic text-muted/60 text-center max-w-[200px]">
            Placeholder
          </span>
        </div>

        {/* Corner marks */}
        <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-line-dark opacity-40" aria-hidden />
        <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-line-dark opacity-40" aria-hidden />
        <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-line-dark opacity-40" aria-hidden />
        <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-line-dark opacity-40" aria-hidden />
      </div>

      {caption && (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
