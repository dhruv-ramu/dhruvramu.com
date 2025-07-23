import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IBM_Plex_Serif } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "Dhruv Ramu Portfolio & Blog",
  description: "Professional portfolio and blog for Dhruv Ramu, researcher and front-end expert.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSerif.variable} antialiased bg-white text-gray-900`}>
        <Theme appearance="light" accentColor="blue" radius="large">
          <Header />
          <main className="min-h-[80vh] flex flex-col">{children}</main>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
