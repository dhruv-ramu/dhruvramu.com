"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { SectionLink } from "./SectionLink";
import { cn } from "@/lib/utils";
import { siteSections } from "@/lib/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { RESUME_PDF, RESUME_DOWNLOAD_NAME } from "@/lib/resume";

export function Sidebar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const {
    enabled: onHome,
    activeSection,
    activeIndex,
    pageProgress,
    sectionProgress,
    passedSections,
  } = useScrollSpy();

  const activeMeta = siteSections[activeIndex] ?? siteSections[0];
  const spineProgress =
    siteSections.length > 1
      ? (activeIndex + sectionProgress) / (siteSections.length - 1)
      : 0;

  return (
    <aside
      className="sidebar-spine hidden lg:flex fixed left-0 top-0 z-40 h-screen flex-col border-r border-ink bg-background"
      aria-label="Site navigation"
    >
      <div className="p-5 flex-1 flex flex-col min-h-0">
        <SectionLink id="home" className="group block shrink-0">
          <span className="font-display text-3xl font-medium tracking-tighter text-ink leading-none group-hover:text-accent transition-colors duration-300">
            D.R.
          </span>
        </SectionLink>

        {onHome && (
          <div className="mt-6 shrink-0" aria-hidden>
            <div className="flex items-center gap-2.5">
              <div className="h-px flex-1 bg-line overflow-hidden">
                <motion.div
                  className="h-full bg-accent origin-left"
                  initial={false}
                  animate={{ scaleX: pageProgress }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 120, damping: 28 }
                  }
                  style={{ width: "100%" }}
                />
              </div>
              <span className="font-mono text-[9px] tabular-nums tracking-[0.08em] text-muted w-7 text-right shrink-0">
                {Math.round(pageProgress * 100)}
              </span>
            </div>
          </div>
        )}

        <nav className="mt-8 flex-1 min-h-0 relative">
          {onHome && (
            <div
              className="absolute left-[7px] top-3 bottom-3 w-px bg-line"
              aria-hidden
            >
              <motion.div
                className="absolute inset-x-0 top-0 bg-accent"
                initial={false}
                animate={{ height: `${spineProgress * 100}%` }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 90, damping: 22 }
                }
              />
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-accent ring-2 ring-background shadow-[0_0_10px_rgba(122,46,46,0.45)]"
                initial={false}
                animate={{ top: `calc(${spineProgress * 100}% - 3.5px)` }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 110, damping: 20 }
                }
              />
            </div>
          )}

          <ul className="space-y-0.5 relative">
            {siteSections.map((item, i) => {
              const active = onHome && activeSection === item.id;
              const passed = onHome && passedSections.has(item.id) && !active;
              const upcoming = onHome && i > activeIndex;

              return (
                <li key={item.id}>
                  <SectionLink
                    id={item.id}
                    className={cn(
                      "group flex items-baseline gap-2.5 py-2 pl-5 transition-all duration-300",
                      active && "text-ink",
                      passed && "text-ink-soft",
                      upcoming && "text-muted/70",
                      !onHome && "text-ink-soft hover:text-ink pl-0"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[10.5px] tracking-[0.08em] w-4 shrink-0 transition-colors duration-300",
                        active && "text-accent",
                        passed && "text-gold",
                        upcoming && "text-muted-light",
                        !onHome && "text-muted group-hover:text-gold"
                      )}
                    >
                      {item.index}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] relative flex-1">
                      <span
                        className={cn(
                          "transition-all duration-300",
                          active && "tracking-[0.14em]"
                        )}
                      >
                        {item.label}
                      </span>
                      {active && onHome && (
                        <motion.span
                          layoutId="sidebar-active"
                          className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      )}
                    </span>
                    {active && onHome && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-mono text-[8px] tabular-nums text-accent/80"
                      >
                        {Math.round(sectionProgress * 100)}
                      </motion.span>
                    )}
                  </SectionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {onHome && (
          <motion.div
            key={activeSection}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 pt-4 border-t border-line shrink-0"
            aria-live="polite"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              You are here
            </p>
            <p className="mt-1 font-display text-lg font-medium tracking-tight text-ink leading-tight">
              <span className="text-accent font-mono text-[10px] align-middle mr-1.5">
                {activeMeta.index}
              </span>
              {activeMeta.label}
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-light">
              Section {activeIndex + 1} of {siteSections.length}
            </p>
          </motion.div>
        )}

        <div className="pt-5 border-t border-line space-y-3 shrink-0">
          <a
            href={RESUME_PDF}
            download={RESUME_DOWNLOAD_NAME}
            className="block font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:text-ink transition-colors"
          >
            ↓ CV (PDF)
          </a>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
