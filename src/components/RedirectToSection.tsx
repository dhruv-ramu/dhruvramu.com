"use client";

import { useEffect } from "react";
import type { HomeSectionId } from "@/lib/nav";

export function RedirectToSection({ id }: { id: HomeSectionId }) {
  useEffect(() => {
    window.location.replace(`/#${id}`);
  }, [id]);

  return null;
}
