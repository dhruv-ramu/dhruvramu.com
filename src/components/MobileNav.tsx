"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { SectionLink } from "./SectionLink";
import { cn } from "@/lib/utils";
import { siteSections } from "@/lib/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { enabled: onHome, activeSection, pageProgress } = useScrollSpy();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 lg:hidden border-b-2 border-ink bg-background">
      <nav
        className="flex items-center justify-between px-5 py-4"
        aria-label="Mobile navigation"
      >
        <SectionLink id="home" className="font-display text-2xl font-medium tracking-tight text-ink">
          D.R.
        </SectionLink>

        <div className="flex items-center gap-3">
          {onHome && (
            <span className="font-mono text-[9px] tabular-nums tracking-[0.1em] text-muted hidden sm:inline">
              {Math.round(pageProgress * 100)}%
            </span>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink border border-ink px-3 py-1.5"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-paper"
          >
            <ul className="px-5 py-4 flex flex-col gap-0">
              {siteSections.map((item) => {
                const active = onHome && activeSection === item.id;
                return (
                  <li key={item.id} className="border-b border-line last:border-b-0">
                    <SectionLink
                      id={item.id}
                      onNavigate={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-4 py-4 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                        active ? "text-accent" : "text-muted hover:text-ink"
                      )}
                    >
                      <span className="text-muted-light w-5">{item.index}</span>
                      {item.label}
                    </SectionLink>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
