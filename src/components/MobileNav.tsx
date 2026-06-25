"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  navItems: { href: string; label: string }[];
  isActive: (href: string) => boolean;
}

export function MobileNav({ navItems, isActive }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[620px] md:hidden">
      <nav
        className="flex items-center justify-between px-4 py-2.5 rounded-2xl border border-line bg-paper/85 backdrop-blur-md shadow-[0_2px_20px_rgba(21,18,14,0.04)]"
        aria-label="Mobile navigation"
      >
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.14em] text-ink-soft"
        >
          D.R.
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-2 p-4 rounded-2xl border border-line bg-paper/95 backdrop-blur-md"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block font-mono text-[11px] uppercase tracking-[0.12em] px-3 py-2.5 rounded-lg transition-colors",
                      isActive(item.href)
                        ? "text-ink bg-paper-deep"
                        : "text-muted hover:text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
