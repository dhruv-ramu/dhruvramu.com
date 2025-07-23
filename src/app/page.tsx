"use client";
import { useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import { Box, Flex, Text, Button, Card } from "@radix-ui/themes";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

export default function Home() {
  // Hamburger menu state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <main>
        {/* HERO SECTION */}
        <section id="hero" className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-br from-[#e0e7ff] via-[#f5faff] to-[#f7f0ff] relative overflow-hidden">
          {/* Animated SVG background */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none animate-pulse-slow" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{zIndex:0}}>
            <path fill="#a5b4fc" fillOpacity="0.3" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
          </svg>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-300 shadow-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mb-6 animate-fade-in">
              <img src="/images/PassportPhoto Background Removed.png" alt="Dhruv Ramu portrait" className="object-cover w-full h-full" />
            </div>
            <AnimatedPeriodHero />
            <Text as="div" size="5" className="mb-6 text-gray-700 animate-fade-in delay-100">Researching Computational and Molecular Biology</Text>
            <Flex gap="4" justify="center" className="animate-fade-in delay-200 mt-2">
              <Button asChild size="4" radius="full" color="blue" highContrast className="transition-transform hover:scale-105">
                <a href="#about">Learn More →</a>
              </Button>
              <Button asChild size="4" radius="full" color="blue" variant="soft" className="transition-transform hover:scale-105">
                <a href="#contact">Contact</a>
              </Button>
              <Button asChild size="4" radius="full" color="blue" variant="outline" className="transition-transform hover:scale-105">
                <a href="/blog">Read My Blog</a>
              </Button>
            </Flex>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="max-w-5xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center md:justify-end items-center animate-fade-in">
            <div className="relative flex items-center justify-center group about-image-spacer" style={{ minHeight: '400px', marginRight: '2.5rem' }}>
              {/* Gradient ring */}
              <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-200 via-blue-400 to-blue-100 opacity-50 blur-2xl animate-pulse-slow z-0" />
              {/* Glassy overlay */}
              <div className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full bg-white/20 backdrop-blur-md z-10 pointer-events-none" style={{ boxShadow: '0 12px 48px 0 rgba(80,120,200,0.18)' }} />
              {/* Main image with drop shadow and hover effect */}
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-8 border-blue-300 shadow-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center z-20 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_24px_80px_0_rgba(80,120,200,0.25)] animate-float">
                <img src="/images/Dhruv_Background.png" alt="Dhruv Ramu background" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 animate-fade-in delay-100">
            <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-lg p-8">
              <Text as="div" size="6" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="text-3xl mb-2">About Me</Text>
              <Text as="p" size="4" className="text-gray-700 mb-4">
                I’m an undergraduate student at UC San Diego passionate about molecular biology, computational research, and building digital tools for science and health. I thrive at the intersection of data, biology, and technology, and love collaborating on impactful projects.
              </Text>
              <ul className="list-disc list-inside text-gray-700 text-lg mb-2">
                <li><span className="inline-block mr-2">🏥</span> Chief Research Officer at Claisen, building personalized GI health solutions</li>
                <li><span className="inline-block mr-2">📄</span> Various publications in computational biology and computer science</li>
                <li><span className="inline-block mr-2">🌍</span> Co-founder, International Research Olympiad (IRO), 6000+ sign-ups worldwide</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FEATURED HIGHLIGHTS SECTION */}
        <section id="highlights" className="max-w-6xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-in delay-200">
          <HighlightCard
            icon={<span role="img" aria-label="Experience">💼</span>}
            title="Experience"
            summary="Chief Research Officer, experience in research, strategy & leadership"
            linkHref="/experience"
            linkText="View Experience →"
          />
          <HighlightCard
            icon={<span role="img" aria-label="Research">🧪</span>}
            title="Research"
            summary="Multiple publications"
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
        <section id="contact" className="max-w-2xl mx-auto px-4 py-24 animate-fade-in delay-300">
          <div className="backdrop-blur-md bg-white/80 rounded-2xl shadow-xl p-10">
            <Text as="div" size="6" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="mb-4">Let’s connect—drop me a line below.</Text>
            <ContactForm />
            <Text as="p" size="3" className="mt-6 text-center text-gray-700">
              Or email me at: <a href="mailto:contact@dhruvramu.com" className="text-blue-700 underline">contact@dhruvramu.com</a>
            </Text>
          </div>
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

// --- HERO HEADING WITH ANIMATED PERIOD ---
function AnimatedPeriodHero() {
  const [bouncing, setBouncing] = useState(false);
  const periodRef = useRef<HTMLSpanElement>(null);

  function handleClick() {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 700);
  }

  return (
    <Text as="div" size="9" weight="bold" align="center" style={{ fontFamily: 'var(--font-ibm-plex-serif)', whiteSpace: 'nowrap' }} className="mb-4 text-5xl sm:text-6xl tracking-tight animate-fade-in hero-heading-nowrap">
      Hello, I’m{' '}
      <span className="hero-dhruv-underline-group" style={{ display: 'inline-block', position: 'relative', verticalAlign: 'baseline' }}>
        <span style={{ display: 'inline', position: 'relative', zIndex: 1 }}>Dhruv</span>
        <span className="hero-dhruv-underline-svg" style={{ position: 'absolute', left: 0, right: 0, bottom: '-6px', width: '100%', height: '18px', opacity: 0, pointerEvents: 'none', transition: 'opacity 0.25s' }}>
          <svg viewBox="0 0 100 18" width="100" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M5 15 Q 30 5, 55 15 Q 80 25, 95 10" stroke="#2563eb" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>
        </span>
      </span>
      <span style={{ marginLeft: '0.2em' }}>Ramu</span>
      <span
        ref={periodRef}
        onClick={handleClick}
        className={`inline-block cursor-pointer ml-1 align-baseline hero-period-bounceable${bouncing ? ' hero-period-bounce' : ''}`}
        style={{ color: '#2563eb', fontWeight: 900 }}
        title="Click me!"
      >
        .
      </span>
    </Text>
  );
}

/* Add to your global CSS or <style jsx global>:
.hero-period-bounceable {
  transition: transform 0.2s;
}
.hero-period-bounce {
  animation: heroBounce 0.7s cubic-bezier(0.4,0,0.2,1);
}
@keyframes heroBounce {
  0% { transform: translateY(0); }
  20% { transform: translateY(-32px) scale(1.2); }
  40% { transform: translateY(0) scale(1); }
  60% { transform: translateY(-16px) scale(1.1); }
  80% { transform: translateY(0) scale(1); }
  100% { transform: translateY(0); }
}
.hero-dhruv-underline-group {
  display: inline-block;
  position: relative;
}
.hero-dhruv-underline-svg {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  width: 100%;
  height: 18px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s;
}
.hero-dhruv-underline-group:hover .hero-dhruv-underline-svg {
  opacity: 1 !important;
}
.hero-heading-nowrap {
  white-space: nowrap;
}
@media (max-width: 600px) {
  .hero-heading-nowrap {
    white-space: normal;
  }
}
*/
