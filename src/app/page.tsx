"use client";
import { useState } from "react";
import Link from "next/link";
import { Box, Flex, Text, Button, Card } from "@radix-ui/themes";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function Home() {
  // Hamburger menu state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <main>
        {/* HERO SECTION */}
        <section id="hero" className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-br from-[#e0e7ff] via-[#f5faff] to-[#f7f0ff] relative overflow-hidden">
          <Text as="div" size="9" weight="bold" align="center" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="mb-4 text-5xl sm:text-6xl">Hello, I’m Dhruv Ramu</Text>
          <Text as="div" size="5" className="mb-8 text-gray-700">Molecular Biologist & Research Scientist</Text>
          <Flex gap="4" justify="center">
            <Button asChild size="4" radius="full" color="blue" highContrast>
              <a href="#about">Learn More →</a>
            </Button>
            <Link href="/blog" className="text-blue-700 underline underline-offset-4 font-medium text-lg hover:opacity-80 transition">Read My Blog</Link>
          </Flex>
          {/* Easter egg: animated molecule SVG */}
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="absolute left-8 top-8 opacity-20 animate-spin-slow">
            <circle cx="60" cy="60" r="50" stroke="#a5b4fc" strokeWidth="6" />
            <circle cx="60" cy="60" r="30" stroke="#38bdf8" strokeWidth="4" />
            <circle cx="60" cy="60" r="10" fill="#6366f1" />
          </svg>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-end">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              {/* Replace with actual headshot */}
              <img src="/portrait-placeholder.png" alt="Dhruv Ramu portrait" className="object-cover w-full h-full" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Text as="div" size="6" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="text-3xl">About Me</Text>
            <Text as="p" size="4" className="text-gray-700">
              I’m an undergraduate student at UC San Diego passionate about molecular biology, computational research, and building digital tools for science and health. I thrive at the intersection of data, biology, and technology, and love collaborating on impactful projects.
            </Text>
            <ul className="list-disc list-inside text-gray-700 text-lg">
              <li>Chief Research Officer at Claisen, building personalized GI health solutions</li>
              <li>15+ publications, including in bioRxiv and arXiv</li>
              <li>Co-founder, International Research Olympiad (IRO), 6000+ sign-ups worldwide</li>
            </ul>
          </div>
        </section>

        {/* FEATURED HIGHLIGHTS SECTION */}
        <section id="highlights" className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <HighlightCard
            icon={<span role="img" aria-label="Experience">💼</span>}
            title="Experience"
            summary="Chief Research Officer, 4+ years in research & leadership"
            linkHref="/experience"
            linkText="View Experience →"
          />
          <HighlightCard
            icon={<span role="img" aria-label="Research">🧪</span>}
            title="Research"
            summary="15+ publications in top journals"
            linkHref="/research"
            linkText="View Research →"
          />
          <HighlightCard
            icon={<span role="img" aria-label="Blog">📝</span>}
            title="Latest Blog Post"
            summary="How AI is Changing Science Communication"
            linkHref="/blog"
            linkText="Read on Blog →"
            date="12 July 2025"
            excerpt="Exploring the impact of generative AI on how scientists share discoveries."
          />
        </section>

        {/* CONTACT PREVIEW SECTION */}
        <section id="contact" className="max-w-2xl mx-auto px-4 py-20">
          <Text as="div" size="6" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="mb-4">Let’s connect—drop me a line below.</Text>
          <ContactForm />
          <Text as="p" size="3" className="mt-6 text-center text-gray-700">
            Or email me at: <a href="mailto:dhruv@dhruvramu.com" className="text-blue-700 underline">dhruv@dhruvramu.com</a>
          </Text>
        </section>
      </main>
    </>
  );
}

// --- NAV LINKS COMPONENT ---
function NavLinks({ onClick, mobile }: { onClick?: () => void; mobile?: boolean }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/research", label: "Research" },
    { href: "/blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <ul className={`flex ${mobile ? 'flex-col gap-8 text-2xl' : 'gap-6 text-lg'} items-center`}>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} onClick={onClick} className="hover:underline hover:scale-105 transition-all font-medium">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// --- FOOTER NAV LINKS COMPONENT ---
function FooterNavLinks() {
  const links = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/research", label: "Research" },
    { href: "/blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <ul className="flex flex-wrap gap-6 items-center">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="hover:underline hover:scale-105 transition-all font-medium">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// --- HIGHLIGHT CARD COMPONENT ---
function HighlightCard({ icon, title, summary, linkHref, linkText, date, excerpt }: { icon: React.ReactNode; title: string; summary: string; linkHref: string; linkText: string; date?: string; excerpt?: string }) {
  return (
    <Card className="flex flex-col items-center gap-4 p-8 shadow-lg hover:shadow-2xl transition-shadow bg-white/95">
      <div className="text-4xl mb-2">{icon}</div>
      <Text as="div" size="5" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}>{title}</Text>
      {date && <Text as="span" size="2" color="gray">{date}</Text>}
      <Text as="p" size="3" className="text-center text-gray-700">{summary}</Text>
      {excerpt && <Text as="p" size="2" className="text-center text-gray-500">{excerpt}</Text>}
      <Link href={linkHref} className="text-blue-700 underline underline-offset-4 font-medium hover:opacity-80 transition mt-2">{linkText}</Link>
    </Card>
  );
}

// --- CONTACT FORM COMPONENT ---
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!form.name) errs.name = "Name is required.";
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Valid email required.";
    if (!form.message) errs.message = "Message is required.";
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setStatus(null);
      return;
    }
    // Simulate async submit
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className={`rounded px-4 py-2 border ${errors.name ? "border-red-400" : "border-gray-300"} focus:border-blue-400 outline-none transition`}
      />
      {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={`rounded px-4 py-2 border ${errors.email ? "border-red-400" : "border-gray-300"} focus:border-blue-400 outline-none transition`}
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        rows={4}
        className={`rounded px-4 py-2 border ${errors.message ? "border-red-400" : "border-gray-300"} focus:border-blue-400 outline-none transition`}
      />
      {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
      <Button type="submit" size="3" color="blue" radius="full" className="mt-2">
        Submit
      </Button>
      {status === "success" && <span className="text-green-600 text-center">Message sent! I’ll get back to you soon.</span>}
      {status === "error" && <span className="text-red-600 text-center">Something went wrong. Please try again.</span>}
    </form>
  );
}
