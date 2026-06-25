"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { siteSections, type SiteSectionId } from "@/lib/nav";

export type ScrollSpyState = {
  activeSection: SiteSectionId;
  activeIndex: number;
  pageProgress: number;
  sectionProgress: number;
  passedSections: Set<SiteSectionId>;
};

const defaultState: ScrollSpyState = {
  activeSection: "home",
  activeIndex: 0,
  pageProgress: 0,
  sectionProgress: 0,
  passedSections: new Set(),
};

export function useScrollSpy() {
  const pathname = usePathname();
  const enabled = pathname === "/";
  const [state, setState] = useState<ScrollSpyState>(defaultState);

  const update = useCallback(() => {
    if (!enabled) return;

    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pageProgress =
      docHeight > 0
        ? Math.min(1, Math.max(0, window.scrollY / docHeight))
        : 0;

    const readingLine = window.scrollY + window.innerHeight * 0.32;

    const metrics = siteSections
      .map((section) => {
        const el = document.getElementById(section.id);
        if (!el) return null;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        return { id: section.id, top, bottom: top + height, height };
      })
      .filter((m): m is NonNullable<typeof m> => m !== null);

    if (metrics.length === 0) return;

    let activeIndex = 0;
    let sectionProgress = 0;
    const passedSections = new Set<SiteSectionId>();

    for (let i = 0; i < metrics.length; i++) {
      const current = metrics[i];
      const next = metrics[i + 1];

      if (readingLine >= current.top) {
        passedSections.add(current.id);
      }

      const sectionEnd = next ? next.top : current.bottom;
      const inSection =
        readingLine >= current.top &&
        (i === metrics.length - 1 || readingLine < sectionEnd);

      if (inSection) {
        activeIndex = i;
        const span = Math.max(sectionEnd - current.top, 1);
        sectionProgress = Math.min(
          1,
          Math.max(0, (readingLine - current.top) / span)
        );
        break;
      }

      if (i === metrics.length - 1 && readingLine >= current.top) {
        activeIndex = i;
        sectionProgress = 1;
      }
    }

    setState({
      activeSection: siteSections[activeIndex]?.id ?? "home",
      activeIndex,
      pageProgress,
      sectionProgress,
      passedSections,
    });
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setState(defaultState);
      return;
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled, update]);

  return { ...state, enabled };
}
