"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Flex, Text, Box } from "@radix-ui/themes";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const socials = [
  { href: "https://github.com/dhruvramu", label: "GitHub", icon: <GitHubLogoIcon width={20} height={20} /> },
  { href: "https://linkedin.com/in/dhruvramu", label: "LinkedIn", icon: <LinkedInLogoIcon width={20} height={20} /> },
  // Add ORCID and Google Scholar SVGs or use placeholder icons
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ width: "100%", borderTop: "1px solid #e5e7eb", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", padding: "2rem 0", marginTop: 64 }}
    >
      <Flex direction={{ initial: "column", md: "row" }} align="center" justify="between" style={{ maxWidth: 1200, margin: "0 auto", gap: 24, padding: "0 1.5rem" }}>
        <Text as="span" size="2" style={{ fontFamily: 'serif', color: '#444' }}>
          © 2025 Dhruv Ramu · <Link href="/privacy" style={{ textDecoration: "underline" }}>Privacy</Link> · <Link href="/terms" style={{ textDecoration: "underline" }}>Terms</Link>
        </Text>
        <Flex gap="4">
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{ color: "#444", opacity: 0.8, transition: "opacity 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.opacity = "1")}
              onMouseOut={e => (e.currentTarget.style.opacity = "0.8")}
            >
              {s.icon}
            </a>
          ))}
        </Flex>
      </Flex>
    </motion.footer>
  );
} 