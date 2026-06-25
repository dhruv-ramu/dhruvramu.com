"use client";

import { useSyncExternalStore } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ClientShell({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();

  return (
    <ThemeProvider>
      {isClient && <CustomCursor />}
      <SiteHeader />
      <main className="flex-1 pt-24 md:pt-28">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
