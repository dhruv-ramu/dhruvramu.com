"use client";

import Link from "next/link";
import { homeSectionHref, type HomeSectionId } from "@/lib/nav";

function scrollToSection(id: HomeSectionId) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", homeSectionHref(id));
  }
}

interface SectionLinkProps {
  id: HomeSectionId;
  children: React.ReactNode;
  className?: string;
}

export function SectionLink({ id, children, className }: SectionLinkProps) {
  return (
    <Link
      href={homeSectionHref(id)}
      className={className}
      onClick={(e) => {
        if (window.location.pathname === "/") {
          e.preventDefault();
          scrollToSection(id);
        }
      }}
    >
      {children}
    </Link>
  );
}
