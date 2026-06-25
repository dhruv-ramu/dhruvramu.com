"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", index: "00" },
  { href: "/projects", label: "Projects", index: "01" },
  { href: "/writing", label: "Writing", index: "02" },
  { href: "/atlas", label: "Atlas", index: "03" },
  { href: "/library", label: "Library", index: "04" },
  { href: "/about", label: "About", index: "05" },
  { href: "/resume", label: "CV", index: "06" },
];

export function Sidebar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-[220px] xl:w-[240px] flex-col border-r-2 border-ink bg-background"
      aria-label="Site navigation"
    >
      <div className="p-8 xl:p-10 flex-1 flex flex-col">
        <Link href="/" className="group block">
          <span className="font-display text-5xl xl:text-6xl font-medium tracking-tighter text-ink leading-none group-hover:text-accent transition-colors duration-500">
            D.R.
          </span>
          <span className="block mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-muted leading-relaxed">
            Archive
            <br />
            Est. 2024
          </span>
        </Link>

        <nav className="mt-16 flex-1">
          <ul className="space-y-1">
            {navItems.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-baseline gap-3 py-2.5 transition-colors duration-300",
                      active ? "text-ink" : "text-muted hover:text-ink"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-[0.1em] w-5 shrink-0 transition-colors",
                        active ? "text-accent" : "text-muted-light group-hover:text-gold"
                      )}
                    >
                      {item.index}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] relative">
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="sidebar-active"
                          className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pt-8 border-t border-line">
          <ThemeToggle />
          <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-light leading-relaxed">
            Computational
            <br />
            biology · strategy
            <br />
            · research
          </p>
        </div>
      </div>

      {!prefersReducedMotion && (
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none opacity-[0.07] overflow-hidden"
          aria-hidden
        >
          <p className="font-display text-[8rem] leading-none text-ink whitespace-nowrap -translate-x-4">
            Ramu
          </p>
        </div>
      )}
    </aside>
  );
}
