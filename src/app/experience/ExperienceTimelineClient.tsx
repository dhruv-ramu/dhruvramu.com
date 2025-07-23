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
    <Flex direction="column" gap="6" style={{ position: 'relative' }}>
      {/* Timeline vertical line */}
      <Box style={{
        position: 'absolute',
        left: 30,
        top: 0,
        bottom: 0,
        width: 4,
        background: 'linear-gradient(to bottom, #2563eb 0%, #e0e7ff 100%)',
        zIndex: 0,
        borderRadius: 2,
      }} />
      {experience.map((exp, idx) => {
        const isOngoing = exp.end === 'Present';
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            style={{ width: "100%", position: 'relative', zIndex: 1 }}
          >
            <Flex align="start" gap="4" style={{ position: "relative" }}>
              <Box style={{ width: 60, minWidth: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                <Box style={{
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  background: isOngoing ? '#22c55e' : '#a1a1aa',
                  marginTop: 8,
                  marginBottom: 8,
                  border: '3px solid #fff',
                  boxShadow: isOngoing ? '0 0 0 4px #bbf7d0' : '0 0 0 4px #e5e7eb',
                  transition: 'background 0.3s',
                }} />
                {idx < experience.length - 1 && (
                  <Box style={{ width: 4, flex: 1, background: 'transparent', marginTop: 0 }} />
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
                      whileHover={{ scale: 1.06 }}
                      style={{
                        color: '#171717',
                        fontWeight: 600,
                        fontSize: 20,
                        textDecoration: 'underline',
                        fontFamily: 'var(--font-ibm-plex-serif)',
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                      }}
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
        );
      })}
    </Flex>
  );
} 