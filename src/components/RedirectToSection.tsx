"use client";

import { useEffect } from "react";
import type { SiteSectionId } from "@/lib/nav";

export function RedirectToSection({ id }: { id: SiteSectionId }) {
  useEffect(() => {
    window.location.replace(`/#${id}`);
  }, [id]);

  return null;
}
