import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Card, Flex, Text, Box } from "@radix-ui/themes";

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

export default function ResearchPage() {
  const research = getAllResearch();
  const publications = research.sort((a, b) => (b.year > a.year ? 1 : -1));
  return (
    <Box asChild style={{ padding: "4rem 0" }}>
      <main className="max-w-4xl mx-auto">
        <Text as="div" size="7" weight="bold" align="center" style={{ fontFamily: 'serif', marginBottom: 40 }} className="text-4xl">Research & Publications</Text>
        <Flex direction="column" gap="6">
          {publications.map((pub, idx) => (
            <Card key={idx} size="3" style={{ background: '#fff' }}>
              <Flex direction="column" gap="2">
                <Text as="div" size="5" weight="bold" style={{ fontFamily: 'serif' }} className="text-2xl italic">{pub.title}</Text>
                <Text as="span" size="3" color="gray">{pub.authors}, {pub.journal}, {pub.year}.</Text>
                <Flex gap="2" mt="1" wrap="wrap">
                  {pub.doi && (
                    <a href={`https://doi.org/${pub.doi}`} style={{ color: '#2563eb', fontWeight: 500, fontSize: 14 }} target="_blank" rel="noopener noreferrer">DOI</a>
                  )}
                  {pub.pdf && (
                    <a href={pub.pdf} style={{ color: '#2563eb', fontWeight: 500, fontSize: 14 }} target="_blank" rel="noopener noreferrer">PDF</a>
                  )}
                  {pub.arxiv && (
                    <a href={pub.arxiv} style={{ color: '#2563eb', fontWeight: 500, fontSize: 14 }} target="_blank" rel="noopener noreferrer">arXiv</a>
                  )}
                </Flex>
                <Flex gap="2" mt="1" wrap="wrap">
                  {pub.tags && (pub.tags as string[]).map((tag: string, i: number) => (
                    <Box key={i} px="3" py="1" style={{ background: '#e0e7ff', color: '#2563eb', borderRadius: 999, fontSize: 13, fontWeight: 500, margin: 2, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
                      {tag}
                    </Box>
                  ))}
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      </main>
    </Box>
  );
} 