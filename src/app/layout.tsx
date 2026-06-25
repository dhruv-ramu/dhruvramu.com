import type { Metadata } from "next";
import { displaySerif, bodySerif, mono } from "@/lib/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col paper-texture antialiased">
        <ThemeProvider>
          <CustomCursor />
          <SiteHeader />
          <main className="flex-1 pt-24 md:pt-28">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
