import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Box, Text } from "@radix-ui/themes";
// Only import the client wrapper, do NOT use dynamic(..., { ssr: false }) in this file!
import ExperienceTimelineClientWrapper from "./ExperienceTimelineClient";

const EXPERIENCE_DIR = path.join(process.cwd(), "content/experience");

function getAllExperience() {
  const files = fs.readdirSync(EXPERIENCE_DIR);
  return files.map((file) => {
    const filePath = path.join(EXPERIENCE_DIR, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    return data;
  });
}

function sortExperience(a: any, b: any) {
  const isOngoingA = a.end === 'Present';
  const isOngoingB = b.end === 'Present';
  if (isOngoingA && !isOngoingB) return -1;
  if (!isOngoingA && isOngoingB) return 1;
  if (isOngoingA && isOngoingB) {
    // Both ongoing: later start date first
    return new Date(b.start).getTime() - new Date(a.start).getTime();
  }
  // Both completed: most recent end date first
  return new Date(b.end).getTime() - new Date(a.end).getTime();
}

export default function ExperiencePage() {
  const experience = getAllExperience().map(exp => ({
    ...exp,
    company_logo: exp.company_logo ? `/logos/${exp.company_logo}` : undefined,
  })).sort(sortExperience);
  return (
    <Box asChild style={{ padding: "4rem 0" }}>
      <main className="max-w-3xl mx-auto">
        <Text as="div" size="7" weight="bold" align="center" style={{ fontFamily: 'var(--font-ibm-plex-serif)', marginBottom: 40 }} className="text-4xl">Professional Experience</Text>
        <ExperienceTimelineClientWrapper experience={experience} />
      </main>
    </Box>
  );
} 