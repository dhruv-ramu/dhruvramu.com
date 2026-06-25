"use client";

import { useSyncExternalStore } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { HashScroll } from "@/components/HashScroll";

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
      <HashScroll />
      <SiteHeader />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
