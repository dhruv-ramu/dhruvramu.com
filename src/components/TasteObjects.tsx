import { cn } from "@/lib/utils";

interface TasteObjectProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

export function TasteObject({ title, subtitle, children, className }: TasteObjectProps) {
  return (
    <div className={cn("taste-object", className)}>
      <div className="taste-object-vignette border-2 border-ink rounded-xl bg-paper-deep shadow-[3px_3px_0_var(--line-dark)] min-h-[180px]">
        {children}
      </div>
      <div className="mt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {subtitle}
        </p>
        <p className="mt-1 font-display text-xl text-ink">{title}</p>
      </div>
    </div>
  );
}

export function FilmCameraIllustration() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="relative w-32 h-24">
        <div className="absolute inset-x-2 top-4 h-14 bg-ink rounded-lg" />
        <div className="absolute left-6 top-6 w-10 h-10 rounded-full border-4 border-paper bg-paper-deep" />
        <div className="absolute right-4 top-5 w-8 h-5 bg-paper-deep rounded-sm" />
        <div className="absolute -top-1 left-10 w-12 h-4 bg-ink rounded-t-sm" />
      </div>
    </div>
  );
}

export function CoffeeIllustration() {
  return (
    <div className="flex items-end justify-center h-full p-6 gap-3">
      <div className="w-14 h-16 border-2 border-ink rounded-b-xl bg-paper relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-3 bg-paper-deep rounded-full opacity-60" />
        <div className="absolute top-2 inset-x-2 h-8 bg-accent/20 rounded" />
      </div>
      <div className="w-8 h-10 border-2 border-ink rounded bg-paper-deep mb-1" />
    </div>
  );
}

export function NotebookIllustration() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="w-24 h-32 border-2 border-ink bg-paper shadow-[3px_3px_0_var(--line-dark)] relative">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute left-3 right-3 h-px bg-line"
            style={{ top: `${18 + i * 14}%` }}
          />
        ))}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent/40" />
      </div>
    </div>
  );
}
