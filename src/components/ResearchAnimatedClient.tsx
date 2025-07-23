"use client";
import { Card, Flex, Text, Box } from "@radix-ui/themes";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ResearchAnimatedClient({ projects, publications, talks }: { projects: any[]; publications: any[]; talks: any[] }) {
  const sortedPublications = [...publications].sort((a, b) => Number(b.year) - Number(a.year));
  // Helper to fix PDF links
  const getPdfLink = (pdf: string) => {
    if (!pdf) return undefined;
    // Only link if it's a local file (not a URL)
    if (pdf.startsWith('http://') || pdf.startsWith('https://')) return undefined;
    return pdf.startsWith('/pdf/') ? pdf : `/pdf/${pdf}`;
  };
  const getPdfEmbedLink = (pdf: string) => {
    if (!pdf) return undefined;
    const filename = pdf.startsWith('/pdf/') ? pdf.replace('/pdf/', '') : pdf;
    return `/pdf/${encodeURIComponent(filename)}`;
  };
  return (
    <>
      {/* Publications */}
      <Text as="div" size="5" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)', marginBottom: 24 }} className="text-2xl">Publications</Text>
      <Flex direction="column" gap="6" mb="8">
        {sortedPublications.map((pub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            style={{ width: "100%" }}
          >
            <Card size="3" style={{ background: '#fff', padding: 28, boxShadow: '0 4px 32px 0 rgba(80, 120, 200, 0.08)' }}>
              <Flex direction="column" gap="2">
                <Flex align="center" gap="2">
                  <Text as="div" size="5" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="text-2xl italic">{pub.title}</Text>
                  <Text as="span" size="2" color="gray" style={{ marginLeft: 12 }}>{pub.year}</Text>
                </Flex>
                <Text as="span" size="3" color="gray">{pub.authors}, {pub.journal}</Text>
                <Text as="p" size="3" style={{ color: '#444', marginTop: 4 }}>{pub.summary}</Text>
                <Flex gap="2" mt="1" wrap="wrap">
                  {pub.doi && (
                    <a href={`https://doi.org/${pub.doi}`} style={{ color: '#2563eb', fontWeight: 500, fontSize: 14 }} target="_blank" rel="noopener noreferrer">DOI</a>
                  )}
                  {getPdfLink(pub.pdf) && (
                    <a href={getPdfLink(pub.pdf)} style={{ color: '#2563eb', fontWeight: 500, fontSize: 14 }} target="_blank" rel="noopener noreferrer">PDF</a>
                  )}
                  {pub.arxiv && (
                    <a href={pub.arxiv} style={{ color: '#2563eb', fontWeight: 500, fontSize: 14 }} target="_blank" rel="noopener noreferrer">arXiv</a>
                  )}
                </Flex>
                <Flex gap="2" mt="1" wrap="wrap">
                  {pub.tags && (pub.tags as string[]).map((tag: string, i: number) => (
                    <Box key={i} px="3" py="1" style={{ background: '#e0e7ff', color: '#2563eb', borderRadius: 999, fontSize: 13, fontWeight: 500, margin: 2, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>{tag}</Box>
                  ))}
                </Flex>
              </Flex>
            </Card>
          </motion.div>
        ))}
      </Flex>
      {/* Selected Projects */}
      <Text as="div" size="5" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)', marginBottom: 24 }} className="text-2xl">Selected Projects</Text>
      <Flex gap="6" wrap="wrap" mb="8">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            style={{ flex: '1 1 320px', minWidth: 280, maxWidth: 420 }}
          >
            <Card size="3" style={{ background: '#fff', height: '100%', padding: 28, boxShadow: '0 4px 32px 0 rgba(80, 120, 200, 0.08)' }}>
              <Flex direction="column" gap="2">
                <a href="#" style={{ textDecoration: 'none' }}>
                  <Text as="div" size="4" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>{proj.title}</Text>
                </a>
                <Text as="span" size="2" color="gray">{proj.institution} · {proj.dates}</Text>
                <Text as="p" size="3" style={{ color: '#444' }}>{proj.summary}</Text>
                <Flex gap="2" mt="1" wrap="wrap">
                  {proj.tags && proj.tags.map((tag: string, i: number) => (
                    <Box key={i} px="3" py="1" style={{ background: '#e0e7ff', color: '#2563eb', borderRadius: 999, fontSize: 13, fontWeight: 500, margin: 2, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>{tag}</Box>
                  ))}
                </Flex>
                <Flex gap="2" mt="2">
                  {proj.pdf && <a href={getPdfLink(proj.pdf)} style={{ color: '#2563eb', fontWeight: 500, fontSize: 14 }} target="_blank" rel="noopener noreferrer">PDF</a>}
                  {proj.doi && <a href={`https://doi.org/${proj.doi}`} style={{ color: '#2563eb', fontWeight: 500, fontSize: 14 }} target="_blank" rel="noopener noreferrer">DOI</a>}
                </Flex>
              </Flex>
            </Card>
          </motion.div>
        ))}
      </Flex>
      {/* Talks & Posters */}
      <Text as="div" size="5" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)', marginBottom: 24 }} className="text-2xl">Talks & Posters</Text>
      <Flex direction="column" gap="4">
        {talks.map((talk, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            style={{ width: "100%" }}
          >
            <Card size="2" style={{ background: '#f9fafb' }}>
              <Flex direction="column" gap="1">
                <Text as="div" size="4" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}>{talk.title}</Text>
                <Text as="span" size="2" color="gray">{talk.conference} (<a href={talk.link} style={{ color: '#2563eb', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">link</a>), {talk.date}, {talk.location}</Text>
                <a href={talk.slides} style={{ color: '#2563eb', fontWeight: 500, fontSize: 14, marginTop: 4 }} target="_blank" rel="noopener noreferrer">View Slides</a>
              </Flex>
            </Card>
          </motion.div>
        ))}
      </Flex>
    </>
  );
} 