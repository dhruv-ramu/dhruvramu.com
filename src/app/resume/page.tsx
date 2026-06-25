import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Button } from "@/components/Button";
import { RESUME_PDF, RESUME_DOWNLOAD_NAME } from "@/lib/resume";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Dhruv Ramu — education, experience, research, leadership, and skills.",
};

const contact = {
  email: "dramu@ucsd.edu",
  phone: "(619) 953-8151",
  location: "San Diego, CA",
  linkedin: "https://linkedin.com/in/dhruv-ramu",
};

const education = {
  institution: "University of California, San Diego (UCSD)",
  period: "Expected June 2028",
  degree: "B.S. Molecular & Cell Biology · B.S. Business Economics",
  gpa: "GPA: 3.8 / 4.0",
  coursework:
    "Accounting, Product Marketing, Multivariable Calculus, Organic Chemistry, Statistics, Ethics",
};

const experience = [
  {
    title: "Life Sciences Strategy Analyst",
    organization: "Illudent Therapeutics",
    location: "San Diego, CA",
    period: "Summer 2026",
    bullets: [
      "Evaluated genomic, preclinical, and biomarker datasets spanning 7 therapeutic markers to identify efficacy signals, characterize responder populations, and support development strategy for the company's lead precision-oncology drug.",
      "Supported Phase I clinical-development planning through analysis of patient-selection criteria, biomarker strategies, 5+ competing oncology programs, and 10+ contract research organizations (CROs), informing trial-design and execution decisions.",
      "Developed analyses for Series B funding pitches integrating clinical outcomes, competitive benchmarking, and market dynamics to support fundraising discussions and articulate the commercial value proposition of the company's oncology pipeline.",
    ],
  },
  {
    title: "Research & Strategy Intern",
    organization: "Claisen, Healthcare Startup",
    location: "Boston, MA",
    period: "Summer 2025",
    bullets: [
      "Negotiated supplier contracts and redesigned fulfillment logistics for GI-focused products, reducing unit COGS by 21%.",
      "First author on digital health framework paper and named inventor on USPTO patent filing on personalized treatment pathways.",
      "Led HIPAA compliance training for workforce and implementation across full tech stack (data storage and transmission).",
      "Co-developed integrated 3-statement and LTV/CAC model projecting $5M+ ARR, informing pricing and capital allocation.",
    ],
  },
  {
    title: "Research Intern",
    organization: "Indian Institute of Science (IISc)",
    location: "Bangalore, India",
    period: "Summer 2024",
    bullets: [
      "Analyzed RNA-seq and survival datasets across 20,000+ genes to identify prognostic cancer biomarkers using regression, clustering, Kaplan–Meier, and Cox proportional hazards models, translating data into interpretable genomic hypotheses.",
      "Presented findings at university symposium and co-authored research output with collaborators from IISc and Texas A&M.",
    ],
  },
];

const leadership = [
  {
    title: "Co-Founder & Board Member",
    organization: "International Research Olympiad (501(c)(3))",
    location: "Boston, MA",
    period: "2023 – Present",
    bullets: [
      "Co-founded global research-focused Olympiad, scaling to 13,000+ participants in 80+ countries with 200+ school clubs while leading 15+ staff across curriculum, operations, partnerships, and events spanning online and in-person competitions.",
      "Raised $82,500, built 32-exam curriculum and textbook; hosted finals at Harvard University in 2024, 2025, and 2026.",
    ],
  },
  {
    title: "Associate",
    organization: "Triton Consulting Group (TCG), UCSD",
    location: "UCSD",
    period: "2026 – Present",
    bullets: [
      "Associate at UCSD's premier pro-bono consulting club serving San Diego clients across technology, real estate, and hospitality sectors; delivered market entry, pricing, customer outreach, and operational strategy recommendations.",
    ],
  },
];

const projects = [
  {
    title: "Immersive Real Estate Visualization Strategy",
    bullets: [
      "Developed commercialization strategy for the startup Interlink Spatial, a virtual-tour platform, through primary research with 20+ wedding venues, country clubs, and real estate brokers; conducted customer segmentation, competitive benchmarking, and buyer-journey analysis to identify destination weddings and luxury real estate as highest-priority beachhead markets.",
    ],
  },
  {
    title: "Qualcomm Institute Entrepreneurship — Refrigerant Leak Detection",
    bullets: [
      "Assessed four industrial markets for leak-detection analytics using ROI, regulatory-compliance, and refrigerant-loss models; identified retail refrigeration as the highest-value entry segment and designed a GTM strategy targeting grocery operators.",
    ],
  },
  {
    title: "Industrial Oil Compliance Operations Platform",
    bullets: [
      "Conducted 10+ customer interviews with environmental consultants and industrial-facility operators to identify compliance-management pain points across inspection, documentation, and audit-preparation workflows.",
      "Translated EPA SPCC regulations into a compliance-operations dashboard prototype, designing inspection-tracking and audit-record systems to evaluate product-market fit and commercial viability among users (truck depots, construction, farms).",
    ],
  },
];

const skills = {
  technical:
    "Python (pandas, NumPy, scikit-learn), R, SQL, Excel, Stata, financial modeling, RNA-seq analysis",
  languages: "English, Spanish (B2+), Gujarati, Hindi",
  interests:
    "Tang Soo Do black belt, running, hiking, badminton, camping, volunteer computer science teaching",
};

function CvEntry({
  title,
  organization,
  location,
  period,
  bullets,
}: {
  title: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
}) {
  return (
    <div className="py-8 border-b border-line last:border-b-0">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
        <div>
          <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-ink">
            {title}
          </h3>
          <p className="mt-1 font-body italic text-muted">
            {organization} · {location}
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted shrink-0">
          {period}
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {bullets.map((bullet) => (
          <li
            key={bullet.slice(0, 48)}
            className="font-body text-ink-soft leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1 before:h-1 before:rounded-full before:bg-line-dark"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <PageTransition>
      <Container className="py-12 md:py-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <ScrollReveal className="flex-1">
            <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-ink">
              Curriculum Vitae
            </h1>
            <p className="mt-4 font-display text-2xl md:text-3xl font-medium text-ink-soft">
              Dhruv Ramu
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.06em] text-muted">
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-accent transition-colors"
              >
                {contact.email}
              </a>
              <span className="text-muted-light" aria-hidden>
                ·
              </span>
              <span>{contact.phone}</span>
              <span className="text-muted-light" aria-hidden>
                ·
              </span>
              <span>{contact.location}</span>
              <span className="text-muted-light" aria-hidden>
                ·
              </span>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                linkedin.com/in/dhruv-ramu
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="lg:sticky lg:top-32 shrink-0 p-6 rounded-2xl border border-line bg-paper">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Download
              </p>
              <p className="mt-2 font-display text-lg font-medium text-ink">
                Business & Consulting Resume
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.08em] text-muted-light">
                PDF · Updated 2026
              </p>
              <Button
                href={RESUME_PDF}
                download={RESUME_DOWNLOAD_NAME}
                variant="primary"
                className="mt-5 w-full"
              >
                Download PDF
              </Button>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 md:mt-20 space-y-16">
          <ScrollReveal>
            <SectionLabel>Education</SectionLabel>
            <div className="mt-4">
              <div className="flex flex-col md:flex-row md:justify-between gap-2">
                <h3 className="font-display text-xl md:text-2xl font-medium text-ink">
                  {education.institution}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted shrink-0">
                  {education.period}
                </span>
              </div>
              <p className="mt-2 font-body italic text-muted">{education.degree}</p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.06em] text-ink-soft">
                {education.gpa}
              </p>
              <p className="mt-3 font-body text-ink-soft leading-relaxed">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  Relevant coursework:{" "}
                </span>
                {education.coursework}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <SectionLabel>Experience</SectionLabel>
            <div className="mt-2">
              {experience.map((item) => (
                <CvEntry key={item.organization + item.period} {...item} />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <SectionLabel>Leadership & activities</SectionLabel>
            <div className="mt-2">
              {leadership.map((item) => (
                <CvEntry key={item.organization} {...item} />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <SectionLabel>Selected projects</SectionLabel>
            <div className="mt-2">
              {projects.map((item) => (
                <div
                  key={item.title}
                  className="py-8 border-b border-line last:border-b-0"
                >
                  <h3 className="font-display text-xl font-medium text-ink">
                    {item.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 48)}
                        className="font-body text-ink-soft leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1 before:h-1 before:rounded-full before:bg-line-dark"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <SectionLabel>Skills & interests</SectionLabel>
            <div className="mt-4 space-y-4">
              <p className="font-body text-ink-soft leading-relaxed">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  Technical:{" "}
                </span>
                {skills.technical}
              </p>
              <p className="font-body text-ink-soft leading-relaxed">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  Languages:{" "}
                </span>
                {skills.languages}
              </p>
              <p className="font-body text-ink-soft leading-relaxed">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  Interests:{" "}
                </span>
                {skills.interests}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </PageTransition>
  );
}
