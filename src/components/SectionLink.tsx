"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sectionHref, type SiteSectionId } from "@/lib/nav";

function scrollToSection(id: SiteSectionId) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", sectionHref(id));
  }
}

interface SectionLinkProps {
  id: SiteSectionId;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}

export function SectionLink({
  id,
  className,
  children,
  onNavigate,
}: SectionLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={sectionHref(id)}
      className={cn(className)}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          scrollToSection(id);
          onNavigate?.();
        }
      }}
    >
      {children}
    </Link>
  );
}
