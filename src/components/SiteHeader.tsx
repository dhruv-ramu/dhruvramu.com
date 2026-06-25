"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { siteNav } from "@/lib/nav";

function isActive(pathname: string, href: string, exact?: boolean) {
  if (href.startsWith("/#")) return pathname === "/";
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  exact,
  onClick,
  className,
}: {
  href: string;
  label: string;
  exact?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, href, exact);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200",
        active ? "text-ink" : "text-muted hover:text-ink",
        className
      )}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="block h-px bg-accent mt-0.5"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-background/92 backdrop-blur-md">
      <Container wide className="py-4 md:py-5">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display text-2xl md:text-[1.65rem] font-medium tracking-tighter text-ink hover:text-accent transition-colors shrink-0"
          >
            D.R.
          </Link>

          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-9"
            aria-label="Main navigation"
          >
            {siteNav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                exact={"exact" in item ? item.exact : false}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <button
              type="button"
              className="lg:hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink border border-ink px-3 py-1.5"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-line bg-paper"
          >
            <nav className="px-6 py-4 flex flex-col gap-4" aria-label="Mobile navigation">
              {siteNav.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  exact={"exact" in item ? item.exact : false}
                  onClick={() => setOpen(false)}
                />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
