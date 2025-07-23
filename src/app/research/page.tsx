import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Box, Text } from "@radix-ui/themes";
import ResearchPageClient from "./ResearchPageClient";

const RESEARCH_DIR = path.join(process.cwd(), "content/research");

function getAllResearch() {
  const files = fs.readdirSync(RESEARCH_DIR);
  return files.map((file) => {
    const filePath = path.join(RESEARCH_DIR, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    return data;
  });
}

function parsePubDate(pub: any) {
  // Accepts YYYY/MM/DD or YYYY-MM-DD
  if (pub.date) return new Date(pub.date.replace(/\//g, '-')).getTime();
  if (pub.year && pub.month && pub.day) return new Date(`${pub.year}-${pub.month}-${pub.day}`).getTime();
  if (pub.year && pub.month) return new Date(`${pub.year}-${pub.month}-01`).getTime();
  if (pub.year) return new Date(`${pub.year}-01-01`).getTime();
  return 0;
}

// Example placeholder data for projects and talks
const projects = [
  {
    title: "Deep Learning for Genomics",
    institution: "Example University",
    dates: "2022–2023",
    summary: "Applied deep neural networks to large-scale genomics data.",
    doi: "10.1234/exampledoi",
    pdf: "/papers/deep-learning-genomics.pdf",
    tags: ["Deep Learning", "Genomics"],
  },
];

const talks = [
  {
    title: "AI in Biology",
    conference: "BioConf 2023",
    date: "July 2023",
    location: "New York, NY",
    slides: "/slides/ai-in-biology.pdf",
    link: "https://bioconf.org/2023/ai-in-biology",
  },
];

export default function ResearchPage() {
  const research = getAllResearch().map(pub => ({
    ...pub,
    pdf: pub.pdf ? `/pdf/${pub.pdf}` : undefined,
  }));
  const publications = research.sort((a, b) => parsePubDate(b) - parsePubDate(a));
  return (
    <Box asChild style={{ padding: "4rem 0" }}>
      <main className="max-w-4xl mx-auto">
        <Text as="div" size="7" weight="bold" align="center" style={{ fontFamily: 'var(--font-ibm-plex-serif)', marginBottom: 40 }} className="text-4xl">Research & Publications</Text>
        <ResearchPageClient publications={publications} projects={projects} talks={talks} />
      </main>
    </Box>
  );
} 