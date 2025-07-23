"use client";
import { Card, Flex, Text, Box } from "@radix-ui/themes";
import { motion } from "framer-motion";

function parseDate(date: string) {
  if (date === 'Present') return new Date(3000, 0, 1); // far future for sorting
  if (/\d{4}-\d{2}/.test(date)) {
    const [year, month] = date.split('-').map(Number);
    return new Date(year, month - 1, 1);
  }
  return new Date(date);
}

function formatDate(date: string) {
  if (date === 'Present') return 'Present';
  if (/\d{4}-\d{2}/.test(date)) {
    const [year, month] = date.split('-');
    return `${new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`;
  }
  return date;
}

export default function ExperienceTimelineClient({ experience }: { experience: any[] }) {
  // Remove client-side sorting, assume already sorted
  return (
    <Flex direction="column" gap="6">
      {experience.map((exp, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          <Flex align="start" gap="4" style={{ position: "relative" }}>
            <Box style={{ width: 24, minWidth: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box style={{ width: 12, height: 12, borderRadius: 999, background: '#2563eb', marginTop: 8, marginBottom: 8, border: '2px solid #fff', boxShadow: '0 0 0 2px #2563eb' }} />
              {idx < experience.length - 1 && (
                <Box style={{ width: 2, flex: 1, background: '#e0e7ff', marginTop: 0 }} />
              )}
            </Box>
            <Card size="3" style={{ flex: 1, background: '#fff', padding: 28, boxShadow: '0 4px 32px 0 rgba(80, 120, 200, 0.08)' }}>
              <Flex direction="column" gap="2">
                <Flex align="center" gap="3">
                  {exp.company_logo && (
                    <motion.img
                      src={exp.company_logo}
                      alt={exp.company}
                      width={36}
                      height={36}
                      style={{ borderRadius: 8, boxShadow: '0 1px 4px 0 rgba(80,120,200,0.10)' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  )}
                  <motion.a
                    href={exp.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, color: '#2563eb' }}
                    style={{ color: '#2563eb', fontWeight: 600, fontSize: 20, textDecoration: 'underline', fontFamily: 'var(--font-ibm-plex-serif)' }}
                  >
                    {exp.company}
                  </motion.a>
                </Flex>
                <Text as="div" size="5" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="text-2xl">
                  {exp.role}
                </Text>
                <Flex gap="2" align="center" wrap="wrap">
                  <Text as="span" size="2" color="gray">{formatDate(exp.start)} – {formatDate(exp.end)}</Text>
                  <Text as="span" size="2" color="gray">• {exp.location}</Text>
                </Flex>
                <Text as="p" size="3" style={{ color: '#444', marginTop: 8 }}>{exp.summary}</Text>
                {exp.achievements && (
                  <Box asChild mt="2">
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {(exp.achievements as string[]).map((ach: string, i: number) => (
                        <li key={i} style={{ color: '#2563eb', fontWeight: 500, marginBottom: 4 }}>{ach}</li>
                      ))}
                    </ul>
                  </Box>
                )}
              </Flex>
            </Card>
          </Flex>
        </motion.div>
      ))}
    </Flex>
  );
} 