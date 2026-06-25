"use client";

import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.12em] text-muted hover:text-ink transition-colors duration-300 px-2 py-1",
        className
      )}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "◐" : "◑"}
    </button>
  );
}
