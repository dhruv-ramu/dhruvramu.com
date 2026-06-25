"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "CV" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[620px] hidden md:block"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border border-line bg-paper/90 shadow-[0_2px_20px_rgba(21,18,14,0.04)]"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-mono text-[11px] tracking-[0.14em] text-ink-soft hover:text-ink hover:bg-paper-deep rounded-full px-2 py-1 transition-all duration-300 shrink-0"
          >
            D.R.
          </Link>

          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative font-mono text-[11px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full transition-all duration-300",
                      active
                        ? "text-ink"
                        : "text-muted hover:text-ink hover:bg-paper-deep hover:border-line border border-transparent"
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-paper-deep rounded-full -z-10 border border-line-dark"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle className="hover:bg-paper-deep rounded-full px-1 transition-colors duration-300" />
        </nav>
      </motion.header>

      <MobileNav navItems={navItems} isActive={isActive} />
    </>
  );
}
