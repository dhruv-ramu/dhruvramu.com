import type { Metadata } from "next";
import Script from "next/script";
import { displaySerif, bodySerif, mono } from "@/lib/fonts";
import { ClientShell } from "@/components/ClientShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dhruv Ramu",
    template: "%s · Dhruv Ramu",
  },
  description:
    "Computational biology, biotech strategy, and notes on how people learn, build, and think.",
  openGraph: {
    title: "Dhruv Ramu",
    description:
      "A personal archive of research, strategy, and ideas spanning computational biology, cancer transcriptomics, and research education.",
    url: "https://dhruvramu.com",
    siteName: "Dhruv Ramu",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Ramu",
    description:
      "Computational biology, biotech strategy, and notes on how people learn, build, and think.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displaySerif.variable} ${bodySerif.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col paper-texture antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`}
        </Script>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
