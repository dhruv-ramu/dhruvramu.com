"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, Flex } from "@radix-ui/themes";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e5e7eb", boxShadow: "0 1px 8px 0 rgba(0,0,0,0.03)" }}>
      <Flex align="center" justify="between" px="5" py="3" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Link href="/" className="text-2xl font-bold tracking-tight" style={{ color: "#171717", textDecoration: "none" }}>
          Dhruv Ramu
        </Link>
        <ul style={{ display: "flex", gap: 16, alignItems: "center", listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <motion.li
              key={link.href}
              whileHover={{ scale: 1.03, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
              style={{ display: "inline-block" }}
            >
              <Link
                href={link.href}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  color: "#444",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background 0.2s",
                  display: "inline-block",
                }}
                className="hover:bg-gray-100"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
          <li>
            <Button asChild size="3" radius="full" color="blue" highContrast style={{ fontWeight: 600, marginLeft: 12 }}>
              <a
                href="/DhruvRamu_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </Button>
          </li>
        </ul>
      </Flex>
    </header>
  );
} 