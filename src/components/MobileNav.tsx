"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  navItems: { href: string; label: string }[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 lg:hidden border-b-2 border-ink bg-background">
      <nav
        className="flex items-center justify-between px-5 py-4"
        aria-label="Mobile navigation"
      >
        <Link
          href="/"
          className="font-display text-2xl font-medium tracking-tight text-ink"
        >
          D.R.
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
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
              {navItems.map((item, i) => (
                <li key={item.href} className="border-b border-line last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-4 py-4 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                      isActive(item.href)
                        ? "text-accent"
                        : "text-muted hover:text-ink"
                    )}
                  >
                    <span className="text-muted-light w-5">
                      {String(i).padStart(2, "0")}
                    </span>
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
