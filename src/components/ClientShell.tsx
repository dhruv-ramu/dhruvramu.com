"use client";

import { useSyncExternalStore } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
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
      <Sidebar />
      <MobileNav />
      <div className="main-content flex flex-col min-h-screen">
        <main className="flex-1 pt-[3.75rem] lg:pt-0 overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
