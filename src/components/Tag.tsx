import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-muted border border-line rounded-full px-3 py-1",
        className
      )}
    >
      {children}
    </span>
  );
}
