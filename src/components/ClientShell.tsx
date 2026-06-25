"use client";

import { useSyncExternalStore } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const mobileNavItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/atlas", label: "Atlas" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "CV" },
];

export function ClientShell({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();

  return (
    <ThemeProvider>
      {isClient && <CustomCursor />}
      <Sidebar />
      <MobileNav navItems={mobileNavItems} />
      <div className="lg:ml-[220px] xl:ml-[240px] flex flex-col min-h-screen">
        <main className="flex-1 pt-[4.5rem] lg:pt-0">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
